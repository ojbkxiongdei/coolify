import { Metadata } from "next";
import ElfNameClient from "@/components/ElfNameClient";
import ElfNameSEO from "@/components/ElfNameSEO";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Elf Name Generator - Fantasy Names for All Elf Types | DreamfinityX",
  description: "Generate authentic fantasy elf names for D&D, fantasy stories, and RPGs. Create names for wood elves, dark elves, half-elves, and blood elves with our AI-powered elf name generator. Perfect for writers, gamers, and fantasy enthusiasts.",
  keywords: [
    "elf name generator",
    "half elf name generator",
    "wood elf name generator", 
    "dark elf name generator",
    "elf names generator",
    "elf name generator dnd",
    "blood elf name generator",
    "fantasy name generator", 
    "D&D elf names",
    "fantasy names",
    "RPG names",
    "character names",
    "random elf names",
    "fantasy character generator",
    "elvish names",
    "elven names"
  ],
  authors: [{ name: "DreamfinityX" }],
  creator: "DreamfinityX",
  publisher: "DreamfinityX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dreamfinityx.com"),
  alternates: {
    canonical: "/elf-name-generator",
  },
  openGraph: {
    title: "Elf Name Generator - Create Names for Wood Elves, Dark Elves & Half Elves",
    description: "Generate authentic fantasy elf names for D&D, fantasy stories, and RPGs with our wood elf name generator, dark elf name generator, half elf name generator, and blood elf name generator tools.",
    url: "https://dreamfinityx.com/elf-name-generator",
    siteName: "DreamfinityX",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-elf-name-generator.jpg",
        width: 1200,
        height: 630,
        alt: "Elf Name Generator - Create Fantasy Elf Names",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elf Name Generator for D&D, Wood Elves, Dark Elves & Half Elves",
    description: "Generate authentic fantasy elf names for D&D, fantasy stories, and RPGs. Wood elf name generator, dark elf name generator, half elf name generator, and blood elf name generator tools.",
    images: ["/og-elf-name-generator.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ElfNameGeneratorPage() {
  return (
    <div className="min-h-screen">
      {/* NoScript SEO内容，确保搜索引擎即使不执行JavaScript也能看到关键内容 */}
      <noscript>
        <div>
          <h2>Elf Name Generator - Fantasy Name Creation</h2>
          <p>
            Our elf name generator creates names for wood elves, dark elves, half elves, and more.
            Use our wood elf name generator, dark elf name generator, and half elf name generator tools for your RPG characters.
            This elf name generator dnd tool is perfect for creating fantasy character names.
          </p>
        </div>
      </noscript>
      
      <StructuredData
        type="software"
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Elf Name Generator",
          "applicationCategory": "EntertainmentApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Generate fantasy elf names for Wood Elves, Dark Elves, High Elves and more with our Elf Name Generator."
        }}
      />
      
      {/* 主要功能区 - 客户端组件 */}
      <ElfNameClient />
      
      {/* SEO内容 - 直接渲染 */}
      <ElfNameSEO />
    </div>
  );
}