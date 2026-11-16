"use client";

import { links } from "../data";
import { ArrowUpRight, Reveal } from "./motion";

const channels = [
  { label: "GitHub", href: links.github },
  { label: "LinkedIn", href: links.linkedin },
  { label: "Request CV", href: links.cv },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-5 pb-12 pt-16 sm:px-6 sm:pt-20">
      <Reveal>
        <div className="rounded-2xl border border-line bg-surface px-6 py-10 sm:px-10 sm:py-12">
          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-medium leading-tight tracking-[-0.02em] text-fg">
            Have an idea? <span className="font-serif italic text-accent">Let’s make it real.</span>
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-fg-2">
            I’m exploring new opportunities and always open to thoughtful conversations, collaborations, and interesting projects.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={links.email}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              Email me <ArrowUpRight className="size-3.5" />
            </a>
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm text-fg-2 transition-colors hover:border-line-strong hover:text-fg"
              >
                {c.label} <ArrowUpRight className="size-3.5" />
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      <footer className="mt-12 flex flex-col gap-2 text-sm text-fg-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Joshua Buiza. Built with curiosity.</p>
        <a href="#top" className="group inline-flex items-center gap-1.5 self-start transition-colors hover:text-fg sm:self-auto">
          Back to top <span className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
        </a>
      </footer>
    </section>
  );
}
