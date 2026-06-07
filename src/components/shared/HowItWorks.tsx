"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/LanguageContext";

export function HowItWorks() {
  const { t } = useLanguage();

  const STEPS = [
    {
      number: "01",
      title: t("howStep1Title"),
      description: t("howStep1Desc"),
    },
    {
      number: "02",
      title: t("howStep2Title"),
      description: t("howStep2Desc"),
    },
    {
      number: "03",
      title: t("howStep3Title"),
      description: t("howStep3Desc"),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            {t("howTitle")}
          </p>
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("howHeadingPart1")}{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, oklch(0.72 0.2 295), oklch(0.6 0.18 220))",
              }}
            >
              {t("howHeadingPart2")}
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            {t("howSubheading")}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div
            aria-hidden
            className="hidden md:block absolute top-[72px] left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, oklch(0.72 0.2 295 / 30%), oklch(0.72 0.2 295 / 30%), transparent)",
            }}
          />

          {STEPS.map((step, i) => (
            <Card
              key={step.number}
              className="relative border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <CardContent className="py-5 px-7">
                <span className="text-[11px] font-bold tracking-widest text-primary/60 uppercase mb-2 block">
                  {t("howStep")} {step.number}
                </span>

                <h3
                  className="text-lg font-bold text-foreground mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
