import type { Lang } from "./content";

/** Escape text before inserting into innerHTML. */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Split text into Unicode grapheme clusters (user-perceived characters).
 * Safe for Devanagari conjuncts and combining matras.
 */
export function splitIntoGraphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("mr", { granularity: "grapheme" });
    return [...segmenter.segment(text)].map((part) => part.segment);
  }
  // Never fall back to code-unit splitting — treat whole string as one unit.
  return text ? [text] : [];
}

/**
 * Split text into words using Intl.Segmenter word boundaries.
 * Preserves complete Devanagari words without breaking conjuncts.
 */
export function splitIntoWords(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("mr", { granularity: "word" });
    return [...segmenter.segment(text)]
      .filter((part) => part.isWordLike)
      .map((part) => part.segment);
  }
  return text.split(/\s+/).filter(Boolean);
}

export function splitIntoLines(text: string): string[] {
  return text.split("\n").filter(Boolean);
}

/**
 * Marathi: animate whole words (never split conjuncts/matras).
 * English: animate grapheme clusters (safe for Latin script).
 */
export function splitForAnimation(text: string, lang: Lang): string[] {
  return lang === "mr" ? splitIntoWords(text) : splitIntoGraphemes(text);
}

export type AnimationSplitMode = "word" | "grapheme";

export function getAnimationSplitMode(lang: Lang): AnimationSplitMode {
  return lang === "mr" ? "word" : "grapheme";
}

export function getAnimationSelector(lang: Lang): string {
  return lang === "mr" ? ".split-word" : ".split-char";
}

/**
 * Build span-wrapped HTML for GSAP stagger animations without breaking Devanagari.
 */
export function wrapForAnimation(
  text: string,
  lang: Lang,
  extraClass = "inline-block"
): string {
  const units = splitForAnimation(text, lang);
  const isWordMode = lang === "mr";

  if (isWordMode) {
    return units
      .map((word) => {
        const escaped = escapeHtml(word);
        return `<span class="split-line inline-block"><span class="split-word ${extraClass}">${escaped}</span></span>`;
      })
      .join(" ");
  }

  return units
    .map((grapheme) => {
      if (grapheme === " ") {
        return `<span class="split-char ${extraClass}">&nbsp;</span>`;
      }
      return `<span class="split-char ${extraClass}">${escapeHtml(grapheme)}</span>`;
    })
    .join("");
}

/**
 * Wrap each word in a line container (for scroll headline reveals).
 */
export function wrapWordsForAnimation(
  text: string,
  extraClass = "inline-block"
): string {
  return splitIntoWords(text)
    .map((word) => {
      const escaped = escapeHtml(word);
      return `<span class="split-line"><span class="split-word ${extraClass}">${escaped}</span></span>`;
    })
    .join(" ");
}

/** @deprecated Use splitIntoGraphemes or splitForAnimation instead. */
export function splitIntoChars(text: string): string[] {
  return splitIntoGraphemes(text);
}
