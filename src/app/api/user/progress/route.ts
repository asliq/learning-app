import { NextResponse } from "next/server";

// POST /api/user/progress - Kullanıcı ilerlemesini güncelle
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, lessonId, completed } = body;

    if (!userId || !lessonId) {
      return NextResponse.json(
        { success: false, error: "UserId ve lessonId gerekli" },
        { status: 400 }
      );
    }

    // Gerçek uygulamada veritabanında güncelleme yapılır
    console.log("İlerleme kaydedildi:", { userId, lessonId, completed });

    return NextResponse.json({
      success: true,
      message: "İlerleme kaydedildi"
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "İlerleme kaydedilemedi" },
      { status: 500 }
    );
  }
}

// GET /api/user/progress?userId=1 - Kullanıcı ilerlemesini getir
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "UserId gerekli" },
        { status: 400 }
      );
    }

    // Mock data (gerçek uygulamada veritabanından gelir)
    const progress = {
      userId,
      completedLessons: [1, 2, 3],
      totalLessons: 6,
      progress: 50,
      quizScores: {
        "1": 90,
        "2": 85,
        "3": 95
      }
    };

    return NextResponse.json({
      success: true,
      data: progress
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "İlerleme alınamadı" },
      { status: 500 }
    );
  }
}

