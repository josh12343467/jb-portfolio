"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { projects, type Project } from "../data";
import { ArrowRight, Reveal, SectionHead, ease } from "./motion";
import ProjectArt from "./ProjectArt";
import ProjectSheet from "./ProjectSheet";

function ProjectRow({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const flipped = index % 2 === 1;

  return (
    <article ref={ref} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={`Open the ${project.title} case study`}
        initial={{ clipPath: "inset(12% 12% 12% 12%)", opacity: 0 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease }}
        className={`group relative block aspect-[16/11] w-full cursor-pointer overflow-hidden rounded-md border border-ink/15 bg-paper-2 md:col-span-7 ${flipped ? "md:order-2" : ""}`}
      >
        <motion.div style={{ y: imageY }} className="absolute -inset-y-[8%] inset-x-0">
          <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]">
            {project.thumbnail ? (
              <Image src={project.thumbnail} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover object-top" />
            ) : (
              <ProjectArt />
            )}
          </div>
        </motion.div>
        <span className="absolute bottom-4 right-4 inline-flex translate-y-2 items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View case study <ArrowRight className="size-3.5" />
        </span>
      </motion.button>

      <Reveal delay={0.1} className={`md:col-span-5 ${flipped ? "md:order-1" : ""}`}>
        <p className="font-mono text-xs text-ink-3">
          {project.number} — {project.category} — {project.year}
        </p>
        <h3 className="mt-4 text-4xl font-bold leading-none tracking-[-0.03em] sm:text-5xl">{project.title}</h3>
        <p className="mt-5 leading-relaxed text-ink-2">{project.desc}</p>
        <p className="mt-5 font-mono text-xs leading-6 text-ink-3">{project.tags.join("  /  ")}</p>
        <button
          type="button"
          onClick={onOpen}
          className="group mt-8 inline-flex items-center gap-3 border-b-2 border-ink pb-1 text-sm font-semibold transition-colors hover:border-accent hover:text-accent-ink"
        >
          Read the case study
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </Reveal>
    </article>
  );
}

export default function Work() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openProject = projects.find((p) => p.slug === openSlug) ?? null;

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-36">
      <SectionHead
        label="Selected work"
        title="Things I’ve built."
        aside={<p className="text-sm leading-relaxed text-ink-2">Open any project for screenshots, demos, and how it came together.</p>}
      />

      <div className="flex flex-col gap-24 md:gap-36">
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} onOpen={() => setOpenSlug(project.slug)} />
        ))}
      </div>

      <AnimatePresence>
        {openProject && <ProjectSheet project={openProject} onClose={() => setOpenSlug(null)} onNavigate={setOpenSlug} />}
      </AnimatePresence>
    </section>
  );
}
