# 🎓 Next.js İleri Seviye Özellikler - Detaylı Öğrenme Rehberi

## 📋 İçindekiler

1. [State Management (Context API)](#1-state-management-context-api)
2. [Form İşlemleri](#2-form-işlemleri)
3. [API Routes](#3-api-routes)
4. [Middleware](#4-middleware)
5. [Veritabanı Entegrasyonu (Prisma)](#5-veritabanı-entegrasyonu)
6. [Best Practices](#6-best-practices)

---

## 1️⃣ State Management (Context API)

### 🎯 Ne Öğrendik?

Context API, React'te global state yönetimi için kullanılır. Redux'a göre daha basit ve Next.js ile mükemmel çalışır.

### 📁 Dosya Yapısı

```
src/contexts/
├── ThemeContext.tsx    # Dark/Light mode
└── UserContext.tsx     # Kullanıcı state
```

### 💡 Theme Context Nasıl Çalışır?

**1. Context Oluşturma:**
```tsx
// contexts/ThemeContext.tsx
import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
```

**Açıklama:**
- `createContext`: Yeni bir context oluşturur
- `ThemeContextType`: Context'in tip tanımı
- `undefined`: Default value (henüz provider yok)

**2. Provider Oluşturma:**
```tsx
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

**Açıklama:**
- `Provider`: Context'i tüm child componentlere sağlar
- `localStorage`: Tema tercihini saklar
- `documentElement.classList`: Tailwind dark mode için

**3. Custom Hook Oluşturma:**
```tsx
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
```

**Açıklama:**
- Custom hook kullanımı daha temiz
- Error handling ile güvenli kullanım
- Provider dışında kullanılırsa hata fırlatır

**4. Kullanım:**
```tsx
// Component içinde
import { useTheme } from "@/contexts/ThemeContext";

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
```

### 🔄 User Context

User Context, authentication state'ini yönetir:

```tsx
interface User {
  id: string;
  name: string;
  email: string;
  completedLessons: number[];
  progress: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  const login = async (email: string, password: string) => {
    // API çağrısı
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
```

### 🎨 Layout'ta Kullanım

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <UserProvider>
            <Navigation />
            {children}
            <Footer />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Önemli:**  Context'leri yukarıdan aşağıya doğru sıralayın. Child componentler parent context'lere erişebilir.

### ✅ Context API Best Practices

1. **Her concern için ayrı context oluşturun**
   - ❌ Kötü: Tek bir AppContext
   - ✅ İyi: ThemeContext, UserContext, CartContext ayrı ayrı

2. **Custom hooks kullanın**
   ```tsx
   // ❌ Kötü
   const context = useContext(ThemeContext);
   
   // ✅ İyi
   const { theme, toggleTheme } = useTheme();
   ```

3. **Provider'ları iç içe kullanın**
   ```tsx
   <ThemeProvider>
     <UserProvider>
       <App />
     </UserProvider>
   </ThemeProvider>
   ```

4. **localStorage ile persist edin**
   ```tsx
   useEffect(() => {
     const saved = localStorage.getItem("user");
     if (saved) setUser(JSON.parse(saved));
   }, []);
   ```

---

## 2️⃣ Form İşlemleri

### 🎯 Ne Öğrendik?

React'te form yönetimi, validasyon, error handling ve API entegrasyonu.

### 📝 Login Formu Örneği

```tsx
"use client";

import { useState, FormEvent } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Sayfanın yenilenmesini önle
    setError("");
    setLoading(true);

    // Validasyon
    if (!email || !password) {
      setError("Tüm alanları doldurun");
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Geçerli bir email girin");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Başarılı
        router.push("/");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      
      <button type="submit" disabled={loading}>
        {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>
    </form>
  );
}
```

### 🎯 Form İşlemleri - Key Concepts

#### 1. **Controlled Components**
```tsx
// State ile kontrol edilen input
const [value, setValue] = useState("");

<input 
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

**Neden?**
- React state'i tek kaynak (single source of truth)
- Value her zaman senkronize
- Validasyon daha kolay

#### 2. **Form Submit Handling**
```tsx
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // ⚠️ Çok önemli! Sayfa yenilenmesini önler
  // Form işlemleri...
};
```

#### 3. **Validation**
```tsx
// Email validasyonu
const emailRegex = /\S+@\S+\.\S+/;
if (!emailRegex.test(email)) {
  setError("Geçerli bir email girin");
}

// Şifre uzunluğu
if (password.length < 6) {
  setError("Şifre en az 6 karakter olmalı");
}
```

#### 4. **Loading States**
```tsx
const [loading, setLoading] = useState(false);

// API çağrısı başlamadan önce
setLoading(true);

// API çağrısı bittikten sonra
setLoading(false);

// UI'da kullanım
<button disabled={loading}>
  {loading ? "Gönderiliyor..." : "Gönder"}
</button>
```

#### 5. **Error Handling**
```tsx
try {
  const response = await fetch("/api/endpoint");
  if (!response.ok) {
    throw new Error("API Error");
  }
  const data = await response.json();
} catch (error) {
  setError("Bir hata oluştu");
  console.error(error);
}
```

### 📊 Quiz Componenti

Quiz componentimiz interaktif bir quiz sistemi sağlar:

```tsx
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  // ... render logic
}
```

**Key Features:**
- State management ile soru takibi
- Array manipulation ile cevap saklama
- Score hesaplama algoritması
- Conditional rendering (sonuç ekranı)

---

## 3️⃣ API Routes

### 🎯 Ne Öğrendik?

Next.js'te backend API'ler oluşturma, RESTful endpoints, CRUD işlemleri.

### 📁 API Route Yapısı

```
app/api/
├── lessons/
│   ├── route.ts           # GET, POST /api/lessons
│   └── [id]/
│       └── route.ts       # GET, PUT, DELETE /api/lessons/[id]
├── auth/
│   ├── login/route.ts     # POST /api/auth/login
│   └── register/route.ts  # POST /api/auth/register
├── contact/route.ts       # POST /api/contact
└── user/
    └── progress/route.ts  # GET, POST /api/user/progress
```

### 💡 Basit API Route

```tsx
// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ 
    message: "Hello, World!" 
  });
}
```

**Açıklama:**
- `GET` export edilen fonksiyon HTTP GET isteğini karşılar
- `NextResponse.json()` JSON response döner
- Auto-completion ve type safety var (TypeScript)

### 🔄 CRUD Operations

#### GET - Listele
```tsx
export async function GET(request: Request) {
  try {
    // Query parameters
    const { searchParams } = new URL(request.url);
    const level = searchParams.get("level");
    
    // Veritabanından veri çek
    const lessons = await prisma.lesson.findMany({
      where: level ? { level } : {},
    });

    return NextResponse.json({
      success: true,
      data: lessons,
      count: lessons.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Veri alınamadı" },
      { status: 500 }
    );
  }
}
```

**Key Concepts:**
- `new URL()` ile query params parse etme
- Try-catch ile error handling
- Status codes kullanımı (200, 500)
- Consistent response structure

#### POST - Oluştur
```tsx
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

    // Veritabanına kaydet
    const lesson = await prisma.lesson.create({
      data: {
        title: body.title,
        description: body.description,
        // ...
      }
    });

    return NextResponse.json({
      success: true,
      data: lesson,
      message: "Ders oluşturuldu"
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Ders oluşturulamadı" },
      { status: 500 }
    );
  }
}
```

**Key Concepts:**
- `request.json()` ile body parse etme
- Input validation
- `status: 201` (Created)
- Error response structure

#### Dynamic Routes
```tsx
// app/api/lessons/[id]/route.ts

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: Request,
  { params }: Props
) {
  const { id } = await params;
  
  const lesson = await prisma.lesson.findUnique({
    where: { id: parseInt(id) }
  });

  if (!lesson) {
    return NextResponse.json(
      { error: "Ders bulunamadı" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: lesson });
}
```

### 📡 API Best Practices

1. **Consistent Response Structure**
   ```json
   {
     "success": true,
     "data": {...},
     "message": "İşlem başarılı"
   }
   ```

2. **Proper Status Codes**
   - 200: OK
   - 201: Created
   - 400: Bad Request
   - 401: Unauthorized
   - 404: Not Found
   - 500: Server Error

3. **Error Handling**
   ```tsx
   try {
     // API logic
   } catch (error) {
     console.error("API Error:", error);
     return NextResponse.json(
       { success: false, error: "Bir hata oluştu" },
       { status: 500 }
     );
   }
   ```

4. **Validation**
   ```tsx
   if (!body.email || !body.password) {
     return NextResponse.json(
       { error: "Email ve şifre gerekli" },
       { status: 400 }
     );
   }
   ```

---

## 4️⃣ Middleware

### 🎯 Ne Öğrendik?

Middleware, her request'ten önce çalışan fonksiyonlardır. Authentication kontrolü, logging, rate limiting için kullanılır.

### 📄 Middleware Dosyası

```tsx
// middleware.ts (src ile aynı seviyede)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Cookie'den token al
  const token = request.cookies.get("auth-token");
  
  // Logging
  console.log(`[${new Date().toISOString()}] ${request.method} ${pathname}`);
  
  // Korunan sayfa kontrolü
  if (pathname.startsWith("/profile")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  
  // Security headers ekle
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  
  return response;
}

// Hangi path'lerde çalışacağını belirt
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
```

### 🔑 Middleware Use Cases

#### 1. **Authentication Check**
```tsx
const protectedPaths = ["/profile", "/dashboard", "/settings"];

if (protectedPaths.some(path => pathname.startsWith(path))) {
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
```

#### 2. **Logging**
```tsx
console.log(`[${new Date().toISOString()}] ${request.method} ${pathname}`);
```

#### 3. **Security Headers**
```tsx
const response = NextResponse.next();
response.headers.set("X-Frame-Options", "DENY");
response.headers.set("X-XSS-Protection", "1; mode=block");
response.headers.set("X-Content-Type-Options", "nosniff");
```

#### 4. **Redirect Logic**
```tsx
// Giriş yapmış kullanıcıları login sayfasından yönlendir
if (pathname === "/login" && isAuthenticated) {
  return NextResponse.redirect(new URL("/", request.url));
}
```

### ⚙️ Matcher Configuration

```tsx
export const config = {
  matcher: [
    /*
     * Tüm path'ler hariç:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
```

---

## 5️⃣ Veritabanı Entegrasyonu (Prisma)

### 🎯 Ne Öğrendik?

Prisma ORM ile veritabanı yönetimi, model tanımlama, CRUD işlemleri, ilişkiler.

### 📊 Prisma Nedir?

Prisma, modern bir ORM (Object-Relational Mapping) aracıdır:
- Type-safe database queries
- Auto-completion
- Migration management
- Multi-database support

### 🚀 Kurulum ve Konfigürasyon

```bash
# Prisma kurulumu
npm install prisma @prisma/client

# Prisma initialize
npx prisma init

# Schema değişikliklerini uygula
npx prisma db push

# Prisma Client generate
npx prisma generate

# Seed data
npx prisma db seed
```

### 📐 Schema Tanımlama

```prisma
// prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // İlişkiler
  progress  Progress[]
  
  @@map("users")
}

model Lesson {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  content     String   @db.Text
  level       String
  
  // İlişkiler
  progress   Progress[]
  
  @@map("lessons")
}

model Progress {
  id          String   @id @default(cuid())
  userId      String
  lessonId    Int
  isCompleted Boolean  @default(false)
  
  // İlişkiler
  user   User   @relation(fields: [userId], references: [id])
  lesson Lesson @relation(fields: [lessonId], references: [id])
  
  @@unique([userId, lessonId])
  @@map("progress")
}
```

**Key Concepts:**
- `@id`: Primary key
- `@unique`: Unique constraint
- `@default()`: Default value
- `@relation`: Foreign key ilişkisi
- `@@map()`: Table adı mapping

### 💾 Prisma Client Kullanımı

```tsx
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

### 🔄 CRUD İşlemleri

#### Create
```tsx
const user = await prisma.user.create({
  data: {
    email: "user@example.com",
    name: "User Name",
    password: hashedPassword,
  }
});
```

#### Read
```tsx
// Tek kayıt
const user = await prisma.user.findUnique({
  where: { email: "user@example.com" }
});

// Çoklu kayıt
const users = await prisma.user.findMany({
  where: { isActive: true },
  orderBy: { createdAt: "desc" },
  take: 10
});
```

#### Update
```tsx
const updatedUser = await prisma.user.update({
  where: { id: "user-id" },
  data: { name: "New Name" }
});
```

#### Delete
```tsx
await prisma.user.delete({
  where: { id: "user-id" }
});
```

### 🔗 İlişkilerle Çalışma

```tsx
// İlişkili verileri dahil et
const userWithProgress = await prisma.user.findUnique({
  where: { id: "user-id" },
  include: {
    progress: {
      include: {
        lesson: true
      }
    }
  }
});

// Nested create
await prisma.user.create({
  data: {
    email: "user@example.com",
    name: "User",
    progress: {
      create: {
        lessonId: 1,
        isCompleted: true
      }
    }
  }
});
```

### 🌱 Seeding

```tsx
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "demo@example.com",
      name: "Demo User",
      password: hashedPassword
    }
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

---

## 6️⃣ Best Practices

### ✅ Genel En İyi Uygulamalar

1. **TypeScript Kullanın**
   - Tip güvenliği
   - Auto-completion
   - Daha az hata

2. **Error Handling**
   ```tsx
   try {
     // İşlem
   } catch (error) {
     console.error("Error:", error);
     // Kullanıcı dostu hata mesajı
   }
   ```

3. **Loading States**
   ```tsx
   {loading && <Spinner />}
   {error && <Error message={error} />}
   {data && <Content data={data} />}
   ```

4. **Environment Variables**
   ```env
   DATABASE_URL="..."
   API_KEY="..."
   ```

5. **Code Organization**
   ```
   src/
   ├── app/         # Pages
   ├── components/  # Reusable components
   ├── contexts/    # Context providers
   ├── lib/         # Utilities
   └── types/       # TypeScript types
   ```

---

## 🎯 Sonuç

Bu projede öğrendikleriniz:

✅ Context API ile global state management  
✅ Form handling ve validation  
✅ RESTful API development  
✅ Middleware kullanımı  
✅ Prisma ile database yönetimi  
✅ TypeScript best practices  
✅ Error handling  
✅ Security practices  

**Sonraki Adımlar:**
1. NextAuth.js ile advanced authentication
2. Real-time features (WebSocket)
3. Testing (Jest, Cypress)
4. Performance optimization
5. CI/CD pipeline

---

**Made with ❤️ for learning purposes**

