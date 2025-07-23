import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamfinityx.com'),
  title: 'AI Text to Image Tools | Generate Images from Text | DreamfinityX',
  description: 'Create stunning images from text descriptions with our AI text-to-image generators. Transform your words into professional quality visuals for various creative needs.',
  keywords: 'text to image, AI image generator, text to art, word to image, text to picture, AI art generator',
  robots: 'index, follow',
  openGraph: {
    title: 'AI Text to Image Tools | Generate Images from Text',
    description: 'Create stunning images from text descriptions with our AI generators',
    url: 'https://dreamfinityx.com/images/text-to-image',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dreamfinityx.com/images/text-to-image',
  }
};

export default function TextToImageHub() {
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
              <Link href="/images" className="hover:text-blue-600">Image Tools</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-700 font-medium">Text to Image</li>
          </ol>
        </nav>

        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">AI Text to Image Tools</h1>
          <p className="text-xl text-gray-700 mb-6">
            Transform your written descriptions into stunning visual artwork with our collection of 
            AI-powered text-to-image tools. Turn words into professional quality images for any creative need.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/images/text-to-image/ai-image-generator" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              AI Image Generator
            </Link>
            <Link href="/images/text-to-image" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
              More Text to Image Tools
            </Link>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Available Text to Image Tools</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">AI Image Generator</h3>
              <p className="text-gray-700 mb-4">
                Transform your text prompts into professional quality images. Create artwork,
                illustrations, and digital assets with advanced AI technology.
              </p>
              <Link href="/images/text-to-image/ai-image-generator" className="text-blue-600 font-semibold hover:underline">
                Generate Images →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Concept Art Generator</h3>
              <p className="text-gray-700 mb-4">
                Create professional concept art for characters, environments, and products
                from detailed text descriptions.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Art Style Selector</h3>
              <p className="text-gray-700 mb-4">
                Generate images in specific art styles by describing both content and
                artistic preferences in your prompt.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Visualization Builder</h3>
              <p className="text-gray-700 mb-4">
                Create data visualizations, diagrams, and information graphics
                from text descriptions of concepts and data.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">How Text to Image Works</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
              <h3 className="text-xl font-bold mb-2">Describe Your Image</h3>
              <p className="text-gray-700">
                Enter a detailed text description of what you want to create, 
                including details about style, mood, setting, and subjects.
              </p>
            </div>
            
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
              <h3 className="text-xl font-bold mb-2">Configure Options</h3>
              <p className="text-gray-700">
                Select your preferred image size, quality level, and other
                parameters to customize the generation process.
              </p>
            </div>
            
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
              <h3 className="text-xl font-bold mb-2">Generate & Download</h3>
              <p className="text-gray-700">
                Our AI transforms your text into images in seconds, which you
                can then download, share, or further edit.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Complete Your Creative Workflow</h2>
          <p className="text-gray-700 mb-6">
            Our text-to-image tools work seamlessly with our other creative tools:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Style Transfer</h3>
              <p className="text-gray-700 mb-4">
                Apply artistic styles to your generated images to enhance them further.
              </p>
              <Link href="/images/style-transfer" className="text-blue-600 font-semibold hover:underline">
                Explore Style Transfers →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Image Editing</h3>
              <p className="text-gray-700 mb-4">
                Refine and enhance your generated images with our AI-powered editor.
              </p>
              <Link href="/images/editing/ai-image-editor" className="text-blue-600 font-semibold hover:underline">
                Edit Images →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Character Stories</h3>
              <p className="text-gray-700 mb-4">
                Create backstories for characters you&apos;ve visualized with our text-to-image tools.
              </p>
              <Link href="/stories/backstory/character-headcanon-generator" className="text-blue-600 font-semibold hover:underline">
                Generate Character Stories →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 