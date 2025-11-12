'use client';

import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface GeoLayer {
  name: string;
  data: any;
  style: any;
}

export interface UMKM {
  id: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  photo: string;
  location?: string;
  address?: string;
  phone?: string;
  history?: string;
}

export const umkmData: UMKM[] = [
  {
    id: 1,
    name: 'Tajin Sobih Bu Aminah',
    description: 'Legenda',
    lat: -7.071,
    lng: 113.49,
    photo: '/umkm/tajin-sobih.jpg',
    location: 'Pamekasan',
    address: 'Jl. Pintu Gerbang No.126, Pertanian, Bugih, Kec. Pamekasan, Kabupaten Pamekasan, Jawa Timur 69317',
    phone: '+62 813 4455 9988',
    history: 'Nasi Rames atau yang di Pamekasan lebih dikenal dengan sebutan "Nasi Ramoy" (dalam logat Madura, "ramey" sering "ramoy") adalah sajian nasi campur yang mencerminkan kekayaan kuliner budaya di Madura. Kuliner ini berkembang seiring...',
  },
  {
    id: 2,
    name: 'Sate Lalat Pak Memet',
    description: 'Khas Pamekasan',
    lat: -7.15,
    lng: 113.47,
    photo: '/umkm/sate-lalat.jpg',
    location: 'Pamekasan',
    address: 'Jl. Raya Pamekasan No. 45, Kecamatan Pamekasan, Jawa Timur',
    phone: '+62 812 3456 7890',
    history: 'Sate Lalat adalah kuliner khas Pamekasan yang terkenal dengan ukuran sate yang kecil-kecil seperti lalat. Dibuat dari daging sapi pilihan dengan bumbu rempah khas Madura.',
  },
  {
    id: 3,
    name: 'Kaldu Kokot Sumenep',
    description: 'Kuliner ikonik',
    lat: -7.01,
    lng: 113.87,
    photo: '/umkm/kaldu-kokot.jpg',
    location: 'Sumenep',
    address: 'Jl. Trunojoyo No. 78, Kecamatan Sumenep, Jawa Timur',
    phone: '+62 811 2233 4455',
    history: 'Kaldu Kokot adalah makanan tradisional khas Sumenep yang terbuat dari daging sapi dengan kuah kaldu yang kaya rempah. Sudah menjadi ikon kuliner Sumenep sejak puluhan tahun.',
  },
];

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
  onMarkerClick 
}: { 
  filter?: string;
  onMarkerClick?: (umkm: UMKM) => void;
}) {
  const [pamekasanLayers, setPamekasanLayers] = useState<GeoLayer[]>([]);
  const [sumenepLayers, setSumenepLayers] = useState<GeoLayer[]>([]);

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

  // Check if a road segment is near any UMKM point
  const isRoadNearUMKM = (coordinates: any, umkmList: UMKM[], maxDistance: number = 1): boolean => {
    if (!coordinates || coordinates.length === 0) return false;

    // Flatten coordinates if nested (MultiLineString)
    const flatCoords = Array.isArray(coordinates[0][0]) 
      ? coordinates.flat() 
      : coordinates;

    // Check if any point in the road is near any UMKM
    for (const coord of flatCoords) {
      const [lng, lat] = coord;
      for (const umkm of umkmList) {
        const distance = calculateDistance(lat, lng, umkm.lat, umkm.lng);
        if (distance <= maxDistance) {
          return true;
        }
      }
    }
    return false;
  };

  // Filter roads to only show main roads near UMKM points
  const filterMainRoads = (roadData: any, kabupaten: string): any => {
    if (!roadData || !roadData.features) return roadData;

    const relevantUMKM = umkmData.filter(u => u.location === kabupaten);
    
    const filteredFeatures = roadData.features.filter((feature: any) => {
      // Keep major roads (jalan utama) based on road type if available
      const roadType = feature.properties?.REMARK || feature.properties?.NAMOBJ || '';
      const isMajorRoad = roadType.toLowerCase().includes('utama') || 
                          roadType.toLowerCase().includes('provinsi') ||
                          roadType.toLowerCase().includes('nasional') ||
                          roadType.toLowerCase().includes('kolektor');

      // Check if road is near UMKM points
      const coordinates = feature.geometry?.coordinates;
      const isNearUMKM = isRoadNearUMKM(coordinates, relevantUMKM, 1.5); // 1.5 km radius

      return isMajorRoad || isNearUMKM;
    });

    return {
      ...roadData,
      features: filteredFeatures
    };
  };

  const loadKabupatenData = async (
    kabupaten: string,
    color: string,
    roadColor?: string
  ) => {
    const files = ['adm_desa.json', 'jalan.json'];
    const results: GeoLayer[] = [];

    for (const file of files) {
      try {
        const res = await fetch(`/datas/${kabupaten}/${file}`);
        if (!res.ok) continue;
        let data = await res.json();

        let style = {};
        if (file.includes('adm_desa')) {
          style = { color, weight: 0, fillOpacity: 0.5 };
        }
        if (file.includes('jalan')) {
          // Filter roads to show only main roads near UMKM
          data = filterMainRoads(data, kabupaten);
          style = { color: roadColor ?? 'orange', weight: 2 };
        }

        results.push({ name: file, data, style });
      } catch (err) {
        console.error(`Gagal load ${file} untuk ${kabupaten}`, err);
      }
    }

    return results;
  };

  useEffect(() => {
    loadKabupatenData('pamekasan', '#22c55e', '#d97706').then(setPamekasanLayers);
    loadKabupatenData('sumenep', '#2fdb04', '#facc15').then(setSumenepLayers);
  }, []);

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

      {umkmData
        .filter((u) => filter === 'Semua' || u.location === filter)
        .map((u) => (
          <Marker 
            key={u.id} 
            position={[u.lat, u.lng]} 
            icon={createIcon(u.photo)}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) {
                  onMarkerClick(u);
                }
              },
            }}
          >
          </Marker>
        ))}
    </MapContainer>
  );
}