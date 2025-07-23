import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamfinityx.com'),
  title: 'Fantasy Name Generators | D&D, RPG & Creative Names | DreamfinityX',
  description: 'Generate unique fantasy names for elves, dwarves, wizards and more with our AI-powered fantasy name generators. Perfect for D&D, RPGs, writing, and creative projects.',
  keywords: 'fantasy name generator, D&D names, RPG character names, elf names, dwarf names, fantasy character names',
  robots: 'index, follow',
  openGraph: {
    title: 'Fantasy Name Generators | D&D, RPG & Creative Names',
    description: 'Generate unique fantasy names for your characters, worlds and stories',
    url: 'https://dreamfinityx.com/names/fantasy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dreamfinityx.com/names/fantasy',
  }
};

export default function FantasyNamesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm mb-6 text-gray-500">
          <ol className="flex flex-wrap">
            <li className="flex items-center">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link href="/names" className="hover:text-blue-600">Name Generators</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-700 font-medium">Fantasy Names</li>
          </ol>
        </nav>

        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Fantasy Name Generators</h1>
          <p className="text-xl text-gray-700 mb-6">
            Create authentic, unique fantasy names for your characters, worlds, and stories with our 
            specialized AI fantasy name generators. Perfect for role-playing games, creative writing, 
            fantasy world-building, and more.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/names/fantasy/elf-name-generator" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Elf Names
            </Link>
            <Link href="/names/fantasy" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
              Dwarf Names
            </Link>
            <Link href="/names/fantasy" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
              Wizard Names
            </Link>
            <Link href="/names/fantasy" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
              Fantasy Places
            </Link>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Available Fantasy Name Generators</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Elf Name Generator</h3>
              <p className="text-gray-700 mb-4">
                Generate authentic elvish names with meanings and backgrounds. Perfect for 
                high elves, wood elves, dark elves, and other elvish characters in your D&D campaigns
                and fantasy stories.
              </p>
              <Link href="/names/fantasy/elf-name-generator" className="text-blue-600 font-semibold hover:underline">
                Generate Elf Names →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Dwarf Name Generator</h3>
              <p className="text-gray-700 mb-4">
                Create strong, traditional dwarf names with clan affiliations and title suggestions
                for your mountain kingdoms and underground fortresses.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Wizard Name Generator</h3>
              <p className="text-gray-700 mb-4">
                Conjure powerful and mystical names for your wizards, mages, and spellcasters,
                complete with titles and magical specialties.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Fantasy Place Name Generator</h3>
              <p className="text-gray-700 mb-4">
                Create evocative names for your fantasy world's towns, cities, forests, mountains,
                and other locations with descriptions and characteristics.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Why Use Our Fantasy Name Generators?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Authentic Linguistics</h3>
              <p className="text-gray-700">
                Our generators create names that respect the linguistic patterns and traditions
                of different fantasy races and cultures.
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Meaningful Names</h3>
              <p className="text-gray-700">
                Many of our generators provide meanings and backgrounds for names, adding depth
                to your characters and locations.
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Game-Ready</h3>
              <p className="text-gray-700">
                Created with tabletop RPGs in mind, our names fit perfectly in D&D, Pathfinder,
                and other fantasy role-playing systems.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Complete Your Character</h2>
          <p className="text-gray-700 mb-6">
            Names are just the beginning. Complete your character creation with our other tools:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Character Backstories</h3>
              <p className="text-gray-700 mb-4">
                Give your newly-named character a compelling backstory and personality.
              </p>
              <Link href="/stories/backstory" className="text-blue-600 font-semibold hover:underline">
                Create Character Backstories →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Character Visualization</h3>
              <p className="text-gray-700 mb-4">
                Bring your fantasy character to life with AI-generated character portraits.
              </p>
              <Link href="/images/text-to-image/ai-image-generator" className="text-blue-600 font-semibold hover:underline">
                Generate Character Images →
              </Link>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Are these names original?</h3>
              <p className="text-gray-700">
                Yes, our AI generators create original fantasy names based on linguistic patterns of various 
                fantasy cultures and races, not simply pulling from existing lists or databases.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Can I use these names in my published work?</h3>
              <p className="text-gray-700">
                Absolutely! Names generated by our tools can be freely used in your books, games, or other 
                creative works without attribution requirements.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Can I customize the generated names?</h3>
              <p className="text-gray-700">
                Yes, you can specify gender, style preferences, and other parameters to customize the 
                kinds of names our generators create for your specific needs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 