"use client";

import { Reveal, SectionHead } from "./motion";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-36">
      <SectionHead label="About" title="Curiosity is my starting point." />

      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <p className="text-2xl leading-snug sm:text-[1.75rem]">
            I’m a fourth-year IT student at City College of Tagaytay, passionate about the place where{" "}
            <span className="relative whitespace-nowrap">
              software meets
              <svg aria-hidden="true" viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-2.5 w-full text-accent">
                <path d="M2 8 C 50 2, 120 2, 198 7" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            physical hardware.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="md:col-span-5">
          <p className="leading-relaxed text-ink-2">
            My work spans cross-platform apps with Flutter and React Native, C++ firmware for microcontrollers, backend databases, multi-hop mesh
            networks, and interactive hardware prototypes. I enjoy connecting the pieces and turning complex ideas into practical, tangible solutions.
          </p>
          <dl className="mt-8 grid grid-cols-3 border-t border-line pt-5 text-sm">
            <div>
              <dt className="font-mono text-xs text-ink-3">Builds</dt>
              <dd className="mt-1 font-semibold">Software</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-ink-3">Wires</dt>
              <dd className="mt-1 font-semibold">Hardware</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-ink-3">Enjoys</dt>
              <dd className="mt-1 font-semibold">Problem solving</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
