import React from 'react'
import { Metadata } from 'next'
import CharacterHeadcanonClient from '@/components/CharacterHeadcanonClient'
import CharacterHeadcanonSEO from '@/components/CharacterHeadcanonSEO'
import StructuredData from '@/components/StructuredData'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Character Headcanon Generator - Create Detailed Character Stories | DreamfinityX',
  description: 'Our character headcanon generator creates detailed character stories for any fandom. Use this character headcanons generator for fan fiction, roleplaying, and creative writing.',
  keywords: 'character headcanon generator, character headcanons generator, character headcanon generator improved, characters headcanon generator, random character headcanon generator, headcanon character generator, fan fiction, character development, AI writing tool',
  robots: 'index, follow',
  openGraph: {
    title: 'Character Headcanon Generator - Create Fan Fiction Characters',
    description: 'Use our character headcanon generator to create detailed character stories. The best character headcanons generator for fan fiction writers and creative enthusiasts.',
    url: 'https://dreamfinityx.com/stories/backstory/character-headcanon-generator',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dreamfinityx.com/stories/backstory/character-headcanon-generator',
  },
}

export default function CharacterHeadcanonGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <nav className="container mx-auto px-4 text-sm py-4 text-gray-500">
        <ol className="flex flex-wrap">
          <li className="flex items-center">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link href="/stories" className="hover:text-blue-600">Story Tools</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link href="/stories/backstory" className="hover:text-blue-600">Backstory</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-700 font-medium">Character Headcanon Generator</li>
        </ol>
      </nav>
      
      {/* NoScript SEO内容，确保搜索引擎即使不执行JavaScript也能看到关键内容 */}
      <noscript>
        <div>
          <h2>Character Headcanon Generator - Create Fan Fiction Characters</h2>
          <p>
            Our character headcanon generator creates detailed character stories for any fandom.
            Use this character headcanons generator for fan fiction writing and roleplaying.
            Our improved character headcanon generator helps create authentic character backgrounds.
          </p>
        </div>
      </noscript>

      <StructuredData
        type="software"
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Character Headcanon Generator",
          "applicationCategory": "CreativeApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Create detailed character backstories and headcanons for your fan fiction, roleplaying games, and creative writing projects.",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://dreamfinityx.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Story Tools",
                "item": "https://dreamfinityx.com/stories"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Backstory",
                "item": "https://dreamfinityx.com/stories/backstory"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Character Headcanon Generator",
                "item": "https://dreamfinityx.com/stories/backstory/character-headcanon-generator"
              }
            ]
          }
        }}
      />
      
      {/* 主要功能区 - 客户端交互组件 */}
      <section className="py-8 px-4" id="generator">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Character Headcanon Generator | Create Character Stories
            </h1>
            <p className="text-lg text-gray-600">
              Our character headcanon generator creates detailed, believable character stories. Use this improved character headcanon generator for fan fiction, roleplaying, and creative writing.
            </p>
          </div>

          {/* Function Module */}
          <CharacterHeadcanonClient />
        </div>
      </section>
      
      {/* SEO内容 - 直接渲染 */}
      <CharacterHeadcanonSEO />
    </div>
  );
} 