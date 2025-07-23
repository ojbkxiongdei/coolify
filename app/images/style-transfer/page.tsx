import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamfinityx.com'),
  title: 'AI Style Transfer Tools | Transform Images to Artistic Styles | DreamfinityX',
  description: 'Transform your photos into various artistic styles with our AI-powered style transfer tools. Convert images to Ghibli, Pixar, and other popular art styles instantly.',
  keywords: 'style transfer, AI image transformation, Ghibli style converter, Pixar style converter, artistic style transfer',
  robots: 'index, follow',
  openGraph: {
    title: 'AI Style Transfer Tools | Transform Images to Artistic Styles',
    description: 'Transform your photos into popular artistic styles with AI',
    url: 'https://dreamfinityx.com/images/style-transfer',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dreamfinityx.com/images/style-transfer',
  }
};

export default function StyleTransferPage() {
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
            <li className="text-gray-700 font-medium">Style Transfer</li>
          </ol>
        </nav>

        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">AI Style Transfer Tools</h1>
          <p className="text-xl text-gray-700 mb-6">
            Transform your photos into stunning artistic styles with our collection of 
            AI-powered style transfer tools. Turn ordinary images into works of art 
            inspired by famous animation studios, art movements, and visual aesthetics.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/images/style-transfer/ghibli-style-converter" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Ghibli Style
            </Link>
            <Link href="/images/style-transfer/pixar-style-converter" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Pixar Style
            </Link>
            <Link href="/images/style-transfer" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
              More Styles
            </Link>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Available Style Transfer Tools</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Ghibli Style Converter</h3>
              <p className="text-gray-700 mb-4">
                Transform your photos into the magical, hand-drawn aesthetic of Studio Ghibli films.
                Perfect for creating whimsical scenes, landscapes, and portraits with that distinctive
                animation style.
              </p>
              <Link href="/images/style-transfer/ghibli-style-converter" className="text-blue-600 font-semibold hover:underline">
                Create Ghibli Style Art →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Pixar Style Converter</h3>
              <p className="text-gray-700 mb-4">
                Convert your photos into 3D-animated Pixar style characters and scenes. 
                Great for transforming portraits, family photos, and more into charming
                Pixar-inspired digital artwork.
              </p>
              <Link href="/images/style-transfer/pixar-style-converter" className="text-blue-600 font-semibold hover:underline">
                Create Pixar Style Art →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Anime Style Converter</h3>
              <p className="text-gray-700 mb-4">
                Transform photos into anime-style artwork with different Japanese animation
                aesthetics. Perfect for creating character designs and fan art.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Comic Book Style</h3>
              <p className="text-gray-700 mb-4">
                Transform photos into comic book art with line work, halftone patterns,
                and vibrant colors in various comic art styles.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">How Style Transfer Works</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
              <h3 className="text-xl font-bold mb-2">Upload Photo</h3>
              <p className="text-gray-700">
                Start by uploading any photo you want to transform. Works with portraits, 
                landscapes, group photos, and more.
              </p>
            </div>
            
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
              <h3 className="text-xl font-bold mb-2">Select Style</h3>
              <p className="text-gray-700">
                Choose your desired artistic style and adjust any available settings
                to customize the final appearance.
              </p>
            </div>
            
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
              <h3 className="text-xl font-bold mb-2">Generate Artwork</h3>
              <p className="text-gray-700">
                Our AI analyzes your photo and recreates it in your chosen style,
                preserving the essence while transforming the visual aesthetic.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Popular Uses</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Social Media Content</h3>
              <p className="text-gray-700 mb-4">
                Stand out on social platforms with uniquely styled profile pictures, 
                posts, and stories that capture attention.
              </p>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Creative Projects</h3>
              <p className="text-gray-700 mb-4">
                Enhance your artistic projects, blogs, websites, or presentations
                with consistently styled visual elements.
              </p>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Gift Creation</h3>
              <p className="text-gray-700 mb-4">
                Create personalized gifts by transforming family photos into 
                artistic styles and printing them on various merchandise.
              </p>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Character Design</h3>
              <p className="text-gray-700 mb-4">
                Convert reference images into stylized character designs for 
                stories, games, or other creative projects.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Complete Your Creative Workflow</h2>
          <p className="text-gray-700 mb-6">
            Our style transfer tools work seamlessly with our other creative tools:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Text-to-Image Generation</h3>
              <p className="text-gray-700 mb-4">
                Generate new images from text descriptions before applying style transfers.
              </p>
              <Link href="/images/text-to-image" className="text-blue-600 font-semibold hover:underline">
                Generate Images from Text →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Advanced Image Editing</h3>
              <p className="text-gray-700 mb-4">
                Further enhance or modify your style-transferred images with our AI image editor.
              </p>
              <Link href="/images/editor" className="text-blue-600 font-semibold hover:underline">
                Edit Images →
              </Link>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">What types of images work best?</h3>
              <p className="text-gray-700">
                Our style transfer tools work well with most clear images. For best results, use photos with 
                good lighting, clear subjects, and minimal background clutter. Different tools may work best 
                with specific subjects (portraits, landscapes, etc.).
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Can I use style transferred images commercially?</h3>
              <p className="text-gray-700">
                Yes, images created with our style transfer tools can be used for both personal and commercial 
                purposes according to our terms of service. You own the rights to your creations.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">What image resolutions are supported?</h3>
              <p className="text-gray-700">
                Our tools support images up to 1536×1536 pixels, with outputs available in various sizes. 
                Premium users have access to higher resolution options for more detailed results.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 