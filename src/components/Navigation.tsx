"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useUser } from "@/contexts/UserContext";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useUser();

  const navLinks = [
    { href: "/", label: "Ana Sayfa", icon: "🏠" },
    { href: "/lessons", label: "Dersler", icon: "📚" },
    { href: "/about", label: "Hakkımda", icon: "ℹ️" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            📖 Next.js Öğren
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={theme === "light" ? "Dark Mode'a Geç" : "Light Mode'a Geç"}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-2xl">{user.avatar}</span>
                  <span className="font-medium">{user.name}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                    </div>
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">İlerleme</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all" 
                            style={{ width: `${user.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.progress}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {user.completedLessons.length}/6 ders tamamlandı
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowUserMenu(false)}
                    >
                      👤 Profil
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      🚪 Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Giriş Yap
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
              
              {isAuthenticated && user ? (
                <>
                  <div className="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="font-medium text-gray-900 dark:text-white mb-1">
                      {user.avatar} {user.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      İlerleme: {user.progress}%
                    </p>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${user.progress}%` }}
                      />
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    👤 Profil
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    🚪 Çıkış Yap
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center font-medium"
                >
                  Giriş Yap
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

