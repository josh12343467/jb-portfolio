"use client";

import { motion } from "framer-motion";

/** Illustration for projects without screenshots: a glass panel with soft touch ripples. */
export default function ProjectArt({ label }: { label?: string }) {
  const touches = [
    { cx: 128, cy: 96, delay: 0 },
    { cx: 236, cy: 136, delay: 1.2 },
    { cx: 180, cy: 64, delay: 2.4 },
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-surface-2 text-fg-3">
      <svg viewBox="0 0 360 220" className="w-[72%] max-w-[26rem]" fill="none" aria-hidden="true">
        <rect x="30" y="20" width="300" height="170" rx="10" stroke="currentColor" strokeWidth="1.5" />
        <rect x="44" y="34" width="272" height="142" rx="5" stroke="currentColor" strokeOpacity="0.4" strokeDasharray="3 6" />
        <path d="M162 190 154 206h52l-8-16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        {touches.map((t, i) => (
          <g key={i}>
            <motion.circle
              cx={t.cx}
              cy={t.cy}
              r="6"
              stroke="#cdb68c"
              strokeWidth="1.5"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, delay: t.delay, ease: "easeOut" }}
              style={{ transformOrigin: `${t.cx}px ${t.cy}px` }}
            />
            <circle cx={t.cx} cy={t.cy} r="3.5" fill="#cdb68c" />
          </g>
        ))}
      </svg>
      {label ? <span className="absolute bottom-3 left-4 text-xs text-fg-3">{label}</span> : null}
    </div>
  );
}
