import { Metadata } from "next";
import ElfNamePage from "@/components/ElfNamePage";

export const metadata: Metadata = {
  title: "Elf Name Generator - Fantasy Names for All Elf Types | DreamfinityX",
  description: "Generate authentic fantasy elf names for D&D, fantasy stories, and RPGs. Create names for wood elves, dark elves, half-elves, and more with our AI-powered generator. Perfect for writers, gamers, and fantasy enthusiasts.",
  keywords: [
    "elf name generator",
    "fantasy name generator", 
    "D&D elf names",
    "half elf name generator",
    "wood elf names",
    "dark elf names",
    "fantasy names",
    "RPG names",
    "character names",
    "elf names generator",
    "random elf names",
    "fantasy character generator",
    "tolkien elf names",
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
    title: "Elf Name Generator - Fantasy Names for All Elf Types",
    description: "Generate authentic fantasy elf names for D&D, fantasy stories, and RPGs. Create names for wood elves, dark elves, half-elves, and more with our AI-powered generator.",
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
    title: "Elf Name Generator - Fantasy Names for All Elf Types",
    description: "Generate authentic fantasy elf names for D&D, fantasy stories, and RPGs. Create names for wood elves, dark elves, half-elves, and more.",
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
  return <ElfNamePage />;
}