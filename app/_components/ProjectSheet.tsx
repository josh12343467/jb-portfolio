"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "../data";
import { ArrowRight, ArrowUpRight, ease } from "./motion";
import ProjectArt from "./ProjectArt";

type Media = { type: "video" | "image"; src: string; label: string };

function mediaFor(project: Project): Media[] {
  return [
    ...(project.video ? [{ type: "video" as const, src: project.video, label: "Demo video" }] : []),
    ...(project.images ?? []).map((src, i) => ({ type: "image" as const, src, label: project.imageLabels?.[i] ?? `Screen ${i + 1}` })),
  ];
}

function MediaViewer({ project }: { project: Project }) {
  const media = mediaFor(project);
  const [index, setIndex] = useState(0);
  const current = media[index];

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface-2">
        {current ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              {current.type === "video" ? (
                <video src={current.src} autoPlay loop muted controls playsInline className="h-full w-full object-contain" />
              ) : (
                <Image src={current.src} alt={`${project.title}: ${current.label}`} fill sizes="(min-width: 768px) 640px, 100vw" className="object-contain" />
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <ProjectArt label="Photos coming soon" />
        )}
      </div>

      {media.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Project media">
          {media.map((m, i) => (
            <button
              key={m.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs transition-colors ${
                i === index ? "bg-fg text-bg" : "bg-surface-2 text-fg-2 hover:text-fg"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h4 className="mb-3 text-sm font-medium text-fg">{title}</h4>
      {children}
    </section>
  );
}

export default function ProjectSheet({
  project,
  onClose,
  onNavigate,
}: {
  project: Project;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const i = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(i + 1) % projects.length];

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const goNext = () => {
    onNavigate(next.slug);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease }}
        className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col border-l border-line bg-bg"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5 sm:px-8">
          <p className="text-sm text-fg-3">
            {i + 1} of {projects.length}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project"
            className="flex size-9 items-center justify-center rounded-full text-fg-2 transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div ref={scrollRef} className="thin-scrollbar flex-1 overflow-y-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
              className="px-5 pb-14 pt-8 sm:px-8"
            >
              <p className="text-sm text-fg-3">
                {project.category} · {project.year}
              </p>
              <h3 id="sheet-title" className="mt-2 text-3xl font-medium tracking-[-0.02em] text-fg sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-4 text-[17px] leading-relaxed text-fg-2">{project.desc}</p>

              {(project.liveUrl || project.repositoryUrl) && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85">
                      Live demo <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                  {project.repositoryUrl && (
                    <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-fg-2 transition-colors hover:border-line-strong hover:text-fg">
                      Source code <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                </div>
              )}

              <div className="mt-8">
                <MediaViewer project={project} />
              </div>

              <Block title="Overview">
                <p className="leading-relaxed text-fg-2">{project.fullDesc}</p>
              </Block>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-surface p-5">
                  <h4 className="text-sm font-medium text-fg">The problem</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{project.problem}</p>
                </div>
                <div className="rounded-xl bg-surface p-5">
                  <h4 className="text-sm font-medium text-fg">The approach</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{project.approach}</p>
                </div>
              </div>

              <Block title="What I did">
                <ul className="space-y-2.5">
                  {project.contributions.map((c) => (
                    <li key={c} className="flex gap-3 leading-relaxed text-fg-2">
                      <span aria-hidden="true" className="mt-[0.7em] size-1 shrink-0 rounded-full bg-accent" />
                      {c}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Features">
                <ul className="flex flex-wrap gap-2">
                  {project.features.map((f) => (
                    <li key={f} className="rounded-full bg-surface-2 px-3 py-1.5 text-sm text-fg-2">
                      {f}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Outcome">
                <p className="leading-relaxed text-fg-2">{project.outcome}</p>
              </Block>

              <Block title="Built with">
                <p className="text-fg-2">{project.tags.join(", ")}</p>
              </Block>

              <button
                type="button"
                onClick={goNext}
                className="group mt-12 flex w-full items-center justify-between gap-6 rounded-xl border border-line px-5 py-4 text-left transition-colors hover:border-line-strong hover:bg-surface"
              >
                <span>
                  <span className="block text-xs text-fg-3">Next project</span>
                  <span className="mt-0.5 block text-base font-medium text-fg">{next.title}</span>
                </span>
                <ArrowRight className="size-5 text-fg-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.article>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
