"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";
import { content, type Lang, type Content } from "./content";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: Content;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LANG_EVENT = "lang-change";

function readLang(): Lang {
  if (typeof window === "undefined") return "mr";
  const saved = localStorage.getItem("lang");
  return saved === "en" || saved === "mr" ? saved : "mr";
}

function subscribe(callback: () => void) {
  window.addEventListener(LANG_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(LANG_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLang, () => "mr" as Lang);

  const toggleLang = useCallback(() => {
    const next: Lang = readLang() === "mr" ? "en" : "mr";
    localStorage.setItem("lang", next);
    window.dispatchEvent(new Event(LANG_EVENT));
  }, []);

  const t = content[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
