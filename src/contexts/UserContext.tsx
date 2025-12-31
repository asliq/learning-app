"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  completedLessons: number[];
  progress: number;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  completeLesson: (lessonId: number) => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // LocalStorage'dan kullanıcıyı yükle
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Gerçek uygulamada bu bir API çağrısı olur
    // Şimdilik mock data kullanıyoruz
    try {
      // Simüle edilmiş API çağrısı
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Demo kullanıcı
      if (email === "demo@example.com" && password === "demo123") {
        const newUser: User = {
          id: "1",
          name: "Demo Kullanıcı",
          email: email,
          avatar: "👤",
          completedLessons: [1, 2],
          progress: 33,
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const completeLesson = (lessonId: number) => {
    if (!user) return;

    if (!user.completedLessons.includes(lessonId)) {
      const updatedUser = {
        ...user,
        completedLessons: [...user.completedLessons, lessonId],
        progress: Math.round(((user.completedLessons.length + 1) / 6) * 100),
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        completeLesson,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

