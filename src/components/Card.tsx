import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${
        hover ? "hover:shadow-xl hover:scale-105 transition-all duration-200" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

