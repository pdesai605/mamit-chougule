"use client";

import { useEffect } from "react";
import { useLanguage } from "../lib/LanguageContext";

export default function BodyLangClass() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.body.className = `lang-${lang}`;
  }, [lang]);

  return null;
}
