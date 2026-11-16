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
      <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-ink/15 bg-paper-2">
        {current ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.3, ease }}
              className="absolute inset-0"
            >
              {current.type === "video" ? (
                <video src={current.src} autoPlay loop muted controls playsInline className="h-full w-full object-contain" />
              ) : (
                <Image src={current.src} alt={`${project.title}: ${current.label}`} fill sizes="(min-width: 1024px) 50rem, 100vw" className="object-contain p-2" />
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <ProjectArt label="Concept illustration — photos coming soon" />
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
              className={`relative shrink-0 rounded-md border px-3 py-2 text-left text-xs transition-colors ${
                i === index ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink-2 hover:border-ink/40 hover:text-ink"
              }`}
            >
              <span className="font-mono opacity-60">{String(i + 1).padStart(2, "0")}</span> {m.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8">
      <h4 className="mb-4 font-mono text-xs text-ink-3">{title}</h4>
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
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.6, ease }}
        className="absolute inset-y-0 right-0 flex w-full max-w-3xl flex-col bg-paper shadow-[-24px_0_60px_-30px_rgba(27,26,23,0.5)]"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5 sm:px-8">
          <p className="font-mono text-xs text-ink-3">
            Case study {project.number} / {String(projects.length).padStart(2, "0")}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-ink"
          >
            Close
            <svg viewBox="0 0 24 24" className="size-4 transition-transform duration-300 group-hover:rotate-90" fill="none" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div ref={scrollRef} className="thin-scrollbar flex-1 overflow-y-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease }}
              className="px-5 pb-16 pt-10 sm:px-8"
            >
              <p className="font-mono text-xs text-accent-ink">{project.category}</p>
              <h3 id="sheet-title" className="mt-3 text-[clamp(2.4rem,7vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
                {project.title}
              </h3>
              <p className="mt-5 max-w-2xl text-lg leading-snug text-ink-2">{project.desc}</p>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 text-sm sm:grid-cols-4">
                <div>
                  <dt className="font-mono text-xs text-ink-3">Year</dt>
                  <dd className="mt-1 font-semibold">{project.year}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-mono text-xs text-ink-3">Built with</dt>
                  <dd className="mt-1 font-semibold">{project.tags.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-ink-3">Links</dt>
                  <dd className="mt-1 flex flex-col gap-1 font-semibold">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="draw-underline inline-flex w-fit items-center gap-1">
                        Live demo <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                    {project.repositoryUrl && (
                      <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="draw-underline inline-flex w-fit items-center gap-1">
                        Source code <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                    {!project.liveUrl && !project.repositoryUrl && <span className="font-normal text-ink-3">Not public yet</span>}
                  </dd>
                </div>
              </dl>

              <div className="mt-8">
                <MediaViewer project={project} />
              </div>

              <div className="mt-10">
                <Block title="Overview">
                  <p className="leading-relaxed text-ink-2">{project.fullDesc}</p>
                </Block>

                <section className="grid gap-8 border-t border-line py-8 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-mono text-xs text-ink-3">The problem</h4>
                    <p className="leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="mb-3 font-mono text-xs text-ink-3">The approach</h4>
                    <p className="leading-relaxed">{project.approach}</p>
                  </div>
                </section>

                <Block title="What I did">
                  <ol className="space-y-3">
                    {project.contributions.map((c, n) => (
                      <li key={c} className="flex gap-4 leading-relaxed">
                        <span className="mt-0.5 font-mono text-xs text-accent-ink">{String(n + 1).padStart(2, "0")}</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ol>
                </Block>

                <Block title="Features">
                  <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {project.features.map((f) => (
                      <li key={f} className="flex gap-3 text-ink-2">
                        <span aria-hidden="true" className="text-accent">—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </Block>

                <Block title="Outcome">
                  <p className="border-l-[3px] border-accent pl-5 text-xl leading-snug">{project.outcome}</p>
                </Block>
              </div>

              <button
                type="button"
                onClick={goNext}
                className="group mt-6 flex w-full items-center justify-between gap-6 rounded-md bg-ink px-6 py-6 text-left text-paper transition-colors hover:bg-accent-ink"
              >
                <span>
                  <span className="block font-mono text-xs text-paper/60">Next project</span>
                  <span className="mt-1 block text-2xl font-bold tracking-tight">{next.title}</span>
                </span>
                <ArrowRight className="size-6 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </motion.article>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
