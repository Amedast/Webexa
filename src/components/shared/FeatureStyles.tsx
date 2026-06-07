"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
    name: "Syne",
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

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex).catch(() => {});
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Demo panel — left on this section */}
          <div className="glass-card rounded-2xl p-6 space-y-6 order-2 lg:order-1">
            {/* Colors */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                  Color palette · {MOCK_COLORS.length} extracted
                </p>
                <button
                  onClick={() => handleCopy(MOCK_COLORS.map((c) => c.hex).join(", "))}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white/8 text-white/50 hover:text-white/80 border border-white/8 transition-colors"
                >
                  {copied ? "✓ Copied!" : "Copy all"}
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {MOCK_COLORS.map((c) => (
                  <Tooltip key={c.hex}>
                    <TooltipTrigger
                      className="group flex flex-col items-center gap-1.5 transition-transform hover:scale-110 cursor-pointer bg-transparent border-0 p-0"
                      onClick={() => handleCopy(c.hex)}
                    >
                        <div
                          className="w-10 h-10 rounded-xl border border-white/10 shadow-md relative overflow-hidden"
                          style={{ background: c.hex }}
                        >
                          {copied === c.hex && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs">
                              ✓
                            </div>
                          )}
                        </div>
                        <span className="text-[9px] text-white/30 font-mono">{c.label}</span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">
                      {c.hex} · Click to copy
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/6" />

            {/* Fonts */}
            <div>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-3">
                Typography · {MOCK_FONTS.length} families
              </p>
              <div className="space-y-3">
                {MOCK_FONTS.map((f) => (
                  <div
                    key={f.name}
                    className="bg-white/4 rounded-xl p-4 border border-white/6 hover:border-white/12 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-white/50 font-mono">{f.name}</span>
                        <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                          {f.role}
                        </Badge>
                      </div>
                      <span className="text-[10px] text-white/30">
                        {f.sizes.join(" / ")}
                      </span>
                    </div>
                    <p
                      className="text-lg text-white/80 leading-tight"
                      style={{ fontFamily: f.name, fontWeight: f.weight }}
                    >
                      {f.preview}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text — right on this section */}
          <div className="space-y-6 order-1 lg:order-2">
            <Badge
              variant="secondary"
              className="border border-primary/30 bg-primary/10 text-primary text-xs"
            >
              🎨 Style Extractor
            </Badge>
            <h2
              className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Steal the style,{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.72 0.2 295), oklch(0.6 0.18 220))",
                }}
              >
                ethically.
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Instantly extract the complete design system of any website. Get all colors used in the DOM, organized by frequency, and discover every font family with live previews.
            </p>

            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Color palette extracted from computed DOM styles",
                "Click any swatch to copy the HEX value",
                "Copy the entire palette to clipboard at once",
                "Font families with role detection (heading, body, code)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-[10px] text-primary flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
