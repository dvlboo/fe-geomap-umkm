import { foodOneImage, heroAbout, leftsideAbout, rightsideAbout } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function AboutPage() {
  return (
    <>  
      {/* HERO SECTION */}
      <section
        className="w-full h-[540px] px-4 items-center flex"
        style={{
          backgroundImage: `url(${typeof heroAbout === 'string' ? heroAbout : heroAbout.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-auto text-left flex-col text-white">
          <p className="font-bold text-5xl my-2">Tentang</p>
          <p className="text-[var(--yellow-umkm)] font-semibold text-5xl my-2">GeoKuliner</p>
          <p className="max-w-xl text-xl my-8">Platform digital resmi dari Dinas Pariwisata Kabupaten Pamekasan & Sampang yang hadir untuk mendukung perkembangan UMKM lokal agar semakin maju, dikenal luas, dan berdaya saing di era digital.</p>
        </div>
      </section>

      {/* VISI & MISI */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Visi & <span className="text-[var(--yellow-umkm)]">Misi</span>
        </h2>

        <div className="bg-gray-50 rounded-2xl p-6 text-center mb-8">
          <h3 className="font-semibold mb-2">Visi</h3>
          <p className="text-gray-600">
            Mewujudkan UMKM lokal yang berdaya saing, inovatif, dan berkelanjutan
            melalui teknologi digital.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            "Memberikan ruang promosi bagi UMKM daerah.",
            "Menyediakan informasi yang akurat & mudah diakses.",
            "Mendorong digitalisasi dan modernisasi UMKM.",
            "Menjadi penghubung UMKM, pemerintah, dan masyarakat.",
          ].map((text, i) => (
            <div
              key={i}
              className="bg-orange-50 text-gray-700 rounded-2xl p-6 shadow-sm text-center hover:bg-orange-100 transition"
            >
              <h4 className="text-[var(--yellow-umkm)] font-semibold mb-2">Misi</h4>
              <p className="text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-4 gap-3"> 
          {[...Array(8)].map((_, i) => (
            <Image
              key={i}
              src={foodOneImage}
              alt="kuliner"
              width={500}
              height={400}
              className="rounded-2xl object-cover aspect-[4/3]"
            />
          ))}
        </div>
      </section>

      {/* MENGAPA GEOMAPS HADIR */}
      <section className="relative max-w-7xl mx-auto px-6 py-20">
          <Image
            src={leftsideAbout}
            alt="Left Side About"
            width={275}
            className="hidden md:block absolute left-0 bottom-0 -translate-x-1/2 pointer-events-none select-none"
          />
          <Image
            src={rightsideAbout}
            alt="Right Side About"
            width={240}
            className="hidden md:block absolute right-0 top-0 translate-x-1/2 pointer-events-none select-none"
          />
        <h2 className="text-center text-4xl md:hidden font-bold mb-14 leading-tight">
          <span className="block">Mengapa</span>
          <span className="block text-[var(--yellow-umkm)]">Geomaps UMKM</span>
          <span className="block">Hadir ?</span>
        </h2>
        <div className="relative grid md:grid-cols-3 grid-cols-1 items-center gap-10">
          {/* Left Side */}
          <div className="md:col-span space-y-25">
            <div className="md:pl-12">
              <div className="relative">
                <div className="absolute -left-10 top-0 bg-black text-white rounded-full w-16 h-16 flex items-center justify-center font-extrabold text-3xl">
                  1
                </div>
                <div className="bg-white rounded-2xl p-6 pt-8 text-2xl text-center leading-relaxed w-full md:w-[375px] shadow-xl shadow-black/10">
                  <p>Memperkenalkan</p>
                  <p>produk UMKM</p>
                  <p>unggulan daerah.</p>
                </div>
              </div>
            </div>

            <div className="md:pl-16">
              <div className="relative">
                <div className="absolute -left-10 top-0 bg-black text-white rounded-full w-16 h-16 flex items-center justify-center font-extrabold text-3xl">
                  2
                </div>
                <div className="bg-white rounded-2xl p-6 pt-8 text-2xl text-center leading-relaxed w-full md:w-[375px] shadow-xl shadow-black/10">
                  <p>Membuka akses pasar</p>
                  <p> lebih luas bagi UMKM.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center md:col-span-1">
            <h2 className="text-center text-2xl md:text-3xl font-bold leading-tight">
              <span className="block">"Mengapa</span>
              <span className="block text-[var(--yellow-umkm)]">Geomaps UMKM</span>
              <span className="block">Hadir ?"</span>
            </h2>
          </div>

          {/* Right Side */}
          <div className="md:col-span-1 space-y-25">
            <div className="md:pr-12">
              <div className="relative">
                <div className="absolute -left-10 top-0 bg-black text-white rounded-full w-16 h-16 flex items-center justify-center font-extrabold text-3xl">
                  4
                </div>
                <div className="bg-white rounded-2xl p-6 pt-8 text-2xl text-center leading-relaxed w-full md:w-[375px] shadow-xl shadow-black/10">
                  <p>Menjadikan UMKM</p>
                  <p>sebagai ikon wisata</p>
                  <p>dan budaya daerah.</p>
                </div>
              </div>
            </div>
            
            
            <div className="md:pr-16">
              <div className="relative">
                <div className="absolute -left-10 top-0 bg-black text-white rounded-full w-16 h-16 flex items-center justify-center font-extrabold text-3xl">
                  3
                </div>
                <div className="bg-white rounded-2xl p-6 pt-8 text-2xl text-center leading-relaxed w-full md:w-[375px] shadow-xl shadow-black/10">
                  <p>Mendukung</p>
                  <p>pertumbuhan ekonomi</p>
                  <p>lokal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AJAKAN */}
      <section className="text-center bg-white py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-[32px] md:text-[40px] font-bold mb-3">
          Bersama Membangun <span className="text-[var(--yellow-umkm)]">UMKM Lokal</span>
        </h2>
        <p className="text-gray-600 mb-8 text-4xl leading-relaxed">
          “Mari dukung produk UMKM Pamekasan &amp; Sumenep dengan bangga
          menggunakan produk lokal.”
        </p>
        {/* <button className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-medium text-[18px] shadow-[0_6px_18px_rgba(0,0,0,0.18)] hover:bg-gray-900 transition">
          Jelajahi UMKM
        <FaArrowRight className="w-3 h-auto text-black group-hover:text-[var(--yellow-umkm)] transition-colors" />        
        </button> */}
        <div className="flex items-center justify-center gap-12 mt-4">
          <Link
            href="/umkm"
            className="group w-1/7 flex items-center justify-center gap-3 bg-black text-white px-3 py-3 rounded-full hover:bg-white hover:outline-black hover:outline-2 transition-colors"
          >
            <p className="group-hover:text-black font-medium transition-colors">Jelajahi UMKM</p>
            <div className="bg-transparent p-1 rounded-full outline-1 outline-white group-hover:bg-black group-hover:outline-none transition-colors">
              <div className="bg-white p-1 rounded-full group-hover:bg-black transition-colors">
                <FaArrowRight className="w-3 h-auto text-black group-hover:text-white transition-colors" />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}