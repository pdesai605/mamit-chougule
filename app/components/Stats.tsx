"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../lib/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const statValues = [
  { value: 150, suffix: "+", key: "projects" as const },
  { value: 500, suffix: "+", key: "complaints" as const },
  { value: 5, suffix: "", key: "years" as const },
  { value: null, display: "5-ब", key: "ward" as const },
];

export default function Stats() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const counters = section.querySelectorAll("[data-count]");
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      counters.forEach((el) => {
        const target = Number(el.getAttribute("data-count"));
        if (Number.isNaN(target)) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${el.getAttribute("data-suffix") ?? ""}`;
          },
        });
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      counters.forEach((el) => {
        const target = el.getAttribute("data-count");
        const suffix = el.getAttribute("data-suffix") ?? "";
        if (target) el.textContent = `${target}${suffix}`;
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[var(--overlay)]"
      style={{ padding: "clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 3rem)" }}
    >
      <div className="mx-auto grid max-w-[90rem] grid-cols-2 lg:grid-cols-4 gap-[clamp(1.5rem,4vw,0)]">
        {statValues.map((stat, i) => (
          <div
            key={stat.key}
            className={`flex flex-col items-center text-center ${
              i < statValues.length - 1
                ? "lg:border-r lg:border-[var(--saffron)]/20"
                : ""
            }`}
            style={{
              padding: "clamp(1rem, 3vw, 2rem)",
              gap: "clamp(0.5rem, 1.5vw, 0.75rem)",
            }}
          >
            <span
              className="font-display text-[var(--saffron)] leading-none"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            >
              {stat.value !== null ? (
                <span
                  data-count={stat.value}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </span>
              ) : (
                stat.display
              )}
            </span>
            <span
              className="font-body text-[var(--stock)] opacity-60"
              style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.8125rem)" }}
            >
              {t.stats[stat.key]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
