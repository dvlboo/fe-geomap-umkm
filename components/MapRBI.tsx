'use client';

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

interface GeoLayer {
  name: string;
  data: any;
  style: any;
}

export default function RBImap({ filter = 'Semua' }: { filter?: string }) {
  const [pamekasanLayers, setPamekasanLayers] = useState<GeoLayer[]>([]);
  const [sumenepLayers, setSumenepLayers] = useState<GeoLayer[]>([]);

  // Fungsi ambil data
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
        const data = await res.json();

        let style = {};
        if (file.includes('adm_desa')) style = { color, weight: 0, fillOpacity: 0.5 };
        if (file.includes('jalan')) style = { color: roadColor ?? 'orange', weight: 1 };

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
      center={[-7.11667000, 114.33333000]}
      zoom={9}
      style={{ height: '90vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Layers are controlled by parent via `filter` prop. */}
      {(filter === 'Semua' || filter === 'Pamekasan') &&
        pamekasanLayers.map((layer, i) => (
          <GeoJSON key={`pamekasan-${i}`} data={layer.data} style={layer.style} />
        ))}

      {(filter === 'Semua' || filter === 'Sumenep') &&
        sumenepLayers.map((layer, i) => (
          <GeoJSON key={`sumenep-${i}`} data={layer.data} style={layer.style} />
        ))}
    </MapContainer>
  );
}