import Image from "next/image";
import {heroHome, foodOneImage, foodTwoImage, foodThreeImage, foodTrenImage, newsImage} from "@/assets";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function landingPage() {
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

      {/* KULINER TERPOPULER */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">
          Kuliner <span className="text-orange-500">Terpopuler</span>
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

          {/* dummy data => ini nanti fetch dari API */}
          {[foodOneImage, foodTwoImage, foodThreeImage, foodOneImage].map((img, i) => (
            <div
              key={i}
              className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
                <Image
                  src={img}
                  alt="kuliner"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                  about="kuliner"
                />
                <div className="p-4">
                  <p className="font-semibold mb-2">Nama Kuliner</p>
                  <button className="bg-black text-white px-3 py-1 text-sm rounded-full hover:bg-gray-800">
                    Lihat UMKM
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* TRENDING */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src={foodTrenImage}
            alt="trending"
            width={500}
            height={400}
            className="rounded-2xl"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Trending <span className="text-orange-500">Hari Ini 🔥</span>
          </h2>
          <h3 className="text-xl font-semibold mb-3">Rumah Makan Barokah</h3>
          <p className="text-gray-600 mb-4">
            Nasi Ramos atau yang di Pamekasan lebih dikenal dengan sebutan
            “Nasi Ramoy”, adalah sajian nasi campur khas Madura.
          </p>
          <div className="flex gap-3">
            <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800">
              Lihat di Peta
            </button>
            <button className="border border-black px-4 py-2 rounded-full hover:bg-gray-100">
              Lihat Detail
            </button>
          </div>
        </div>
      </section>

      {/* BERITA UMKM */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">
          Berita <span className="text-orange-500">UMKM Terkini</span>
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
                <p className="text-orange-500 text-xs mb-1">
                  15 September 2025 – Sampang
                </p>
                <h3 className="font-semibold mb-2">
                  Bazar UMKM Kuliner Sampang 2025 Resmi Dibuka
                </h3>
                <button className="text-orange-500 hover:underline text-sm">
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
