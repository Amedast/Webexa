"use client";

import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/lib/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const FOOTER_LINKS = [
    { label: "GitHub", href: "https://github.com" },
    { label: t("footLinksPrivacy"), href: "#" },
    { label: t("footLinksTerms"), href: "#" },
  ];

  return (
    <footer className="border-t border-border/40 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">⬡</span>
          <span
            className="text-sm font-semibold text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Webexa
          </span>
          <span className="text-muted-foreground text-sm">
            {t("footTagline")}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {FOOTER_LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center gap-4">
              <a
                href={link.href}
                className="hover:text-foreground transition-colors"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
              {i < FOOTER_LINKS.length - 1 && (
                <Separator orientation="vertical" className="h-3" />
              )}
            </span>
          ))}
        </div>

        <p className="text-xs text-muted-foreground font-mono">
          © {new Date().getFullYear()} Webexa. {t("footLicense")}
        </p>
      </div>
    </footer>
  );
}
