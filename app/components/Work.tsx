"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../lib/LanguageContext";
import { wrapWordsForAnimation } from "../lib/splitText";

gsap.registerPlugin(ScrollTrigger);

const cardLayouts = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-12",
];

export default function Work() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    title.innerHTML = wrapWordsForAnimation(t.work.title);
    const words = title.querySelectorAll(".split-word");
    const cards = section.querySelectorAll(".work-card");
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        words,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        cards,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: section.querySelector(".work-grid"),
            start: "top 75%",
          },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([words, cards], { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" });
    });

    return () => mm.revert();
  }, [t.work.title, lang]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="w-full bg-[var(--deep-ink)]"
      style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 3rem)" }}
    >
      <div className="mx-auto max-w-[90rem]">
        <p
          className="font-mono text-[var(--saffron)]"
          style={{ fontSize: "clamp(0.6875rem, 1.2vw, 0.75rem)" }}
        >
          {t.work.label}
        </p>

        <h2
          ref={titleRef}
          className="font-display text-[var(--stock)] mt-[clamp(0.75rem,2vw,1.25rem)]"
          style={{
            fontSize: "clamp(2rem, 6vw, 5rem)",
            lineHeight: lang === "mr" ? 1.25 : 1.05,
          }}
        />

        <p
          className="font-body text-[var(--stock)] opacity-60 mt-[clamp(0.75rem,2vw,1.25rem)] max-w-[min(100%,40rem)]"
          style={{ fontSize: "clamp(0.875rem, 1.8vw, 1rem)" }}
        >
          {t.work.subtitle}
        </p>

        <div
          className="work-grid grid grid-cols-1 md:grid-cols-12 mt-[clamp(2rem,5vw,4rem)]"
          style={{ gap: "clamp(1rem, 2.5vw, 1.5rem)" }}
        >
          {t.work.cards.map((card, i) => (
            <article
              key={card.title}
              className={`work-card bg-[var(--plate)] border-l-[3px] border-[var(--saffron)]/50 ${cardLayouts[i]}`}
              style={{ padding: "clamp(1.25rem, 3vw, 2rem)" }}
            >
              <span
                className={`font-mono text-[var(--saffron)] ${lang === "en" ? "uppercase tracking-wider" : ""}`}
                style={{ fontSize: "clamp(0.5625rem, 1vw, 0.625rem)" }}
              >
                {card.category}
              </span>
              <h3
                className="font-display text-[var(--stock)] mt-[clamp(0.5rem,1.5vw,0.875rem)]"
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                  lineHeight: lang === "mr" ? 1.3 : 1.1,
                }}
              >
                {card.title}
              </h3>
              <p
                className="font-body text-[var(--stock)] opacity-70 mt-[clamp(0.625rem,1.5vw,1rem)]"
                style={{
                  fontSize: "clamp(0.8125rem, 1.5vw, 0.9375rem)",
                  lineHeight: 1.7,
                }}
              >
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
