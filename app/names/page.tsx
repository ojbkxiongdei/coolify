import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamfinityx.com'),
  title: 'AI Name Generators | Fantasy, Character & Creative Names | DreamfinityX',
  description: 'Discover our collection of AI-powered name generators. Create fantasy names, character names, and creative identities for your projects with advanced AI technology.',
  keywords: 'AI name generator, fantasy names, character names, elf names, fantasy name generator, DnD names, RPG character names',
  robots: 'index, follow',
  openGraph: {
    title: 'AI Name Generators | Fantasy, Character & Creative Names | DreamfinityX',
    description: 'Generate perfect names for characters, fantasy worlds, and creative projects',
    type: 'website',
    url: 'https://dreamfinityx.com/names',
    locale: 'en_US',
  },
  alternates: {
    canonical: 'https://dreamfinityx.com/names',
  }
};

export default function NamesHub() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">AI Name Generators</h1>
          <p className="text-xl text-gray-700 mb-6">
            Create perfect names for characters, stories, worlds, and more with our 
            collection of AI-powered name generators. Whether for gaming, writing, or 
            creative projects, our tools help you find the perfect name.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/names/elf-name-generator" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Elf Name Generator
            </Link>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Featured Name Generators</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Elf Name Generator</h3>
              <p className="text-gray-700 mb-4">
                Generate authentic-sounding elvish names for your fantasy characters,
                with options for different elf types and customization.
              </p>
              <Link href="/names/elf-name-generator" className="text-blue-600 font-semibold hover:underline">
                Generate Elf Names →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Fantasy Character Names</h3>
              <p className="text-gray-700 mb-4">
                Generate fantasy character names for any genre or world setting. Perfect for 
                writers, gamers, and world builders looking for unique character identities.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Why Use Our Name Generators?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
              <p className="text-gray-700">
                Our generators use advanced AI to create names that are both authentic and unique, 
                drawing from extensive linguistic databases.
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Cultural Authenticity</h3>
              <p className="text-gray-700">
                Names respect linguistic patterns and cultural contexts, creating believable options 
                for your characters and worlds.
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Endless Variety</h3>
              <p className="text-gray-700">
                Generate unlimited unique names with different styles, origins, and meanings to find 
                the perfect match for your project.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Create Complete Characters</h2>
          <p className="text-gray-700 mb-6">
            Names are just the beginning. Complete your character creation process with our other tools:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Character Backstories</h3>
              <p className="text-gray-700 mb-4">
                Create rich, detailed character profiles for any fandom with our
                AI-powered character headcanon generator.
              </p>
              <Link href="/stories/character-headcanon-generator" className="text-blue-600 font-semibold hover:underline">
                Create Character Headcanons →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Character Portraits</h3>
              <p className="text-gray-700 mb-4">
                Turn your text descriptions into beautiful images to visualize your 
                characters after naming them.
              </p>
              <Link href="/images/ai-image-generator" className="text-blue-600 font-semibold hover:underline">
                Create Character Images →
              </Link>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Are these names unique?</h3>
              <p className="text-gray-700">
                Yes, our AI name generators create unique names based on linguistic patterns and cultural contexts.
                While no system can guarantee absolute uniqueness, our generators produce a vast variety of original names.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Can I use these names commercially?</h3>
              <p className="text-gray-700">
                Yes, names generated by our tools can be used in both personal and commercial projects including books, 
                games, and other creative works without attribution.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">How many names can I generate?</h3>
              <p className="text-gray-700">
                Free users can generate a limited number of names daily, while premium users enjoy unlimited name generation
                across all our generators. See our <Link href="/pricing" className="text-blue-600 hover:underline">pricing page</Link> for details.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 