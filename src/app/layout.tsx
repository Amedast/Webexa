import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Web Bookmarker — Extract Images & Styles from Any Website",
  description:
    "A powerful browser bookmarklet that lets you extract, preview, and download all images from any webpage, plus capture the full color palette and typography. No extension needed.",
  keywords: [
    "bookmarklet",
    "extract images",
    "color palette extractor",
    "web scraper",
    "typography extractor",
    "download images",
    "web design tools",
  ],
  openGraph: {
    title: "Web Bookmarker — Extract Images & Styles from Any Website",
    description:
      "Install once, use everywhere. Extract images, colors, and fonts from any webpage with a single click.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Bookmarker",
    description:
      "Extract images, color palettes and typography from any website instantly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
