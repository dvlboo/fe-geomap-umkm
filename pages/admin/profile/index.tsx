import React, { useEffect, useState } from "react";
import { UserProfile } from "@/lib/auth/auth.type";
import Protected from "@/components/auth/Protected";
import { authService } from "@/lib/auth/auth.service";

interface ProfileField {
  label: string;
  value: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await authService.getProfile();
        if (result.success && result.data) {
          setProfile(result.data);
        } else {
          setError(result.error || "Gagal memuat profil");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat memuat profil");
        console.error("Profile fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const fields: ProfileField[] = profile
    ? [
        { label: "Username", value: profile.username || "-" },
        { label: "Email", value: profile.email || "-" },
        { label: "Akun dibuat", value: formatDate(profile.createdAt) },
        { label: "Terakhir diupdate", value: formatDate(profile.updatedAt) },
      ]
    : [];

  return (
    <Protected>
      <div className="px-6 md:px-10 py-8 max-w-4xl">
        <h1 className="text-2xl font-semibold mb-12 text-black">Profil</h1>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
              <p className="mt-4 text-gray-600">Memuat profil...</p>
            </div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        ) : (
          <>
            <div className="space-y-6 text-black">
              {fields.map((f, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[160px_16px_minmax(220px,1fr)] items-baseline gap-2"
                >
                  <div>{f.label}</div>
                  <div className="text-gray-500">:</div>
                  <div className="font-medium">{f.value}</div>
                </div>
              ))}
            </div>

            <button className="mt-10 inline-flex items-center rounded-full bg-[var(--yellow-umkm)] px-5 py-2.5 text-white font-medium hover:bg-yellow-600 hover:cursor-pointer transition">
              Ubah Password
            </button>
          </>
        )}
      </div>
    </Protected>
  );
};

export default ProfilePage;
