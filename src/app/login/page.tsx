"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Form validasyonu
    if (!email || !password) {
      setError("Lütfen tüm alanları doldurun");
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Geçerli bir email adresi girin");
      setLoading(false);
      return;
    }

    try {
      const success = await login(email, password);
      
      if (success) {
        router.push("/");
      } else {
        setError("Email veya şifre hatalı. Demo: demo@example.com / demo123");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              🔐 Giriş Yap
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Öğrenmeye devam etmek için giriş yapın
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Adresi
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="ornek@email.com"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Beni Hatırla
                </span>
              </label>
              <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Şifremi Unuttum
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-300 font-medium mb-2">
              🎯 Demo Hesabı:
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Email: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">demo@example.com</code>
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Şifre: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">demo123</code>
            </p>
          </div>

          {/* Register Link */}
          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            Hesabınız yok mu?{" "}
            <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Kayıt Ol
            </Link>
          </p>

          {/* Back Link */}
          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

