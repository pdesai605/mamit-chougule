"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../lib/LanguageContext";
import {
  wrapForAnimation,
  getAnimationSelector,
} from "../lib/splitText";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t, lang } = useLanguage();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    title.innerHTML = wrapForAnimation(t.contact.title, lang);
    const units = title.querySelectorAll(getAnimationSelector(lang));
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        units,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: lang === "mr" ? 0.1 : 0.03,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
          },
        }
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(units, { y: 0, opacity: 1 });
    });

    return () => mm.revert();
  }, [t.contact.title, lang]);

  return (
    <section
      id="contact"
      className="w-full bg-[var(--deep-ink)]"
      style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 3rem)" }}
    >
      <div className="mx-auto max-w-[90rem]">
        <p
          className="font-mono text-[var(--saffron)]"
          style={{ fontSize: "clamp(0.6875rem, 1.2vw, 0.75rem)" }}
        >
          {t.contact.label}
        </p>

        <h2
          ref={titleRef}
          className="font-display text-[var(--stock)] mt-[clamp(0.75rem,2vw,1.25rem)]"
          style={{
            fontSize: "clamp(2.5rem, 10vw, 7rem)",
            lineHeight: lang === "mr" ? 1.25 : 0.95,
          }}
        />

        <p
          className="font-body text-[var(--stock)] opacity-70 mt-[clamp(1rem,2.5vw,1.5rem)] max-w-[min(100%,32rem)]"
          style={{ fontSize: "clamp(0.9375rem, 1.8vw, 1.0625rem)" }}
        >
          {t.contact.sub}
        </p>

        <div
          className="flex flex-col sm:flex-row flex-wrap mt-[clamp(2rem,5vw,3rem)]"
          style={{ gap: "clamp(0.875rem, 2vw, 1.25rem)" }}
        >
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="cta"
            className="inline-flex items-center justify-center rounded-full bg-[var(--saffron)] text-[var(--deep-ink)] font-body font-medium transition-opacity hover:opacity-90"
            style={{
              padding:
                "clamp(0.875rem, 2vw, 1.125rem) clamp(1.5rem, 4vw, 2.5rem)",
              fontSize: "clamp(0.875rem, 1.8vw, 1rem)",
            }}
          >
            {t.contact.whatsapp}
          </a>
          <a
            href="tel:+91XXXXXXXXXX"
            data-cursor="cta"
            className="inline-flex items-center justify-center rounded-full border border-[var(--stock)] text-[var(--stock)] font-body transition-opacity hover:opacity-80"
            style={{
              padding:
                "clamp(0.875rem, 2vw, 1.125rem) clamp(1.5rem, 4vw, 2.5rem)",
              fontSize: "clamp(0.875rem, 1.8vw, 1rem)",
            }}
          >
            {t.contact.call}
          </a>
        </div>

        <div
          className="flex flex-col sm:flex-row flex-wrap mt-[clamp(2rem,4vw,3rem)] font-mono text-[var(--stock)] opacity-50"
          style={{
            gap: "clamp(0.75rem, 2vw, 1.5rem)",
            fontSize: "clamp(0.6875rem, 1.2vw, 0.75rem)",
          }}
        >
          <span>{t.contact.phone}</span>
          <span>{t.contact.location}</span>
          <span>{t.contact.party}</span>
        </div>
      </div>
    </section>
  );
}
