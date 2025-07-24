import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamfinityx.com'),
  title: 'AI Story & Character Generators | Create Detailed Characters & Backstories',
  description: 'Create detailed character backgrounds, story ideas, and world-building content with our AI-powered story generators. Perfect for writers, gamers, and storytellers.',
  keywords: 'character generator, backstory creator, character headcanon, story generator, AI writing tools, creative writing',
  robots: 'index, follow',
  openGraph: {
    title: 'AI Story & Character Generators | DreamfinityX',
    description: 'Create detailed character backgrounds and stories with AI assistance',
    url: 'https://dreamfinityx.com/stories',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dreamfinityx.com/stories',
  }
};

export default function StoriesHub() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">AI Story & Character Creation</h1>
          <p className="text-xl text-gray-700 mb-6">
            Develop rich, immersive characters and engaging stories with our AI-powered creative writing tools.
            Ideal for authors, screenwriters, game masters, role-players, and anyone looking to create
            compelling narratives and characters.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/stories/character-headcanon-generator" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Character Headcanons
            </Link>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Featured Story Tools</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Character Headcanon Generator</h3>
              <p className="text-gray-700 mb-4">
                Create detailed character profiles, personalities, and motivations for your 
                fiction, role-playing games, or fan creations.
              </p>
              <Link href="/stories/character-headcanon-generator" className="text-blue-600 font-semibold hover:underline">
                Create Character Headcanons →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Villain Backstory Creator</h3>
              <p className="text-gray-700 mb-4">
                Develop complex, compelling villains with nuanced motivations and tragic backgrounds
                that elevate your storytelling.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Fantasy World Builder</h3>
              <p className="text-gray-700 mb-4">
                Create rich, immersive fantasy worlds with detailed cultures, magic systems,
                geography, and history for your creative projects.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Plot Twists Generator</h3>
              <p className="text-gray-700 mb-4">
                Overcome writer&apos;s block with unexpected plot developments and twists that will
                keep your audience engaged and surprised.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Why Use Our Story Tools?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Creative Depth</h3>
              <p className="text-gray-700">
                Our AI generates rich, detailed content that adds dimensions to your characters and
                stories that might not have occurred to you.
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Save Time</h3>
              <p className="text-gray-700">
                Skip hours of brainstorming and get straight to writing with ready-made character 
                profiles and story elements that inspire your creativity.
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Overcome Creative Blocks</h3>
              <p className="text-gray-700">
                Break through writer&apos;s block with fresh ideas and perspectives that kickstart
                your imagination and renew your creative energy.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Complete Creative Workflow</h2>
          <p className="text-gray-700 mb-6">
            Our story tools are part of a complete creative ecosystem. Combine with our other tools for a complete workflow:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Character Names</h3>
              <p className="text-gray-700 mb-4">
                Find the perfect name for your characters before developing their backstory.
              </p>
              <Link href="/names" className="text-blue-600 font-semibold hover:underline">
                Generate Character Names →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Character Visualization</h3>
              <p className="text-gray-700 mb-4">
                Turn your text descriptions into beautiful images to visualize your story
                scenes, characters, and settings.
              </p>
              <Link href="/images/ai-image-generator" className="text-blue-600 font-semibold hover:underline">
                Create Story Visuals →
              </Link>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Can I use these stories in my published work?</h3>
              <p className="text-gray-700">
                Yes, content created with our tools can be used in your personal and commercial creative 
                projects. We recommend using our tools for inspiration and then adding your own unique touches.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">How detailed are the character profiles?</h3>
              <p className="text-gray-700">
                Our AI generates comprehensive character profiles including personality traits, 
                motivations, fears, desires, background history, relationships, and more. You can 
                specify the level of detail you want.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">How many stories can I generate?</h3>
              <p className="text-gray-700">
                Free users can generate a limited number of stories daily, while premium users enjoy 
                extended generation capabilities with more detailed outputs. Visit our 
                <Link href="/pricing" className="text-blue-600 hover:underline"> pricing page</Link> for details.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Are the generated stories unique?</h3>
              <p className="text-gray-700">
                Yes, each generation is unique. While the AI draws from patterns in existing stories and tropes,
                it creates new combinations and details each time, providing fresh content for your creative projects.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 