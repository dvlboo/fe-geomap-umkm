import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import type { UMKM } from "@/lib/umkm/umkm.type";
import { MdDeleteOutline } from "react-icons/md";
import Protected from "@/components/auth/Protected";
import { umkmService } from "@/lib/umkm/umkm.service";

export default function DataUmkmPage() {
  const [umkmList, setUmkmList] = useState<UMKM[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch UMKM data on component mount
  useEffect(() => {
    const fetchUmkmData = async () => {
      try {
        const result = await umkmService.getAll();
        if (result.success && result.data) {
          setUmkmList(result.data);
        } else {
          setError(result.error || "Gagal memuat data UMKM");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat memuat data UMKM");
        console.error("UMKM fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUmkmData();
  }, []);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId !== null) {
      setIsDeleting(true);
      try {
        const result = await umkmService.delete(deleteId);
        if (result.success) {
          // Remove from list on successful delete
          setUmkmList((prev) => prev.filter((u) => u.id !== deleteId));
          setShowDeleteModal(false);
          setDeleteId(null);
        } else {
          alert(result.error || "Gagal menghapus data UMKM");
        }
      } catch (err) {
        alert("Terjadi kesalahan saat menghapus data");
        console.error("Delete error:", err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <Protected>
    <div className="max-w-full mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-semibold mb-4 text-black">Data UMKM</h1>
        <Link href="/admin/umkm/add" className="flex items-center gap-3 bg-black text-white px-10 py-1 rounded-lg hover:bg-gray-800 transition-colors">
          Tambah
          <FaPlus />
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p className="mt-4 text-gray-600">Memuat data UMKM...</p>
          </div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      ) : umkmList.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Belum ada data UMKM</p>
        </div>
      ) : (
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
                <td className="px-5 py-4 text-center">{umkm.location.latitude}</td>
                <td className="px-5 py-4 text-center">{umkm.location.longitude}</td>
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
      )}

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
                disabled={isDeleting}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 font-medium transition-colors w-1/2 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors w-1/2 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
    </Protected>
  );
}
