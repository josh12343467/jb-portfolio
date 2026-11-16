"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Reveals a line of text word by word, each word sliding up from behind a mask. */
export function MaskText({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  onLoad = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view */
  onLoad?: boolean;
}) {
  const words = text.split(" ");
  // The trigger sits on the whole line: each word starts clipped by its mask,
  // so it would never count as "in view" by itself.
  const trigger = onLoad ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.5 } };

  return (
    <motion.span className={className} aria-label={text} initial="hidden" {...trigger}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 0.85, delay: delay + i * stagger, ease } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  );
}

/** Small section heading used across the page: a "§ Label" line above a large title. */
export function SectionHead({ label, title, aside }: { label: string; title: string; aside?: ReactNode }) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div>
        <Reveal y={12}>
          <p className="mb-4 font-mono text-xs text-ink-3">§ {label}</p>
        </Reveal>
        <h2 className="max-w-3xl text-[clamp(2.4rem,6vw,4.75rem)] font-bold leading-[0.95] tracking-[-0.035em]">
          <MaskText text={title} />
        </h2>
      </div>
      {aside ? <Reveal delay={0.15} className="md:max-w-xs md:text-right">{aside}</Reveal> : null}
    </div>
  );
}

export function ArrowUpRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
