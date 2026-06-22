"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../lib/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const lines = text.querySelectorAll(".about-line");
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (portrait) {
        gsap.fromTo(
          portrait,
          { y: 30 },
          {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      gsap.fromTo(
        lines,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
          },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(lines, { y: 0, opacity: 1 });
    });

    return () => mm.revert();
  }, [lang]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full bg-[var(--overlay)]"
      style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 3rem)" }}
    >
      <div
        className="mx-auto max-w-[90rem] grid grid-cols-1 lg:grid-cols-2 items-center"
        style={{ gap: "clamp(2rem, 5vw, 4rem)" }}
      >
        <div
          ref={portraitRef}
          className="relative w-full overflow-hidden"
          style={{ minHeight: "clamp(18rem, 50vw, 32rem)" }}
          data-cursor="image"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/portrait.png"
            alt={t.about.title}
            className="w-full h-full object-cover"
            style={{
              clipPath:
                "polygon(0 0, 90% 0, 100% 10%, 100% 100%, 0 100%)",
              minHeight: "clamp(18rem, 50vw, 32rem)",
            }}
          />
        </div>

        <div ref={textRef}>
          <p
            className="about-line font-mono text-[var(--saffron)]"
            style={{ fontSize: "clamp(0.6875rem, 1.2vw, 0.75rem)" }}
          >
            {t.about.label}
          </p>

          <h2
            className="about-line font-display text-[var(--stock)] mt-[clamp(0.75rem,2vw,1.25rem)]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            {t.about.title}
          </h2>

          <span
            className="about-line inline-flex items-center rounded-full bg-[var(--saffron)] text-[var(--deep-ink)] font-mono mt-[clamp(0.875rem,2vw,1.25rem)]"
            style={{
              fontSize: "clamp(0.625rem, 1.1vw, 0.6875rem)",
              padding:
                "clamp(0.35rem, 0.8vw, 0.45rem) clamp(0.75rem, 1.5vw, 1rem)",
            }}
          >
            {t.about.partyBadge}
          </span>

          <hr
            className="about-line border-0 bg-[var(--saffron)] mt-[clamp(1.25rem,3vw,2rem)]"
            style={{ height: "1px", width: "clamp(3rem, 10vw, 5rem)" }}
          />

          <p
            className="about-line font-body text-[var(--stock)] opacity-80 mt-[clamp(1rem,2.5vw,1.5rem)]"
            style={{
              fontSize: "clamp(0.9375rem, 1.8vw, 1rem)",
              lineHeight: 1.8,
            }}
          >
            {t.about.bio}
          </p>

          <div
            className="about-line flex flex-wrap mt-[clamp(1.25rem,3vw,2rem)]"
            style={{ gap: "clamp(0.5rem, 1.5vw, 0.75rem)" }}
          >
            {t.about.badges.map((badge) => (
              <span
                key={badge}
                className="font-mono text-[var(--stock)] opacity-60 border border-[var(--stock)]/20 rounded-full"
                style={{
                  fontSize: "clamp(0.625rem, 1.1vw, 0.6875rem)",
                  padding:
                    "clamp(0.35rem, 0.8vw, 0.45rem) clamp(0.625rem, 1.2vw, 0.875rem)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
