import { useState, useEffect } from "react";
import { foodOneImage } from "@/assets";
import FoodCardUMKM from "@/components/cards/CardUMKM";
import { CiSearch } from "react-icons/ci";
import { umkmService } from "@/lib/umkm/umkm.service";
import { UMKM } from "@/lib/umkm/umkm.type";

export default function UMKMPage() {
  const [activeFilter, setActiveFilter] = useState<string>("Semua");
  const [umkmData, setUmkmData] = useState<UMKM[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUMKMData();
  }, []);

  const fetchUMKMData = async () => {
    try {
      setLoading(true);
      const result = await umkmService.getAll();
      if (result.success && result.data) {
        setUmkmData(result.data);
      }
    } catch (error) {
      console.error("Error fetching UMKM data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterButtons = [
    { name: "Semua", value: "Semua" },
    { name: "Pamekasan", value: "Pamekasan" },
    { name: "Sumenep", value: "Sumenep" }
  ];

  // Filter UMKM data based on search and regency filter
  const filteredUMKM = umkmData.filter((umkm) => {
    const matchesRegency = activeFilter === "Semua" || umkm.regency === activeFilter;
    const matchesSearch = searchQuery === "" || 
      umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.regency.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesRegency && matchesSearch;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 bg-white">
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl">Loading UMKM data...</div>
        </div>
      </div>
    );
  }

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
        {filteredUMKM.length > 0 ? (
          filteredUMKM.map((umkm) => (
            <div key={umkm.id}>
              <FoodCardUMKM
                props={{
                  name: umkm.name,
                  image: umkm.place_pict || foodOneImage,
                  slug: `${umkm.slug}`,
                }}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada UMKM ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
