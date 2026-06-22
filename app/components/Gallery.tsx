"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../lib/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = Array.from({ length: 8 }, (_, i) =>
  `/gallery/${String(i + 1).padStart(2, "0")}.png`
);

const masonryClasses = [
  "col-span-1 row-span-2 md:mt-[clamp(0rem,2vw,2rem)]",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1 md:-mt-[clamp(0rem,3vw,3rem)]",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1 md:mt-[clamp(0rem,2vw,1.5rem)]",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2 md:-mt-[clamp(0rem,2vw,2rem)]",
  "col-span-1 row-span-1",
];

export default function Gallery() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll(".gallery-item");
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        items,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(items, { clipPath: "inset(0% 0 0 0)" });
    });

    return () => mm.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[var(--deep-ink)] overflow-hidden"
      style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 3rem)" }}
    >
      <div className="mx-auto max-w-[90rem]">
        <p
          className="font-mono text-[var(--saffron)]"
          style={{ fontSize: "clamp(0.6875rem, 1.2vw, 0.75rem)" }}
        >
          {t.gallery.label}
        </p>
        <h2
          className="font-display text-[var(--stock)] mt-[clamp(0.75rem,2vw,1.25rem)]"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
        >
          {t.gallery.title}
        </h2>

        <div
          className="grid grid-cols-2 md:grid-cols-3 auto-rows-[clamp(8rem,18vw,14rem)] mt-[clamp(2rem,5vw,4rem)]"
          style={{ gap: "clamp(0.75rem, 2vw, 1.25rem)" }}
        >
          {GALLERY_IMAGES.map((src, i) => (
            <div
              key={src}
              className={`gallery-item relative overflow-hidden ${masonryClasses[i]}`}
              data-cursor="image"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={t.gallery.items[i].alt}
                className="w-full h-full object-cover"
              />
              <span
                className={`gallery-label absolute bottom-[clamp(0.5rem,1.5vw,0.875rem)] left-[clamp(0.5rem,1.5vw,0.875rem)] font-mono text-[var(--saffron)] bg-[var(--deep-ink)]/80 ${lang === "en" ? "uppercase" : ""}`}
                style={{
                  fontSize: "clamp(0.5625rem, 1vw, 0.625rem)",
                  padding:
                    "clamp(0.25rem, 0.6vw, 0.375rem) clamp(0.5rem, 1vw, 0.625rem)",
                }}
              >
                {t.gallery.items[i].label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
