import { Separator } from "@/components/ui/separator";

const FOOTER_LINKS = [
  { label: "GitHub", href: "https://github.com" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">⬡</span>
          <span
            className="text-sm font-semibold text-foreground"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Web Bookmarker
          </span>
          <span className="text-muted-foreground text-sm">
            — Extract anything from the web.
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

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Web Bookmarker. MIT License.
        </p>
      </div>
    </footer>
  );
}
