import React from 'react'
import CharacterHeadcanonPage from '@/components/CharacterHeadcanonPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Character Headcanon Generator - AI-Powered Fan Fiction Tool | DreamfinityX',
  description: 'Generate detailed character headcanons for any fandom with our AI-powered character headcanon generator. Perfect for fan fiction writers, roleplayers, and creative enthusiasts.',
  keywords: 'character headcanon generator, fan fiction, character development, AI writing tool, headcanon creator, fandom writing, creative writing',
  robots: 'index, follow',
  openGraph: {
    title: 'Character Headcanon Generator - AI-Powered Fan Fiction Tool',
    description: 'Generate detailed character headcanons for any fandom with our AI-powered character headcanon generator.',
    url: 'https://dreamfinityx.com/character-headcanon-generator',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dreamfinityx.com/character-headcanon-generator',
  },
}

export default function CharacterHeadcanonGeneratorPage() {
  return <CharacterHeadcanonPage />
} 