"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../lib/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lines = section.querySelectorAll(".statement-line");
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        lines,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
          },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(lines, { clipPath: "inset(0 0% 0 0)" });
    });

    return () => mm.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[var(--saffron)] flex flex-col items-center justify-center text-center"
      style={{
        minHeight: "100svh",
        padding: "clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 3rem)",
        gap: "clamp(1rem, 3vw, 2rem)",
      }}
    >
      <blockquote className="max-w-[min(100%,60rem)]">
        <p
          className="statement-line font-display text-[var(--deep-ink)]"
          style={{
            fontSize: "clamp(2rem, 8vw, 6rem)",
            lineHeight: lang === "mr" ? 1.35 : 1.1,
          }}
        >
          {t.statement.line1}
        </p>
        <p
          className="statement-line font-display text-[var(--deep-ink)] mt-[clamp(0.5rem,2vw,1rem)]"
          style={{
            fontSize: "clamp(2rem, 8vw, 6rem)",
            lineHeight: lang === "mr" ? 1.35 : 1.1,
          }}
        >
          {t.statement.line2}
        </p>
      </blockquote>
      <cite
        className="statement-line font-mono not-italic text-[var(--deep-ink)] opacity-70"
        style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.8125rem)" }}
      >
        {t.statement.attribution}
      </cite>
    </section>
  );
}
