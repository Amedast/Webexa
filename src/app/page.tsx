import fs from "fs";
import path from "path";
import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/shared/HeroSection";
import { HowItWorks } from "@/components/shared/HowItWorks";
import { FeatureImages } from "@/components/shared/FeatureImages";
import { FeatureStyles } from "@/components/shared/FeatureStyles";
import { InstallSection } from "@/components/shared/InstallSection";
import { Footer } from "@/components/shared/Footer";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  // Read the minified bookmarklet code from the file system
  let bookmarkletCode = "";
  try {
    const filePath = path.join(process.cwd(), "public/bookmarklet.min.txt");
    bookmarkletCode = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Failed to read bookmarklet code:", error);
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <Separator className="opacity-20" />
        <HowItWorks />
        <Separator className="opacity-20" />
        <FeatureImages />
        <Separator className="opacity-20" />
        <FeatureStyles />
        <Separator className="opacity-20" />
        <InstallSection bookmarkletCode={bookmarkletCode} />
      </main>
      <Footer />
    </>
  );
}
