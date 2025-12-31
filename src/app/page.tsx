import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Next.js Öğrenme Platformu
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Modern web geliştirme yolculuğunuza hoş geldiniz
          </p>
          <Link 
            href="/lessons"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Derslere Başla
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Hızlı Başlangıç
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Next.js ile anında geliştirmeye başlayın
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Kapsamlı Dersler
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Temel seviyeden ileri seviyeye tüm konular
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Pratik Örnekler
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Gerçek dünya projeleri ile öğrenin
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Hızlı Erişim
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/lessons"
              className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow hover:shadow-lg transition-shadow text-gray-900 dark:text-white"
            >
              📖 Tüm Dersler
            </Link>
            <Link 
              href="/about"
              className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow hover:shadow-lg transition-shadow text-gray-900 dark:text-white"
            >
              ℹ️ Hakkımda
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
