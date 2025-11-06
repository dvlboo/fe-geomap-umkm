import Link from "next/link";
import { FaPlus } from "react-icons/fa6";


// Sementara isi e sama kyk add form (lom manggil ID)
export const EditUmkmForm = () => {
  return (
    <div className="px-6 md:px-10 py-8 max-w-4xl text-black">

      <div className="flex items-center gap-4 mb-10">
        <h1 className="text-xl font-semibold">Data UMKM</h1>
        <span className="text-[var(--yellow-umkm)] text-xl font-bold">Edit</span>
      </div>

      <div className="space-y-6 ">

        {/* Nama */}
        <div>
          <label className="block mb-1 font-medium">Nama Pemilik</label>
          <input className="w-full border rounded-lg px-4 py-2" placeholder="Ibu Hj. Aisya" />
        </div>

        {/* Kontak */}
        <div>
          <label className="block mb-1 font-medium">Kontak</label>
          <input className="w-full border rounded-lg px-4 py-2" placeholder="085331324639" />
        </div>

        {/* Alamat */}
        <div>
          <label className="block mb-1 font-medium">Alamat</label>
          <input className="w-full border rounded-lg px-4 py-2" placeholder="JL. Pintu Gerbang No.126, Pertanian, Bugis, Kec. Pamekasan, Kabupaten Pamekasan, Jawa Timur 69317" />
        </div>

        {/* Lokasi */}
        <div>
          <label className="block mb-1 font-medium">Lokasi</label>
          <input className="w-full border rounded-lg px-4 py-2" placeholder="-7.149839.113.476631" />
        </div>

        {/* Sejarah */}
        <div>
          <label className="block mb-1 font-medium">Sejarah/Cerita Kuliner</label>
          <textarea className="w-full border rounded-lg px-4 py-2" placeholder=
          "Nasi Rames atau yang di Pamekasan lebih dikenal dengan sebutan 'Nasi Ramoy' (dalam logat Madura 'rames' sering diucapkan 'ramoy') adalah sajian nasi campur yang mencerminkan akulturasi budaya di Madura. Kuliner ini berkembang seiring dengan mobilitas penduduk dan perdangangan antara Madura dengan Jawa. Sejarahnya tidak lepas dari pengaruh kuliner Jawa Timur, khususnya dari Surabaya dan Malang, dimana nasi rames sangat populer. Para perantau dan pedagang yang pulang ke Pamekasan membawa serta citarasa tersebut dan menyesuaikannya dengan selera lokal. 'ramoy' berarti dicampur atau diaduk. Keunikan Nasi Ramoy Pamekasan terletak pada lauk-pauknya yang khas Madura, seperti sambel lethok (sambal terasi mentah yang sangat kuat), ikan asin, dan sayur lodeh, dengan bumbu yang cenderung lebih gurih dan pedas sesuai selera orang Madura. Ia menjadi makanan rakyat yang mengenyangkan dan penuh cita rasa."
          ></textarea>
        </div>

        {/* Jenis produk */}
        <div>
          <label className="block mb-1 font-medium">Jenis Produk Kuliner</label>
          <input className="w-full border rounded-lg px-4 py-2" placeholder="Makanan Berat" />
        </div>

        {/* Foto produk */}
        <label className="block mb-1 font-medium"> Foto Produk UMKM</label>
        <label className="relative flex items-center w-full border rounded-lg px-4 py-3 cursor-pointer bg-white">
          <div className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full text-sm mr-4">
              Choose File
          </div>
          <span className="text-gray-400">Pilih foto produk UMKM</span>
              <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
              />
        </label>

        {/* Kabupaten */}
        <div>
          <label className="block mb-1 font-medium">Kabupaten</label>
          <input className="w-full border rounded-lg px-4 py-2" placeholder="Pamekasan" />
        </div>

        {/* Foto tempat */}
        <label className="block mb-1 font-medium"> Foto Tempat</label>
        <label className="relative flex items-center w-full border rounded-lg px-4 py-3 cursor-pointer bg-white">
          <div className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full text-sm mr-4">
              Choose File
          </div>
          <span className="text-gray-400">Pilih foto produk UMKM</span>
              <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
              />
        </label>

        {/* Nama umkm */}
        <div>
          <label className="block mb-1 font-medium">Nama UMKM</label>
          <input className="w-full border rounded-lg px-4 py-2" placeholder="Rumah Makan Barokah" />
        </div>

        {/* Tahun mulai */}
        <div>
          <label className="block mb-1 font-medium">Tahun Mulai Beroperasi</label>
          <input className="w-full border rounded-lg px-4 py-2" placeholder="1935" />
        </div>

        {/* Tempat */}
        <div>
          <label className="block mb-1 font-medium">Klasifikasi/Tempat</label>
          <input className="w-full border rounded-lg px-4 py-2" placeholder="Rumah makan" />
        </div>

        {/* Metode pemesanan */}
        <div>
          <label className="block mb-1 font-medium">Metode Pemesanan</label>
          <input className="w-full border rounded-lg px-4 py-2" placeholder="Tidak ada)"/>
        </div>

        {/* Metode pembayaran */}
        <div>
          <label className="block mb-1 font-medium">Metode Pembayaran</label>
          <input className="w-full border rounded-lg px-4 py-2" placeholder="Tunai" />
        </div>

        {/* Sosmed */}
        <div>
          <label className="block mb-1 font-medium">Nama Media Sosial (IG/Tiktok/FB)</label>
          <input className="w-full border rounded-lg px-4 py-2" placeholder="." />
        </div>

      </div>

      <div className="block mb-1 w-full mt-10">
        <Link href="/admin/umkm/add" className="flex items-center gap-3 bg-black text-white px-10 py-1 rounded-lg justify-center">
          Tambah
          <FaPlus />
        </Link>
      </div>
    </div>
  );
};
