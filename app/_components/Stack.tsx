"use client";

import { motion } from "framer-motion";
import { stack } from "../data";
import { SectionHead, ease } from "./motion";

export default function Stack() {
  const toolCount = stack.reduce((n, row) => n + row.tools.length, 0);

  return (
    <section id="stack" className="border-t border-line bg-paper-2/50">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-36">
        <SectionHead
          label="Stack"
          title="What I work with."
          aside={
            <p className="text-sm leading-relaxed text-ink-2">
              {stack.length} areas, {toolCount} tools. Grouped by what each one helps me build.
            </p>
          }
        />

        <div role="table" aria-label="Tech stack" className="border-b border-ink">
          <div role="row" className="hidden grid-cols-12 gap-6 border-b border-ink pb-3 font-mono text-xs text-ink-3 md:grid">
            <span role="columnheader" className="col-span-3">Area</span>
            <span role="columnheader" className="col-span-5">Tools</span>
            <span role="columnheader" className="col-span-4">What for</span>
          </div>

          {stack.map((row, i) => (
            <motion.div
              role="row"
              key={row.area}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease }}
              className={`group relative grid gap-3 py-6 md:grid-cols-12 md:gap-6 md:py-7 ${i === 0 ? "" : "border-t border-line"}`}
            >
              <span aria-hidden="true" className="absolute inset-y-0 -left-5 w-[3px] origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100 sm:-left-8" />
              <div role="cell" className="flex items-baseline gap-3 md:col-span-3">
                <span className="font-mono text-xs text-ink-3">0{i + 1}</span>
                <span className="text-xl font-bold tracking-tight">{row.area}</span>
              </div>
              <div role="cell" className="flex flex-wrap gap-2 md:col-span-5">
                {row.tools.map((tool) => (
                  <span
                    key={tool.name}
                    className="inline-flex items-baseline gap-2 rounded-full border border-ink/15 bg-paper px-3.5 py-1.5 transition-colors group-hover:border-ink/40"
                  >
                    <span className="font-semibold">{tool.name}</span>
                    <span className="text-xs text-ink-3">{tool.note}</span>
                  </span>
                ))}
              </div>
              <p role="cell" className="text-ink-2 md:col-span-4">{row.purpose}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
