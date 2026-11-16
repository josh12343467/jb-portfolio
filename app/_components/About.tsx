"use client";

import { Reveal, SectionHead } from "./motion";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20">
      <SectionHead title="About" />
      <div className="grid gap-6 text-[17px] leading-relaxed text-fg-2 sm:grid-cols-2 sm:gap-10">
        <Reveal>
          <p>
            I’m a fourth-year IT student at City College of Tagaytay, passionate about the intersection of{" "}
            <span className="text-fg">software and physical hardware</span>. Curiosity is my starting point.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p>
            My work spans cross-platform apps with Flutter and React Native, C++ firmware for microcontrollers, backend databases, multi-hop mesh
            networks, and interactive hardware prototypes. I enjoy connecting the pieces and turning complex ideas into practical, tangible solutions.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
