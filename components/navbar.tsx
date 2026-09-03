"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "./theme-toggle";

const NAV_LINKS = [
  { id: 1, name: "Home", href: "#home" },
  { id: 2, name: "About", href: "#about" },
  { id: 3, name: "Skills", href: "#skills" },
  { id: 4, name: "Projects", href: "#projects" },
  { id: 5, name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Halfway Scroll Spy
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace("#", ""));

    const handleScroll = () => {
      // 1. Force the last section (Contact) when at the bottom of the page
      const scrollPosition = window.innerHeight + window.scrollY;
      const isAtBottom = scrollPosition >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // 2. Trigger line: Halfway down the visible viewport (accounting for the 80px navbar)
      const triggerThreshold = (window.innerHeight - 80) / 2 + 80;

      // 3. Scan from bottom to top; activates when section's top crosses the halfway line
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);

        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerThreshold) {
            setActiveSection(id);
            return;
          }
        }
      }

      // Default to first section when near the top
      setActiveSection(sectionIds[0]);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Header Container */}
      <header className="fixed top-0 left-0 z-40 h-20 w-full backdrop-blur-md bg-background/80 transition-colors">
        {/* Desktop Navigation */}
        <div className="hidden h-full items-center justify-center p-3 md:flex">
          <div className="mx-auto flex h-full w-[95%] max-w-2xl items-center justify-between rounded-full border border-border bg-card/60 px-4 shadow-sm backdrop-blur-lg">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2">
              <Image src="/favicon.ico" alt="Logo" width={28} height={28} />
              <span className="text-lg font-bold tracking-tight text-foreground">
                Shawn.
              </span>
            </a>

            {/* Links */}
            <nav className="flex h-full items-center gap-1">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Controls & CTA */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Header */}
        <div className="flex h-full items-center justify-between px-4 md:hidden">
          <a href="#home" className="flex items-center gap-2">
            <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
            <span className="text-xl font-bold tracking-tight text-foreground">
              Shawn.
            </span>
          </a>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/50 text-foreground transition-colors hover:bg-card cursor-pointer"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-background/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Drawer Menu */}
      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-72 max-w-[85vw] flex-col border-l border-border bg-card/80 p-4 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2.5 text-xl font-bold text-foreground">
            <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
            Shawn.
          </span>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/50 text-foreground transition-colors hover:bg-card cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="mt-6 flex flex-col gap-1.5">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveSection(sectionId);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-base transition-all duration-200 active:scale-[0.98] ${
                  isActive
                    ? "border border-primary/20 bg-primary/10 font-semibold text-primary"
                    : "font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}