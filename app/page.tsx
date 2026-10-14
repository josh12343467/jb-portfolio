"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useState, type MouseEvent, type ReactNode } from "react";

const skillGroups = [
  {
    number: "01",
    title: "Apps & Interfaces",
    subtitle: "BUILD FOR THE SCREEN",
    description: "Tools for shaping useful, responsive digital experiences.",
    symbol: "✳",
    accent: "lime",
    skills: [
      { name: "Flutter", mark: "Fl", note: "Cross-platform" },
      { name: "React Native", mark: "RN", note: "Mobile" },
      { name: "Next.js", mark: "N", note: "Web" },
      { name: "Tailwind CSS", mark: "Tw", note: "Styling" },
    ],
  },
  {
    number: "02",
    title: "Logic & Tooling",
    subtitle: "MAKE IT WORK",
    description: "Programming languages and everyday development tools.",
    symbol: "⌘",
    accent: "violet",
    skills: [
      { name: "C++", mark: "C++", note: "Programming" },
      { name: "Python", mark: "Py", note: "Programming" },
      { name: "Git", mark: "Gt", note: "Version control" },
    ],
  },
  {
    number: "03",
    title: "Platforms & Prototyping",
    subtitle: "CONNECT IDEAS",
    description: "Building blocks for connected services and tangible experiments.",
    symbol: "⌬",
    accent: "orange",
    skills: [
      { name: "Firebase", mark: "Fb", note: "Platform" },
      { name: "Hardware Prototyping", mark: "HW", note: "Physical systems" },
    ],
  },
];

const projects = [
  {
    number: "01",
    title: "Interactive Glass Board",
    category: "HARDWARE · INTERACTION",
    desc: "A custom hardware and software experience for interactive displays, built to move beyond traditional mesh setups.",
    tags: ["Hardware", "C++", "UI/UX"],
    accent: "lime",
    visual: "grid",
  },
  {
    number: "02",
    title: "Mobile Money Tracker",
    category: "MOBILE · PRODUCTIVITY",
    desc: "A personal finance app with local notifications that helps make everyday expenses easier to monitor.",
    tags: ["Mobile App", "React Native", "Flutter"],
    accent: "violet",
    visual: "orbit",
  },
  {
    number: "03",
    title: "Smart Home Prototype",
    category: "IOT · CONNECTED SYSTEMS",
    desc: "An integrated IoT prototype combining custom hardware circuitry with a companion Flutter application.",
    tags: ["IoT", "Flutter", "C++"],
    accent: "orange",
    visual: "circuit",
  },
];

const achievements = [
  {
    year: "AUG 2026",
    title: "TOPCIT Examination",
    type: "CERTIFICATION",
    desc: "Completed the Test of Practical Competency in IT (TOPCIT).",
  },
  {
    year: "SEP 2026",
    title: "1st Place, Best Poster - MIRC 2026",
    type: "RESEARCH · AWARD",
    desc: "Awarded 1st Place for Best Poster Presentation at the Manila International Research Conference.",
  },
];

const navItems = [
  { label: "About", id: "about" },
  { label: "Stack", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Journey", id: "achievements" },
  { label: "Contact", id: "contact" },
];

function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
      <span className="font-mono text-[#d5fc69]">{number}</span>
      <span className="h-px w-8 bg-neutral-700" />
      <span>{children}</span>
    </div>
  );
}

function SectionWrapper({ children, id, className = "" }: { children: ReactNode; id: string; className?: string; }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.12 }}
      className={`relative mx-auto w-full max-w-6xl scroll-mt-28 px-5 py-20 sm:px-8 md:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function ProjectVisual({ visual }: { visual: string }) {
  if (visual === "grid") {
    return (
      <div className="project-grid-visual relative flex h-full min-h-[180px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121710]">
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(213,252,105,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(213,252,105,.12) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <motion.div
          animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.04, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#d5fc69]/60 bg-[#d5fc69]/[0.08] shadow-[0_0_70px_rgba(213,252,105,0.08)]"
        >
          <div className="h-12 w-12 rounded-2xl border border-[#d5fc69]" />
          <span className="absolute -right-2 top-4 h-3 w-3 rounded-full bg-[#d5fc69] shadow-[0_0_20px_#d5fc69]" />
          <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-white" />
        </motion.div>
        <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d5fc69]/70">Interactive system / 001</span>
      </div>
    );
  }

  if (visual === "orbit") {
    return (
      <div className="relative flex h-full min-h-[180px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[#17131d]">
        <div className="absolute h-44 w-44 rounded-full border border-violet-300/15" />
        <div className="absolute h-32 w-32 rounded-full border border-violet-300/20" />
        <div className="absolute h-20 w-20 rounded-full border border-violet-300/30" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }} className="absolute h-36 w-36">
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-violet-300 shadow-[0_0_24px_rgba(196,181,253,0.8)]" />
        </motion.div>
        <div className="relative flex h-[68px] w-[68px] items-center justify-center rounded-[22px] border border-violet-200/25 bg-violet-300/10 text-violet-100 shadow-[0_0_70px_rgba(167,139,250,0.14)]">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true"><rect x="6" y="2.75" width="12" height="18.5" rx="2.7" stroke="currentColor" strokeWidth="1.4" /><path d="M9 6h6M10 18h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
        </div>
        <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-violet-200/65">Everyday finance / 002</span>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[180px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1b1510]">
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(rgba(253,186,116,.34) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
      <svg className="relative h-32 w-52 text-orange-200/80" viewBox="0 0 220 130" fill="none" aria-hidden="true">
        <path d="M15 65h36l18-28h33l18 28h28l19-25h38M15 65l25 29h45l17-19h42l26 20h35" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="83" y="49" width="48" height="34" rx="7" stroke="currentColor" strokeWidth="1.4" />
        <path d="M95 61h24M95 70h15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        {[[15,65],[51,65],[102,37],[148,65],[205,40],[40,94],[85,94],[159,75],[201,95]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="3" fill="#fdba74" />)}
      </svg>
      <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-orange-200/65">Connected living / 003</span>
    </div>
  );
}

function ProjectCard({ proj, index }: { proj: (typeof projects)[number]; index: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -7 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/[0.09] bg-[#111311] p-4 transition-colors duration-300 hover:border-[#d5fc69]/30 sm:p-5"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(213,252,105,0.075), transparent 45%)` }}
      />
      <div className="relative mb-5">
        <ProjectVisual visual={proj.visual} />
        <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/45 px-3 py-1 font-mono text-[10px] text-white/60 backdrop-blur">{proj.number} / 03</span>
      </div>
      <div className="relative flex flex-1 flex-col px-2 pb-3">
        <p className="mb-3 text-[9px] font-semibold tracking-[0.2em] text-[#d5fc69]/75">{proj.category}</p>
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#d5fc69] sm:text-2xl">{proj.title}</h3>
          <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-all duration-300 group-hover:border-[#d5fc69]/40 group-hover:bg-[#d5fc69] group-hover:text-[#10120b]"><ArrowUpRight /></span>
        </div>
        <p className="mb-6 flex-1 text-sm leading-7 text-neutral-400">{proj.desc}</p>
        <div className="flex flex-wrap gap-2">
          {proj.tags.map((tag) => <span key={tag} className="rounded-full border border-white/[0.09] bg-white/[0.025] px-3 py-1.5 text-[11px] text-neutral-300">{tag}</span>)}
        </div>
      </div>
    </motion.article>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const titleLetters = "Joshua".split("");

  return (
    <main className="portfolio-shell relative min-h-screen overflow-hidden bg-[#0b0d0b] text-[#f3f3ec] selection:bg-[#d5fc69] selection:text-[#11130c]">
      <style>{`
        html { scroll-behavior: smooth; background: #0b0d0b; }
        body { margin: 0; background: #0b0d0b; }
        .portfolio-shell { isolation: isolate; }
        .portfolio-shell::before { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none; background-image: linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px); background-size: 74px 74px; mask-image: linear-gradient(to bottom, black, transparent 78%); }
        .hero-orb { animation: drift 13s ease-in-out infinite alternate; }
        .project-grid-visual { isolation: isolate; }
        @keyframes drift { from { transform: translate3d(0,-8px,0) scale(1); } to { transform: translate3d(14px,14px,0) scale(1.06); } }
        @media (prefers-reduced-motion: reduce) { .portfolio-shell *, .portfolio-shell *::before, .portfolio-shell *::after { scroll-behavior: auto !important; } }
      `}</style>

      <motion.div className="fixed left-0 right-0 top-0 z-[100] h-[3px] origin-left bg-[#d5fc69]" style={{ scaleX }} />

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] overflow-hidden">
        <div className="hero-orb absolute -right-36 top-16 h-[430px] w-[430px] rounded-full bg-[#a4ca4b]/[0.09] blur-[130px]" />
        <div className="absolute -left-40 top-72 h-[360px] w-[360px] rounded-full bg-violet-500/[0.055] blur-[120px]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-4 sm:px-6 sm:pt-5">
        <motion.nav
          initial={{ y: -22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Main navigation"
          className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/[0.09] bg-[#111311]/85 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:rounded-full sm:px-5"
        >
          <button onClick={() => scrollTo("hero")} className="group flex items-center gap-2.5 text-left" aria-label="Back to top">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d5fc69] font-mono text-sm font-black tracking-tighter text-[#10120b] transition-transform duration-300 group-hover:rotate-[-7deg]">JB.</span>
            <span className="hidden text-sm font-semibold tracking-tight text-white min-[380px]:inline">Joshua Buiza<span className="ml-2 text-neutral-500">/ Portfolio</span></span>
          </button>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="rounded-full px-3.5 py-2 text-xs font-medium text-neutral-400 transition-all duration-200 hover:bg-white/[0.06] hover:text-[#d5fc69] lg:px-4 lg:text-sm">
                {item.label}
              </button>
            ))}
          </div>
          <button onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-200 transition-colors hover:border-[#d5fc69]/50 md:hidden">
            {menuOpen ? <span className="text-xl leading-none">×</span> : <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true"><path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>}
          </button>
        </motion.nav>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-2 grid max-w-6xl grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-[#111311]/95 p-2 shadow-2xl backdrop-blur-xl md:hidden">
            {navItems.map((item) => <button key={item.id} onClick={() => scrollTo(item.id)} className="rounded-xl px-4 py-3 text-left text-sm text-neutral-300 transition-colors hover:bg-white/[0.06] hover:text-[#d5fc69]">{item.label}<span className="float-right font-mono text-xs text-neutral-600">↗</span></button>)}
          </motion.div>
        )}
      </header>

      <section id="hero" className="relative mx-auto flex min-h-[790px] w-full max-w-6xl scroll-mt-20 items-center px-5 pb-20 pt-36 sm:px-8 sm:pt-40 lg:min-h-[860px] lg:pb-28">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-8">
          <div className="relative z-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12 }} className="mb-8 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d5fc69] opacity-40" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d5fc69]" /></span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.23em] text-neutral-400 sm:text-xs">IT student · Builder · Curious by nature</span>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-3 font-mono text-sm text-[#d5fc69]">HELLO, WORLD. I'M</motion.p>
            <h1 className="max-w-3xl text-[clamp(4.1rem,12vw,8.5rem)] font-semibold leading-[0.82] tracking-[-0.085em] text-[#f3f3ec]">
              <span className="block">{titleLetters.map((letter, index) => <motion.span key={`${letter}-${index}`} initial={{ opacity: 0, y: 36, rotateX: -65 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.65, delay: 0.22 + index * 0.055, ease: [0.22, 1, 0.36, 1] }} className="inline-block">{letter}</motion.span>)}</span>
              <motion.span initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }} className="mt-3 block text-[#d5fc69]">Buiza<span className="text-white">.</span></motion.span>
            </h1>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.65 }} className="mt-8 max-w-xl text-base leading-8 text-neutral-400 sm:text-lg sm:leading-9">
              I bring software and hardware together to make useful, thoughtful digital experiences — from mobile apps to connected prototypes.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.08, duration: 0.6 }} className="mt-9 flex flex-wrap items-center gap-3">
              <motion.button onClick={() => scrollTo("projects")} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className="group inline-flex items-center gap-3 rounded-full bg-[#d5fc69] px-6 py-3.5 text-sm font-bold text-[#11130c] shadow-[0_8px_40px_rgba(213,252,105,0.12)] transition-shadow hover:shadow-[0_8px_48px_rgba(213,252,105,0.24)]">
                Explore my work <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowUpRight /></span>
              </motion.button>
              <motion.button onClick={() => scrollTo("contact")} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.025] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.06]">
                Let's talk <span className="text-neutral-400">↗</span>
              </motion.button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-neutral-500">
              <span className="uppercase tracking-[0.18em]">Currently exploring</span>
              <span className="h-px w-7 bg-neutral-700" />
              <span className="text-neutral-300">Mobile development</span>
              <span className="text-neutral-700">/</span>
              <span className="text-neutral-300">IoT & hardware</span>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.92, x: 25 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-[450px] lg:ml-auto lg:mr-0">
            <div className="absolute -inset-7 rounded-[42px] border border-[#d5fc69]/[0.09] rotate-[-5deg]" />
            <div className="absolute -inset-3 rounded-[35px] border border-white/[0.06] rotate-[3deg]" />
            <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#151815] p-3 shadow-2xl shadow-black/50">
              <div className="relative min-h-[390px] overflow-hidden rounded-[22px] bg-[#20251b] sm:min-h-[475px]">
                <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(213,252,105,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(213,252,105,.08) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                <div className="absolute inset-0 bg-gradient-to-br from-[#d5fc69]/[0.14] via-transparent to-violet-500/[0.10]" />
                <div className="absolute -right-16 -top-10 h-52 w-52 rounded-full border border-[#d5fc69]/20" />
                <div className="absolute -right-7 top-8 h-36 w-36 rounded-full border border-[#d5fc69]/15" />
                <div className="absolute bottom-[-18%] left-[-14%] h-64 w-64 rounded-full bg-[#d5fc69]/10 blur-[70px]" />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative flex h-48 w-48 items-center justify-center rounded-[48px] border border-[#d5fc69]/35 bg-black/20 shadow-[0_0_100px_rgba(213,252,105,0.08)] backdrop-blur-sm sm:h-56 sm:w-56">
                    <div className="absolute inset-0 overflow-hidden rounded-[48px]">
                      <span className="flex h-full w-full items-center justify-center font-mono text-7xl font-black tracking-[-0.12em] text-[#d5fc69] sm:text-8xl">JB</span>
                      <img src="/profile.jpg" alt="Joshua Buiza" className="absolute inset-0 h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                    </div>
                    <span className="absolute -right-3 top-8 h-5 w-5 rounded-full border-4 border-[#20251b] bg-[#d5fc69]" />
                    <span className="absolute -bottom-2 left-8 h-3 w-3 rounded-full bg-violet-300" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between rounded-2xl border border-white/10 bg-[#0b0d0b]/70 p-4 backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-5 sm:p-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Developer / Maker</p>
                    <p className="mt-1 text-lg font-semibold tracking-tight text-white">Joshua Buiza</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d5fc69] text-[#11130c]"><ArrowUpRight /></span>
                </div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 5, 0], rotate: [0, 1.5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-5 top-16 hidden rounded-2xl border border-white/10 bg-[#151815]/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:block">
              <span className="block font-mono text-[10px] text-neutral-500">BUILD / 001</span><span className="mt-1 block text-sm font-medium text-white">Code meets hardware</span>
            </motion.div>
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-5 right-2 rounded-2xl border border-[#d5fc69]/20 bg-[#151815]/95 px-4 py-3 shadow-xl backdrop-blur-xl sm:right-[-18px]">
              <span className="block font-mono text-[10px] text-[#d5fc69]/70">FOCUS AREAS</span><span className="mt-1 block text-sm font-medium text-white">Apps · IoT · UI/UX</span>
            </motion.div>
          </motion.div>
        </div>
        <button onClick={() => scrollTo("about")} className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-neutral-600 transition-colors hover:text-[#d5fc69] md:flex">
          <span className="flex h-8 w-5 items-start justify-center rounded-full border border-neutral-700 p-1"><motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="h-1.5 w-1 rounded-full bg-[#d5fc69]" /></span> Scroll to explore
        </button>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" /></div>

      <SectionWrapper id="about">
        <div className="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-20">
          <div><SectionLabel number="01">A little about me</SectionLabel><h2 className="max-w-sm text-4xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-5xl">Curiosity is my <span className="text-[#d5fc69]">starting point.</span></h2></div>
          <div className="pt-1">
            <p className="text-lg leading-8 text-neutral-300 sm:text-xl sm:leading-9">I’m a fourth-year IT student at City College of Tagaytay, passionate about the intersection of software and physical hardware.</p>
            <p className="mt-5 leading-8 text-neutral-500">My work spans cross-platform apps with Flutter and React Native, C++ firmware for microcontrollers, backend databases, multi-hop mesh networks, and interactive hardware prototypes. I enjoy connecting the pieces and turning complex ideas into practical, tangible solutions.</p>
            <div className="mt-8 flex flex-wrap gap-2"><span className="rounded-full border border-[#d5fc69]/20 bg-[#d5fc69]/[0.06] px-3 py-2 text-xs text-[#d5fc69]">Software</span><span className="rounded-full border border-white/10 px-3 py-2 text-xs text-neutral-300">Hardware</span><span className="rounded-full border border-white/10 px-3 py-2 text-xs text-neutral-300">Problem solving</span></div>
          </div>
        </div>
      </SectionWrapper>

      <div className="mx-auto max-w-6xl px-5 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" /></div>

      <SectionWrapper id="skills" className="py-20 md:py-24">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel number="02">Tools of the trade</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">My tech <span className="text-neutral-500">stack.</span></h2>
          </div>
          <p className="max-w-xs text-sm leading-7 text-neutral-500">A growing toolkit for building across screens, software, and the physical world.</p>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-500">
          <span className="mr-1 inline-flex h-2 w-2 rounded-full bg-[#d5fc69] shadow-[0_0_14px_rgba(213,252,105,.65)]" />
          <span>9 technologies</span><span className="text-neutral-700">/</span><span>3 focus areas</span>
        </div>

        <div className="grid items-stretch gap-4 lg:grid-cols-3">
          {skillGroups.map((group, groupIndex) => (
            <motion.article
              key={group.number}
              initial={{ opacity: 0, y: 28, rotateX: -3 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.65, delay: groupIndex * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -7 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#111411] p-5 transition-colors duration-500 hover:border-white/[0.17] sm:p-6"
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100" style={{ background: group.accent === "lime" ? "radial-gradient(circle at 100% 0%, rgba(213,252,105,.10), transparent 42%)" : group.accent === "violet" ? "radial-gradient(circle at 100% 0%, rgba(196,181,253,.11), transparent 42%)" : "radial-gradient(circle at 100% 0%, rgba(253,186,116,.11), transparent 42%)" }} />
              <div className="relative mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className={`mb-3 font-mono text-[10px] tracking-[0.2em] ${group.accent === "lime" ? "text-[#d5fc69]/75" : group.accent === "violet" ? "text-violet-200/75" : "text-orange-200/75"}`}>/ {group.number} — {group.subtitle}</p>
                  <h3 className="max-w-[15rem] text-2xl font-semibold leading-tight tracking-[-0.045em] text-white">{group.title}</h3>
                </div>
                <motion.div
                  animate={prefersReducedMotion ? { rotate: 0, y: 0 } : { rotate: [0, 8, -6, 0], y: [0, -3, 0] }}
                  transition={{ duration: 7 + groupIndex, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" }}
                  className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-xl ${group.accent === "lime" ? "border-[#d5fc69]/25 bg-[#d5fc69]/[0.08] text-[#d5fc69]" : group.accent === "violet" ? "border-violet-200/20 bg-violet-300/[0.08] text-violet-200" : "border-orange-200/20 bg-orange-300/[0.08] text-orange-200"}`}
                >
                  <span>{group.symbol}</span>
                  <motion.span animate={prefersReducedMotion ? { scale: 1, opacity: 0.85 } : { scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.8 + groupIndex, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" }} className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full ${group.accent === "lime" ? "bg-[#d5fc69]" : group.accent === "violet" ? "bg-violet-200" : "bg-orange-200"}`} />
                </motion.div>
              </div>

              <p className="relative mb-6 max-w-[18rem] text-sm leading-6 text-neutral-500">{group.description}</p>

              <div className="relative mt-auto grid gap-2.5">
                {group.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.4, delay: groupIndex * 0.1 + skillIndex * 0.07 }}
                    whileHover={{ x: 4, scale: 1.015 }}
                    className="group/skill relative flex items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-black/20 px-3 py-3 transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.035]"
                  >
                    <span className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-mono text-xs font-bold tracking-tight transition-transform duration-300 group-hover/skill:scale-105 ${group.accent === "lime" ? "border-[#d5fc69]/15 bg-[#d5fc69]/[0.07] text-[#d5fc69]" : group.accent === "violet" ? "border-violet-200/15 bg-violet-300/[0.07] text-violet-200" : "border-orange-200/15 bg-orange-300/[0.07] text-orange-200"}`}>{skill.mark}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-neutral-200 transition-colors group-hover/skill:text-white">{skill.name}</span>
                      <span className="mt-0.5 block text-[10px] tracking-wide text-neutral-600">{skill.note}</span>
                    </span>
                    <span className="translate-x-[-3px] text-sm text-neutral-500 opacity-0 transition-all duration-300 group-hover/skill:translate-x-0 group-hover/skill:opacity-100 group-hover/skill:text-[#d5fc69]">↗</span>
                  </motion.div>
                ))}
              </div>

              <div className="relative mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">Focus area</span>
                <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] ${group.accent === "lime" ? "bg-[#d5fc69]/[0.08] text-[#d5fc69]/80" : group.accent === "violet" ? "bg-violet-300/[0.08] text-violet-200/80" : "bg-orange-300/[0.08] text-orange-200/80"}`}>{String(group.skills.length).padStart(2, "0")} TOOLS</span>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] py-3.5">
          <motion.div animate={prefersReducedMotion ? { x: 0 } : { x: [0, -280] }} transition={{ duration: 22, repeat: prefersReducedMotion ? 0 : Infinity, ease: "linear" }} className="flex w-max items-center gap-4 whitespace-nowrap px-4 text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-600">
            {Array.from({ length: 6 }, (_, index) => <span key={index} className="flex items-center gap-4"><span>Build with purpose</span><span className="text-[#d5fc69]/70">✳</span><span>Stay curious</span><span className="text-violet-200/70">✳</span><span>Connect ideas</span><span className="text-orange-200/70">✳</span></span>)}
          </motion.div>
        </div>
      </SectionWrapper>

      <div className="mx-auto max-w-6xl px-5 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" /></div>

      <SectionWrapper id="projects">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><SectionLabel number="03">Selected work</SectionLabel><h2 className="text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Things I’ve <span className="text-[#d5fc69]">built.</span></h2></div><p className="max-w-xs text-sm leading-7 text-neutral-500">A mix of mobile experiences, interaction experiments, and connected prototypes.</p></div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">{projects.map((proj, index) => <ProjectCard key={proj.number} proj={proj} index={index} />)}</div>
        <p className="mt-5 text-xs text-neutral-600">Project descriptions reflect current portfolio summaries.</p>
      </SectionWrapper>

      <div className="mx-auto max-w-6xl px-5 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" /></div>

      <SectionWrapper id="achievements">
        <div className="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-20">
          <div><SectionLabel number="04">Milestones</SectionLabel><h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-5xl">Small steps.<br /><span className="text-neutral-500">Real progress.</span></h2><p className="mt-5 max-w-xs text-sm leading-7 text-neutral-500">A few points along my learning and research journey.</p></div>
          <div className="relative space-y-4 before:absolute before:bottom-8 before:left-[7px] before:top-8 before:w-px before:bg-white/10">
            {achievements.map((item, index) => <motion.article key={item.title} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.12 }} className="relative pl-8">
              <span className="absolute left-0 top-7 h-[15px] w-[15px] rounded-full border-[4px] border-[#0b0d0b] bg-[#d5fc69] shadow-[0_0_0_1px_rgba(213,252,105,.28)]" />
              <div className="rounded-2xl border border-white/[0.08] bg-[#111311] p-5 transition-colors duration-300 hover:border-white/15 sm:p-6"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><span className="font-mono text-[10px] tracking-[0.15em] text-[#d5fc69]">{item.year}</span><span className="rounded-full border border-white/10 px-3 py-1 text-[9px] tracking-[0.14em] text-neutral-500">{item.type}</span></div><h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{item.title}</h3><p className="mt-3 text-sm leading-7 text-neutral-500">{item.desc}</p></div>
            </motion.article>)}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="contact" className="pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="relative overflow-hidden rounded-[30px] border border-[#d5fc69]/20 bg-[#151a11] p-7 sm:rounded-[38px] sm:p-12 md:p-16">
          <div aria-hidden="true" className="absolute -right-20 -top-28 h-80 w-80 rounded-full border border-[#d5fc69]/15" /><div aria-hidden="true" className="absolute -right-6 -top-14 h-52 w-52 rounded-full border border-[#d5fc69]/10" /><div aria-hidden="true" className="absolute bottom-[-30%] left-[25%] h-64 w-64 rounded-full bg-[#d5fc69]/[0.07] blur-[90px]" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><SectionLabel number="05">The next chapter</SectionLabel><h2 className="max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.06em] text-white sm:text-6xl">Have an idea?<br /><span className="text-[#d5fc69]">Let’s make it real.</span></h2><p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">I’m exploring new opportunities and always open to thoughtful conversations, collaborations, and interesting projects.</p></div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:w-[185px] lg:flex-col">
<motion.a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=joshbuiza2@gmail.com" 
                target="_blank" 
                rel="noreferrer" 
                whileHover={{ y: -3 }} 
                whileTap={{ scale: 0.98 }} 
                className="inline-flex items-center justify-between gap-5 rounded-full bg-[#d5fc69] px-5 py-3.5 text-sm font-bold text-[#11130c] transition-shadow hover:shadow-[0_8px_32px_rgba(213,252,105,0.18)]"
              >
                <span className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="m3.5 6 8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Email me
                </span>
                <ArrowUpRight />
              </motion.a>              <motion.a href="https://github.com/josh12343467" target="_blank" rel="noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-between gap-5 rounded-full border border-white/15 bg-black/10 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.04]"><span className="flex items-center gap-3"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true"><path d="M9 19c-4.2 1.4-4.2-2.3-5.9-2.8M15 22v-3.5a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.4 7c.1-.9.1-1.8-.2-2.7 0 0-1-.3-3.2 1.2a11 11 0 0 0-5.8 0C7 4 6 4.3 6 4.3 5.7 5.2 5.7 6.1 5.8 7a4.7 4.7 0 0 0-1.3 3.3c0 4.7 2.8 5.7 5.5 6A3 3 0 0 0 9.2 19V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>GitHub</span><ArrowUpRight /></motion.a>
              <motion.a href="https://www.linkedin.com/in/joshua-buiza-b20563364/" target="_blank" rel="noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-between gap-5 rounded-full border border-white/15 bg-black/10 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.04]"><span className="flex items-center gap-3"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true"><path d="M5 9v10M5 5.1v.1M10 19v-5.5a3 3 0 0 1 6 0V19M10 10v9M2.5 2.5h19v19h-19z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>LinkedIn</span><ArrowUpRight /></motion.a>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <footer className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-white/[0.07] px-5 py-7 text-xs text-neutral-600 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 Joshua Buiza. Built with curiosity.</p><button onClick={() => scrollTo("hero")} className="group inline-flex items-center gap-2 self-start transition-colors hover:text-[#d5fc69] sm:self-auto">Back to top <span className="transition-transform group-hover:-translate-y-1">↑</span></button>
      </footer>
    </main>
  );
}