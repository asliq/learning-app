import { NextResponse } from "next/server";

// Detaylı ders verileri
const lessonsData: Record<string, any> = {
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
  // Diğer dersler...
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// GET /api/lessons/[id] - Tek bir dersi getir
export async function GET(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;
    const lesson = lessonsData[id];

    if (!lesson) {
      return NextResponse.json(
        { success: false, error: "Ders bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: lesson
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Ders alınamadı" },
      { status: 500 }
    );
  }
}

// PUT /api/lessons/[id] - Dersi güncelle
export async function PUT(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (!lessonsData[id]) {
      return NextResponse.json(
        { success: false, error: "Ders bulunamadı" },
        { status: 404 }
      );
    }

    // Dersi güncelle (gerçek uygulamada veritabanı güncellenir)
    lessonsData[id] = {
      ...lessonsData[id],
      ...body
    };

    return NextResponse.json({
      success: true,
      data: lessonsData[id],
      message: "Ders başarıyla güncellendi"
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Ders güncellenemedi" },
      { status: 500 }
    );
  }
}

// DELETE /api/lessons/[id] - Dersi sil
export async function DELETE(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;
    
    if (!lessonsData[id]) {
      return NextResponse.json(
        { success: false, error: "Ders bulunamadı" },
        { status: 404 }
      );
    }

    // Dersi sil (gerçek uygulamada veritabanından silinir)
    delete lessonsData[id];

    return NextResponse.json({
      success: true,
      message: "Ders başarıyla silindi"
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Ders silinemedi" },
      { status: 500 }
    );
  }
}

