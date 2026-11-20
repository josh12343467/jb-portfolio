"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { projects, type Project } from "../data";
import { ArrowUpRight, SectionHead, ease } from "./motion";
import ProjectArt from "./ProjectArt";
import ProjectSheet from "./ProjectSheet";

function ProjectCard({ project, index, featured, onOpen }: { project: Project; index: number; featured: boolean; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Open the ${project.title} case study`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease }}
      whileHover={{ y: -4 }}
      className={`group flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left transition-colors duration-300 hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        featured ? "sm:col-span-2 md:flex-row" : ""
      }`}
    >
      <div className={`relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-surface-2 ${featured ? "md:aspect-auto md:min-h-[20rem] md:w-[58%]" : ""}`}>
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt=""
              fill
              sizes={featured ? "(min-width: 768px) 520px, 100vw" : "(min-width: 640px) 440px, 100vw"}
              className="object-cover object-top opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
          ) : (
            <ProjectArt />
          )}
        </div>
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "md:p-8" : ""}`}>
        <p className="text-xs text-fg-3">
          {project.category} · {project.year}
        </p>
        <h3 className="mt-2 flex items-center gap-2 text-xl font-medium text-fg">
          {project.title}
          <ArrowUpRight className="size-4 text-fg-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{project.desc}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs text-fg-2">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.button>
  );
}

export default function Work() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openProject = projects.find((p) => p.slug === openSlug) ?? null;

  return (
    <section id="work" className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20">
      <SectionHead title="Projects" note="Open a project for screenshots and details" />

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, i) => {
          // The first project is featured. If the rest don't fill the two-column grid evenly,
          // the last one goes full width too, so no card is left alone in a half-empty row.
          const lastIsAlone = i === projects.length - 1 && (projects.length - 1) % 2 === 1;
          return (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              featured={i === 0 || lastIsAlone}
              onOpen={() => setOpenSlug(project.slug)}
            />
          );
        })}
      </div>

      <AnimatePresence>
        {openProject && <ProjectSheet project={openProject} onClose={() => setOpenSlug(null)} onNavigate={setOpenSlug} />}
      </AnimatePresence>
    </section>
  );
}
