"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProvider } from "@/contexts/UserContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </UserProvider>
    </ThemeProvider>
  );
}

