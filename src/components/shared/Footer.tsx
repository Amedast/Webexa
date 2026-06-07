"use client";

import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/lib/LanguageContext";
import { Logo } from "./Logo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/40 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Logo className="w-5 h-5 text-primary" />
          <span
            className="text-sm font-semibold text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Webexa
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a
            href="https://github.com"
            className="hover:text-foreground transition-colors font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <Separator orientation="vertical" className="h-3" />
          <Dialog>
            <DialogTrigger className="hover:text-foreground transition-colors cursor-pointer bg-transparent border-0 p-0 text-muted-foreground text-sm font-semibold">
              {t("footLinksPrivacy")}
            </DialogTrigger>
            <DialogContent className="max-w-md bg-card border border-border text-foreground">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  {t("privacyTitle")}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm mt-1">
                  {t("privacySub")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-3 text-sm leading-relaxed text-foreground/90">
                <p>
                  <strong>{t("privacyColTitle")}:</strong> {t("privacyColDesc")}
                </p>
                <p>
                  <strong>{t("privacyAccTitle")}:</strong> {t("privacyAccDesc")}
                </p>
                <p>
                  <strong>{t("privacyLocTitle")}:</strong> {t("privacyLocDesc")}
                </p>
                <p>
                  <strong>{t("privacySecTitle")}:</strong> {t("privacySecDesc")}
                </p>
                <p>{t("privacyFooter")}</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <p className="text-xs text-muted-foreground font-mono">
          © {new Date().getFullYear()} Webexa.
        </p>
      </div>
    </footer>
  );
}
