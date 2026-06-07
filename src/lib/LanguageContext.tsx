"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Load saved preference from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem("webexa-lang");
    if (saved === "en" || saved === "es") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(saved);
    } else {
      // Default to browser language if it is Spanish
      const browserLang = navigator.language || "";
      if (browserLang.startsWith("es")) {
        setLanguage("es");
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("webexa-lang", lang);
  };

  const t = (key: string, variables?: Record<string, string | number>): string => {
    const dict = translations[language] as Record<string, string>;
    const englishDict = translations.en as Record<string, string>;
    // Fallback to English key if not found
    let text = dict[key] || englishDict[key] || key;
    
    if (variables) {
      Object.entries(variables).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

