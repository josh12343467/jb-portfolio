"use client";

import { motion } from "framer-motion";
import { stack } from "../data";
import { SectionHead, ease } from "./motion";

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20">
      <SectionHead title="Stack" note="Grouped by what each tool helps me build" />

      <div className="grid gap-x-10 sm:grid-cols-2">
        {stack.map((row, i) => (
          <motion.div
            key={row.area}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease }}
            className="border-t border-line py-5"
          >
            <h3 className="text-sm text-fg-3">{row.area}</h3>
            <ul className="mt-3 space-y-2">
              {row.tools.map((tool) => (
                <li key={tool.name} className="flex items-baseline justify-between gap-4">
                  <span className="text-fg">{tool.name}</span>
                  <span className="text-sm text-fg-3">{tool.note}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
