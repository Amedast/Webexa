"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ES_LABELS = {
  features: "Características",
  howItWorks: "Cómo funciona",
  install: "Instalar",
  installNow: "Instalar ahora",
};

const EN_LABELS = {
  features: "Features",
  howItWorks: "How it works",
  install: "Install",
  installNow: "Install now",
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<"en" | "es">("en");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const labels = lang === "en" ? EN_LABELS : ES_LABELS;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold transition-transform group-hover:scale-110">
            ⬡
          </div>
          <span
            className="font-display font-700 text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Web Bookmarker
          </span>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 hidden sm:inline-flex">
            Beta
          </Badge>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: "#features", label: labels.features },
            { href: "#how-it-works", label: labels.howItWorks },
            { href: "#install", label: labels.install },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={() => setLang((l) => (l === "en" ? "es" : "en"))}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-white/5 font-mono tracking-widest"
            aria-label="Toggle language"
          >
            {lang === "en" ? "EN" : "ES"}
          </button>

          <Link
            href="#install"
            className={cn(
              buttonVariants({ size: "sm" }),
              "animate-pulse-glow rounded-full px-5 font-semibold text-xs"
            )}
          >
            {labels.installNow} →
          </Link>
        </div>
      </div>
    </header>
  );
}
