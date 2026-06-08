"use client";

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
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-20">
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("howHeadingPart1")}{" "}
            <span className="text-primary">
              {t("howHeadingPart2")}
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl">
            {t("howSubheading")}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12 relative border-t border-white/10 pt-12">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="relative space-y-4"
            >
              <div className="text-5xl font-extrabold tracking-tight text-primary/25 font-display select-none">
                {step.number}
              </div>

              <h3
                className="text-lg font-bold text-foreground leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
