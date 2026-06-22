"use client";

import { useLanguage } from "../lib/LanguageContext";

export default function LanguageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang } = useLanguage();

  return (
    <div
      key={lang}
      className="lang-transition"
      style={{
        animation: "langFade 0.45s ease",
      }}
    >
      {children}
    </div>
  );
}
