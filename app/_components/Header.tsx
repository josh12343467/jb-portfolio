"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { navItems } from "../data";
import { ease } from "./motion";

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  // Highlight the nav link of the section in the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...navItems.map((n) => n.id)]
      .map((id) => document.getElementById(id))
      .forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        menuOpen ? "border-line bg-bg" : scrolled ? "border-line bg-bg/80 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5 sm:px-6">
        <a href="#top" onClick={() => setMenuOpen(false)} className="text-[15px] font-medium text-fg transition-opacity hover:opacity-80">
          Joshua Buiza
        </a>

        <ul className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`relative block rounded-full px-3.5 py-1.5 text-sm transition-colors ${active === item.id ? "text-fg" : "text-fg-2 hover:text-fg"}`}
              >
                {active === item.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-surface-2" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex size-10 items-center justify-center rounded-full text-fg-2 transition-colors hover:bg-surface-2 hover:text-fg sm:hidden"
        >
          <span className="relative block h-3 w-4" aria-hidden="true">
            <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${menuOpen ? "top-[5px] rotate-45" : "top-0.5"}`} />
            <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${menuOpen ? "top-[5px] -rotate-45" : "top-2"}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden px-5 sm:hidden"
          >
            {navItems.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + i * 0.04 }}
                className="border-t border-line first:border-t-0"
              >
                <a href={`#${item.id}`} onClick={() => setMenuOpen(false)} className="flex items-center justify-between py-3.5 text-base text-fg">
                  {item.label}
                  <span className="text-fg-3">→</span>
                </a>
              </motion.li>
            ))}
            <li className="h-3" aria-hidden="true" />
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
