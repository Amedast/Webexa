"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/lib/LanguageContext";

const MOCK_COLORS = [
  { hex: "#6D28D9", label: "Primary" },
  { hex: "#1E1B4B", label: "Background" },
  { hex: "#F9FAFB", label: "Text" },
  { hex: "#A78BFA", label: "Accent" },
  { hex: "#7C3AED", label: "Hover" },
  { hex: "#EDE9FE", label: "Light" },
  { hex: "#312E81", label: "Dark" },
  { hex: "#4C1D95", label: "Shade" },
  { hex: "#C4B5FD", label: "Tint" },
  { hex: "#8B5CF6", label: "Mid" },
];

const MOCK_FONTS = [
  {
    name: "Outfit",
    role: "Headings",
    sizes: ["48px", "32px", "24px"],
    preview: "The quick brown fox",
    weight: "800",
  },
  {
    name: "DM Sans",
    role: "Body",
    sizes: ["18px", "16px", "14px"],
    preview: "Jumps over the lazy dog",
    weight: "400",
  },
  {
    name: "JetBrains Mono",
    role: "Code",
    sizes: ["14px", "12px"],
    preview: "const x = 'hello world'",
    weight: "400",
  },
];

export function FeatureStyles() {
  const [copied, setCopied] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex).catch(() => {});
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Full-width header */}
        <div className="mb-16">
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("featStyleHeadingPart1")}{" "}
            <span className="text-primary">
              {t("featStyleHeadingPart2")}
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            {t("featStyleDesc")}
          </p>

          <ul className="mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
            {[
              t("featStyleBullet1"),
              t("featStyleBullet2"),
              t("featStyleBullet3"),
              t("featStyleBullet4"),
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="text-primary/60 flex-shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Demo container layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Colors (left side, width: 1 col) */}
          <div className="double-bezel md:col-span-1">
            <div className="double-bezel-inner p-5 h-full space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest font-mono">
                  {t("featStyleColorsExtracted", { count: MOCK_COLORS.length })}
                </p>
                <button
                  onClick={() => handleCopy(MOCK_COLORS.map((c) => c.hex).join(", "))}
                  className="text-[10px] px-2 py-0.5 rounded bg-white/8 text-white/50 hover:text-white/80 border border-white/8 transition-all duration-200 active:scale-95 font-semibold cursor-pointer"
                >
                  {copied ? t("featStyleCopied") : t("featStyleCopyAll")}
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2.5">
                {MOCK_COLORS.map((c) => (
                  <Tooltip key={c.hex}>
                    <TooltipTrigger
                      className="group flex flex-col items-center gap-1 transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer bg-transparent border-0 p-0"
                      onClick={() => handleCopy(c.hex)}
                    >
                      <div
                        className="w-8 h-8 rounded-lg border border-white/10 shadow-md relative overflow-hidden"
                        style={{ background: c.hex }}
                      >
                        {copied === c.hex && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[10px]">
                            ✓
                          </div>
                        )}
                      </div>
                      <span className="text-[8px] text-white/30 font-mono truncate w-full text-center">{c.label}</span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">
                      {c.hex} · Click to copy
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>

          {/* Fonts (right side, width: 2 cols) */}
          <div className="double-bezel md:col-span-2">
            <div className="double-bezel-inner p-5 h-full space-y-4">
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest font-mono">
                {t("featStyleFontsFamilies", { count: MOCK_FONTS.length })}
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {MOCK_FONTS.map((f) => (
                  <div
                    key={f.name}
                    className="bg-white/4 rounded-xl p-3.5 border border-white/6 hover:border-white/20 transition-all duration-200 active:scale-[0.97] cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-[10px] text-white/50 font-mono truncate">{f.name}</span>
                        <Badge variant="secondary" className="text-[8px] px-1 py-0 font-medium whitespace-nowrap bg-white/5 border-white/10">
                          {f.role}
                        </Badge>
                      </div>
                      <p
                        className="text-[10px] text-white/30 font-mono mb-4"
                      >
                        {f.sizes.join(" / ")}
                      </p>
                    </div>
                    <p
                      className="text-base text-white/80 leading-tight mt-auto"
                      style={{ fontFamily: f.name === "Outfit" ? "var(--font-display)" : f.name, fontWeight: f.weight }}
                    >
                      {f.preview}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
