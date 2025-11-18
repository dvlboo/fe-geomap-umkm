'use client';

import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { UMKM } from '@/lib/api/umkm';

interface GeoLayer {
  name: string;
  data: any;
  style: any;
}

interface MapUMKM {
  id: number;
  name: string;
  lat: number;
  lng: number;
  photo: string;
  regency: string;
  address?: string;
  phone?: string;
  story?: string;
}

// Transform API UMKM data to MapUMKM format
const transformUMKMData = (umkmList: UMKM[]): MapUMKM[] => {
  return umkmList.map(umkm => ({
    id: umkm.id,
    name: umkm.name,
    lat: umkm.location.latitude,
    lng: umkm.location.longitude,
    photo: umkm.place_pict || '/umkm/default.jpg',
    regency: umkm.regency,
    address: umkm.address,
    phone: umkm.phone,
    story: umkm.story,
  }));
};

const createIcon = (photo: string) =>
  L.divIcon({
    html: `
      <div style="
        position: relative;
        width: 42px;
        height: 42px;
        background-color: white;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid orange;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      ">
        <img src="${photo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%" />
        <div style="
          position:absolute;
          bottom:-8px;
          left:50%;
          transform:translateX(-50%);
          width:0;
          height:0;
          border-left:8px solid transparent;
          border-right:8px solid transparent;
          border-top:12px solid orange;
        "></div>
      </div>
    `,
    className: '',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
    popupAnchor: [0, -40],
  });

export default function RBImap({ 
  filter = 'Semua',
  onMarkerClick,
  umkmData = [],
  searchQuery = ''
}: { 
  filter?: string;
  onMarkerClick?: (umkm: UMKM) => void;
  umkmData?: UMKM[];
  searchQuery?: string;
}) {
  const [pamekasanLayers, setPamekasanLayers] = useState<GeoLayer[]>([]);
  const [sumenepLayers, setSumenepLayers] = useState<GeoLayer[]>([]);
  const [routeLines, setRouteLines] = useState<GeoLayer[]>([]);
  
  // Transform UMKM data for map display
  const mapUMKMData = transformUMKMData(umkmData);
  
  // Filter UMKM data based on regency filter for route generation
  const filteredUMKMData = mapUMKMData.filter(u => 
    filter === 'Semua' || u.regency === filter
  );

  // Calculate distance between two coordinates (in kilometers)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Fetch route between two points using OSRM
  const getOSRMRoute = async (start: MapUMKM, end: MapUMKM) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        return {
          geometry: data.routes[0].geometry,
          distance: data.routes[0].distance / 1000, // Convert to km
          duration: data.routes[0].duration / 60, // Convert to minutes
        };
      }
      return null;
    } catch (error) {
      console.error('OSRM routing error:', error);
      return null;
    }
  };

  // Check if point is on the line between two points (with tolerance)
  const isPointBetween = (pointLat: number, pointLng: number, lat1: number, lng1: number, lat2: number, lng2: number, tolerance: number = 0.01): boolean => {
    // Calculate distances
    const d1 = calculateDistance(pointLat, pointLng, lat1, lng1);
    const d2 = calculateDistance(pointLat, pointLng, lat2, lng2);
    const d12 = calculateDistance(lat1, lng1, lat2, lng2);
    
    // Point is "between" if sum of distances to both ends ≈ distance between ends
    const distanceSum = d1 + d2;
    const difference = Math.abs(distanceSum - d12);
    
    return difference <= tolerance;
  };

  // Check if a road segment is positioned between two UMKMs (forms a corridor)
  const isRoadConnectingUMKMs = (coordinates: any, umkmList: MapUMKM[]): boolean => {
    if (!coordinates || coordinates.length === 0 || umkmList.length < 2) return false;

    // Flatten coordinates if nested (MultiLineString)
    const flatCoords = Array.isArray(coordinates[0][0]) 
      ? coordinates.flat() 
      : coordinates;

    // Try all UMKM pairs to see if this road is between any pair
    for (let i = 0; i < umkmList.length; i++) {
      for (let j = i + 1; j < umkmList.length; j++) {
        const umkm1 = umkmList[i];
        const umkm2 = umkmList[j];
        
        // Check if any point on the road is between these two UMKMs
        let pointsBetween = 0;
        for (const coord of flatCoords) {
          const [lng, lat] = coord;
          if (isPointBetween(lat, lng, umkm1.lat, umkm1.lng, umkm2.lat, umkm2.lng, 1.0)) {
            pointsBetween++;
          }
        }
        
        // If at least 30% of road points are between these UMKMs, this road connects them
        const percentageBetween = pointsBetween / flatCoords.length;
        if (percentageBetween >= 0.3) {
          // console.log(`✅ Road connects ${umkm1.name} ↔ ${umkm2.name} (${(percentageBetween * 100).toFixed(1)}% points between)`);
          return true;
        }
      }
    }

    return false;
  };

  // Filter roads to only show roads connecting between UMKMs
  const filterConnectingRoads = (roadData: any, kabupaten: string): any => {
    if (!roadData || !roadData.features) return roadData;

    // Use ALL UMKMs for road connectivity (cross-regency connections allowed)
    const allUMKM = mapUMKMData;

    console.log('🔍 filterConnectingRoads called:', {
      kabupaten,
      totalMapUMKM: allUMKM.length,
      mapUMKMSample: allUMKM.slice(0, 2),
      allRegencies: [...new Set(allUMKM.map(u => u.regency))],
      totalRoadFeatures: roadData.features.length
    });
    
    // If less than 2 UMKMs globally, no roads should be shown
    if (allUMKM.length < 2) {
      console.log(`⚠️ Not enough total UMKMs (${allUMKM.length} < 2), hiding all roads`);
      return {
        ...roadData,
        features: []
      };
    }
    
    console.log(`✅ Found ${allUMKM.length} total UMKMs, filtering ${roadData.features.length} road segments in ${kabupaten}...`);
    
    const filteredFeatures = roadData.features.filter((feature: any) => {
      const coordinates = feature.geometry?.coordinates;
      
      // Only show roads that are positioned between UMKMs (corridor-based filtering)
      const isConnecting = isRoadConnectingUMKMs(coordinates, allUMKM);
      return isConnecting;
    });

    console.log(`🛣️ Filtered roads result: ${filteredFeatures.length} of ${roadData.features.length} roads connecting UMKMs`);

    return {
      ...roadData,
      features: filteredFeatures
    };
  };

  const loadKabupatenData = async (
    kabupaten: string,
    color: string
  ) => {
    const results: GeoLayer[] = [];

    try {
      // Only load boundary layer (adm_desa)
      const res = await fetch(`/datas/${kabupaten}/adm_desa.json`);
      if (res.ok) {
        const data = await res.json();
        results.push({ 
          name: 'adm_desa.json', 
          data, 
          style: { color, weight: 0, fillOpacity: 0.5 } 
        });
      }
    } catch (err) {
      console.error(`Failed to load boundary for ${kabupaten}`, err);
    }

    return results;
  };

  // Generate routes connecting all UMKMs via nearest neighbor (spanning tree approach)
  const generateUMKMRoutes = async () => {
    if (filteredUMKMData.length < 2) {
      setRouteLines([]);
      return;
    }

    console.log(`🛣️ Generating OSRM routes for ${filteredUMKMData.length} UMKMs in ${filter}...`);
    
    const DELAY_MS = 200; // Delay between requests to avoid rate limiting

    // Helper to delay execution
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Clear existing routes first
    setRouteLines([]);

    // Track which UMKMs are already connected
    const connected = new Set<number>();
    const unconnected = new Set<number>(filteredUMKMData.map((_, idx) => idx));
    
    // Start with first UMKM
    const startIdx = 0;
    connected.add(startIdx);
    unconnected.delete(startIdx);

    // Connect each remaining UMKM to the nearest already-connected UMKM
    while (unconnected.size > 0) {
      let minDistance = Infinity;
      let bestPair: { fromIdx: number; toIdx: number } | null = null;

      // Find the closest unconnected UMKM to any connected UMKM
      for (const connectedIdx of connected) {
        for (const unconnectedIdx of unconnected) {
          const distance = calculateDistance(
            filteredUMKMData[connectedIdx].lat,
            filteredUMKMData[connectedIdx].lng,
            filteredUMKMData[unconnectedIdx].lat,
            filteredUMKMData[unconnectedIdx].lng
          );

          if (distance < minDistance) {
            minDistance = distance;
            bestPair = { fromIdx: connectedIdx, toIdx: unconnectedIdx };
          }
        }
      }

      if (!bestPair) break;

      const umkm1 = filteredUMKMData[bestPair.fromIdx];
      const umkm2 = filteredUMKMData[bestPair.toIdx];

      // Add delay to avoid rate limiting
      await delay(DELAY_MS);

      const route = await getOSRMRoute(umkm1, umkm2);
      
      if (route) {
        console.log(`✅ Route: ${umkm1.name} → ${umkm2.name}`);
        
        // Langsung tampilkan route begitu didapat
        setRouteLines(prev => [...prev, {
          name: `route-${umkm1.id}-${umkm2.id}`,
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: route.geometry,
              properties: {
                from: umkm1.name,
                to: umkm2.name,
              }
            }]
          },
          style: {
            color: '#0000ab',
            weight: 3,
            opacity: 0.7,
          }
        }]);
      }

      // Mark this UMKM as connected
      connected.add(bestPair.toIdx);
      unconnected.delete(bestPair.toIdx);
    }

    console.log(`✅ Route generation complete: ${connected.size} UMKMs connected`);
  };

  useEffect(() => {
    // Load kabupaten data (always show boundary layers)
    loadKabupatenData('pamekasan', '#22c55e').then(setPamekasanLayers);
    loadKabupatenData('sumenep', '#2fdb04').then(setSumenepLayers);
  }, []);

  useEffect(() => {
    // Generate OSRM routes when UMKM data or filter changes
    if (filteredUMKMData.length >= 2) {
      console.log('🔄 Triggering route generation...');
      generateUMKMRoutes();
    } else {
      setRouteLines([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredUMKMData.length, filter]); // Regenerate routes when filter changes

  return (
    <MapContainer
      center={[-7.11667, 113.33333]}
      zoom={9}
      style={{ height: '90vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {(filter === 'Semua' || filter === 'Pamekasan') &&
        pamekasanLayers.map((layer, i) => (
          <GeoJSON key={`pamekasan-${i}`} data={layer.data} style={layer.style} />
        ))}

      {(filter === 'Semua' || filter === 'Sumenep') &&
        sumenepLayers.map((layer, i) => (
          <GeoJSON key={`sumenep-${i}`} data={layer.data} style={layer.style} />
        ))}

      {/* OSRM Routes between UMKMs */}
      {routeLines.map((route, i) => (
        <GeoJSON key={`route-${i}`} data={route.data} style={route.style} />
      ))}

      {mapUMKMData
        .filter((u) => {
          // Filter by regency
          const matchesRegency = filter === 'Semua' || u.regency === filter;
          
          // Filter by search query
          const matchesSearch = searchQuery === '' || 
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.regency.toLowerCase().includes(searchQuery.toLowerCase());
          
          return matchesRegency && matchesSearch;
        })
        .map((mapUmkm) => {
          // Find the original UMKM object to pass to onMarkerClick
          const originalUmkm = umkmData.find(u => u.id === mapUmkm.id);
          
          return (
            <Marker 
              key={mapUmkm.id} 
              position={[mapUmkm.lat, mapUmkm.lng]} 
              icon={createIcon(mapUmkm.photo)}
              eventHandlers={{
                click: () => {
                  if (onMarkerClick && originalUmkm) {
                    onMarkerClick(originalUmkm);
                  }
                },
              }}
            >
            </Marker>
          );
        })}
    </MapContainer>
  );
}