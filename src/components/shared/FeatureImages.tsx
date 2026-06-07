"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const MOCK_IMAGES = [
  { id: 1, gradient: "from-violet-800 to-indigo-900", size: "1920×1080", name: "hero.jpg" },
  { id: 2, gradient: "from-blue-700 to-cyan-800", size: "400×400", name: "avatar.png" },
  { id: 3, gradient: "from-purple-800 to-pink-800", size: "1200×630", name: "og-image.jpg" },
  { id: 4, gradient: "from-indigo-800 to-violet-700", size: "320×120", name: "logo.svg" },
  { id: 5, gradient: "from-slate-700 to-purple-800", size: "800×800", name: "product.jpg" },
  { id: 6, gradient: "from-violet-700 to-blue-900", size: "2048×2048", name: "texture.png" },
  { id: 7, gradient: "from-cyan-800 to-blue-900", size: "640×480", name: "gallery-1.jpg" },
  { id: 8, gradient: "from-pink-800 to-violet-900", size: "1280×720", name: "cover.webp" },
];

export function FeatureImages() {
  const [selected, setSelected] = useState<Set<number>>(new Set([1, 3, 5]));
  const [format, setFormat] = useState("original");

  const toggle = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="features" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="space-y-6">
            <Badge
              variant="secondary"
              className="border border-primary/30 bg-primary/10 text-primary text-xs"
            >
              🖼 Image Extractor
            </Badge>
            <h2
              className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Every image,{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.72 0.2 295), oklch(0.6 0.18 220))",
                }}
              >
                one click away.
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Web Bookmarker automatically finds every image on the page —{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded font-mono text-primary/80">
                &lt;img&gt;
              </code>{" "}
              tags, CSS backgrounds, and Open Graph images. Preview them in a grid, select individually or all at once.
            </p>

            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Select images one by one or all at once",
                "Download individually or bundled in a ZIP",
                "Choose output format: PNG, JPEG, WebP or original",
                "Works with lazy-loaded and background images",
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

          {/* Interactive image grid demo */}
          <div className="glass-card rounded-2xl p-4 space-y-3">
            {/* Toolbar */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setSelected(new Set(MOCK_IMAGES.map((i) => i.id)))}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/8 text-white/60 hover:bg-white/12 transition-colors border border-white/8"
              >
                Select all
              </button>
              <button
                onClick={() => setSelected(new Set())}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/8 text-white/60 hover:bg-white/12 transition-colors border border-white/8"
              >
                Clear
              </button>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="text-[11px] px-2 py-1 rounded-lg bg-white/8 text-white/60 border border-white/8 outline-none ml-auto"
              >
                <option value="original">Original</option>
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WebP</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                disabled={selected.size === 0}
                className={cn(
                  "text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-all",
                  selected.size > 0
                    ? "bg-primary text-white"
                    : "bg-white/5 text-white/30 cursor-not-allowed"
                )}
              >
                ⬇ Download ({selected.size})
              </button>
              <button
                disabled={selected.size === 0}
                className={cn(
                  "text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-all",
                  selected.size > 0
                    ? "bg-primary text-white"
                    : "bg-white/5 text-white/30 cursor-not-allowed"
                )}
              >
                📦 ZIP
              </button>
              <span className="ml-auto text-[10px] text-white/30 self-center">
                {MOCK_IMAGES.length} found
              </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-4 gap-2">
              {MOCK_IMAGES.map((img) => (
                <button
                  key={img.id}
                  onClick={() => toggle(img.id)}
                  className={cn(
                    "relative rounded-xl overflow-hidden aspect-square border-2 transition-all duration-200",
                    selected.has(img.id)
                      ? "border-primary scale-[0.96]"
                      : "border-transparent hover:border-primary/40"
                  )}
                >
                  <div
                    className={cn("w-full h-full bg-gradient-to-br", img.gradient)}
                  />
                  {selected.has(img.id) && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                        ✓
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 px-1 pb-0.5">
                    <p className="text-[8px] text-white/50 truncate">{img.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
