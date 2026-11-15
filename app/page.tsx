"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent, type ReactNode } from "react";

type SkillAccent = "lime" | "violet" | "cyan" | "orange" | "blue" | "neutral";
type Skill = { name: string; mark: string; note: string };
type SkillGroup = {
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  symbol: string;
  accent: SkillAccent;
  skills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    number: "01",
    title: "Frontend Development",
    eyebrow: "WEB INTERFACES",
    description: "Building responsive web experiences and shaping how people interact with them.",
    symbol: "</>",
    accent: "lime",
    skills: [
      { name: "Next.js", mark: "N", note: "Web framework" },
      { name: "Tailwind CSS", mark: "Tw", note: "Interface styling" },
    ],
  },
  {
    number: "02",
    title: "Mobile Development",
    eyebrow: "CROSS-PLATFORM APPS",
    description: "Creating mobile experiences designed to work across devices and platforms.",
    symbol: "▣",
    accent: "violet",
    skills: [
      { name: "Flutter", mark: "Fl", note: "Cross-platform apps" },
      { name: "React Native", mark: "RN", note: "Native mobile apps" },
    ],
  },
  {
    number: "03",
    title: "Backend & Databases",
    eyebrow: "DATA & SERVICES",
    description: "Working with app services and data storage to support useful product features.",
    symbol: "{ }",
    accent: "cyan",
    skills: [
      { name: "Firebase", mark: "Fb", note: "App platform & services" },
      { name: "SQLite", mark: "SQL", note: "Local database" },
    ],
  },
  {
    number: "04",
    title: "Programming Languages",
    eyebrow: "CODE & LOGIC",
    description: "The languages I use to develop application logic and work closer to the system level.",
    symbol: "λ",
    accent: "orange",
    skills: [
      { name: "C++", mark: "C++", note: "Systems & firmware" },
      { name: "Python", mark: "Py", note: "Programming" },
    ],
  },
  {
    number: "05",
    title: "Hardware & IoT",
    eyebrow: "SOFTWARE MEETS HARDWARE",
    description: "Connecting software with microcontrollers and physical prototypes.",
    symbol: "⌬",
    accent: "blue",
    skills: [
      { name: "Arduino", mark: "Ar", note: "Microcontroller platform" },
      { name: "Hardware Prototyping", mark: "HW", note: "Physical systems" },
    ],
  },
  {
    number: "06",
    title: "Tools & Workflow",
    eyebrow: "BUILD WITH INTENTION",
    description: "Keeping development organized and making changes easier to track.",
    symbol: "↗",
    accent: "neutral",
    skills: [
      { name: "Git", mark: "Gt", note: "Version control" },
    ],
  },
];

const skillAccents: Record<SkillAccent, { label: string; icon: string; border: string; glow: string; rail: string }> = {
  lime: {
    label: "text-[#d5fc69]",
    icon: "border-[#d5fc69]/20 bg-[#d5fc69]/[0.08] text-[#d5fc69]",
    border: "group-hover:border-[#d5fc69]/30",
    glow: "bg-[#d5fc69]/[0.06]",
    rail: "from-[#d5fc69]/80",
  },
  violet: {
    label: "text-violet-200",
    icon: "border-violet-200/20 bg-violet-300/[0.08] text-violet-200",
    border: "group-hover:border-violet-200/30",
    glow: "bg-violet-400/[0.07]",
    rail: "from-violet-300/80",
  },
  cyan: {
    label: "text-cyan-200",
    icon: "border-cyan-200/20 bg-cyan-300/[0.08] text-cyan-200",
    border: "group-hover:border-cyan-200/30",
    glow: "bg-cyan-400/[0.07]",
    rail: "from-cyan-300/80",
  },
  orange: {
    label: "text-orange-200",
    icon: "border-orange-200/20 bg-orange-300/[0.08] text-orange-200",
    border: "group-hover:border-orange-200/30",
    glow: "bg-orange-400/[0.07]",
    rail: "from-orange-300/80",
  },
  blue: {
    label: "text-sky-200",
    icon: "border-sky-200/20 bg-sky-300/[0.08] text-sky-200",
    border: "group-hover:border-sky-200/30",
    glow: "bg-sky-400/[0.07]",
    rail: "from-sky-300/80",
  },
  neutral: {
    label: "text-neutral-200",
    icon: "border-white/15 bg-white/[0.05] text-neutral-200",
    border: "group-hover:border-white/25",
    glow: "bg-white/[0.035]",
    rail: "from-white/60",
  },
};

type Project = {
  number: string;
  title: string;
  category: string;
  desc: string;
  fullDesc: string;
  problem: string;
  approach: string;
  contributions: string[];
  features: string[];
  outcome: string;
  tags: string[];
  accent: string;
  visual: string;
  video?: string;
  images?: string[];
  imageLabels?: string[];
  thumbnail?: string;
  liveUrl?: string;
  repositoryUrl?: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Interactive Glass Board",
    category: "HARDWARE · INTERACTION",
    desc: "A custom hardware and software experience for interactive displays, built to move beyond traditional mesh setups.",
    fullDesc: "This project explores a new way of interacting with displays. By bypassing traditional mesh setups, the Interactive Glass Board offers a more direct, responsive, and tactile interaction model. I handled the C++ firmware development and the UI/UX design for the interface.",
    problem: "Traditional mesh-based display setups can make direct, tactile interaction harder to achieve.",
    approach: "Explore a more direct and responsive interaction model by bringing custom hardware and interface design together.",
    contributions: ["C++ firmware development", "UI/UX design for the interface"],
    features: ["Interactive display experience", "Hardware and software integration", "Responsive, tactile interaction model"],
    outcome: "Designed to move beyond traditional mesh setups and offer a more direct, responsive way to interact with a display.",
    tags: ["Hardware", "C++", "UI/UX"],
    accent: "lime",
    visual: "grid",
  },
  {
    number: "02",
    title: "ClassRoom Studio",
    category: "WEB APP · EDUCATION",
    desc: "An offline-first seating chart, attendance tracker, group maker, and gradebook for teachers, with cloud sync.",
    fullDesc: "ClassRoom Studio lets teachers lay out their actual classroom, seat students by dragging, take attendance by tapping chairs, generate groups based on where students sit, and enter grades directly on the seating chart. Everything is saved on the device first and synced to the cloud in the background, so it keeps working without an internet connection.",
    problem: "Teachers juggle seating charts, attendance sheets, grouping, and gradebooks across separate tools that don't reflect how the classroom is actually arranged.",
    approach: "Make the seating chart the center of the app, so attendance, groups, and grades all happen on the same visual layout of the room, offline-first with Supabase cloud sync.",
    contributions: [
      "Drag-and-drop room editor with presets, snapping, undo/redo, and a locked Use Class mode",
      "Seat-proximity grouping using size-capped k-means on chair positions, plus lock-together / keep-apart rules",
      "Weighted gradebook with multiple grading scales (DepEd K–12, college 1.00–5.00, GPA, and more) and a seating-chart heat map",
      "Offline-first sync with Supabase Auth and Postgres Row Level Security, with conflict handling that never silently discards data",
    ],
    features: [
      "Drag-and-drop seating chart",
      "Tap-to-mark attendance with CSV export",
      "Random, proximity, and even-split groups",
      "Gradebook with heat map",
      "Random picker and countdown timer",
      "Google sign-in and guest mode",
      "Dark mode and JSON backup",
    ],
    outcome: "A working app teachers can try instantly in guest mode with sample data, backed by 52 passing Vitest tests.",
    tags: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS", "Zustand"],
    accent: "violet",
    visual: "orbit",
    images: [
      "/classroom-studio/layout.png",
      "/classroom-studio/attendance.png",
      "/classroom-studio/groups.png",
      "/classroom-studio/grades.png",
    ],
    imageLabels: ["Room layout", "Attendance", "Groups", "Grades"],
    thumbnail: "/classroom-studio/layout.png",
    liveUrl: "https://classroom-studio-jade.vercel.app",
    repositoryUrl: "https://github.com/josh12343467/classroom-studio",
  },
  {
    number: "03",
    title: "Smart Home Prototype",
    category: "IOT · CONNECTED SYSTEMS",
    desc: "An IoT smart home system powered by Arduino, featuring a custom mobile app with touch and voice command controls.",
    fullDesc: "This Smart Home Prototype is an IoT automation system built around Arduino microcontrollers. I developed a companion mobile application that serves as the central hub for monitoring and controlling home appliances. Users can manually operate devices through simple button clicks within the app, or use integrated voice commands for hands-free control. The project bridges custom hardware circuitry with mobile software.",
    problem: "A connected home needs a clear way to monitor appliances and control them without interacting with each device separately.",
    approach: "Pair an Arduino-based smart home prototype with a companion mobile app that acts as a central control interface.",
    contributions: ["Development of the companion mobile application", "Touch/button-based appliance controls", "Voice-command control experience"],
    features: ["Appliance monitoring and control", "Manual in-app controls", "Hands-free voice commands", "Arduino-based IoT hardware"],
    outcome: "Brings the hardware prototype and mobile interface together, with both manual and voice-based ways to control appliances.",
    tags: ["IoT", "Arduino", "Flutter", "Voice Control", "C++"],
    accent: "orange",
    visual: "circuit",
    video: "/cirvia_vid.mp4",
    images: ["/cirvia_app.jpg"],
    thumbnail: "/cirvia_poster.png"
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

// ----------------------------------------------------
// PROJECT MODAL COMPONENT (POP-UP SA SCREEN)
// ----------------------------------------------------
function ProjectModal({ project, onClose }: { project: Project, onClose: () => void }) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const mediaStageRef = useRef<HTMLDivElement>(null);

  const mediaItems = [
    ...(project.video ? [{ type: "video" as const, src: project.video, label: "Watch demo" }] : []),
    ...(project.images ?? []).map((src, index) => ({
      type: "image" as const,
      src,
      label: project.imageLabels?.[index] ?? ((project.images?.length ?? 0) > 1 ? `Photo ${String(index + 1).padStart(2, "0")}` : "App screen"),
    })),
  ];
  const activeMedia = mediaItems[activeMediaIndex];
  
  const accentText = project.accent === "lime" ? "text-[#d5fc69]" : project.accent === "violet" ? "text-violet-300" : "text-orange-300";
  const accentBorder = project.accent === "lime" ? "border-[#d5fc69]/30" : project.accent === "violet" ? "border-violet-300/30" : "border-orange-300/30";
  const accentFill = project.accent === "lime" ? "bg-[#d5fc69] text-[#10120b]" : project.accent === "violet" ? "bg-violet-300 text-[#17131d]" : "bg-orange-300 text-[#1b1510]";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const closeModal = () => onClose();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-3 backdrop-blur-xl sm:p-6"
      onClick={closeModal}
      role="presentation"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 18, filter: "blur(8px)" }}
        animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ scale: 0.98, opacity: 0, y: 10, filter: "blur(5px)" }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="relative flex h-[min(820px,90dvh)] max-h-[90dvh] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#0b0d0b] shadow-[0_32px_120px_rgba(0,0,0,0.65)] sm:rounded-[32px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#101210]/95 px-4 py-3.5 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${accentBorder} bg-white/[0.025] font-mono text-xs ${accentText}`}>
              {project.number}
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Selected work</p>
              <p className="truncate text-xs text-neutral-300">Project case study <span className="px-1.5 text-neutral-700">/</span> 2026</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            aria-label="Close project details"
            className="group ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-neutral-400 transition-all duration-300 hover:rotate-90 hover:border-white/25 hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d5fc69]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto custom-scrollbar lg:grid-cols-[1.08fr_.92fr] lg:overflow-hidden">
          <section className="flex min-w-0 flex-col gap-4 border-b border-white/[0.08] bg-[radial-gradient(ellipse_at_top,rgba(213,252,105,0.055),transparent_58%)] p-4 sm:p-6 lg:min-h-0 lg:border-b-0 lg:border-r lg:border-white/[0.08]">
            <div className="flex shrink-0 items-center justify-between gap-3">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Project media</p>
                <p className="mt-1 text-sm font-medium text-neutral-200">A closer look</p>
              </div>
              <span className="rounded-full border border-white/[0.09] bg-black/20 px-3 py-1.5 font-mono text-[10px] text-neutral-400">
                {mediaItems.length ? `${String(activeMediaIndex + 1).padStart(2, "0")} / ${String(mediaItems.length).padStart(2, "0")}` : "PREVIEW"}
              </span>
            </div>

            <div ref={mediaStageRef} id="project-media-stage" className="relative flex aspect-video w-full shrink-0 items-center justify-center overflow-hidden rounded-[22px] border border-white/[0.1] bg-[#070807] shadow-inner sm:aspect-[4/3] lg:aspect-auto lg:min-h-[260px] lg:flex-1">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.035),transparent_68%)]" />
              {activeMedia ? (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${project.number}-${activeMediaIndex}`}
                    initial={{ opacity: 0, scale: 0.985, y: 7 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.99, y: -4 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="absolute inset-0 flex h-full w-full items-center justify-center p-2 sm:p-3"
                  >
                    {activeMedia.type === "video" ? (
                      <video
                        key={activeMedia.src}
                        src={activeMedia.src}
                        autoPlay
                        loop
                        muted
                        controls
                        playsInline
                        className="h-full w-full rounded-xl object-contain"
                        onError={(event) => { event.currentTarget.style.display = "none"; }}
                      />
                    ) : (
                      <img
                        src={activeMedia.src}
                        alt={`${project.title} — ${activeMedia.label}`}
                        className="h-full w-full rounded-xl object-contain"
                        onError={(event) => { event.currentTarget.style.opacity = "0"; }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="absolute inset-0 p-2 sm:p-3">
                  <ProjectVisual visual={project.visual} />
                </div>
              )}
              <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-white/75 backdrop-blur-md">
                <span className={`h-1.5 w-1.5 rounded-full ${accentFill.split(" ")[0]}`} />
                {activeMedia?.type === "video" ? "Video demonstration" : activeMedia?.type === "image" ? "Project screenshot" : "Concept preview"}
              </span>
            </div>

            {mediaItems.length > 1 ? (
              <div className="flex shrink-0 flex-wrap gap-2" aria-label="Choose project media">
                {mediaItems.map((item, index) => (
                  <button
                    key={`${item.type}-${item.src}`}
                    type="button"
                    onClick={() => setActiveMediaIndex(index)}
                    aria-pressed={activeMediaIndex === index}
                    className={`group flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d5fc69] ${activeMediaIndex === index ? `${accentBorder} bg-white/[0.07]` : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.18] hover:bg-white/[0.045]"}`}
                  >
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${activeMediaIndex === index ? accentFill : "bg-white/[0.06] text-neutral-400"}`}>
                      {item.type === "video" ? (
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true"><path d="m9 6 10 6-10 6V6Z" fill="currentColor" /></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="9" cy="10" r="1.5" fill="currentColor" /><path d="m5 17 5-4 3 2 3-3 3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      )}
                    </span>
                    <span>
                      <span className="block text-[11px] font-medium text-neutral-200">{item.label}</span>
                      <span className="mt-0.5 block text-[9px] text-neutral-500">{item.type === "video" ? "MP4 · Demo" : "Image · Preview"}</span>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="shrink-0 text-[10px] leading-5 text-neutral-600">Designed, built, and documented with care.</p>
            )}
          </section>

          <section className="min-w-0 p-5 sm:p-7 lg:min-h-0 lg:overflow-y-auto lg:p-8 custom-scrollbar">
            <p className={`mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] ${accentText}`}>{project.category}</p>
            <h3 id="project-modal-title" className="text-[clamp(1.65rem,3vw,2.65rem)] font-semibold leading-[1.03] tracking-[-0.055em] text-white">
              {project.title}<span className={accentText}>.</span>
            </h3>
            <p className="mt-4 text-sm leading-6 text-neutral-400">{project.desc}</p>

            <div className="my-6 h-px bg-gradient-to-r from-white/15 via-white/[0.07] to-transparent" />

            <div className="mb-7">
              <div className="mb-3 flex items-center gap-2">
                <span className={`h-5 w-1 rounded-full ${accentFill.split(" ")[0]}`} />
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">About the project</h4>
              </div>
              <p className="text-[13px] leading-[1.9] text-neutral-400 sm:text-sm">{project.fullDesc}</p>
            </div>

            <div className="mb-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                <p className={`mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] ${accentText}`}>01 / The problem</p>
                <p className="text-xs leading-6 text-neutral-400">{project.problem}</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                <p className={`mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] ${accentText}`}>02 / The approach</p>
                <p className="text-xs leading-6 text-neutral-400">{project.approach}</p>
              </div>
            </div>

            <div className="mb-7">
              <div className="mb-3 flex items-center gap-2">
                <span className={`h-5 w-1 rounded-full ${accentFill.split(" ")[0]}`} />
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">My contributions</h4>
              </div>
              <ul className="grid gap-2">
                {project.contributions.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs leading-6 text-neutral-400">
                    <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accentFill.split(" ")[0]}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-7">
              <div className="mb-3 flex items-center gap-2">
                <span className={`h-5 w-1 rounded-full ${accentFill.split(" ")[0]}`} />
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Key features</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.features.map((feature) => (
                  <span key={feature} className="rounded-xl border border-white/[0.08] bg-black/20 px-3 py-2 text-[11px] leading-5 text-neutral-300">{feature}</span>
                ))}
              </div>
            </div>

            <div className="mb-7 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-4">
              <p className={`mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] ${accentText}`}>Project outcome / focus</p>
              <p className="text-xs leading-6 text-neutral-300">{project.outcome}</p>
            </div>

            <div className="mb-7">
              <div className="mb-3 flex items-center gap-2">
                <span className={`h-5 w-1 rounded-full ${accentFill.split(" ")[0]}`} />
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Explore the project</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.video && (
                  <button
                    type="button"
                    onClick={() => {
                      const demoIndex = mediaItems.findIndex((item) => item.type === "video");
                      if (demoIndex >= 0) {
                        setActiveMediaIndex(demoIndex);
                        mediaStageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d5fc69] ${accentFill}`}
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true"><path d="m9 6 10 6-10 6V6Z" fill="currentColor" /></svg>
                    Watch demo
                  </button>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.035] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.08]">
                    Live demo <ArrowUpRight />
                  </a>
                )}
                {project.repositoryUrl && (
                  <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.035] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.08]">
                    Source code <ArrowUpRight />
                  </a>
                )}
              </div>
              {!project.liveUrl && !project.repositoryUrl && (
                <p className="mt-3 text-[10px] leading-5 text-neutral-600">Project-specific public links can be added when the live demo or repository is ready.</p>
              )}
            </div>

            <div className="mb-7">
              <div className="mb-3 flex items-center gap-2">
                <span className={`h-5 w-1 rounded-full ${accentFill.split(" ")[0]}`} />
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Built with</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className={`rounded-full border border-white/[0.09] bg-white/[0.025] px-3 py-2 text-[11px] text-neutral-300 transition-colors hover:border-white/20 ${tag === project.tags[0] ? accentText : ""}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3.5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-neutral-500">Portfolio / Case study</p>
                <p className="mt-1 text-xs text-neutral-300">Project {project.number} of {String(projects.length).padStart(2, "0")}</p>
              </div>
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${accentFill}`}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ----------------------------------------------------
// PROJECT CARD
// ----------------------------------------------------
function ProjectCard({ proj, index, onClick }: { proj: Project; index: number; onClick: () => void }) {
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
      onClick={onClick}
      onKeyDown={(event: ReactKeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${proj.title} case study`}
      whileHover={{ y: -7 }}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[26px] border border-white/[0.09] bg-[#111311] p-4 transition-colors duration-300 hover:border-[#d5fc69]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d5fc69] sm:p-5"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(213,252,105,0.075), transparent 45%)` }}
      />
      <div className="relative mb-5 h-48 w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121710]">
        {proj.thumbnail ? (
          <img 
            src={proj.thumbnail} 
            alt={proj.title} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
            onError={(e) => { e.currentTarget.style.display = "none"; }} 
          />
        ) : (
          <ProjectVisual visual={proj.visual} />
        )}
        <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] text-white/90 backdrop-blur">
          {proj.number} / 03
        </span>
      </div>
      <div className="relative flex flex-1 flex-col px-2 pb-3">
        <p className="mb-3 text-[9px] font-semibold tracking-[0.2em] text-[#d5fc69]/75">{proj.category}</p>
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#d5fc69] sm:text-2xl">{proj.title}</h3>
          <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-all duration-300 group-hover:border-[#d5fc69]/40 group-hover:bg-[#d5fc69] group-hover:text-[#10120b]"><ArrowUpRight /></span>
        </div>
        <p className="mb-6 flex-1 text-sm leading-7 text-neutral-400 line-clamp-2">{proj.desc}</p>
        <div className="flex flex-wrap gap-2">
          {proj.tags.map((tag) => <span key={tag} className="rounded-full border border-white/[0.09] bg-white/[0.025] px-3 py-1.5 text-[11px] text-neutral-300">{tag}</span>)}
        </div>
      </div>
    </motion.article>
  );
}

// ----------------------------------------------------
// MAIN HOME PAGE
// ----------------------------------------------------
export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        @keyframes drift { from { transform: translate3d(0,-8px,0) scale(1); } to { transform: translate3d(14px,14px,0) scale(1.06); } }
      `}</style>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

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
              <motion.a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=joshbuiza2@gmail.com&su=Resume%20Request"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Request a copy of my resume by email"
                className="inline-flex items-center gap-3 rounded-full border border-[#d5fc69]/20 bg-[#d5fc69]/[0.045] px-5 py-3.5 text-sm font-semibold text-[#d5fc69] transition-colors hover:border-[#d5fc69]/40 hover:bg-[#d5fc69]/[0.09]"
              >
                Request CV <ArrowUpRight />
              </motion.a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.92, x: 25 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-[450px] lg:ml-auto lg:mr-0">
            <div className="absolute -inset-7 rounded-[42px] border border-[#d5fc69]/[0.09] rotate-[-5deg]" />
            <div className="absolute -inset-3 rounded-[35px] border border-white/[0.06] rotate-[3deg]" />
            <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#151815] p-3 shadow-2xl shadow-black/50">
              <div className="relative min-h-[390px] overflow-hidden rounded-[22px] bg-[#20251b] sm:min-h-[475px]">
                <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(213,252,105,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(213,252,105,.08) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                <div className="absolute inset-0 bg-gradient-to-br from-[#d5fc69]/[0.14] via-transparent to-violet-500/[0.10]" />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative flex h-48 w-48 items-center justify-center rounded-[48px] border border-[#d5fc69]/35 bg-black/20 shadow-[0_0_100px_rgba(213,252,105,0.08)] backdrop-blur-sm sm:h-56 sm:w-56">
                    <div className="absolute inset-0 overflow-hidden rounded-[48px]">
                      <span className="flex h-full w-full items-center justify-center font-mono text-7xl font-black tracking-[-0.12em] text-[#d5fc69] sm:text-8xl">JB</span>
                      <img src="/profile.jpg" alt="Joshua Buiza" className="absolute inset-0 h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                    </div>
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
          </motion.div>
        </div>
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

      <SectionWrapper id="skills" className="py-20 md:py-28">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:mb-12 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <SectionLabel number="02">What I work with</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              My tech <span className="text-[#d5fc69]">stack.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">
              Organized by what each tool helps me build — from web and mobile interfaces to data, code, and connected hardware.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start rounded-2xl border border-white/[0.09] bg-white/[0.025] p-2 lg:self-auto">
            <div className="rounded-xl bg-white/[0.045] px-3 py-2.5">
              <span className="block font-mono text-lg font-semibold tracking-tight text-white">06</span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-neutral-500">Disciplines</span>
            </div>
            <div className="px-3 py-2.5">
              <span className="block font-mono text-lg font-semibold tracking-tight text-white">11</span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-neutral-500">Technologies</span>
            </div>
          </div>
        </div>

        <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, groupIndex) => {
            const accent = skillAccents[group.accent];
            return (
              <motion.article
                key={group.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{ duration: 0.55, delay: groupIndex * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`group relative flex h-full min-h-[290px] flex-col overflow-hidden rounded-[26px] border border-white/[0.09] bg-[#101210] p-5 transition-colors duration-300 sm:p-6 ${accent.border}`}
              >
                <div className={`pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full blur-[70px] transition-opacity duration-500 group-hover:opacity-100 ${accent.glow} opacity-60`} />
                <div className={`absolute inset-x-6 top-0 h-px bg-gradient-to-r ${accent.rail} to-transparent opacity-70`} />

                <div className="relative mb-7 flex items-start justify-between gap-4">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border font-mono text-sm font-semibold tracking-tight transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-3deg] ${accent.icon}`}>
                    {group.symbol}
                  </span>
                  <span className="font-mono text-xs tracking-[0.16em] text-neutral-600">/{group.number}</span>
                </div>

                <div className="relative">
                  <p className={`mb-2 text-[9px] font-semibold tracking-[0.2em] ${accent.label}`}>{group.eyebrow}</p>
                  <h3 className="text-xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[22px]">{group.title}</h3>
                  <p className="mt-3 min-h-[60px] text-sm leading-6 text-neutral-500">{group.description}</p>
                </div>

                <div className="relative mt-6 grid gap-2.5">
                  {group.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.35, delay: groupIndex * 0.06 + skillIndex * 0.06 }}
                      className="flex items-center gap-3 rounded-2xl border border-white/[0.065] bg-black/20 px-3 py-3 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.035]"
                    >
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-mono text-[11px] font-bold tracking-tight ${accent.icon}`}>
                        {skill.mark}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-neutral-200">{skill.name}</span>
                        <span className="mt-0.5 block text-[11px] text-neutral-500">{skill.note}</span>
                      </span>
                      <span className="text-lg text-neutral-700 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-neutral-400" aria-hidden="true">↗</span>
                    </motion.div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </SectionWrapper>
      <div className="mx-auto max-w-6xl px-5 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" /></div>

      <SectionWrapper id="projects">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><SectionLabel number="03">Selected work</SectionLabel><h2 className="text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Things I’ve <span className="text-[#d5fc69]">built.</span></h2></div><p className="max-w-xs text-sm leading-7 text-neutral-500">Click on any project to view demonstrations and details.</p></div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj, index) => <ProjectCard key={proj.number} proj={proj} index={index} onClick={() => setSelectedProject(proj)} />)}
        </div>
      </SectionWrapper>

      <div className="mx-auto max-w-6xl px-5 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" /></div>

      <SectionWrapper id="achievements">
        <div className="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-20">
          <div><SectionLabel number="04">Milestones</SectionLabel><h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-5xl">Small steps.<br /><span className="text-neutral-500">Real progress.</span></h2></div>
          <div className="relative space-y-4 before:absolute before:bottom-8 before:left-[7px] before:top-8 before:w-px before:bg-white/10">
            {achievements.map((item, index) => <motion.article key={item.title} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.12 }} className="relative pl-8">
              <span className="absolute left-0 top-7 h-[15px] w-[15px] rounded-full border-[4px] border-[#0b0d0b] bg-[#d5fc69] shadow-[0_0_0_1px_rgba(213,252,105,.28)]" />
              <div className="rounded-2xl border border-white/[0.08] bg-[#111311] p-5 sm:p-6"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><span className="font-mono text-[10px] tracking-[0.15em] text-[#d5fc69]">{item.year}</span><span className="rounded-full border border-white/10 px-3 py-1 text-[9px] tracking-[0.14em] text-neutral-500">{item.type}</span></div><h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{item.title}</h3><p className="mt-3 text-sm leading-7 text-neutral-500">{item.desc}</p></div>
            </motion.article>)}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="contact" className="pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="relative overflow-hidden rounded-[30px] border border-[#d5fc69]/20 bg-[#151a11] p-7 sm:rounded-[38px] sm:p-12 md:p-16">
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><SectionLabel number="05">The next chapter</SectionLabel><h2 className="max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.06em] text-white sm:text-6xl">Have an idea?<br /><span className="text-[#d5fc69]">Let’s make it real.</span></h2><p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">I’m exploring new opportunities and always open to thoughtful conversations, collaborations, and interesting projects.</p></div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:w-[185px] lg:flex-col">
              <motion.a href="https://mail.google.com/mail/?view=cm&fs=1&to=joshbuiza2@gmail.com" target="_blank" rel="noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-between gap-5 rounded-full bg-[#d5fc69] px-5 py-3.5 text-sm font-bold text-[#11130c]"><span className="flex items-center gap-3">Email me</span><ArrowUpRight /></motion.a>
              <motion.a href="https://github.com/josh12343467" target="_blank" rel="noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-between gap-5 rounded-full border border-white/15 bg-black/10 px-5 py-3.5 text-sm font-semibold text-white"><span>GitHub</span><ArrowUpRight /></motion.a>
              <motion.a href="https://www.linkedin.com/in/joshua-buiza-b20563364/" target="_blank" rel="noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-between gap-5 rounded-full border border-white/15 bg-black/10 px-5 py-3.5 text-sm font-semibold text-white"><span>LinkedIn</span><ArrowUpRight /></motion.a>
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