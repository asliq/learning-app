import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-9xl mb-8">😕</div>
        
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Sayfa Bulunamadı
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
          Ana sayfaya dönebilir veya dersler sayfasına göz atabilirsiniz.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            🏠 Ana Sayfa
          </Link>
          
          <Link 
            href="/lessons"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            📚 Dersler
          </Link>
        </div>
      </div>
    </div>
  );
}

