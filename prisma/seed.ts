import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Veritabanı seed başlatılıyor...");

  // Kullanıcı oluştur
  const hashedPassword = await bcrypt.hash("demo123", 10);
  
  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      name: "Demo Kullanıcı",
      password: hashedPassword,
      avatar: "👤",
    },
  });

  console.log("✅ Demo kullanıcı oluşturuldu:", user.email);

  // Dersleri oluştur
  const lessons = [
    {
      title: "Next.js Giriş",
      description: "Next.js'in temel kavramları ve kurulumu",
      content: JSON.stringify({
        introduction: "Next.js, React tabanlı modern bir web framework'üdür.",
        topics: ["Next.js nedir?", "Proje oluşturma", "Proje yapısı"],
        examples: ["create-next-app", "Hello World sayfası"],
        conclusion: "Next.js ile modern web uygulamaları geliştirin!"
      }),
      duration: "30 dakika",
      level: "Başlangıç",
      emoji: "🎯",
      order: 1,
    },
    {
      title: "React Components",
      description: "Component yapısı ve props kullanımı",
      content: JSON.stringify({
        introduction: "React componentleri, kullanıcı arayüzünü küçük parçalara böler.",
        topics: ["Function Component", "Props", "Component composition"],
        examples: ["Button component", "Card component"],
        conclusion: "Componentler React'in kalbidir."
      }),
      duration: "45 dakika",
      level: "Başlangıç",
      emoji: "⚛️",
      order: 2,
    },
    {
      title: "Routing & Navigation",
      description: "App Router ve dinamik rotalar",
      content: JSON.stringify({
        introduction: "Next.js App Router, dosya sistemi tabanlı routing sunar.",
        topics: ["App Router", "Dinamik rotalar", "Link component"],
        examples: ["Statik route", "Dinamik route", "Nested routes"],
        conclusion: "Next.js routing sistemi basit ve güçlüdür."
      }),
      duration: "40 dakika",
      level: "Orta",
      emoji: "🛤️",
      order: 3,
    },
    {
      title: "Data Fetching",
      description: "Server ve Client Components, API kullanımı",
      content: JSON.stringify({
        introduction: "Next.js'te veri çekme işlemleri hem sunucu hem istemci tarafında yapılabilir.",
        topics: ["Server Components", "Client Components", "Fetch API"],
        examples: ["Server component veri çekme", "Client component useEffect"],
        conclusion: "Doğru data fetching stratejisi performans sağlar."
      }),
      duration: "50 dakika",
      level: "Orta",
      emoji: "📡",
      order: 4,
    },
    {
      title: "Styling with Tailwind",
      description: "Tailwind CSS ile modern tasarım",
      content: JSON.stringify({
        introduction: "Tailwind CSS, utility-first bir CSS framework'üdür.",
        topics: ["Tailwind nedir?", "Utility classes", "Responsive design"],
        examples: ["Gradient background", "Responsive grid", "Hover effects"],
        conclusion: "Tailwind ile styling hızlı ve tutarlıdır."
      }),
      duration: "35 dakika",
      level: "Başlangıç",
      emoji: "🎨",
      order: 5,
    },
    {
      title: "State Management",
      description: "useState, useEffect ve Context API",
      content: JSON.stringify({
        introduction: "State management, React uygulamalarında kritik öneme sahiptir.",
        topics: ["useState", "useEffect", "Context API", "Custom hooks"],
        examples: ["Counter app", "Todo list", "Theme provider"],
        conclusion: "İyi state management uygulamayı ölçeklenebilir yapar."
      }),
      duration: "60 dakika",
      level: "İleri",
      emoji: "🔄",
      order: 6,
    },
  ];

  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: { id: lesson.order },
      update: {},
      create: { ...lesson, id: lesson.order },
    });
  }

  console.log("✅ Dersler oluşturuldu");

  // İlerleme kayıtları oluştur (demo kullanıcı için)
  await prisma.progress.create({
    data: {
      userId: user.id,
      lessonId: 1,
      isCompleted: true,
      completedAt: new Date(),
    },
  });

  await prisma.progress.create({
    data: {
      userId: user.id,
      lessonId: 2,
      isCompleted: true,
      completedAt: new Date(),
    },
  });

  console.log("✅ İlerleme kayıtları oluşturuldu");

  console.log("🎉 Seed tamamlandı!");
}

main()
  .catch((e) => {
    console.error("❌ Seed hatası:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

