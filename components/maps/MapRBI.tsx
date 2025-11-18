'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapUtils } from '@/lib/utils/mapUtils';
import { routeService } from '@/lib/services/routeService';
import { GeoLayer, MapProps, RouteData } from '@/lib/types/map';
import { geoLayerService } from '@/lib/services/geoLayerService';
import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet';

export default function RBImap({ 
  filter = 'Semua',
  onMarkerClick,
  umkmData = [],
  searchQuery = ''
}: MapProps) {
  const [pamekasanLayers, setPamekasanLayers] = useState<GeoLayer[]>([]);
  const [sumenepLayers, setSumenepLayers] = useState<GeoLayer[]>([]);
  const [allRoutes, setAllRoutes] = useState<RouteData[]>([]);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(false);
  
  const mapUMKMData = MapUtils.transformUMKMData(umkmData);
  
  const visibleRoutes = routeService.filterRoutes(allRoutes, filter);
  
  const filteredMarkers = MapUtils.filterUMKM(mapUMKMData, filter, searchQuery);

  const loadGeoLayers = async () => {
    const pamekasan = await geoLayerService.loadKabupatenData('pamekasan', '#22c55e');
    const sumenep = await geoLayerService.loadKabupatenData('sumenep', '#2fdb04');
    
    setPamekasanLayers(pamekasan);
    setSumenepLayers(sumenep);
  };

  const generateRoutes = async () => {
    if (mapUMKMData.length < 2) {
      setAllRoutes([]);
      return;
    }

    setIsLoadingRoutes(true);
    
    try {
      const routes = await routeService.generateRoutes(mapUMKMData);
      setAllRoutes(routes);
    } catch (error) {
      console.error('Error generating routes:', error);
    } finally {
      setIsLoadingRoutes(false);
    }
  };

  useEffect(() => {
    loadGeoLayers();
  }, []);

  useEffect(() => {
    if (mapUMKMData.length >= 2) {
      console.log('🔄 Generating routes for all UMKMs...');
      generateRoutes();
    } else {
      setAllRoutes([]);
    }
  }, [mapUMKMData.length]);

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

      {visibleRoutes.map((route, i) => (
        <GeoJSON key={`route-${i}-${filter}`} data={route.data} style={route.style} />
      ))}

      {filteredMarkers.map((mapUmkm) => {
        const originalUmkm = umkmData.find(u => u.id === mapUmkm.id);
        
        return (
          <Marker 
            key={mapUmkm.id} 
            position={[mapUmkm.lat, mapUmkm.lng]} 
            icon={MapUtils.createMarkerIcon(mapUmkm.photo)}
            eventHandlers={{
              click: () => {
                if (onMarkerClick && originalUmkm) {
                  onMarkerClick(originalUmkm);
                }
              },
            }}
          />
        );
      })}
    </MapContainer>
  );
}