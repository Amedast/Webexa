"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { Logo } from "./Logo";


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <Logo className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
          <span
            className="font-display font-700 text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Webexa
          </span>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 hidden sm:inline-flex">
            Beta
          </Badge>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: "#features", label: t("navFeatures") },
            { href: "#how-it-works", label: t("navHowItWorks") },
            { href: "#install", label: t("navInstall") },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-sm font-semibold text-foreground/80 hover:text-foreground rounded-md hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-white/5 hover:bg-white/10 text-xs font-semibold text-foreground transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            aria-label="Toggle language"
          >
            <span>🌐</span>
            <span>{language === "en" ? "EN" : "ES"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

