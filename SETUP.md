# 📚 Next.js Öğrenme Platformu - Kurulum ve Kullanım Kılavuzu

## 🎯 Proje Hakkında

Bu proje, Next.js 16 ile geliştirilmiş kapsamlı bir öğrenme platformudur. İçerdiği özellikler:

### ✨ Özellikler

#### 1. **State Management**
- ✅ Context API ile global state yönetimi
- ✅ Theme Context (Dark/Light mode)
- ✅ User Context (Authentication state)
- ✅ LocalStorage ile veri saklama

#### 2. **Form İşlemleri**
- ✅ Login formu (validasyon ile)
- ✅ Contact formu (email gönderimi)
- ✅ Quiz sistemi (interaktif sorular)
- ✅ Form validation ve error handling

#### 3. **API Routes**
- ✅ RESTful API endpoints
- ✅ GET, POST, PUT, DELETE işlemleri
- ✅ `/api/lessons` - Ders listesi ve CRUD
- ✅ `/api/auth/*` - Authentication endpoints
- ✅ `/api/contact` - İletişim formu
- ✅ `/api/user/progress` - Kullanıcı ilerlemesi

#### 4. **Middleware**
- ✅ Route protection (korunan sayfalar)
- ✅ Request logging
- ✅ Security headers
- ✅ Authentication kontrolü

#### 5. **Veritabanı (Prisma)**
- ✅ Prisma ORM
- ✅ SQLite (geliştirme) / PostgreSQL (production)
- ✅ User, Lesson, Progress, QuizScore modelleri
- ✅ Database migration ve seeding

#### 6. **UI/UX**
- ✅ Responsive design
- ✅ Dark mode desteği
- ✅ Tailwind CSS ile modern tasarım
- ✅ Loading states ve error handling
- ✅ Toast notifications

---

## 🚀 Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. Ortam Değişkenlerini Ayarlayın

`.env` dosyası oluşturun (proje kökünde, `learning-app` içinde):

```env
# Database (SQLite - geliştirme için)
DATABASE_URL="file:./dev.db"

# PostgreSQL için (production):
# DATABASE_URL="postgresql://username:password@localhost:5432/learning_db?schema=public"

# NextAuth (opsiyonel)
NEXTAUTH_SECRET="your-super-secret-key-change-this"
NEXTAUTH_URL="http://localhost:3000"

# Ortam
NODE_ENV="development"
```

### 3. Veritabanını Hazırlayın

```bash
# Prisma client'ı oluştur
npm run db:generate

# Veritabanını oluştur ve migration'ları uygula
npm run db:push

# Seed data ekle (demo kullanıcı ve dersler)
npm run db:seed
```

### 4. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

---

## 📊 Veritabanı Modelleri

### User (Kullanıcı)
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String   // bcrypt ile hash'lenmiş
  avatar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Lesson (Ders)
```prisma
model Lesson {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  content     String   @db.Text
  duration    String
  level       String   // "Başlangıç", "Orta", "İleri"
  emoji       String
  order       Int
  isPublished Boolean  @default(true)
}
```

### Progress (İlerleme)
```prisma
model Progress {
  id          String   @id @default(cuid())
  userId      String
  lessonId    Int
  isCompleted Boolean  @default(false)
  completedAt DateTime?
}
```

### QuizScore (Quiz Sonuçları)
```prisma
model QuizScore {
  id        String   @id @default(cuid())
  userId    String
  lessonId  Int
  score     Int      // 0-100 arası
  answers   Json     // Verilen cevaplar
  createdAt DateTime @default(now())
}
```

---

## 🔑 API Endpoints

### Authentication

#### POST /api/auth/login
Kullanıcı girişi

**Request Body:**
```json
{
  "email": "demo@example.com",
  "password": "demo123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Demo Kullanıcı",
    "email": "demo@example.com",
    "avatar": "👤"
  },
  "token": "jwt-token-here"
}
```

#### POST /api/auth/register
Yeni kullanıcı kaydı

**Request Body:**
```json
{
  "name": "Yeni Kullanıcı",
  "email": "yeni@example.com",
  "password": "sifre123"
}
```

### Lessons

#### GET /api/lessons
Tüm dersleri listele

**Query Parameters:**
- `level` (opsiyonel): "Başlangıç", "Orta", "İleri"

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 6
}
```

#### GET /api/lessons/[id]
Tek bir dersi getir

#### POST /api/lessons
Yeni ders ekle (admin)

#### PUT /api/lessons/[id]
Dersi güncelle

#### DELETE /api/lessons/[id]
Dersi sil

### User Progress

#### GET /api/user/progress?userId=1
Kullanıcı ilerlemesini getir

#### POST /api/user/progress
İlerlemeyi güncelle

**Request Body:**
```json
{
  "userId": "1",
  "lessonId": 1,
  "completed": true
}
```

### Contact

#### POST /api/contact
İletişim formu gönder

**Request Body:**
```json
{
  "name": "Ad Soyad",
  "email": "email@example.com",
  "subject": "general",
  "message": "Mesaj içeriği"
}
```

---

## 🎨 Kullanılan Teknolojiler

### Frontend
- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Context API** - State management

### Backend
- **Next.js API Routes** - Backend endpoints
- **Prisma** - ORM
- **SQLite / PostgreSQL** - Database
- **bcryptjs** - Password hashing

### Dev Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundling
- **Prisma Studio** - Database GUI

---

## 📖 Sayfa Yapısı

```
/                      # Ana sayfa
/lessons               # Dersler listesi
/lessons/[id]          # Ders detayı
/lessons/[id]/quiz     # Ders quiz'i
/about                 # Hakkımda
/contact               # İletişim
/login                 # Giriş yap
/profile               # Profil (korumalı)
```

---

## 🔐 Demo Hesabı

```
Email: demo@example.com
Şifre: demo123
```

---

## 🛠️ Geliştirme Komutları

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Production sunucusu
npm start

# Linting
npm run lint

# Prisma Studio (Database GUI)
npm run db:studio

# Database push (migration olmadan)
npm run db:push

# Prisma Client generate
npm run db:generate

# Seed data
npm run db:seed
```

---

## 📚 Context API Kullanımı

### Theme Context
```tsx
import { useTheme } from "@/contexts/ThemeContext";

function Component() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
```

### User Context
```tsx
import { useUser } from "@/contexts/UserContext";

function Component() {
  const { user, login, logout, isAuthenticated } = useUser();
  
  if (!isAuthenticated) {
    return <div>Giriş yapın</div>;
  }
  
  return <div>Hoşgeldin, {user.name}!</div>;
}
```

---

## 🔄 Prisma Workflow

### 1. Schema Değişiklikleri
```bash
# Schema'yı düzenleyin (prisma/schema.prisma)
# Sonra:
npm run db:push
npm run db:generate
```

### 2. Seed Data
```bash
npm run db:seed
```

### 3. Database GUI
```bash
npm run db:studio
```

---

## 🌐 Production'a Deploy

### Vercel (Önerilen)
1. GitHub'a push yapın
2. Vercel'e import edin
3. Environment variables ekleyin
4. Deploy edin

### Environment Variables (Production)
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="https://your-domain.com"
```

---

## 🐛 Sorun Giderme

### Prisma Client Hatası
```bash
npm run db:generate
```

### Database Hatası
```bash
# Database'i sıfırla
rm prisma/dev.db
npm run db:push
npm run db:seed
```

### Type Hatası
```bash
# TypeScript cache'i temizle
rm -rf .next
npm run dev
```

---

## 📝 Önemli Notlar

1. **.env dosyasını asla commit etmeyin!**
2. Production'da PostgreSQL kullanın
3. JWT secret'ları güvenli tutun
4. Database backup'larını almayı unutmayın
5. API rate limiting ekleyin (production için)

---

## 🎓 Öğrenme Yolu

### Başlangıç Seviyesi
1. ✅ Proje yapısını inceleyin
2. ✅ Context API kullanımını öğrenin
3. ✅ Form işlemlerini anlayın
4. ✅ API routes'u keşfedin

### Orta Seviye
1. ✅ Prisma ile veritabanı işlemleri
2. ✅ Middleware kullanımı
3. ✅ Authentication flow
4. ✅ Error handling

### İleri Seviye
1. ✅ NextAuth.js entegrasyonu
2. ✅ Real-time features (WebSocket)
3. ✅ Testing (Jest, Cypress)
4. ✅ CI/CD pipeline

---

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'feat: Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📄 Lisans

MIT License

---

## 📧 İletişim

- Email: info@nextjs-learning.com
- GitHub: github.com/nextjs-learn
- Twitter: @nextjs_learn

---

**Made with ❤️ using Next.js 16, TypeScript, Prisma & Tailwind CSS**

