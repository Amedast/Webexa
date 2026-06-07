"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { ImageIcon } from "lucide-react";


const MOCK_IMAGES = [
  { id: 1, url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=60", size: "1920×1080", name: "hero.jpg" },
  { id: 2, url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=60", size: "400×400", name: "avatar.png" },
  { id: 3, url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&auto=format&fit=crop&q=60", size: "1200×630", name: "og-image.jpg" },
  { id: 4, url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=300&auto=format&fit=crop&q=60", size: "320×120", name: "logo.svg" },
  { id: 5, url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300&auto=format&fit=crop&q=60", size: "800×800", name: "product.jpg" },
  { id: 6, url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=300&auto=format&fit=crop&q=60", size: "2048×2048", name: "texture.png" },
  { id: 7, url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&auto=format&fit=crop&q=60", size: "640×480", name: "gallery-1.jpg" },
  { id: 8, url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&auto=format&fit=crop&q=60", size: "1280×720", name: "cover.webp" },
];

export function FeatureImages() {
  const [selected, setSelected] = useState<Set<number>>(new Set([1, 3, 5]));
  const [format, setFormat] = useState("original");
  const { t } = useLanguage();

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
              className="border border-primary/30 bg-primary/10 text-primary text-xs inline-flex items-center gap-1.5"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{t("featImgBadge")}</span>
            </Badge>
            <h2
              className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("featImgHeadingPart1")}{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.72 0.2 295), oklch(0.6 0.18 220))",
                }}
              >
                {t("featImgHeadingPart2")}
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("featImgDesc1")}{" "}
              <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded font-mono text-primary/80">
                &lt;img&gt;
              </code>{" "}
              {t("featImgDesc2")}
            </p>

            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                t("featImgBullet1"),
                t("featImgBullet2"),
                t("featImgBullet3"),
                t("featImgBullet4"),
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
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/8 text-white/60 hover:bg-white/12 transition-colors border border-white/8 cursor-pointer"
              >
                {t("featImgSelectAll")}
              </button>
              <button
                onClick={() => setSelected(new Set())}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/8 text-white/60 hover:bg-white/12 transition-colors border border-white/8 cursor-pointer"
              >
                {t("featImgClear")}
              </button>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="text-[11px] pl-2 pr-6 py-1 rounded-lg bg-white/8 text-white/60 border border-white/8 outline-none ml-auto cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%23ffffff80%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[size:1rem_1rem] bg-[right_0.25rem_center] bg-no-repeat"
              >
                <option value="original" className="bg-[#15151a] text-white">{t("featImgOriginal")}</option>
                <option value="png" className="bg-[#15151a] text-white">PNG</option>
                <option value="jpeg" className="bg-[#15151a] text-white">JPEG</option>
                <option value="webp" className="bg-[#15151a] text-white">WebP</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                disabled={selected.size === 0}
                className={cn(
                  "text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-all",
                  selected.size > 0 ? "bg-primary text-white hover:bg-primary/80 cursor-pointer" : "bg-white/5 text-white/30 cursor-not-allowed"
                )}
              >
                {t("featImgDownloadSelected")} ({selected.size})
              </button>
              <button
                className="text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-all bg-white/8 text-white/60 hover:bg-white/12 hover:text-white/90 cursor-pointer border border-white/8"
              >
                {t("featImgDownloadAll")}
              </button>
              <span className="ml-auto text-[10px] text-white/30 self-center font-mono">
                {MOCK_IMAGES.length} {t("featImgFound")}
              </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-4 gap-2">
              {MOCK_IMAGES.map((img) => (
                <button
                  key={img.id}
                  onClick={() => toggle(img.id)}
                  className={cn(
                    "relative rounded-xl overflow-hidden aspect-square border-2 transition-all duration-200 bg-neutral-900 cursor-pointer",
                    selected.has(img.id)
                      ? "border-primary scale-[0.96]"
                      : "border-transparent hover:border-primary/40"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  />
                  {selected.has(img.id) && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                        ✓
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 px-1 pb-0.5 bg-black/40">
                    <p className="text-[8px] text-white/75 truncate font-mono">{img.name}</p>
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
