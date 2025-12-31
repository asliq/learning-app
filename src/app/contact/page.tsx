"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Validasyon
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error");
      setErrorMessage("Lütfen tüm alanları doldurun");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Geçerli bir email adresi girin");
      return;
    }

    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Gerçek uygulamada bu bir API çağrısı olur
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage("Mesaj gönderilemedi. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline mb-6"
        >
          ← Ana Sayfaya Dön
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📧 İletişim
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşın
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success Message */}
            {status === "success" && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg">
                ✓ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
              </div>
            )}

            {/* Error Message */}
            {status === "error" && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                {errorMessage}
              </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ad Soyad *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Adınız ve soyadınız"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Adresi *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="ornek@email.com"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Konu *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">Bir konu seçin</option>
                <option value="general">Genel Soru</option>
                <option value="technical">Teknik Destek</option>
                <option value="suggestion">Öneri</option>
                <option value="bug">Hata Bildirimi</option>
                <option value="other">Diğer</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mesaj *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                placeholder="Mesajınızı buraya yazın..."
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Gönderiliyor..." : "Mesajı Gönder"}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">📧</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">info@nextjs-learning.com</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">🐦</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Twitter</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">@nextjs_learn</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">🐙</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">GitHub</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">github.com/nextjs-learn</p>
          </div>
        </div>
      </div>
    </div>
  );
}

