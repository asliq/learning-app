"use client";

import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-2xl text-gray-600 dark:text-gray-400">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline mb-4"
          >
            ← Ana Sayfaya Dön
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            👤 Profilim
          </h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="text-8xl">{user.avatar}</div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {user.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {user.completedLessons.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Tamamlanan Ders</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {user.progress}%
              </div>
              <div className="text-gray-600 dark:text-gray-400">İlerleme</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {6 - user.completedLessons.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Kalan Ders</div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📊 İlerleme Durumu
          </h3>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Genel İlerleme
              </span>
              <span className="text-gray-900 dark:text-white font-bold">
                {user.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${user.progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((lessonId) => {
              const isCompleted = user.completedLessons.includes(lessonId);
              return (
                <div 
                  key={lessonId}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    isCompleted 
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      : "bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {isCompleted ? "✅" : "⏳"}
                    </span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Ders {lessonId}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {isCompleted ? "Tamamlandı" : "Devam ediyor"}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/lessons/${lessonId}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {isCompleted ? "Tekrar İzle" : "Devam Et"} →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🏆 Başarılar
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {user.completedLessons.length >= 1 && (
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="text-3xl mb-2">🌟</div>
                <div className="font-bold text-gray-900 dark:text-white">İlk Adım</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  İlk dersi tamamladınız
                </div>
              </div>
            )}
            
            {user.completedLessons.length >= 3 && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="text-3xl mb-2">🔥</div>
                <div className="font-bold text-gray-900 dark:text-white">Azimli</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  3 ders tamamladınız
                </div>
              </div>
            )}
            
            {user.completedLessons.length === 6 && (
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 md:col-span-2">
                <div className="text-5xl mb-2">🎉</div>
                <div className="font-bold text-xl text-gray-900 dark:text-white">
                  Kurs Tamamlandı!
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Tüm dersleri başarıyla tamamladınız
                </div>
              </div>
            )}
          </div>

          {user.completedLessons.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Henüz başarı kazanmadınız. Dersleri tamamlayarak başarılar kazanın!
            </div>
          )}
        </div>

        {/* Settings Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            ⚙️ Ayarlar
          </h3>
          
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white">
              📧 Email Bildirimlerini Yönet
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white">
              🔒 Şifre Değiştir
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white">
              📥 Verileri İndir
            </button>
            <button 
              onClick={logout}
              className="w-full text-left px-4 py-3 rounded-lg border-2 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400 font-medium"
            >
              🚪 Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

