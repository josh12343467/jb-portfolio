"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { links } from "../data";
import { ArrowUpRight, ease } from "./motion";

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section id="top" className="mx-auto max-w-4xl px-5 pb-12 pt-32 sm:px-6 sm:pb-20 sm:pt-40">
      <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.09, delayChildren: 0.1 }}>
        <motion.div variants={item} className="flex items-center gap-4">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-surface-2 ring-1 ring-line">
            {photoFailed ? (
              <span className="flex h-full items-center justify-center text-sm font-medium text-fg-2">JB</span>
            ) : (
              <Image src="/profile.jpg" alt="Joshua Buiza" fill priority sizes="56px" className="object-cover" onError={() => setPhotoFailed(true)} />
            )}
          </div>
          <div className="text-sm leading-tight">
            <p className="font-medium text-fg">Joshua Buiza</p>
            <p className="mt-1 text-fg-3">IT student · City College of Tagaytay</p>
          </div>
        </motion.div>

        <motion.h1 variants={item} className="mt-10 max-w-3xl text-[clamp(2.1rem,5.2vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.02em] text-fg">
          I bring <span className="font-serif text-[1.08em] italic text-accent">software and hardware</span> together to make useful,
          thoughtful things.
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-fg-2">
          From mobile apps to connected prototypes. Builder, and curious by nature.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="inline-flex items-center rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            View my work
          </a>
          <a
            href={links.email}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm text-fg-2 transition-colors hover:border-line-strong hover:text-fg"
          >
            Email me <ArrowUpRight className="size-3.5" />
          </a>
          <a
            href={links.cv}
            target="_blank"
            rel="noreferrer"
            aria-label="Request a copy of my resume by email"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm text-fg-2 transition-colors hover:border-line-strong hover:text-fg"
          >
            Request CV <ArrowUpRight className="size-3.5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
