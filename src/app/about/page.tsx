import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline mb-6"
        >
          ← Ana Sayfaya Dön
        </Link>

        {/* About Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            ℹ️ Hakkımızda
          </h1>
          
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                Next.js Öğrenme Platformu Nedir?
              </h2>
              <p className="leading-relaxed">
                Bu platform, Next.js öğrenmek isteyen herkes için tasarlanmış kapsamlı bir eğitim kaynağıdır. 
                Modern web geliştirme teknolojilerini adım adım öğrenmenizi sağlayan dersler ve pratik örnekler içerir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                🎯 Amaçlarımız
              </h2>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Next.js ve React'i sıfırdan öğretmek</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Modern web geliştirme best practices'leri göstermek</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Gerçek dünya projeleri ile pratik yapma fırsatı sunmak</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <span>Türkçe kaynakların eksikliğini gidermek</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                🛠️ Kullanılan Teknolojiler
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Next.js 16</h3>
                  <p className="text-sm">React tabanlı modern framework</p>
                </div>
                <div className="bg-cyan-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-cyan-900 dark:text-cyan-300 mb-2">TypeScript</h3>
                  <p className="text-sm">Tip güvenliği ve daha iyi geliştirici deneyimi</p>
                </div>
                <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">Tailwind CSS</h3>
                  <p className="text-sm">Utility-first CSS framework</p>
                </div>
                <div className="bg-pink-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-pink-900 dark:text-pink-300 mb-2">App Router</h3>
                  <p className="text-sm">Next.js'in yeni routing sistemi</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                📚 Öğrenme Yolu
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Temelleri Öğren</h4>
                    <p className="text-sm">Next.js ve React temellerini kavrayın</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Pratik Yapın</h4>
                    <p className="text-sm">Örnekler üzerinde çalışarak pekiştirin</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Proje Geliştirin</h4>
                    <p className="text-sm">Kendi projelerinizi oluşturun</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                💬 İletişim
              </h2>
              <p className="mb-4">
                Sorularınız mı var? Geri bildirimde bulunmak ister misiniz?
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="mailto:info@nextjs-learning.com"
                  className="bg-white dark:bg-gray-800 px-6 py-2 rounded-lg shadow hover:shadow-lg transition-shadow text-gray-900 dark:text-white"
                >
                  📧 Email
                </a>
                <a 
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 px-6 py-2 rounded-lg shadow hover:shadow-lg transition-shadow text-gray-900 dark:text-white"
                >
                  🐙 GitHub
                </a>
                <a 
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 px-6 py-2 rounded-lg shadow hover:shadow-lg transition-shadow text-gray-900 dark:text-white"
                >
                  🐦 Twitter
                </a>
              </div>
            </section>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Hazır mısınız?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Hemen öğrenmeye başlayın ve web geliştirme becerilerinizi geliştirin!
          </p>
          <Link 
            href="/lessons"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Derslere Başla →
          </Link>
        </div>
      </div>
    </div>
  );
}

