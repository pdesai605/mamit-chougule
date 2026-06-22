"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useLanguage } from "../lib/LanguageContext";
import {
  wrapForAnimation,
  getAnimationSelector,
} from "../lib/splitText";

const HERO_IMAGES = Array.from({ length: 8 }, (_, i) =>
  `/hero/${String(i + 1).padStart(2, "0")}.png`
);
const SLIDE_DURATION = 2500;
const FADE_DURATION = 800;

export default function Hero() {
  const { t, lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex((current) => {
      if (index === current) return current;
      setPrevIndex(current);
      return index;
    });
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      goToSlide((activeIndex + 1) % HERO_IMAGES.length);
    }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    el.innerHTML = wrapForAnimation(t.hero.name, lang);
    const units = el.querySelectorAll(getAnimationSelector(lang));
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        units,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: lang === "mr" ? 0.12 : 0.03,
          delay: 0.3,
          ease: "power3.out",
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(units, { y: 0, opacity: 1 });
    });

    return () => mm.revert();
  }, [t.hero.name, lang]);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "100vh" }}
    >
      <div className="absolute inset-0">
        {HERO_IMAGES.map((src, i) => {
          const isActive = i === activeIndex;
          const isPrev = i === prevIndex;
          const opacity = isActive ? 1 : isPrev ? 0 : 0;

          return (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity ${
                isActive ? "hero-slide-active z-[2]" : "z-[1]"
              }`}
              style={{
                opacity,
                transitionDuration: `${FADE_DURATION}ms`,
              }}
            >
              <div
                className="hero-slide-img absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${src})` }}
              />
            </div>
          );
        })}
      </div>

      <div
        className="absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      <div
        className="relative z-[4] flex h-full flex-col justify-end"
        style={{
          padding:
            "clamp(5rem, 12vh, 8rem) clamp(1rem, 5vw, 3rem) clamp(2rem, 5vh, 4rem)",
        }}
      >
        <p
          className={`font-mono text-[var(--saffron)] ${lang === "en" ? "uppercase tracking-[0.3em]" : "tracking-normal"}`}
          style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.6875rem)" }}
        >
          {t.hero.ward}
        </p>

        <h1
          ref={nameRef}
          className="font-display text-[var(--stock)] mt-[clamp(0.5rem,2vh,1rem)]"
          style={{
            fontSize: "clamp(2.5rem, 10vw, 8rem)",
            lineHeight: lang === "mr" ? 1.25 : 0.95,
          }}
        />

        <p
          className="font-display text-[var(--saffron)] mt-[clamp(0.25rem,1vh,0.5rem)]"
          style={{
            fontSize: "clamp(1.25rem, 4vw, 3.5rem)",
            lineHeight: lang === "mr" ? 1.3 : 1.05,
          }}
        >
          {t.hero.title}
        </p>

        <p
          className="font-body text-[var(--stock)] opacity-75 mt-[clamp(0.75rem,2vh,1.25rem)] max-w-[min(100%,30rem)]"
          style={{
            fontSize: "clamp(0.9375rem, 2vw, 1.125rem)",
            lineHeight: 1.6,
          }}
        >
          {t.hero.tagline}
        </p>

        <p
          className="font-body text-[var(--stock)] opacity-60 mt-[clamp(0.5rem,1.5vh,0.875rem)] max-w-[min(100%,30rem)] hidden sm:block"
          style={{
            fontSize: "clamp(0.8125rem, 1.5vw, 0.9375rem)",
            lineHeight: 1.6,
          }}
        >
          {t.hero.sub}
        </p>

        <div
          className="flex flex-wrap gap-[clamp(0.625rem,2vw,1rem)] mt-[clamp(1.25rem,3vh,2rem)]"
        >
          <a
            href="#work"
            data-cursor="cta"
            className="inline-flex items-center rounded-full border border-[var(--stock)] text-[var(--stock)] font-body transition-opacity hover:opacity-80"
            style={{
              padding:
                "clamp(0.625rem, 1.5vw, 0.875rem) clamp(1.25rem, 3vw, 1.75rem)",
              fontSize: "clamp(0.8125rem, 1.5vw, 0.9375rem)",
            }}
          >
            {t.hero.cta1}
          </a>
          <a
            href="#contact"
            data-cursor="cta"
            className="inline-flex items-center rounded-full bg-[var(--saffron)] text-[var(--deep-ink)] font-body font-medium transition-opacity hover:opacity-90"
            style={{
              padding:
                "clamp(0.625rem, 1.5vw, 0.875rem) clamp(1.25rem, 3vw, 1.75rem)",
              fontSize: "clamp(0.8125rem, 1.5vw, 0.9375rem)",
            }}
          >
            {t.hero.cta2}
          </a>
        </div>
      </div>

      <div
        className="absolute z-[5] bow-rotate"
        style={{
          bottom: "clamp(2rem, 5vh, 3.5rem)",
          right: "clamp(1rem, 4vw, 2.5rem)",
        }}
      >
        <Image
          src="/shivsena.png"
          alt="Shiv Sena"
          width={120}
          height={120}
          priority
          style={{
            width: "clamp(2.5rem, 5vw, 3.5rem)",
            height: "auto",
          }}
        />
      </div>
    </section>
  );
}
