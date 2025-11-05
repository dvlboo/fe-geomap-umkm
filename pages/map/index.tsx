import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import dynamic from "next/dynamic";

const MapRBI = dynamic(() => import('@/components/MapRBI'), { ssr: false });

export default function MapPage() {
  const [activeFilter, setActiveFilter] = useState<string>("Semua");

  const filterButtons = [
    { name: "Semua", value: "Semua" },
    { name: "Pamekasan", value: "Pamekasan" },
    { name: "Sumenep", value: "Sumenep" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-white">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold mb-5">
          GeoMAP Kuliner{" "}
          <span className="text-[var(--yellow-umkm)]">Pamekasan & Sumenep</span>
        </h2>
        <p>Gunakan GeoMap Kuliner Pamekasan & Sumenep untuk menjelajahi cita rasa lokal.</p>
        <p>Pilih kabupaten, klik titik lokasi di peta, dan temukan informasi lengkap tentang kuliner khas beserta UMKM pengelolanya.</p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between mb-8 gap-6 px-3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Cari daerah/makanan"
            className="w-full border border-gray-300 rounded-full px-4 py-2 pr-12 focus:outline-none"
          />
          <CiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl pointer-events-none" />
        </div>
        <div className="flex space-x-4">
          {filterButtons.map((button) => (
            <button
              key={button.value}
              onClick={() => setActiveFilter(button.value)}
              className={`py-2 px-8 rounded-full transition-all ${
                activeFilter === button.value
                  ? "bg-black text-white"
                  : "bg-white text-black outline-black outline-1 hover:bg-black hover:text-white hover:cursor-pointer"
              }`}
            >
              {button.name}
            </button>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <MapRBI filter={activeFilter} />
    </div>
  );
}