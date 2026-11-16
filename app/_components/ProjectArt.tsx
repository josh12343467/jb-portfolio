"use client";

import { motion } from "framer-motion";

/** Illustration for projects without screenshots: a glass panel with touch ripples. */
export default function ProjectArt({ label }: { label?: string }) {
  const touches = [
    { cx: 120, cy: 92, delay: 0 },
    { cx: 236, cy: 140, delay: 1.1 },
    { cx: 176, cy: 60, delay: 2.2 },
  ];

  return (
    <div className="graph-paper relative flex h-full w-full items-center justify-center bg-paper-2">
      <svg viewBox="0 0 360 220" className="w-[78%] max-w-[30rem]" fill="none" aria-hidden="true">
        {/* panel */}
        <rect x="30" y="20" width="300" height="170" rx="6" className="fill-paper" stroke="currentColor" strokeOpacity="0.8" strokeWidth="2" />
        <rect x="42" y="32" width="276" height="146" rx="3" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="4 5" />
        {/* stand */}
        <path d="M160 190 150 208h60l-10-18" stroke="currentColor" strokeOpacity="0.8" strokeWidth="2" strokeLinejoin="round" />
        {/* sensor edge marks */}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1={54 + i * 23} x2={54 + i * 23} y1="20" y2="26" stroke="currentColor" strokeOpacity="0.5" />
        ))}
        {touches.map((t, i) => (
          <g key={i}>
            <motion.circle
              cx={t.cx}
              cy={t.cy}
              r="6"
              stroke="#e0552b"
              strokeWidth="2"
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: 4.5, opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, delay: t.delay, ease: "easeOut" }}
              style={{ transformOrigin: `${t.cx}px ${t.cy}px` }}
            />
            <circle cx={t.cx} cy={t.cy} r="4" fill="#e0552b" />
          </g>
        ))}
      </svg>
      {label ? <span className="absolute bottom-3 left-4 font-mono text-[11px] text-ink-3">{label}</span> : null}
    </div>
  );
}
