import { NextResponse } from "next/server";

// POST /api/contact - İletişim formu
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validasyon
    const { name, email, subject, message } = body;
    
    if (!name || !email || !subject || !message) {
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

    // Gerçek uygulamada:
    // 1. Veritabanına kaydet
    // 2. Email gönder (Resend, SendGrid vb.)
    // 3. Slack/Discord bildirimi gönder
    
    console.log("İletişim formu gönderildi:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      message: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız."
    }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Mesaj gönderilemedi. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}

// GET /api/contact - İletişim bilgilerini getir
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      email: "info@nextjs-learning.com",
      twitter: "@nextjs_learn",
      github: "github.com/nextjs-learn",
      address: "İstanbul, Türkiye"
    }
  });
}

