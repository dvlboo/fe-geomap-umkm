import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { IoLocation } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { umkmService } from "@/lib/umkm/umkm.service";
import { UMKM } from "@/lib/umkm/umkm.type";

export default function UmkmDetailPage() {
  const router = useRouter();
  const { slug } = router.query; // Slug from URL
  const [umkm, setUmkm] = useState<UMKM | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || typeof slug !== 'string') return;

    const fetchUMKMDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch UMKM by slug
        const result = await umkmService.getBySlug(slug);
        
        if (result.success && result.data) {
          setUmkm(result.data);
        } else {
          setError(result.error || "UMKM tidak ditemukan");
        }
      } catch (err) {
        console.error("Error fetching UMKM detail:", err);
        setError("Gagal memuat data UMKM");
      } finally {
        setLoading(false);
      }
    };

    fetchUMKMDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !umkm) {
    return (
      <div className="text-center py-20 text-gray-500">
        {error || "UMKM tidak ditemukan."}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-10">
      <div>
        <Image
          src={umkm.product_pict ?? "/placeholder.png"}
          alt={umkm.name}
          width={600}
          height={400}
          className="rounded-2xl shadow-lg object-cover w-full"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">{umkm.name}</h1>
        <div className="flex text-[var(--yellow-umkm)] items-center gap-2 text-sm mb-6">
          <IoLocation />
          <p>
            {umkm.regency} / {umkm.classification || umkm.type || "UMKM"}
          </p>
        </div>

        {umkm.story && (
          <>
            <h2 className="font-semibold mb-2">Sejarah</h2>
            <p className="text-gray-700 mb-4">{umkm.story}</p>
          </>
        )}

        <h2 className="font-semibold mb-2">Pemilik</h2>
        <p className="text-gray-700 mb-4">{umkm.owner}</p>

        <h2 className="font-semibold mb-2">Alamat</h2>
        <p className="text-gray-700 mb-4">{umkm.address}</p>

        <h2 className="font-semibold mb-2">Kontak</h2>
        <p className="text-gray-700 mb-4 flex items-center gap-2">
          <BsTelephone /> {umkm.phone}
        </p>

        {umkm.year && (
          <>
            <h2 className="font-semibold mb-2">Tahun Berdiri</h2>
            <p className="text-gray-700 mb-4">{umkm.year}</p>
          </>
        )}

        {umkm.payment && (
          <>
            <h2 className="font-semibold mb-2">Metode Pembayaran</h2>
            <p className="text-gray-700 mb-4">{umkm.payment}</p>
          </>
        )}

        {umkm.order && (
          <>
            <h2 className="font-semibold mb-2">Cara Pemesanan</h2>
            <p className="text-gray-700 mb-6">{umkm.order}</p>
          </>
        )}

        {umkm.medsos && umkm.medsos.length > 0 && (
          <>
            <h2 className="font-semibold mb-2">Media Sosial</h2>
            <div className="flex flex-col gap-2 mb-6">
              {umkm.medsos.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-2"
                >
                  <span className="font-medium">{social.platform}:</span>
                  <span>@{social.username}</span>
                </a>
              ))}
            </div>
          </>
        )}

        <a
          href={`tel:${umkm.phone}`}
          className="group w-full flex items-center justify-between gap-3 bg-black text-white px-6 py-3 rounded-full hover:bg-white hover:outline-black hover:outline-2 transition-colors"
        >
          <p className="group-hover:text-black font-medium transition-colors">Hubungi</p>
          <div className="bg-transparent p-1 rounded-full outline-1 outline-white group-hover:bg-black group-hover:outline-none transition-colors">
            <div className="bg-white p-1 rounded-full group-hover:bg-black transition-colors">
              <FaArrowRight className="w-3 h-auto text-black group-hover:text-white transition-colors" />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}