"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BookmarkletMockup } from "./BookmarkletMockup";
import { useLanguage } from "@/lib/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center mesh-bg overflow-hidden pt-16">
      <div className="max-w-6xl mx-auto px-6 w-full py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text column */}
        <div className="space-y-8">
          <div className="animate-reveal-up delay-100">
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("heroTitlePart1")}
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.72 0.2 295), oklch(0.6 0.18 220))",
                }}
              >
                {t("heroTitlePart2")}
              </span>
              <br />
              {t("heroTitlePart3")}
            </h1>
          </div>

          <p
            className="text-lg text-muted-foreground leading-relaxed max-w-md animate-reveal-up delay-200"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t("heroDescription")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-reveal-up delay-300">
            <Link
              href="#install"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-8 font-semibold text-base",
              )}
            >
              {t("heroInstallBtn")} →
            </Link>
            <Link
              href="#features"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full px-8 text-base border-white/10 hover:bg-white/5",
              )}
            >
              {t("heroHowBtn")}
            </Link>
          </div>
        </div>

        {/* Mockup column */}
        <div className="flex justify-center lg:justify-end animate-reveal-up delay-400">
          <div className="animate-float relative">
            <BookmarkletMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

