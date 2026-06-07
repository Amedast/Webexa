import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BookmarkletMockup } from "./BookmarkletMockup";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center mesh-bg overflow-hidden pt-16">
      {/* Background decorative orbs */}
      <div
        aria-hidden
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px] pointer-events-none"
        style={{ background: "var(--brand)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{ background: "oklch(0.6 0.18 220)" }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text column */}
        <div className="space-y-8">
          <div className="animate-reveal-up delay-100">
            <Badge
              variant="secondary"
              className="mb-6 text-xs px-3 py-1 gap-2 border border-primary/30 bg-primary/10 text-primary"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
              Free bookmarklet · No extension needed
            </Badge>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Extract
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.72 0.2 295), oklch(0.6 0.18 220))",
                }}
              >
                anything
              </span>
              <br />
              from the web.
            </h1>
          </div>

          <p
            className="text-lg text-muted-foreground leading-relaxed max-w-md animate-reveal-up delay-200"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            A powerful browser bookmarklet that lets you grab{" "}
            <strong className="text-foreground">all images</strong>, extract{" "}
            <strong className="text-foreground">color palettes</strong>, and discover{" "}
            <strong className="text-foreground">typography</strong> — from any webpage,
            in one click.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-reveal-up delay-300">
            <Link
              href="#install"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-8 font-semibold text-base animate-pulse-glow"
              )}
            >
              Install Bookmarklet →
            </Link>
            <Link
              href="#features"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full px-8 text-base border-white/10 hover:bg-white/5"
              )}
            >
              See how it works
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-2 animate-reveal-up delay-400">
            {[
              { value: "100%", label: "Free & open" },
              { value: "0", label: "Installs needed" },
              { value: "Any", label: "Website works" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-2xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mockup column */}
        <div className="flex justify-center lg:justify-end animate-reveal-up delay-400">
          <div className="animate-float relative">
            {/* Glow behind mockup */}
            <div
              aria-hidden
              className="absolute inset-0 -m-8 rounded-3xl blur-3xl opacity-30 pointer-events-none"
              style={{ background: "var(--brand)" }}
            />
            <BookmarkletMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
