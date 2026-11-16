"use client";

import { motion } from "framer-motion";
import { links } from "../data";
import { ArrowUpRight, MaskText, Reveal, ease } from "./motion";

const channels = [
  { label: "GitHub", href: links.github, note: "Code and side projects" },
  { label: "LinkedIn", href: links.linkedin, note: "Experience and updates" },
  { label: "Request my CV", href: links.cv, note: "I’ll send it by email" },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-24 sm:px-8 md:pt-36">
        <p className="mb-6 font-mono text-xs text-paper/50">§ Contact</p>
        <h2 className="text-[clamp(2.8rem,9vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
          <MaskText text="Have an idea?" />
          <br />
          <MaskText text="Let’s make it real." delay={0.15} className="text-accent" />
        </h2>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-lg leading-snug text-paper/70">
            I’m exploring new opportunities and always open to thoughtful conversations, collaborations, and interesting projects.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <a
            href={links.email}
            target="_blank"
            rel="noreferrer"
            className="group mt-12 inline-flex items-center gap-4 rounded-full bg-paper px-7 py-4 text-lg font-bold text-ink transition-colors hover:bg-accent hover:text-paper"
          >
            Send me an email
            <span className="flex size-8 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight />
            </span>
          </a>
        </Reveal>

        <ul className="mt-20 border-t border-paper/20">
          {channels.map((c, i) => (
            <motion.li
              key={c.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease }}
              className="border-b border-paper/20"
            >
              <a href={c.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-6 py-6">
                <span className="text-3xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">{c.label}</span>
                <span className="flex items-center gap-4 text-paper/50">
                  <span className="hidden text-sm sm:inline">{c.note}</span>
                  <ArrowUpRight className="size-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        <footer className="mt-24 flex flex-col gap-3 font-mono text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Joshua Buiza. Built with curiosity.</p>
          <a href="#top" className="group inline-flex items-center gap-2 self-start transition-colors hover:text-paper sm:self-auto">
            Back to top <span className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
