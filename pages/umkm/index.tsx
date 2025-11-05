import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { foodOneImage } from "@/assets";
import FoodCardUMKM from "@/components/cards/CardUMKM";
import { CiSearch } from "react-icons/ci";

const dataUMKM = [
  {
    name: "Warung Soto Rujak Cak Man",
    image: foodOneImage,
    slug: "warung-soto-rujak-cak-man",
  },
  {
    name: "Es Degan Seger Bu Wahyu",
    image: foodOneImage,
    slug: "es-degan-seger-bu-wahyu",
  },
  {
    name: "Warung Soto Rujak Cak Man",
    image: foodOneImage,
    slug: "warung-soto-rujak-cak-man",
  },
  {
    name: "Es Degan Seger Bu Wahyu",
    image: foodOneImage,
    slug: "es-degan-seger-bu-wahyu",
  },
  {
    name: "Warung Soto Rujak Cak Man",
    image: foodOneImage,
    slug: "warung-soto-rujak-cak-man",
  },
  {
    name: "Es Degan Seger Bu Wahyu",
    image: foodOneImage,
    slug: "es-degan-seger-bu-wahyu",
  },
  {
    name: "Warung Soto Rujak Cak Man",
    image: foodOneImage,
    slug: "warung-soto-rujak-cak-man",
  },
  {
    name: "Es Degan Seger Bu Wahyu",
    image: foodOneImage,
    slug: "es-degan-seger-bu-wahyu",
  },
  {
    name: "Warung Soto Rujak Cak Man",
    image: foodOneImage,
    slug: "warung-soto-rujak-cak-man",
  },
  {
    name: "Es Degan Seger Bu Wahyu",
    image: foodOneImage,
    slug: "es-degan-seger-bu-wahyu",
  },
  {
    name: "Warung Soto Rujak Cak Man",
    image: foodOneImage,
    slug: "warung-soto-rujak-cak-man",
  },
  {
    name: "Es Degan Seger Bu Wahyu",
    image: foodOneImage,
    slug: "es-degan-seger-bu-wahyu",
  },
  {
    name: "Warung Soto Rujak Cak Man",
    image: foodOneImage,
    slug: "warung-soto-rujak-cak-man",
  },
  {
    name: "Es Degan Seger Bu Wahyu",
    image: foodOneImage,
    slug: "es-degan-seger-bu-wahyu",
  },
  {
    name: "Warung Soto Rujak Cak Man",
    image: foodOneImage,
    slug: "warung-soto-rujak-cak-man",
  },
  {
    name: "Es Degan Seger Bu Wahyu",
    image: foodOneImage,
    slug: "es-degan-seger-bu-wahyu",
  },
];

export default function UMKMPage() {
  const [activeFilter, setActiveFilter] = useState<string>("Semua");

  const filterButtons = [
    { name: "Semua", value: "Semua" },
    { name: "Pamekasan", value: "Pamekasan" },
    { name: "Sumenep", value: "Sumenep" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-white">
      <h2 className="text-4xl font-bold text-center mb-8">
        Ragam Kuliner UMKM{" "}
        <span className="text-[var(--yellow-umkm)]">Pamekasan & Sumenep</span>
      </h2>

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

      {/* Grid UMKM */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-3">
        {dataUMKM.map((data, index) => (
          <div key={index}>
            {FoodCardUMKM({ props: data })}
          </div>
        ))}
      </div>
    </div>
  );
}
