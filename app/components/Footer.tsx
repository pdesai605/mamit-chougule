"use client";

import { useLanguage } from "../lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="w-full border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between"
      style={{
        minHeight: "clamp(4rem, 8vw, 5rem)",
        padding:
          "clamp(1rem, 3vw, 1.5rem) clamp(1rem, 5vw, 3rem)",
        gap: "clamp(0.75rem, 2vw, 1rem)",
      }}
    >
      <p
        className="font-mono text-[var(--stock)] opacity-40 text-center sm:text-left"
        style={{ fontSize: "clamp(0.625rem, 1.1vw, 0.6875rem)" }}
      >
        {t.footer.copy}
      </p>
      <div
        className="flex items-center font-mono text-[var(--stock)] opacity-40"
        style={{
          gap: "clamp(0.75rem, 2vw, 1.25rem)",
          fontSize: "clamp(0.625rem, 1.1vw, 0.6875rem)",
        }}
      >
        <a
          href="#home"
          data-cursor="cta"
          className="hover:opacity-100 transition-opacity"
        >
          ↑
        </a>
        <span>⚑ {t.about.party}</span>
      </div>
    </footer>
  );
}
