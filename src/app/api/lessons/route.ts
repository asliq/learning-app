import { NextResponse } from "next/server";

// Ders verileri (gerçek uygulamada veritabanından gelir)
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

// GET /api/lessons - Tüm dersleri getir
export async function GET(request: Request) {
  try {
    // URL parametrelerini kontrol et
    const { searchParams } = new URL(request.url);
    const level = searchParams.get("level");
    
    // Filtreleme
    let filteredLessons = lessons;
    if (level) {
      filteredLessons = lessons.filter(lesson => lesson.level === level);
    }

    return NextResponse.json({
      success: true,
      data: filteredLessons,
      count: filteredLessons.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Dersler alınamadı" },
      { status: 500 }
    );
  }
}

// POST /api/lessons - Yeni ders ekle (admin için)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validasyon
    if (!body.title || !body.description) {
      return NextResponse.json(
        { success: false, error: "Başlık ve açıklama gerekli" },
        { status: 400 }
      );
    }

    // Yeni ders oluştur (gerçek uygulamada veritabanına kaydedilir)
    const newLesson = {
      id: lessons.length + 1,
      title: body.title,
      description: body.description,
      duration: body.duration || "30 dakika",
      level: body.level || "Başlangıç",
      emoji: body.emoji || "📚"
    };

    lessons.push(newLesson);

    return NextResponse.json({
      success: true,
      data: newLesson,
      message: "Ders başarıyla eklendi"
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Ders eklenemedi" },
      { status: 500 }
    );
  }
}

