import Link from "next/link";
import { notFound } from "next/navigation";

// Ders verileri (önceki sayfayla aynı - gerçek uygulamada paylaşılan bir yerden gelir)
const lessonsData: Record<string, {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  emoji: string;
  content: {
    introduction: string;
    topics: string[];
    examples: string[];
    conclusion: string;
  };
}> = {
  "1": {
    id: 1,
    title: "Next.js Giriş",
    description: "Next.js'in temel kavramları ve kurulumu",
    duration: "30 dakika",
    level: "Başlangıç",
    emoji: "🎯",
    content: {
      introduction: "Next.js, React tabanlı modern bir web framework'üdür. Server-side rendering, static site generation ve daha birçok özellik sunar.",
      topics: [
        "Next.js nedir ve neden kullanmalıyız?",
        "Create Next App ile proje oluşturma",
        "Proje yapısını anlama",
        "Geliştirme sunucusunu çalıştırma",
        "İlk sayfanızı oluşturma"
      ],
      examples: [
        "create-next-app komutu ile proje başlatma",
        "Basit bir 'Hello World' sayfası",
        "Hot reload özelliğini test etme"
      ],
      conclusion: "Next.js ile modern web uygulamaları geliştirmek artık çok daha kolay ve hızlı!"
    }
  },
  "2": {
    id: 2,
    title: "React Components",
    description: "Component yapısı ve props kullanımı",
    duration: "45 dakika",
    level: "Başlangıç",
    emoji: "⚛️",
    content: {
      introduction: "React componentleri, kullanıcı arayüzünü küçük, yeniden kullanılabilir parçalara böler. Bu sayede kod daha temiz ve yönetilebilir olur.",
      topics: [
        "Function Component nedir?",
        "Props ile veri aktarımı",
        "Component composition",
        "Children prop kullanımı",
        "Component best practices"
      ],
      examples: [
        "Basit bir Button componenti",
        "Card component ile props kullanımı",
        "Layout component örneği"
      ],
      conclusion: "Componentler React'in kalbidir. İyi tasarlanmış componentler, kodunuzu temiz ve sürdürülebilir yapar."
    }
  },
  "3": {
    id: 3,
    title: "Routing & Navigation",
    description: "App Router ve dinamik rotalar",
    duration: "40 dakika",
    level: "Orta",
    emoji: "🛤️",
    content: {
      introduction: "Next.js App Router, dosya sistemi tabanlı güçlü bir routing sistemi sunar. Klasörler otomatik olarak rotalara dönüşür.",
      topics: [
        "App Router yapısı",
        "Statik ve dinamik rotalar",
        "Link component ile navigation",
        "useRouter hook kullanımı",
        "Route groups ve layouts"
      ],
      examples: [
        "/about rotası oluşturma",
        "[id] ile dinamik rota",
        "Nested routes örneği"
      ],
      conclusion: "Next.js routing sistemi, karmaşık uygulamalar için bile basit ve mantıklı bir yapı sunar."
    }
  },
  "4": {
    id: 4,
    title: "Data Fetching",
    description: "Server ve Client Components, API kullanımı",
    duration: "50 dakika",
    level: "Orta",
    emoji: "📡",
    content: {
      introduction: "Next.js'te veri çekme işlemleri hem sunucu hem de istemci tarafında yapılabilir. Bu esneklik, performans ve SEO optimizasyonu sağlar.",
      topics: [
        "Server Components vs Client Components",
        "Fetch API kullanımı",
        "async/await ile veri çekme",
        "Loading states",
        "Error handling"
      ],
      examples: [
        "Server component'te veri çekme",
        "Client component'te useEffect kullanımı",
        "API route oluşturma"
      ],
      conclusion: "Doğru data fetching stratejisi, uygulamanızın hızlı ve kullanıcı dostu olmasını sağlar."
    }
  },
  "5": {
    id: 5,
    title: "Styling with Tailwind",
    description: "Tailwind CSS ile modern tasarım",
    duration: "35 dakika",
    level: "Başlangıç",
    emoji: "🎨",
    content: {
      introduction: "Tailwind CSS, utility-first bir CSS framework'üdür. Hızlı ve tutarlı tasarımlar oluşturmanızı sağlar.",
      topics: [
        "Tailwind CSS nedir?",
        "Utility class'ları kullanımı",
        "Responsive design",
        "Dark mode desteği",
        "Custom theme yapılandırması"
      ],
      examples: [
        "Gradient background oluşturma",
        "Responsive grid layout",
        "Hover ve transition efektleri"
      ],
      conclusion: "Tailwind ile styling yapmak hem hızlı hem de tutarlıdır."
    }
  },
  "6": {
    id: 6,
    title: "State Management",
    description: "useState, useEffect ve Context API",
    duration: "60 dakika",
    level: "İleri",
    emoji: "🔄",
    content: {
      introduction: "State management, React uygulamalarında verilerin yönetimi için kritik öneme sahiptir.",
      topics: [
        "useState hook kullanımı",
        "useEffect ile side effects",
        "Context API ile global state",
        "Custom hooks oluşturma",
        "State best practices"
      ],
      examples: [
        "Counter uygulaması ile useState",
        "Todo list uygulaması",
        "Theme provider ile Context API"
      ],
      conclusion: "İyi bir state management stratejisi, uygulamanızı ölçeklenebilir yapar."
    }
  }
};

// Props tipini tanımlayalım
type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LessonDetailPage({ params }: Props) {
  // params'ı await ediyoruz (Next.js 15+ requirement)
  const { id } = await params;
  
  // Dersi bul
  const lesson = lessonsData[id];
  
  // Ders bulunamazsa 404 sayfasına yönlendir
  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/lessons"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          ← Derslere Geri Dön
        </Link>

        {/* Lesson Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
          <div className="text-6xl mb-4">{lesson.emoji}</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {lesson.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {lesson.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              lesson.level === "Başlangıç" 
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                : lesson.level === "Orta"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            }`}>
              Seviye: {lesson.level}
            </span>
            
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
              ⏱️ {lesson.duration}
            </span>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              📖 Giriş
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {lesson.content.introduction}
            </p>
          </section>

          {/* Topics */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              📝 Konular
            </h2>
            <ul className="space-y-3">
              {lesson.content.topics.map((topic, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">{topic}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Examples */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              💻 Örnekler
            </h2>
            <div className="space-y-3">
              {lesson.content.examples.map((example, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">{example}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🎯 Sonuç
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {lesson.content.conclusion}
            </p>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              ✓ Dersi Tamamla
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              📝 Quiz'e Geç
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          {lesson.id > 1 && (
            <Link 
              href={`/lessons/${lesson.id - 1}`}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              ← Önceki Ders
            </Link>
          )}
          {lesson.id < 6 && (
            <Link 
              href={`/lessons/${lesson.id + 1}`}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow ml-auto"
            >
              Sonraki Ders →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// Generate static params for all lessons (optional - for better performance)
export async function generateStaticParams() {
  return Object.keys(lessonsData).map((id) => ({
    id: id,
  }));
}

