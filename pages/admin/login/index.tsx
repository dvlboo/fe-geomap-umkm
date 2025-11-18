import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { adminLoginImage } from "@/assets";
import { useState, FormEvent } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { authService } from "@/lib/auth/auth.service";
import NonProtected from "@/components/auth/NonProtected";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await authService.login(formData);

      if (result.success) {
        router.push("/admin/dashboard");
      } else {
        setError(result.error || "Login gagal. Silakan coba lagi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <NonProtected>
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8 px-6 pb-16">

      {/* Left: Form column (larger) */}
      <div className="w-full md:w-3/5 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Hallo <span className="text-[var(--yellow-umkm)]">Admin</span></h2>
          <p className="text-center mb-6">Silakan masuk menggunakan username dan password Anda.</p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="mb-6">
            <input 
              type="text" 
              name="username" 
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="border border-gray-500 rounded-full p-3 w-full pl-10 outline-none disabled:opacity-50 disabled:cursor-not-allowed" 
            />
          </div>

          <div className="mb-2 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="border border-gray-500 rounded-full p-3 w-full pr-12 pl-10 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              onClick={() => setShowPassword((pass) => !pass)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 p-1 hover:cursor-pointer disabled:opacity-50"
            >
              {showPassword ? <LuEye size={20} /> : <LuEyeClosed size={20} />}
            </button>
          </div>

          <div className="text-right mb-6">
            <Link href="/admin/forgot-password" className="text-sm text-black font-bold">Lupa Password?</Link>
          </div>

          <button
            type="submit" 
            disabled={isLoading}
            className="hover:bg-[var(--yellow-umkm)] bg-black hover:text-black text-white font-semibold py-3 px-6 rounded-full w-full hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>

      {/* Right: Image column (smaller) */}
      <div className="w-full md:w-2/5 flex items-center justify-center">
        <div className="w-full h-64 md:h-[520px] rounded-xl overflow-hidden shadow-md">
          <Image
            src={adminLoginImage}
            alt="Admin Login"
            width={800}
            height={520}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  </NonProtected>
  )
}