"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

interface InstallSectionProps {
  bookmarkletCode?: string;
}

export function InstallSection({ bookmarkletCode = "" }: InstallSectionProps) {
  const [dragging, setDragging] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { t } = useLanguage();

  const BROWSER_STEPS = {
    chrome: [
      t("instStepChrome1"),
      t("instStepChrome2"),
      t("instStepChrome3"),
      t("instStepChrome4"),
    ],
    firefox: [
      t("instStepFirefox1"),
      t("instStepFirefox2"),
      t("instStepFirefox3"),
      t("instStepFirefox4"),
    ],
    safari: [
      t("instStepSafari1"),
      t("instStepSafari2"),
      t("instStepSafari3"),
      t("instStepSafari4"),
    ],
  };

  useEffect(() => {
    if (linkRef.current && bookmarkletCode) {
      linkRef.current.setAttribute("href", bookmarkletCode);
    }
  }, [bookmarkletCode]);

  return (
    <section id="install" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            {t("instTitle")}
          </p>
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("instHeadingPart1")}{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, oklch(0.72 0.2 295), oklch(0.6 0.18 220))",
              }}
            >
              {t("instHeadingPart2")}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("instSubheading")}
          </p>
        </div>

        {/* Drag target CTA */}
        <div className="flex justify-center mb-14">
          <div className="text-center space-y-6">
            <p className="text-sm text-muted-foreground animate-bounce">
              {t("instDragBadge")}
            </p>

            {/* The actual bookmarklet link */}
            <a
              ref={linkRef}
              href="#"
              id="bookmarklet-install-link"
              className={cn(
                "drag-target inline-flex items-center gap-3 px-8 py-4 rounded-2xl",
                "border-2 border-primary/40 bg-primary/10 text-foreground",
                "font-semibold text-base transition-all duration-200 cursor-grab",
                "hover:border-primary/70 hover:bg-primary/20 hover:scale-105",
                "shadow-lg shadow-primary/10 select-none",
                dragging && "scale-110 border-primary shadow-xl shadow-primary/20"
              )}
              onDragStart={() => setDragging(true)}
              onDragEnd={() => setDragging(false)}
              onClick={(e) => e.preventDefault()}
              title="Drag me to your bookmarks bar!"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-primary font-bold text-xl">⬡</span>
              <span>{t("instDragBtn")}</span>
            </a>

            <p className="text-xs text-muted-foreground">
              {t("instDragHint")}
            </p>
          </div>
        </div>

        {/* Browser-specific instructions */}
        <Card className="border-border/50 bg-card/60">
          <CardContent className="pt-6">
            <Tabs defaultValue="chrome">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="chrome">Chrome</TabsTrigger>
                <TabsTrigger value="firefox">Firefox</TabsTrigger>
                <TabsTrigger value="safari">Safari</TabsTrigger>
              </TabsList>

              {(Object.entries(BROWSER_STEPS) as [string, string[]][]).map(
                ([browser, steps]) => (
                  <TabsContent key={browser} value={browser}>
                    <ol className="space-y-4">
                      {steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <span className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                            {step}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </TabsContent>
                )
              )}
            </Tabs>
          </CardContent>
        </Card>

        {/* Troubleshooting note */}
        <div className="mt-8 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 flex items-start gap-3">
          <span className="text-yellow-500 text-lg flex-shrink-0">⚠</span>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">{t("instNote")}</strong> {t("instWarning")}
          </p>
        </div>
      </div>
    </section>
  );
}
