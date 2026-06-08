"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import { Logo } from "./Logo";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full backdrop-blur-xl bg-background/60 border border-white/10 px-4 h-12 flex items-center justify-between shadow-lg shadow-black/20 w-[calc(100%-2rem)] max-w-4xl transition-all duration-300">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group pl-2">
        <Logo className="w-5 h-5 text-primary transition-transform group-hover:scale-110" />
        <span
          className="font-display font-bold text-foreground tracking-tight text-sm"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Webexa
        </span>
        <Badge variant="secondary" className="text-[9px] px-1 py-0 hidden sm:inline-flex bg-white/5 border-white/10">
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
            className="px-3 py-1 text-xs font-semibold text-foreground/80 hover:text-foreground rounded-full hover:bg-white/5 transition-all duration-200"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-3 pr-1">
        {/* Language toggle */}
        <button
          onClick={() => setLanguage(language === "en" ? "es" : "en")}
          className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[10px] font-bold tracking-wider text-foreground/85 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 uppercase"
          aria-label="Toggle language"
        >
          {language === "en" ? "EN" : "ES"}
        </button>
      </div>
    </header>
  );
}
