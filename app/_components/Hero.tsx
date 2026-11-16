"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { links } from "../data";
import { ArrowRight, ArrowUpRight, ease } from "./motion";

function Letters({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "105%", rotate: 6 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.045, ease }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden">
      <div aria-hidden="true" className="graph-paper pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_30%,transparent)]" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-32 sm:px-8 md:pt-40 lg:grid-cols-[1.35fr_.65fr] lg:items-end lg:gap-10 lg:pb-28">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mb-6 font-mono text-xs text-ink-2 sm:text-sm"
          >
            IT student · Builder · Curious by nature
          </motion.p>

          <motion.h1 style={{ y: nameY }} className="text-[clamp(4.2rem,15vw,10.5rem)] font-extrabold leading-[0.84] tracking-[-0.055em]">
            <span className="sr-only">Joshua Buiza</span>
            <Letters word="Joshua" delay={0.2} />
            <span className="flex items-end gap-[0.06em]">
              <Letters word="Buiza" delay={0.45} />
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 16, delay: 0.95 }}
                className="mb-[0.14em] inline-block size-[0.16em] rounded-full bg-accent"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            className="mt-10 max-w-xl text-xl leading-snug text-ink-2 sm:text-2xl"
          >
            I bring software and hardware together to make useful, thoughtful things, from mobile apps to{" "}
            <span className="text-ink">connected prototypes</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-ink"
            >
              See my work
              <ArrowRight className="size-4 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a href={links.email} target="_blank" rel="noreferrer" className="draw-underline inline-flex items-center gap-1.5 text-sm font-semibold">
              Email me <ArrowUpRight />
            </a>
            <a href={links.cv} target="_blank" rel="noreferrer" aria-label="Request a copy of my resume by email" className="draw-underline inline-flex items-center gap-1.5 text-sm font-semibold">
              Request CV <ArrowUpRight />
            </a>
          </motion.div>
        </div>

        <motion.figure
          style={{ y: photoY }}
          initial={{ opacity: 0, rotate: 9, y: 40 }}
          animate={{ opacity: 1, rotate: 2.5, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          className="relative mx-auto w-full max-w-[19rem] bg-white p-3 pb-12 shadow-[0_18px_40px_-18px_rgba(27,26,23,0.45)] lg:mx-0 lg:ml-auto"
        >
          {/* tape */}
          <span aria-hidden="true" className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-3 bg-paper-2/80 shadow-sm" />
          <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
            {photoFailed ? (
              <span className="flex h-full items-center justify-center text-7xl font-extrabold text-ink-3">JB</span>
            ) : (
              <Image
                src="/profile.jpg"
                alt="Portrait of Joshua Buiza"
                fill
                priority
                sizes="(min-width: 1024px) 18rem, 70vw"
                className="object-cover"
                onError={() => setPhotoFailed(true)}
              />
            )}
          </div>
          <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between font-mono text-[11px] text-ink-2">
            <span>J. Buiza</span>
            <span>City College of Tagaytay</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
