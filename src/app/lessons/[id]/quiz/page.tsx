"use client";

import { use } from "react";
import Link from "next/link";
import Quiz from "@/components/Quiz";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

// Quiz verileri
const quizData: Record<string, {
  lessonId: number;
  lessonTitle: string;
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
}> = {
  "1": {
    lessonId: 1,
    lessonTitle: "Next.js Giriş",
    questions: [
      {
        id: 1,
        question: "Next.js nedir?",
        options: [
          "Bir CSS framework'ü",
          "React tabanlı bir web framework'ü",
          "Bir veritabanı sistemi",
          "Bir programlama dili"
        ],
        correctAnswer: 1,
        explanation: "Next.js, React tabanlı modern bir web framework'üdür. Server-side rendering, static site generation ve daha birçok özellik sunar."
      },
      {
        id: 2,
        question: "Next.js'te sayfalar nasıl oluşturulur?",
        options: [
          "config.js dosyasında tanımlanır",
          "Dosya sistemi tabanlı routing kullanılır",
          "Manuel olarak route tanımlanır",
          "HTML dosyaları oluşturulur"
        ],
        correctAnswer: 1,
        explanation: "Next.js, dosya sistemi tabanlı routing kullanır. app/ klasöründeki her klasör otomatik olarak bir route oluşturur."
      },
      {
        id: 3,
        question: "create-next-app komutu ne işe yarar?",
        options: [
          "Mevcut projeyi günceller",
          "Yeni bir Next.js projesi oluşturur",
          "Projeyi production'a deploy eder",
          "Veritabanı bağlantısı kurar"
        ],
        correctAnswer: 1,
        explanation: "create-next-app, yeni bir Next.js projesi oluşturmak için kullanılan resmi CLI aracıdır."
      }
    ]
  },
  "2": {
    lessonId: 2,
    lessonTitle: "React Components",
    questions: [
      {
        id: 1,
        question: "React'te component nedir?",
        options: [
          "Bir CSS sınıfı",
          "Kullanıcı arayüzünün yeniden kullanılabilir parçası",
          "Bir veritabanı tablosu",
          "Bir HTTP isteği"
        ],
        correctAnswer: 1,
        explanation: "React componentleri, kullanıcı arayüzünü küçük, yeniden kullanılabilir parçalara böler."
      },
      {
        id: 2,
        question: "Props ne işe yarar?",
        options: [
          "State'i değiştirmek için kullanılır",
          "Componentler arası veri aktarımı sağlar",
          "CSS stilleri tanımlar",
          "API çağrıları yapar"
        ],
        correctAnswer: 1,
        explanation: "Props, parent component'ten child component'e veri aktarmak için kullanılır."
      },
      {
        id: 3,
        question: "Function component nasıl tanımlanır?",
        options: [
          "class Component extends React.Component",
          "function Component() { return ... }",
          "const Component = new React.Component()",
          "Component.create()"
        ],
        correctAnswer: 1,
        explanation: "Modern React'te function componentler tercih edilir: function Component() { return JSX }"
      }
    ]
  },
  "3": {
    lessonId: 3,
    lessonTitle: "Routing & Navigation",
    questions: [
      {
        id: 1,
        question: "[id] şeklindeki klasör adı ne anlama gelir?",
        options: [
          "Statik bir route",
          "Dinamik route parametresi",
          "Hidden klasör",
          "Özel bir component"
        ],
        correctAnswer: 1,
        explanation: "Köşeli parantez içindeki isimler dinamik route parametrelerini temsil eder."
      },
      {
        id: 2,
        question: "Link component'i neden kullanılır?",
        options: [
          "CSS eklemek için",
          "Client-side navigation için",
          "API çağrısı için",
          "Form submit için"
        ],
        correctAnswer: 1,
        explanation: "Link component, sayfa yenilenmeden client-side navigation sağlar."
      },
      {
        id: 3,
        question: "layout.tsx dosyası ne işe yarar?",
        options: [
          "Sadece CSS içerir",
          "Ortak düzeni (layout) tanımlar",
          "API endpoints oluşturur",
          "Veritabanı şemasını belirler"
        ],
        correctAnswer: 1,
        explanation: "layout.tsx, o dizin ve alt dizinler için ortak düzen sağlar."
      }
    ]
  }
};

type Props = {
  params: Promise<{ id: string }>;
};

export default function QuizPage({ params }: Props) {
  const { id } = use(params);
  const quiz = quizData[id];
  const { completeLesson } = useUser();
  const router = useRouter();

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Quiz bulunamadı
          </h1>
          <Link 
            href="/lessons"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Derslere Dön
          </Link>
        </div>
      </div>
    );
  }

  const handleQuizComplete = (score: number) => {
    if (score >= 70) {
      completeLesson(quiz.lessonId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={`/lessons/${id}`}
            className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline mb-4"
          >
            ← Derse Geri Dön
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            📝 {quiz.lessonTitle} - Quiz
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Öğrendiklerinizi test edin! Geçmek için en az %70 puan almalısınız.
          </p>
        </div>

        {/* Quiz Component */}
        <Quiz 
          lessonId={quiz.lessonId}
          questions={quiz.questions}
          onComplete={handleQuizComplete}
        />
      </div>
    </div>
  );
}

