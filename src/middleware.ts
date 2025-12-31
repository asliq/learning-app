import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Korunan sayfalar
const protectedPaths = ["/profile", "/dashboard"];

// Public sayfalar (giriş yapmış kullanıcılar erişemez)
const authPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Cookie'den token al (gerçek uygulamada JWT token kontrol edilir)
  const token = request.cookies.get("auth-token");
  const isAuthenticated = !!token;

  // Logging
  console.log(`[${new Date().toISOString()}] ${request.method} ${pathname}`);

  // Korunan sayfalara erişim kontrolü
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    if (!isAuthenticated) {
      // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Auth sayfalarına erişim kontrolü
  if (authPaths.some(path => pathname.startsWith(path))) {
    if (isAuthenticated) {
      // Kullanıcı zaten giriş yapmışsa ana sayfaya yönlendir
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Rate limiting header'ları ekle
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

// Middleware'in hangi path'lerde çalışacağını belirt
export const config = {
  matcher: [
    /*
     * Şu path'ler hariç tüm route'lar için çalış:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

