"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ─── Mock data for the visual demo ──────────────────────────────────────────
const MOCK_IMAGES = [
  { id: 1, label: "hero.jpg", size: "1920×1080" },
  { id: 2, label: "avatar.png", size: "400×400" },
  { id: 3, label: "banner.webp", size: "1200×630" },
  { id: 4, label: "logo.svg", size: "320×120" },
  { id: 5, label: "product.jpg", size: "800×800" },
  { id: 6, label: "bg-texture.png", size: "2048×2048" },
];

const MOCK_COLORS = [
  { hex: "#6D28D9", label: "Primary" },
  { hex: "#1E1B4B", label: "Background" },
  { hex: "#F9FAFB", label: "Text" },
  { hex: "#A78BFA", label: "Accent" },
  { hex: "#7C3AED", label: "Hover" },
  { hex: "#EDE9FE", label: "Surface" },
  { hex: "#312E81", label: "Dark" },
  { hex: "#DDD6FE", label: "Light" },
];

const MOCK_FONTS = [
  { name: "Syne", preview: "Aa Bb Cc 123", role: "Headings" },
  { name: "DM Sans", preview: "Aa Bb Cc 123", role: "Body" },
  { name: "JetBrains Mono", preview: "const x = 42", role: "Code" },
];

// Gradient placeholders for images
const IMG_GRADIENTS = [
  "from-violet-900 to-indigo-800",
  "from-blue-900 to-cyan-700",
  "from-purple-900 to-pink-700",
  "from-indigo-900 to-violet-600",
  "from-slate-800 to-purple-900",
  "from-violet-800 to-blue-900",
];

export function BookmarkletMockup() {
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());

  const toggleImage = (id: number) => {
    setSelectedImages((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelectedImages(new Set(MOCK_IMAGES.map((i) => i.id)));
  const clearAll = () => setSelectedImages(new Set());

  return (
    <div
      className="w-full max-w-[460px] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10"
      style={{ background: "#0f0f13" }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold text-sm">⬡</span>
          <span className="text-sm font-semibold text-white/90" style={{ fontFamily: "var(--font-syne)" }}>
            Web Bookmarker
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="images" className="w-full">
        <TabsList className="w-full rounded-none border-b border-white/8 bg-transparent h-10 px-3 gap-1 justify-start">
          <TabsTrigger
            value="images"
            className="text-xs rounded-md data-[state=active]:bg-primary/15 data-[state=active]:text-primary text-white/40"
          >
            🖼 Images
          </TabsTrigger>
          <TabsTrigger
            value="styles"
            className="text-xs rounded-md data-[state=active]:bg-primary/15 data-[state=active]:text-primary text-white/40"
          >
            🎨 Styles
          </TabsTrigger>
        </TabsList>

        {/* Images tab */}
        <TabsContent value="images" className="mt-0 p-3">
          {/* Toolbar */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <button
              onClick={selectAll}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-white/8 text-white/60 hover:bg-white/12 hover:text-white/90 transition-colors border border-white/8"
            >
              Select all
            </button>
            <button
              onClick={clearAll}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-white/8 text-white/60 hover:bg-white/12 hover:text-white/90 transition-colors border border-white/8"
            >
              Clear
            </button>
            <select className="text-[11px] px-2 py-1 rounded-lg bg-white/8 text-white/60 border border-white/8 outline-none ml-auto">
              <option>Original</option>
              <option>PNG</option>
              <option>JPEG</option>
              <option>WebP</option>
            </select>
          </div>

          <div className="flex gap-2 mb-3">
            <button
              className={cn(
                "text-[11px] px-3 py-1.5 rounded-lg font-medium transition-all",
                selectedImages.size > 0
                  ? "bg-primary text-white hover:bg-primary/80"
                  : "bg-white/5 text-white/30 cursor-not-allowed"
              )}
            >
              ⬇ Download ({selectedImages.size})
            </button>
            <button
              className={cn(
                "text-[11px] px-3 py-1.5 rounded-lg font-medium transition-all",
                selectedImages.size > 0
                  ? "bg-primary text-white hover:bg-primary/80"
                  : "bg-white/5 text-white/30 cursor-not-allowed"
              )}
            >
              📦 ZIP
            </button>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-3 gap-2">
            {MOCK_IMAGES.map((img, i) => (
              <button
                key={img.id}
                onClick={() => toggleImage(img.id)}
                className={cn(
                  "relative rounded-xl overflow-hidden aspect-square transition-all duration-200 border-2",
                  selectedImages.has(img.id)
                    ? "border-primary scale-[0.97]"
                    : "border-transparent hover:border-primary/40"
                )}
              >
                <div
                  className={cn(
                    "w-full h-full bg-gradient-to-br flex flex-col items-end justify-end p-1.5",
                    IMG_GRADIENTS[i]
                  )}
                >
                  <span className="text-[9px] text-white/60 bg-black/30 rounded px-1 leading-4">
                    {img.size}
                  </span>
                </div>
                {selectedImages.has(img.id) && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[9px] text-white font-bold">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>

          <p className="text-[10px] text-white/30 mt-2 text-center">
            {MOCK_IMAGES.length} images found · {selectedImages.size} selected
          </p>
        </TabsContent>

        {/* Styles tab */}
        <TabsContent value="styles" className="mt-0 p-3 space-y-4">
          {/* Colors */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest">
                Color palette
              </p>
              <button className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/8 text-white/50 hover:text-white/80 border border-white/8 transition-colors">
                Copy all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {MOCK_COLORS.map((c) => (
                <div key={c.hex} className="flex flex-col items-center gap-1">
                  <button
                    className="w-10 h-10 rounded-xl border border-white/10 hover:scale-110 transition-transform shadow-md"
                    style={{ background: c.hex }}
                    title={c.hex}
                  />
                  <span className="text-[9px] text-white/30">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fonts */}
          <div>
            <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-2">
              Typography
            </p>
            <div className="space-y-2">
              {MOCK_FONTS.map((f) => (
                <div
                  key={f.name}
                  className="bg-white/4 rounded-xl p-3 border border-white/8 flex items-center justify-between"
                >
                  <div>
                    <p className="text-[10px] text-white/40 mb-0.5">{f.name} · {f.role}</p>
                    <p className="text-base text-white/80" style={{ fontFamily: f.name }}>
                      {f.preview}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-[9px] px-1.5">
                    {f.role}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
