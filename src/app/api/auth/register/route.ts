import { NextResponse } from "next/server";

// POST /api/auth/register - Kullanıcı kaydı
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validasyon
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Tüm alanları doldurun" },
        { status: 400 }
      );
    }

    // Email validasyonu
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Geçerli bir email adresi girin" },
        { status: 400 }
      );
    }

    // Şifre uzunluğu kontrolü
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Şifre en az 6 karakter olmalı" },
        { status: 400 }
      );
    }

    // Gerçek uygulamada:
    // 1. Email'in kullanılıp kullanılmadığını kontrol et
    // 2. Şifreyi hash'le (bcrypt)
    // 3. Veritabanına kaydet
    // 4. Doğrulama emaili gönder
    // 5. JWT token oluştur

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      avatar: "👤",
      completedLessons: [],
      progress: 0
    };

    return NextResponse.json({
      success: true,
      data: newUser,
      message: "Kayıt başarılı. Giriş yapabilirsiniz."
    }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, error: "Kayıt oluşturulamadı" },
      { status: 500 }
    );
  }
}

