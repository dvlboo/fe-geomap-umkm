import { useRouter } from "next/router";
import { useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { id, token } = router.query;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password tidak cocok!");
      return;
    }

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, token, password }),
      });

      if (res.ok) {
        setMessage("Password berhasil direset! Silakan login kembali.");
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage("Token tidak valid atau sudah kedaluwarsa.");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan. Coba lagi nanti.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl p-8 shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2">
          Reset <span className="text-[var(--yellow-umkm)]">Password</span>
        </h1>
        <p className="text-gray-500 mb-6">
          Silakan masukkan password baru untuk akun Anda
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Password baru"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-2 outline-none focus:border-[var(--yellow-umkm)]"
          />

          <input
            type="password"
            placeholder="Konfirmasi password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-2 outline-none focus:border-[var(--yellow-umkm)]"
          />

          <button
            type="submit"
            className="bg-black text-white w-full py-2 rounded-full hover:bg-[var(--yellow-umkm)] hover:text-black transition-colors"
          >
            Simpan Password
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}

        <p className="mt-4 text-sm">
          Sudah ingat password?{" "}
          <a href="/admin/login" className="font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
