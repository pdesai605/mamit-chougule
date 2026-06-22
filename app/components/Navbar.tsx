"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../lib/LanguageContext";
import { useAudio } from "../lib/AudioContext";

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguage();
  const { playing, toggle: toggleMusic } = useAudio();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: "home", label: t.nav.home, href: "#home" },
    { id: "work", label: t.nav.work, href: "#work" },
    { id: "about", label: t.nav.about, href: "#about" },
    { id: "contact", label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[9990] flex items-center justify-between"
        style={{
          padding:
            "clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 4vw, 2.5rem)",
        }}
      >
        <a
          href="#home"
          data-cursor="cta"
          className="flex items-center gap-[clamp(0.4rem,1vw,0.625rem)]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
          >
            <circle cx="10" cy="10" r="10" fill="var(--saffron)" />
          </svg>
          <span
            className="font-display text-[var(--stock)]"
            style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
          >
            {t.nav.brand}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-[clamp(1.5rem,3vw,2.5rem)]">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              data-cursor="cta"
              className="nav-link font-body text-[var(--stock)] opacity-80 hover:opacity-100 transition-opacity"
              style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-[clamp(0.5rem,1.5vw,0.875rem)]">
          <button
            type="button"
            onClick={toggleLang}
            data-cursor="cta"
            className="hidden sm:flex items-center rounded-full border border-[var(--saffron)] font-mono"
            style={{
              padding:
                "clamp(0.3rem, 0.8vw, 0.4rem) clamp(0.6rem, 1.5vw, 0.875rem)",
              fontSize: "clamp(0.625rem, 1vw, 0.6875rem)",
              gap: "clamp(0.25rem, 0.6vw, 0.5rem)",
            }}
            aria-label="Toggle language"
          >
            <span
              className={
                lang === "mr" ? "text-[var(--saffron)]" : "text-[var(--stock)] opacity-50"
              }
            >
              {t.lang.mr}
            </span>
            <span className="text-[var(--stock)] opacity-30">|</span>
            <span
              className={
                lang === "en" ? "text-[var(--saffron)]" : "text-[var(--stock)] opacity-50"
              }
            >
              {t.lang.en}
            </span>
          </button>

          <button
            type="button"
            onClick={toggleMusic}
            data-cursor="cta"
            aria-label={playing ? t.music.pause : t.music.play}
            className={`flex items-center justify-center rounded-full border border-[var(--saffron)] transition-all duration-300 ${
              playing
                ? "bg-[var(--saffron)] text-[var(--deep-ink)] music-pulse"
                : "text-[var(--saffron)]"
            }`}
            style={{
              width: "clamp(2rem, 3.5vw, 2.25rem)",
              height: "clamp(2rem, 3.5vw, 2.25rem)",
              fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
            }}
          >
            {playing ? "⏸" : "♪"}
          </button>

          <a
            href="#contact"
            data-cursor="cta"
            className="hidden md:inline-flex items-center rounded-full bg-[var(--saffron)] text-[var(--deep-ink)] font-body font-medium transition-opacity hover:opacity-90"
            style={{
              padding:
                "clamp(0.45rem, 1vw, 0.625rem) clamp(0.875rem, 2vw, 1.25rem)",
              fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
            }}
          >
            {t.nav.cta}
          </a>

          <button
            type="button"
            data-cursor="cta"
            className="lg:hidden flex flex-col justify-center gap-[clamp(0.2rem,0.4vw,0.3rem)]"
            style={{
              width: "clamp(1.75rem, 4vw, 2rem)",
              height: "clamp(1.75rem, 4vw, 2rem)",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px bg-[var(--stock)] transition-transform duration-300 ${
                menuOpen ? "translate-y-[clamp(0.25rem,0.5vw,0.35rem)] rotate-45" : ""
              }`}
              style={{ width: "clamp(1.25rem, 3vw, 1.5rem)" }}
            />
            <span
              className={`block h-px bg-[var(--stock)] transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
              style={{ width: "clamp(1.25rem, 3vw, 1.5rem)" }}
            />
            <span
              className={`block h-px bg-[var(--stock)] transition-transform duration-300 ${
                menuOpen ? "-translate-y-[clamp(0.25rem,0.5vw,0.35rem)] -rotate-45" : ""
              }`}
              style={{ width: "clamp(1.25rem, 3vw, 1.5rem)" }}
            />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[9989] bg-[var(--deep-ink)] flex flex-col items-center justify-center mobile-menu-enter lg:hidden"
          style={{ gap: "clamp(1.5rem, 4vw, 2.5rem)" }}
        >
          {links.map((link, i) => (
            <a
              key={link.id}
              href={link.href}
              data-cursor="cta"
              onClick={() => setMenuOpen(false)}
              className="font-display text-[var(--stock)] menu-item-stagger"
              style={{
                fontSize: "clamp(2rem, 8vw, 4rem)",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              toggleLang();
            }}
            data-cursor="cta"
            className="mt-[clamp(1rem,3vw,2rem)] rounded-full border border-[var(--saffron)] font-mono text-[var(--saffron)]"
            style={{
              padding:
                "clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)",
              fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
            }}
          >
            {lang === "mr" ? t.lang.en : t.lang.mr}
          </button>
        </div>
      )}
    </>
  );
}
