import Link from "next/link";

// Ders verileri - Gerçek uygulamada bu bir veritabanından gelir
const lessons = [
  {
    id: 1,
    title: "Next.js Giriş",
    description: "Next.js'in temel kavramları ve kurulumu",
    duration: "30 dakika",
    level: "Başlangıç",
    emoji: "🎯"
  },
  {
    id: 2,
    title: "React Components",
    description: "Component yapısı ve props kullanımı",
    duration: "45 dakika",
    level: "Başlangıç",
    emoji: "⚛️"
  },
  {
    id: 3,
    title: "Routing & Navigation",
    description: "App Router ve dinamik rotalar",
    duration: "40 dakika",
    level: "Orta",
    emoji: "🛤️"
  },
  {
    id: 4,
    title: "Data Fetching",
    description: "Server ve Client Components, API kullanımı",
    duration: "50 dakika",
    level: "Orta",
    emoji: "📡"
  },
  {
    id: 5,
    title: "Styling with Tailwind",
    description: "Tailwind CSS ile modern tasarım",
    duration: "35 dakika",
    level: "Başlangıç",
    emoji: "🎨"
  },
  {
    id: 6,
    title: "State Management",
    description: "useState, useEffect ve Context API",
    duration: "60 dakika",
    level: "İleri",
    emoji: "🔄"
  }
];

export default function LessonsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📚 Tüm Dersler
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Öğrenme yolculuğunuz için hazırlanmış dersler
          </p>
        </div>

        {/* Dersler Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {lessons.map((lesson) => (
            <Link 
              key={lesson.id}
              href={`/lessons/${lesson.id}`}
              className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <div className="text-5xl mb-4">{lesson.emoji}</div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {lesson.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {lesson.description}
              </p>
              
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  lesson.level === "Başlangıç" 
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                    : lesson.level === "Orta"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                }`}>
                  {lesson.level}
                </span>
                
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ⏱️ {lesson.duration}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Ana Sayfaya Dön Butonu */}
        <div className="text-center">
          <Link 
            href="/"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}

