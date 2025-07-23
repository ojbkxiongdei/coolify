import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamfinityx.com'),
  title: 'AI Character Backstory Generator | Create Rich Character Histories | DreamfinityX',
  description: 'Create detailed character backstories, histories, and personalities for your writing, role-playing games, and creative projects with our AI-powered backstory generator.',
  keywords: 'character backstory, backstory generator, character history, character development, writing tools, RPG characters, D&D backstory',
  robots: 'index, follow',
  openGraph: {
    title: 'AI Character Backstory Generator | Create Rich Character Histories',
    description: 'Create detailed character backstories and personalities for your creative projects',
    url: 'https://dreamfinityx.com/stories/backstory',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dreamfinityx.com/stories/backstory',
  }
};

export default function BackstoryHub() {
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
              <Link href="/stories" className="hover:text-blue-600">Story Tools</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-700 font-medium">Backstory</li>
          </ol>
        </nav>

        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">AI Character Backstory Tools</h1>
          <p className="text-xl text-gray-700 mb-6">
            Create rich, detailed histories and personalities for your characters with our 
            AI-powered backstory generation tools. Perfect for writers, game masters, roleplayers, 
            and anyone looking to develop compelling characters with depth.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/stories/backstory/character-headcanon-generator" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Character Headcanon Generator
            </Link>
            <Link href="/stories/backstory" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
              More Backstory Tools
            </Link>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Available Backstory Tools</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Character Headcanon Generator</h3>
              <p className="text-gray-700 mb-4">
                Create detailed character profiles, personalities, motivations, fears, and 
                backstories for any type of character or fictional universe.
              </p>
              <Link href="/stories/backstory/character-headcanon-generator" className="text-blue-600 font-semibold hover:underline">
                Generate Character Headcanons →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Tragic Backstory Creator</h3>
              <p className="text-gray-700 mb-4">
                Generate compelling tragic pasts for your characters that explain their 
                motivations, flaws, and personal growth.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Character Relationship Web</h3>
              <p className="text-gray-700 mb-4">
                Define and explore the complex relationships between multiple characters,
                including histories, tensions, and connections.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Secret History Generator</h3>
              <p className="text-gray-700 mb-4">
                Create hidden pasts, secret identities, and undisclosed motivations for
                your characters to add mystery and depth.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Why Create Character Backstories?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Deeper Characters</h3>
              <p className="text-gray-700">
                Backstories add psychological depth, realistic motivations, and believable
                behaviors to your characters.
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Plot Potential</h3>
              <p className="text-gray-700">
                Character histories create natural plot hooks, conflicts, and story arcs
                that emerge organically from their past.
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Emotional Connection</h3>
              <p className="text-gray-700">
                Detailed backstories help readers and players form stronger emotional connections
                with characters, making stories more engaging.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Complete Your Character Creation</h2>
          <p className="text-gray-700 mb-6">
            Our backstory tools work perfectly with our other creative tools:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Name Your Character</h3>
              <p className="text-gray-700 mb-4">
                Find the perfect name that fits your character&apos;s identity and backstory.
              </p>
              <Link href="/names/fantasy/elf-name-generator" className="text-blue-600 font-semibold hover:underline">
                Generate Character Names →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Visualize Your Character</h3>
              <p className="text-gray-700 mb-4">
                Bring your character to life visually with AI-generated artwork based on their description.
              </p>
              <Link href="/images/text-to-image/ai-image-generator" className="text-blue-600 font-semibold hover:underline">
                Generate Character Images →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Stylize Your Character</h3>
              <p className="text-gray-700 mb-4">
                Transform your character&apos;s image into different artistic styles.
              </p>
              <Link href="/images/style-transfer" className="text-blue-600 font-semibold hover:underline">
                Apply Artistic Styles →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 