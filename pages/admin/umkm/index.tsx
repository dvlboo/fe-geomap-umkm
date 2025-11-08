import Link from "next/link";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

const initialUmkmDatas = [
  {
    id: 1, name: "Tajin Sobih Bu Aminah", owner: "Hj. Aminah",
    regency: "Pamekasan", latitude: -7.071, longitude: 113.49,
  },
  {
    id: 2, name: "Tahu Tempe 99", owner: "Budi Santoso",
    regency: "Sidoarjo", latitude: -7.34, longitude: 112.73,
  },
  {
    id: 3, name: "Sate Lalat Pak Memet", owner: "Muhammad Memet",
    regency: "Pamekasan", latitude: -7.15, longitude: 113.47,
  },
  {
    id: 4, name: "Kaldu Kokot Sumenep", owner: "Siti Nurhaliza",
    regency: "Sumenep", latitude: -7.01, longitude: 113.87,
  },
  {
    id: 5, name: "Rujak Cingur Bu Dewi", owner: "Dewi Sartika",
    regency: "Surabaya", latitude: -7.25, longitude: 112.75,
  },
];

export default function DataUmkmPage() {
  const [umkmList, setUmkmList] = useState(initialUmkmDatas);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      setUmkmList((prev) => prev.filter((u) => u.id !== deleteId));
    }
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div className="max-w-full mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-semibold mb-4 text-black">Data UMKM</h1>
        <Link href="/admin/umkm/add" className="flex items-center gap-3 bg-black text-white px-10 py-1 rounded-lg">
          Tambah
          <FaPlus />
        </Link>
      </div>

      <div className="bg-white rounded-lg overflow-hidden border">
        <table className="w-full text-sm text-gray-900">
          <thead>
            <tr className="bg-gray-300 text-black">
              {["No.", "Nama UMKM", "Pemilik", "Kabupaten", "Latitude", "Longitude", "Aksi"].map(h => (
                <th key={h} className="text-center px-5 py-3 font-bold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {umkmList.map((umkm, index) => (
              <tr key={umkm.id} className="border-t hover:bg-gray-50 text-black">
                <td className="px-5 py-4 text-center">{index + 1}</td>
                <td className="px-5 py-4">{umkm.name}</td>
                <td className="px-5 py-4 text-center">{umkm.owner}</td>
                <td className="px-5 py-4 text-center">{umkm.regency}</td>
                <td className="px-5 py-4 text-center">{umkm.latitude}</td>
                <td className="px-5 py-4 text-center">{umkm.longitude}</td>
                <td className="px-5 py-4 text-center">
                  <div className="inline-flex items-center gap-2 justify-center">
                    <Link
                      href={`/admin/umkm/${umkm.id}`}
                      className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                      aria-label={`Edit ${umkm.name}`}
                    >
                      <FaRegEdit />
                    </Link>

                    <button
                      onClick={() => handleDeleteClick(umkm.id)}
                      className="text-white bg-red-500 hover:bg-red-600 hover:cursor-pointer px-3 py-1 rounded"
                      aria-label={`Hapus ${umkm.id}`}
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-80 z-40"
            onClick={handleCancelDelete}
          />

          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">
              Apakah anda yakin ingin menghapus data ini?
            </h3>
            <div className="flex items-center justify-center gap-3 w-full">
              <button
                onClick={handleCancelDelete}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 font-medium transition-colors w-1/2 hover:cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors w-1/2 hover:cursor-pointer"
              >
                Hapus
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
