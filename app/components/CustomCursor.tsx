"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "../lib/LanguageContext";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || window.matchMedia("(pointer: coarse)").matches);

    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onEnterCta = () => {
      ring.classList.add("is-cta");
      ring.classList.remove("is-image");
      if (label) label.textContent = "";
    };

    const onLeaveCta = () => {
      ring.classList.remove("is-cta");
    };

    const onEnterImage = () => {
      ring.classList.add("is-image");
      ring.classList.remove("is-cta");
      if (label) label.textContent = t.cursor.view;
    };

    const onLeaveImage = () => {
      ring.classList.remove("is-image");
      if (label) label.textContent = "";
    };

    const bindInteractive = () => {
      document
        .querySelectorAll('[data-cursor="cta"]')
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnterCta);
          el.addEventListener("mouseleave", onLeaveCta);
        });
      document
        .querySelectorAll('[data-cursor="image"]')
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnterImage);
          el.addEventListener("mouseleave", onLeaveImage);
        });
    };

    window.addEventListener("mousemove", onMove);
    bindInteractive();

    const observer = new MutationObserver(bindInteractive);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      document.querySelectorAll('[data-cursor="cta"]').forEach((el) => {
        el.removeEventListener("mouseenter", onEnterCta);
        el.removeEventListener("mouseleave", onLeaveCta);
      });
      document.querySelectorAll('[data-cursor="image"]').forEach((el) => {
        el.removeEventListener("mouseenter", onEnterImage);
        el.removeEventListener("mouseleave", onLeaveImage);
      });
    };
  }, [t.cursor.view]);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot hidden md:block" aria-hidden />
      <div ref={ringRef} className="custom-cursor-ring hidden md:block" aria-hidden>
        <span
          ref={labelRef}
          className={`text-white ${lang === "en" ? "uppercase tracking-wider" : ""}`}
        />
      </div>
    </>
  );
}
