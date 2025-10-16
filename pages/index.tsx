import Image from "next/image";
import {heroHome, foodOneImage, foodTrenImage, newsImage} from "@/assets";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import FoodCardUMKM from "@/components/cards/CardUMKM";

export default function landingPage() {
  
  const food = [
    { image: foodOneImage, name: "Nasi Goreng Enak banget oyyyy", slug: "warung-soto-rujak-cak-man" },
    { image: foodOneImage, name: "Sate Ayam", slug: "es-degan-seger-bu-wahyu" },
    { image: foodOneImage, name: "Rendang", slug: "warung-soto-rujak-cak-man" },
    { image: foodOneImage, name: "Sate Ayam", slug: "es-degan-seger-bu-wahyu" },
    { image: foodOneImage, name: "Rendang", slug: "warung-soto-rujak-cak-man" },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="w-full h-[540px] flex items-center px-4"
        style={{
          backgroundImage: `url(${typeof heroHome === 'string' ? heroHome : heroHome.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-10 text-center flex-col items-center justify-center">
          <p className="font-semibold text-5xl my-2">Satu Peta, Ribuan Rasa</p>
          <p className="text-[var(--yellow-umkm)] font-semibold text-5xl my-2">Kuliner Pamekasan & Sumenep</p>
          <p className="max-w-2xl text-xl my-8">Temukan kuliner lokal terbaik, dari jajanan tradisional hingga makanan kekinian – semua dalam satu peta interaktif.</p>
          <div className="flex items-center justify-center gap-12 mt-4">
            <Link
              href="/map"
              className="group flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full hover:bg-[var(--yellow-umkm)] transition-colors"
            >
              <p className="group-hover:text-black font-medium transition-colors">Jelajahi MAP</p>
              <div className="bg-transparent p-1 rounded-full outline-1 outline-white group-hover:bg-black group-hover:outline-none transition-colors">
                <div className="bg-white p-1 rounded-full group-hover:bg-black transition-colors">
                  <FaArrowRight className="w-3 h-auto text-black group-hover:text-[var(--yellow-umkm)] transition-colors" />
                </div>
              </div>
            </Link>
            <Link
              href="/umkm"
              className="group flex items-center gap-3 bg-[var(--yellow-umkm)] text-white px-6 py-3 rounded-full hover:bg-black transition-colors"
            >
              <p className="font-medium transition-colors">Jelajahi UMKM</p>
              <div className="bg-transparent p-1 rounded-full outline-1 outline-white group-hover:bg-white group-hover:outline-none transition-colors">
                <div className="bg-white p-1 rounded-full transition-colors">
                  <FaArrowRight className="w-3 h-auto text-[var(--yellow-umkm)] group-hover:text-black transition-colors" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 py-16 gap-8 flex justify-center items-center">
        <div className="flex justify-center items-center outline-1 outline-gray-500 rounded-full px-4 py-6 w-4/12">
          <div className="outline-1 outline-[var(--yellow-umkm)] px-5 py-2.5 rounded-full">
            <p className="text-5xl font-semibold text-[var(--yellow-umkm)]">200+</p>
          </div>
          <p className="text-black ml-5">Ratusan pelaku UMKM makanan telah terpetakan</p>
        </div>
        <div className="flex justify-center items-center outline-1 outline-gray-500 rounded-full px-4 py-6 w-4/12">
          <div className="outline-1 outline-[var(--yellow-umkm)] px-5 py-2.5 rounded-full">
            <p className="text-5xl font-semibold text-[var(--yellow-umkm)]">15+</p>
          </div>
          <p className="text-black ml-5">Dari jajanan tradisional, minuman segar, hingga kuliner kekinian – semua ada di sini.</p>
        </div>
        <div className="flex justify-center items-center outline-1 outline-gray-500 rounded-full px-4 py-6 w-4/12">
          <div className="px-5 py-2.5 outline-1 outline-[var(--yellow-umkm)] rounded-full">
            <p className="text-5xl font-semibold text-[var(--yellow-umkm)]">2</p>
          </div>
          <p className="text-black ml-5">Jelajahi kuliner khas dua kabupaten Madura dengan cita rasa yang unik dan otentik.</p>
        </div>
      </section>

      {/* POPULAR FOOD */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-6">
          Kuliner <span className="text-[var(--yellow-umkm)]">Terpopuler</span>
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 px-3 justify-center">
          {food.map((data, index) => (
            <div key={index}>
              {FoodCardUMKM({ props: data })}
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="max-w-7xl mx-auto px-6 py-8 flex">
        <div className="relative w-1/2 flex items-center">
          <Image
            src={foodTrenImage}
            alt="trending"
            width={700}
            height={700}
            className="w-full h-auto relative z-10 drop-shadow-2xl object-cover"
          />
          {/* soft oval shadow under image (sits behind image) */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/30 rounded-full blur-3xl pointer-events-none z-0" />
        </div>
        <div className="w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-3">
            Trending <span className="text-[var(--yellow-umkm)]">Hari Ini 🔥</span>
          </h2>
          <h3 className="text-3xl font-bold my-3">Rumah Makan Barokah</h3>
          {(() => {
            const longText = `Nasi Rames atau yang di Pamekasan lebih dikenal dengan sebutan "Nasi Ramoy" (dalam logat Madura, "rames" sering diucapkan "ramoy") adalah sajian nasi campur yang mencerminkan akulturasi budaya di Madura. Kuliner ini berkembang seiring dengan mobilitas penduduk dan perdagangan antara Madura dengan Jawa.  Sejarahnya tidak lepas dari pengaruh kuliner Jawa Timur, khususnya dari Surabaya dan Malang, dimana nasi rames sangat populer. Para perantau dan pedagang yang pulang ke Pamekasan membawa serta citarasa tersebut dan menyesuaikannya dengan selera lokal. "Ramoy" berarti dicampur atau diaduk. Keunikan Nasi Ramoy Pamekasan terletak pada lauk-pauknya yang khas Madura, seperti sambel lethok (sambal terasi mentah yang sangat kuat), ikan asin, dan sayur lodeh, dengan bumbu yang cenderung lebih gurih dan pedas sesuai selera orang Madura. Ia menjadi makanan rakyat yang mengenyangkan dan penuh cita rasa.`;

            const words = longText.trim().split(/\s+/).filter(Boolean);
            const display = words.length > 50 ? words.slice(0, 50).join(' ') + ' ...selanjutnya' : longText;

            return <p className="text-black my-4 text-justify">{display}</p>;
          })()}
          <div className="flex gap-3 w-full mt-2">
            <Link
              href="/map"
              className="group w-1/2 flex items-center justify-between gap-3 bg-black text-white px-6 py-3 rounded-full hover:bg-white hover:outline-black hover:outline-2 transition-colors"
            >
              <p className="group-hover:text-black font-medium transition-colors">Lihat di Peta</p>
              <div className="bg-transparent p-1 rounded-full outline-1 outline-white group-hover:bg-black group-hover:outline-none transition-colors">
                <div className="bg-white p-1 rounded-full group-hover:bg-black transition-colors">
                  <FaArrowRight className="w-3 h-auto text-black group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
            <Link
              href="/umkm"
              className="group w-1/2 flex items-center justify-between gap-3 bg-white text-white px-6 py-3 rounded-full outline-2 outline-black hover:bg-black transition-colors"
            >
              <p className="text-black group-hover:text-white font-medium transition-colors">Lihat Detail</p>
              <div className="bg-transparent p-1 rounded-full outline-1 outline-black group-hover:bg-white group-hover:outline-none transition-colors">
                <div className="bg-black p-1 rounded-full group-hover:bg-white transition-colors">
                  <FaArrowRight className="w-3 h-auto text-white group-hover:text-black transition-colors" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* BERITA UMKM */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold mb-6">
          Berita <span className="text-[var(--yellow-umkm)]">UMKM</span> Terkini
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[newsImage, newsImage, newsImage].map((img, i) => (
            <div
              key={i}
              className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
              <Image
                src={img}
                alt="berita"
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-[var(--yellow-umkm)] text-xs mb-1">
                  15 September 2025 – Sampang
                </p>
                <h3 className="font-semibold mb-2">
                  Bazar UMKM Kuliner Sampang 2025 Resmi Dibuka
                </h3>
                <button className="text-[var(--yellow-umkm)] hover:underline text-sm">
                  Baca Selengkapnya →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
