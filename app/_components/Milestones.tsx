"use client";

import { motion } from "framer-motion";
import { milestones } from "../data";
import { SectionHead, ease } from "./motion";

export default function Milestones() {
  return (
    <section id="milestones" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-36">
        <SectionHead label="Milestones" title="Small steps, real progress." />

        <ol className="border-b border-ink">
          {milestones.map((m, i) => (
            <motion.li
              key={m.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="group grid gap-3 border-t border-ink py-8 md:grid-cols-12 md:gap-6"
            >
              <p className="font-mono text-sm text-ink-2 md:col-span-3">{m.date}</p>
              <div className="md:col-span-6">
                <h3 className="text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-accent-ink sm:text-3xl">{m.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-2">{m.desc}</p>
              </div>
              <p className="md:col-span-3 md:text-right">
                <span className="inline-block rounded-full border border-ink/20 px-3 py-1 text-xs font-medium">{m.type}</span>
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
