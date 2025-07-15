import { Metadata } from "next";
import ElfNamePage from "@/components/ElfNamePage";

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
  // Our elf name generator page includes wood elf name generator, dark elf name generator, half elf name generator
  return <ElfNamePage />;
}