"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { navItems } from "../data";
import { ease } from "./motion";

export default function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Highlight the nav link of the section in the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const sections = ["top", ...navItems.map((n) => n.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent" style={{ scaleX: progress }} />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        className={`fixed inset-x-0 top-0 transition-[background-color,border-color,backdrop-filter,color] duration-300 ${
          menuOpen ? "z-[70] text-paper" : "z-50"
        } ${scrolled && !menuOpen ? "border-b border-line bg-paper/85 backdrop-blur-md" : "border-b border-transparent"}`}
      >
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex items-baseline gap-1.5 text-[15px] font-bold tracking-tight" onClick={() => setMenuOpen(false)}>
            Joshua Buiza
            <span className="inline-block size-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  className={`relative block px-3 py-2 text-sm transition-colors ${active === item.id ? "text-ink" : "text-ink-2 hover:text-ink"}`}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-[2px] bg-accent" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium md:hidden ${menuOpen ? "border-paper/30" : "border-line"}`}
          >
            {menuOpen ? "Close" : "Menu"}
            <span className="relative block h-2.5 w-4" aria-hidden="true">
              <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${menuOpen ? "top-1 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${menuOpen ? "top-1 -rotate-45" : "top-2"}`} />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease }}
            className="fixed inset-0 z-[65] flex flex-col bg-ink px-6 pb-10 pt-24 text-paper md:hidden"
          >
            <ul className="flex flex-1 flex-col justify-center gap-2">
              {navItems.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease }}
                    className="flex items-baseline gap-4 py-1 text-5xl font-bold tracking-tight"
                  >
                    <span className="font-mono text-sm font-normal text-paper/40">0{i + 1}</span>
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-mono text-xs text-paper/50">
              Joshua Buiza — Portfolio 2026
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
