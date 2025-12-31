# 📖 Next.js Öğrenme Platformu

Modern web geliştirme için kapsamlı bir Next.js öğrenme platformu. Bu proje, Next.js 16, React 19, TypeScript ve Tailwind CSS kullanılarak oluşturulmuştur.

## 🚀 Özellikler

- ✅ **Next.js 16** - En yeni App Router yapısı
- ✅ **TypeScript** - Tip güvenli kod
- ✅ **Tailwind CSS** - Modern ve responsive tasarım
- ✅ **Dark Mode** - Otomatik tema desteği
- ✅ **Dinamik Routing** - Esnek sayfa yapısı
- ✅ **Responsive Design** - Mobil uyumlu
- ✅ **Yeniden Kullanılabilir Componentler** - Modüler yapı

## 📚 Proje Yapısı

```
learning-app/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Ana sayfa
│   │   ├── layout.tsx            # Root layout
│   │   ├── not-found.tsx         # 404 sayfası
│   │   ├── lessons/
│   │   │   ├── page.tsx          # Dersler listesi
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Ders detay sayfası (dinamik)
│   │   └── about/
│   │       └── page.tsx          # Hakkımda sayfası
│   └── components/
│       ├── Navigation.tsx        # Navigasyon komponenti
│       ├── Footer.tsx            # Footer komponenti
│       ├── Card.tsx              # Card komponenti
│       ├── Button.tsx            # Button komponenti
│       └── Badge.tsx             # Badge komponenti
├── public/                       # Statik dosyalar
├── package.json                  # Proje bağımlılıkları
└── README.md                     # Bu dosya
```

## 🛠️ Kurulum

### Gereksinimler

- Node.js 18+ 
- npm, yarn, pnpm veya bun

### Adımlar

1. Bağımlılıkları yükleyin:

```bash
npm install
```

2. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

3. Tarayıcınızda açın: [http://localhost:3000](http://localhost:3000)

## 📖 Kullanılan Teknolojiler

### Frontend Framework
- **Next.js 16.1.1** - React framework'ü
- **React 19.2.3** - UI kütüphanesi

### Tip Güvenliği
- **TypeScript 5** - JavaScript'e tip güvenliği katar

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS işleme

### Geliştirme Araçları
- **ESLint** - Kod kalitesi kontrolü
- **Turbopack** - Hızlı bundling (Next.js 16)

## 🎯 Öğrenim Konuları

Bu projede aşağıdaki Next.js konuları ele alınmıştır:

1. **Next.js Giriş** - Temel kavramlar ve kurulum
2. **React Components** - Component yapısı ve props
3. **Routing & Navigation** - App Router ve dinamik rotalar
4. **Data Fetching** - Server ve Client Components
5. **Styling with Tailwind** - Modern CSS yaklaşımı
6. **State Management** - useState, useEffect, Context API

## 📱 Sayfalar

### Ana Sayfa (`/`)
- Hero section
- Özellikler grid
- Hızlı erişim linkleri

### Dersler Sayfası (`/lessons`)
- Tüm derslerin listesi
- Seviye ve süre bilgileri
- Filtreleme seçenekleri

### Ders Detay Sayfası (`/lessons/[id]`)
- Dinamik ders içeriği
- Konular ve örnekler
- Önceki/Sonraki ders navigasyonu

### Hakkımda Sayfası (`/about`)
- Platform hakkında bilgi
- Kullanılan teknolojiler
- İletişim bilgileri

### 404 Sayfası
- Özel hata sayfası
- Yönlendirme linkleri

## 🧩 Componentler

### Navigation
- Responsive menü
- Aktif sayfa vurgulama
- Mobile hamburger menu

### Footer
- Site bilgileri
- Hızlı linkler
- Sosyal medya bağlantıları

### Card, Button, Badge
- Yeniden kullanılabilir UI componentleri
- Variant desteği
- Dark mode uyumlu

## 📜 Scriptler

```bash
# Geliştirme sunucusunu başlat
npm run dev

# Production build oluştur
npm run build

# Production sunucusunu başlat
npm start

# Kod kalitesi kontrolü
npm run lint
```

## 🎨 Tailwind CSS

Proje, Tailwind CSS 4 kullanmaktadır. Özelleştirmeler için `tailwind.config.js` dosyasını düzenleyebilirsiniz.

### Dark Mode
Otomatik sistem teması desteği mevcuttur. `dark:` prefix'i ile dark mode stilleri eklenebilir.

## 🔧 Konfigürasyon Dosyaları

- **next.config.ts** - Next.js ayarları
- **tsconfig.json** - TypeScript ayarları
- **eslint.config.mjs** - ESLint kuralları
- **postcss.config.mjs** - PostCSS ayarları

## 🚀 Deployment

### Vercel (Önerilen)

En kolay deployment yöntemi Vercel'dir:

1. [Vercel](https://vercel.com) hesabı oluşturun
2. GitHub repository'nizi bağlayın
3. Deploy edin!

### Diğer Platformlar

- Netlify
- AWS Amplify
- Railway
- Digital Ocean

## 📝 Best Practices

Bu projede uygulanan best practices:

- ✅ TypeScript ile tip güvenliği
- ✅ Component-based architecture
- ✅ Server ve Client Components ayrımı
- ✅ SEO-friendly metadata
- ✅ Responsive design
- ✅ Dark mode desteği
- ✅ Erişilebilirlik (accessibility)
- ✅ Code splitting ve lazy loading

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Pull request göndermekten çekinmeyin.

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📚 Kaynaklar

- [Next.js Dokümantasyonu](https://nextjs.org/docs)
- [React Dokümantasyonu](https://react.dev)
- [Tailwind CSS Dokümantasyonu](https://tailwindcss.com/docs)
- [TypeScript Dokümantasyonu](https://www.typescriptlang.org/docs)

---

**Not:** Bu proje, Next.js öğrenmek isteyenler için eğitim amaçlı oluşturulmuştur. 

Made with ❤️ using Next.js 16 & TypeScript
