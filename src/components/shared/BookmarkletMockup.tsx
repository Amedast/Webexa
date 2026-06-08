"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { Image as ImageIcon, PaintBrush } from "@phosphor-icons/react";
import { Logo } from "./Logo";

// ─── Mock data for the visual demo ──────────────────────────────────────────
const MOCK_IMAGES = [
  {
    id: 1,
    label: "hero.jpg",
    size: "1920×1080",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    label: "avatar.png",
    size: "400×400",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    label: "banner.webp",
    size: "1200×630",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    label: "logo.svg",
    size: "320×120",
    url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    label: "product.jpg",
    size: "800×800",
    url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    label: "bg-texture.png",
    size: "2048×2048",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=200&auto=format&fit=crop&q=60",
  },
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
  { name: "Outfit", preview: "Aa Bb Cc 123", role: "Headings" },
  { name: "DM Sans", preview: "Aa Bb Cc 123", role: "Body" },
  { name: "JetBrains Mono", preview: "const x = 42", role: "Code" },
];

export function BookmarkletMockup() {
  const [selectedImages, setSelectedImages] = useState<Set<number>>(
    new Set([1, 3]),
  );
  const { t } = useLanguage();

  const toggleImage = (id: number) => {
    setSelectedImages((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () =>
    setSelectedImages(new Set(MOCK_IMAGES.map((i) => i.id)));
  const clearAll = () => setSelectedImages(new Set());

  return (
    <div
      className="w-115 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10"
      style={{ background: "#0f0f13" }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 select-none">
        <div className="flex items-center gap-2">
          <Logo className="w-3.5 h-3.5 text-primary" />
          <span
            className="text-sm font-semibold text-white/90"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("mockTitle")}
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/75" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/75" />
          <span className="w-3 h-3 rounded-full bg-green-500/75" />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="images" className="w-full">
        <TabsList className="w-full rounded-none border-b border-white/8 bg-transparent h-10 px-3 gap-1 justify-start">
          <TabsTrigger
            value="images"
            className="text-xs rounded-md data-[state=active]:bg-primary/15 data-[state=active]:text-primary text-white/40 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5" weight="light" />
            <span>{t("mockTabImages")}</span>
          </TabsTrigger>
          <TabsTrigger
            value="styles"
            className="text-xs rounded-md data-[state=active]:bg-primary/15 data-[state=active]:text-primary text-white/40 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <PaintBrush className="w-3.5 h-3.5" weight="light" />
            <span>{t("mockTabStyles")}</span>
          </TabsTrigger>
        </TabsList>

        {/* Images tab */}
        <TabsContent
          value="images"
          className="mt-0 p-3 h-87.5 flex flex-col justify-between"
        >
          <div>
            {/* Toolbar */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <button
                onClick={selectAll}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/8 text-white/60 hover:bg-white/12 hover:text-white/90 transition-colors border border-white/8 cursor-pointer"
              >
                {t("featImgSelectAll")}
              </button>
              <button
                onClick={clearAll}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/8 text-white/60 hover:bg-white/12 hover:text-white/90 transition-colors border border-white/8 cursor-pointer"
              >
                {t("featImgClear")}
              </button>
              <select className="text-[11px] pl-2 pr-6 py-1 rounded-lg bg-white/8 text-white/60 border border-white/8 outline-none ml-auto cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%23ffffff80%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[size:1rem_1rem] bg-[right_0.25rem_center] bg-no-repeat">
                <option className="bg-[#15151a] text-white">{t("featImgOriginal")}</option>
                <option className="bg-[#15151a] text-white">PNG</option>
                <option className="bg-[#15151a] text-white">JPEG</option>
                <option className="bg-[#15151a] text-white">WebP</option>
              </select>
            </div>

            <div className="flex gap-2 mb-3">
              <button
                className={cn(
                  "text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-all border border-primary/20",
                  selectedImages.size > 0 ? "bg-primary text-white hover:bg-primary/80 cursor-pointer" : "bg-white/5 text-white/30 cursor-not-allowed",
                )}
              >
                {t("featImgDownloadSelected")} ({selectedImages.size})
              </button>
              <button
                className="text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-all border border-white/8 bg-white/8 text-white/60 hover:bg-white/12 hover:text-white/90 cursor-pointer"
              >
                {t("featImgDownloadAll")}
              </button>
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-3 gap-2">
              {MOCK_IMAGES.map((img) => (
                <button
                  key={img.id}
                  onClick={() => toggleImage(img.id)}
                  className={cn(
                    "relative rounded-xl overflow-hidden aspect-square transition-all duration-200 border-2 bg-neutral-900 cursor-pointer",
                    selectedImages.has(img.id)
                      ? "border-primary scale-[0.97]"
                      : "border-transparent hover:border-primary/40",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.label}
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute bottom-1 right-1">
                    <span className="text-[8px] text-white/75 bg-black/40 rounded px-1 leading-4 font-mono">
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
          </div>

          <p className="text-[10px] text-white/30 mt-3 text-center font-mono">
            {MOCK_IMAGES.length} {t("featImgFound")} · {selectedImages.size}{" "}
            {t("mockSelected")}
          </p>
        </TabsContent>

        {/* Styles tab */}
        <TabsContent
          value="styles"
          className="mt-0 p-3 h-87.5 overflow-y-auto scrollbar-thin space-y-4"
        >
          {/* Colors */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest font-mono">
                {t("mockColorsTitle")}
              </p>
              <button className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/8 text-white/50 hover:text-white/80 border border-white/8 transition-colors font-semibold cursor-pointer">
                {t("featStyleCopyAll")}
              </button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {MOCK_COLORS.map((c) => (
                <div key={c.hex} className="flex flex-col items-center gap-1.5">
                  <button
                    className="w-9 h-9 rounded-xl border border-white/10 hover:scale-110 transition-transform shadow-md cursor-pointer"
                    style={{ background: c.hex }}
                    title={c.hex}
                  />
                  <span className="text-[8px] text-white/30 font-mono tracking-tight">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fonts */}
          <div>
            <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-2 font-mono">
              {t("mockFontsTitle")}
            </p>
            <div className="space-y-2">
              {MOCK_FONTS.map((f) => (
                <div
                  key={f.name}
                  className="bg-white/4 rounded-xl p-2.5 border border-white/8 flex items-center justify-between"
                >
                  <div>
                    <p className="text-[9px] text-white/40 mb-0.5 font-mono">
                      {f.name} · {f.role}
                    </p>
                    <p
                      className="text-sm text-white/80"
                      style={{
                        fontFamily:
                          f.name === "Outfit" ? "var(--font-display)" : f.name,
                      }}
                    >
                      {f.preview}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-[8px] px-1.5 font-medium"
                  >
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
