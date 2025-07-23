import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://dreamfinityx.com'),
  title: 'AI Image Editing Tools | Professional Photo Enhancement | DreamfinityX',
  description: 'Edit and enhance your images with our AI-powered editing tools. Remove backgrounds, apply effects, retouch photos, and more with advanced artificial intelligence.',
  keywords: 'AI image editing, photo enhancement, background removal, image editor, AI photo editor, picture editor',
  robots: 'index, follow',
  openGraph: {
    title: 'AI Image Editing Tools | Professional Photo Enhancement',
    description: 'Edit and enhance your images with our AI-powered editing tools',
    url: 'https://dreamfinityx.com/images/editing',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dreamfinityx.com/images/editing',
  }
};

export default function ImageEditingHub() {
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
            <li className="text-gray-700 font-medium">Editing</li>
          </ol>
        </nav>

        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">AI Image Editing Tools</h1>
          <p className="text-xl text-gray-700 mb-6">
            Transform your existing photos and images with our suite of AI-powered editing tools.
            Enhance quality, remove backgrounds, retouch portraits, and apply creative effects with
            the help of advanced artificial intelligence.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/images/editing/ai-image-editor" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              AI Image Editor
            </Link>
            <Link href="/images/editing" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
              More Editing Tools
            </Link>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Available Editing Tools</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">AI Image Editor</h3>
              <p className="text-gray-700 mb-4">
                Our comprehensive image editor that lets you make AI-powered adjustments
                through simple text instructions or traditional editing tools.
              </p>
              <Link href="/images/editing/ai-image-editor" className="text-blue-600 font-semibold hover:underline">
                Edit Images →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Background Remover</h3>
              <p className="text-gray-700 mb-4">
                Automatically remove backgrounds from any image with precision and
                replace them with transparent layers or new backgrounds.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Photo Enhancer</h3>
              <p className="text-gray-700 mb-4">
                Upscale resolution, fix blurry images, improve lighting, and enhance
                overall quality of photos with AI technology.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Portrait Retoucher</h3>
              <p className="text-gray-700 mb-4">
                Specialized tool for enhancing portraits with skin smoothing, lighting
                adjustments, and subtle facial improvements.
              </p>
              <p className="text-blue-600 font-semibold opacity-50">Coming Soon</p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">How Our Image Editing Works</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
              <h3 className="text-xl font-bold mb-2">Upload Your Image</h3>
              <p className="text-gray-700">
                Upload any photo or image you want to edit. We support JPEG, PNG, 
                and other common formats with generous size limits.
              </p>
            </div>
            
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
              <h3 className="text-xl font-bold mb-2">Describe Your Edits</h3>
              <p className="text-gray-700">
                Provide simple text instructions for what you want to change, or use
                our intuitive editing tools to make adjustments.
              </p>
            </div>
            
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
              <h3 className="text-xl font-bold mb-2">Apply & Download</h3>
              <p className="text-gray-700">
                Our AI applies your requested changes with precision and professional
                quality. Preview, adjust as needed, then download your result.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Complete Your Creative Workflow</h2>
          <p className="text-gray-700 mb-6">
            Our image editing tools integrate seamlessly with our other creative tools:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Text to Image</h3>
              <p className="text-gray-700 mb-4">
                Generate custom images that you can then edit and enhance with our tools.
              </p>
              <Link href="/images/text-to-image/ai-image-generator" className="text-blue-600 font-semibold hover:underline">
                Generate Images →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Style Transfer</h3>
              <p className="text-gray-700 mb-4">
                After editing, transform your images into different artistic styles.
              </p>
              <Link href="/images/style-transfer" className="text-blue-600 font-semibold hover:underline">
                Apply Artistic Styles →
              </Link>
            </div>
            
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Create Characters</h3>
              <p className="text-gray-700 mb-4">
                Develop backstories for characters in your edited images.
              </p>
              <Link href="/stories/backstory/character-headcanon-generator" className="text-blue-600 font-semibold hover:underline">
                Create Character Stories →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 