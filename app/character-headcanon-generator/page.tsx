import React from 'react'
import CharacterHeadcanonPage from '@/components/CharacterHeadcanonPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Character Headcanon Generator - Create Detailed Character Stories | DreamfinityX',
  description: 'Our character headcanon generator creates detailed character stories for any fandom. Use this character headcanons generator for fan fiction, roleplaying, and creative writing.',
  keywords: 'character headcanon generator, character headcanons generator, character headcanon generator improved, characters headcanon generator, random character headcanon generator, headcanon character generator, fan fiction, character development, AI writing tool',
  robots: 'index, follow',
  openGraph: {
    title: 'Character Headcanon Generator - Create Fan Fiction Characters',
    description: 'Use our character headcanon generator to create detailed character stories. The best character headcanons generator for fan fiction writers and creative enthusiasts.',
    url: 'https://dreamfinityx.com/character-headcanon-generator',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dreamfinityx.com/character-headcanon-generator',
  },
}

export default function CharacterHeadcanonGeneratorPage() {
  // The character headcanon generator page - supports character headcanons generator functionality
  return <CharacterHeadcanonPage />
} 