"use client";

import { motion } from "framer-motion";
import { milestones } from "../data";
import { SectionHead, ease } from "./motion";

export default function Milestones() {
  return (
    <section id="milestones" className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20">
      <SectionHead title="Milestones" />

      <ol>
        {milestones.map((m, i) => (
          <motion.li
            key={m.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease }}
            className="grid gap-1 border-t border-line py-5 sm:grid-cols-[8rem_1fr] sm:gap-6"
          >
            <p className="text-sm tabular-nums text-fg-3">{m.date}</p>
            <div>
              <h3 className="text-fg">
                {m.title} <span className="ml-1 text-sm text-fg-3">· {m.type}</span>
              </h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-fg-2">{m.desc}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
