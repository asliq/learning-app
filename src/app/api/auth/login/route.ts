import { NextResponse } from "next/server";

// POST /api/auth/login - Kullanıcı girişi
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validasyon
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email ve şifre gerekli" },
        { status: 400 }
      );
    }

    // Demo kullanıcı kontrolü (gerçek uygulamada veritabanı sorgusu yapılır)
    if (email === "demo@example.com" && password === "demo123") {
      const user = {
        id: "1",
        name: "Demo Kullanıcı",
        email: email,
        avatar: "👤",
        completedLessons: [1, 2],
        progress: 33
      };

      // Gerçek uygulamada:
      // 1. Şifre hash'i kontrol edilir (bcrypt)
      // 2. JWT token oluşturulur
      // 3. Refresh token oluşturulur
      // 4. Cookie set edilir

      return NextResponse.json({
        success: true,
        data: user,
        token: "demo-jwt-token", // Mock token
        message: "Giriş başarılı"
      });
    }

    return NextResponse.json(
      { success: false, error: "Email veya şifre hatalı" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Giriş yapılamadı" },
      { status: 500 }
    );
  }
}

