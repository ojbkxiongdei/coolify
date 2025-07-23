import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamfinityx.com'),
  title: 'Character Headcanon Generator | Create Detailed Character Backgrounds | DreamfinityX',
  description: 'Create rich, detailed character profiles and backstories for your original characters, fan fiction, role-playing games, and creative writing projects.',
  keywords: 'character headcanon, character creator, character backstory, character profile, character development, D&D characters, RPG character creator',
  robots: 'index, follow',
  openGraph: {
    title: 'Character Headcanon Generator | Create Detailed Character Backgrounds',
    description: 'Create rich, detailed character profiles and backstories for your creative projects',
    url: 'https://dreamfinityx.com/stories/character-headcanon',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dreamfinityx.com/stories/character-headcanon',
  }
};

export default function CharacterHeadcanonPage() {
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
            <li className="text-gray-700 font-medium">Character Headcanon</li>
          </ol>
        </nav>

        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Character Headcanon Generator</h1>
          <p className="text-xl text-gray-700 mb-6">
            Create detailed, compelling character profiles, backstories, and personalities
            for your creative projects. Our AI-powered character generator helps you develop
            rich, multidimensional characters for role-playing games, fiction writing,
            fan creations, and more.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/stories/character-headcanon/generator" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Create Character Headcanon
            </Link>
            <Link href="/stories/character-headcanon/examples" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
              View Examples
            </Link>
            <Link href="/stories/character-headcanon/tips" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
              Writing Tips
            </Link>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Character Development Tools</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Character Headcanon Generator</h3>
              <p className="text-gray-700 mb-4">
                Create comprehensive character profiles with personalities, backstories, 
                motivations, and more. Perfect for bringing depth to your creative projects.
              </p>
              <Link href="/stories/character-headcanon/generator" className="text-blue-600 font-semibold hover:underline">
                Generate Character Headcanons →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Character Archetype Explorer</h3>
              <p className="text-gray-700 mb-4">
                Discover different character archetypes and learn how to use them
                effectively in your storytelling.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Character Relationship Web</h3>
              <p className="text-gray-700 mb-4">
                Create complex relationships between multiple characters to bring depth
                and conflict to your stories and campaigns.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Character Development Arc</h3>
              <p className="text-gray-700 mb-4">
                Plot your character's growth throughout a story, from their starting point
                to their ultimate transformation.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Features of Our Character Creator</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Psychological Depth</h3>
              <p className="text-gray-700">
                Generate characters with realistic psychological traits, motivations, fears,
                and desires that drive their actions.
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Rich Backstories</h3>
              <p className="text-gray-700">
                Create detailed histories that explain your character's current situation,
                skills, attitudes, and relationships.
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Customizable Detail</h3>
              <p className="text-gray-700">
                Choose how detailed you want your character profiles to be, from brief 
                overviews to comprehensive biographies.
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Genre Versatility</h3>
              <p className="text-gray-700">
                Generate characters suitable for any genre: fantasy, sci-fi, historical,
                contemporary, horror, and more.
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Gaming Integration</h3>
              <p className="text-gray-700">
                Create characters specifically for D&D, Pathfinder, and other RPG systems
                with relevant traits and attributes.
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Conflict Generation</h3>
              <p className="text-gray-700">
                Identify internal and external conflicts that make your characters 
                interesting and drive narrative tension.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Complete Character Creation Suite</h2>
          <p className="text-gray-700 mb-6">
            Our character headcanon tool is part of a complete character creation ecosystem:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">1. Name Your Character</h3>
              <p className="text-gray-700 mb-4">
                Start by finding the perfect name that fits your character's identity.
              </p>
              <Link href="/names" className="text-blue-600 font-semibold hover:underline">
                Name Generators →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">2. Develop Their Story</h3>
              <p className="text-gray-700 mb-4">
                Create a compelling backstory and personality for your character.
              </p>
              <Link href="/stories/character-headcanon/generator" className="text-blue-600 font-semibold hover:underline">
                Character Headcanon →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">3. Visualize Your Character</h3>
              <p className="text-gray-700 mb-4">
                Bring your character to life with a visual representation.
              </p>
              <Link href="/images/text-to-image" className="text-blue-600 font-semibold hover:underline">
                Character Visualization →
              </Link>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">What is a character headcanon?</h3>
              <p className="text-gray-700">
                A character headcanon is a detailed profile of a character that includes their personality traits, 
                background story, motivations, fears, desires, strengths, weaknesses, and other aspects that make 
                them three-dimensional and believable.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Can I use these characters for my published work?</h3>
              <p className="text-gray-700">
                Yes, characters created with our tool can be used in your personal and commercial creative works. 
                We recommend using our generator as a starting point and then customizing the characters to make 
                them uniquely yours.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Are the generated characters unique?</h3>
              <p className="text-gray-700">
                Yes, our AI generates unique character profiles based on your inputs. While there may be some 
                common tropes or elements (which are often useful for storytelling), each character will have 
                a unique combination of traits and background elements.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">How detailed are the character profiles?</h3>
              <p className="text-gray-700">
                You can choose the level of detail you want. Our generator can create brief character sketches 
                or comprehensive profiles with extensive backstories, psychological traits, goals, relationships, 
                and more. Premium users have access to even more detailed character development options.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 