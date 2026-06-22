"use client";

import { useLanguage } from "../lib/LanguageContext";

export default function Ticker() {
  const { t } = useLanguage();
  const text = `${t.ticker} `.repeat(4);

  return (
    <div
      className="w-full overflow-hidden bg-[var(--overlay)] border-y border-[var(--saffron)]/10"
      style={{ padding: "clamp(0.75rem, 2vw, 1rem) 0" }}
    >
      <div className="marquee-track flex whitespace-nowrap w-max">
        <span
          className="font-display text-[var(--saffron)] px-[clamp(1rem,3vw,2rem)]"
          style={{ fontSize: "clamp(0.875rem, 2vw, 1.2rem)" }}
        >
          {text}
        </span>
        <span
          className="font-display text-[var(--saffron)] px-[clamp(1rem,3vw,2rem)]"
          style={{ fontSize: "clamp(0.875rem, 2vw, 1.2rem)" }}
          aria-hidden
        >
          {text}
        </span>
      </div>
    </div>
  );
}
