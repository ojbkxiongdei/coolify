import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamfinityx.com'),
  title: 'AI Image Generation & Editing Tools | DreamfinityX',
  description: 'Create and edit stunning images with our AI-powered tools. Transform text to images, apply style transfers, and enhance photos with professional quality results.',
  keywords: 'AI image generation, text to image, image editing, style transfer, Ghibli style, Pixar style, AI art generator',
  robots: 'index, follow',
  openGraph: {
    title: 'AI Image Generation & Editing Tools | DreamfinityX',
    description: 'Create and edit stunning images with AI-powered technology',
    type: 'website',
    url: 'https://dreamfinityx.com/images',
    locale: 'en_US',
  },
  alternates: {
    canonical: 'https://dreamfinityx.com/images',
  }
};

export default function ImagesHub() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">AI Image Creation & Editing Tools</h1>
          <p className="text-xl text-gray-700 mb-6">
            Transform ideas into stunning visuals with our suite of AI-powered image tools.
            Generate art from text descriptions, apply unique artistic styles, or enhance existing images
            with professional quality results.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/images/ai-image-generator" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              AI Image Generator
            </Link>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Featured Image Tools</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">AI Image Generator</h3>
              <p className="text-gray-700 mb-4">
                Transform text descriptions into stunning images with our AI image
                generator. Create artwork, concept designs, or visualize your ideas.
              </p>
              <Link href="/images/ai-image-generator" className="text-blue-600 font-semibold hover:underline">
                Try AI Image Generator →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Ghibli Style Converter</h3>
              <p className="text-gray-700 mb-4">
                Transform your photos into the distinctive hand-painted, watercolor style 
                of Studio Ghibli films like &quot;Spirited Away&quot; and &quot;My Neighbor Totoro&quot;.
              </p>
              <Link href="/images/ghibli-style-converter" className="text-blue-600 font-semibold hover:underline">
                Try Ghibli Style Converter →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Pixar Style Converter</h3>
              <p className="text-gray-700 mb-4">
                Convert your photos into Pixar-style 3D animated characters and scenes.
                Perfect for creating family portraits in the style of &quot;Toy Story&quot; or &quot;Up&quot;.
              </p>
              <Link href="/images/pixar-style-converter" className="text-blue-600 font-semibold hover:underline">
                Try Pixar Style Converter →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">AI Image Editor</h3>
              <p className="text-gray-700 mb-4">
                Enhance and transform existing images with our AI-powered editor. Remove backgrounds, 
                apply effects, and make intelligent edits with simple text instructions.
              </p>
              <Link href="/images/ai-image-editor" className="text-blue-600 font-semibold hover:underline">
                Edit Images →
              </Link>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Why Choose Our Image Tools?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Professional Quality</h3>
              <p className="text-gray-700">
                Powered by Azure OpenAI&apos;s GPT-image-1 model, our tools produce high-resolution, 
                detailed images suitable for professional projects.
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Creative Control</h3>
              <p className="text-gray-700">
                Adjust size, quality, style, and other parameters to get exactly the images 
                you want for your creative projects.
              </p>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Versatile Applications</h3>
              <p className="text-gray-700">
                Perfect for digital marketing, social media, design projects, storytelling, 
                gaming assets, and personal creative expression.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Complete Creative Workflow</h2>
          <p className="text-gray-700 mb-6">
            Our image tools are part of a complete creative ecosystem. Combine with our other tools for a complete workflow:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Character Names</h3>
              <p className="text-gray-700 mb-4">
                Name your characters before visualizing them with our image generation tools.
              </p>
              <Link href="/names" className="text-blue-600 font-semibold hover:underline">
                Generate Character Names →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Character Backstories</h3>
              <p className="text-gray-700 mb-4">
                Give your visualized characters depth with rich backstories and character profiles.
              </p>
              <Link href="/stories/character-headcanon-generator" className="text-blue-600 font-semibold hover:underline">
                Create Character Headcanons →
              </Link>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">What image sizes and formats do you support?</h3>
              <p className="text-gray-700">
                We support three image sizes: 1024×1024 (square), 1024×1536 (portrait), and 1536×1024 (landscape). 
                You can choose between PNG and JPEG output formats with adjustable quality settings.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Can I use the generated images commercially?</h3>
              <p className="text-gray-700">
                Yes, all images created with our tools can be used for both personal and commercial purposes, 
                according to our terms of service. You own the rights to your creations.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">How many images can I create?</h3>
              <p className="text-gray-700">
                Free users can generate a limited number of images daily, while premium users enjoy extended 
                generation capabilities. Visit our <Link href="/pricing" className="text-blue-600 hover:underline">pricing page</Link> for details.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">How do I get the best image results?</h3>
              <p className="text-gray-700">
                Be specific in your descriptions. Include details about style, mood, lighting, composition, and quality. 
                Experiment with different prompts and settings to discover what works best for your needs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 