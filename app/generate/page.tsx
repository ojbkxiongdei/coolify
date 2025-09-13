import { Metadata } from 'next'
import AsyncTextToImageClient from '@/components/AsyncTextToImageClient'
import TextToImageSEO from '@/components/TextToImageSEO'
import StructuredData from '@/components/StructuredData'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "AI Image Generator - Text to Image | DreamfinityX",
  description: "Transform your words into stunning visuals with our AI image generator. Create professional artwork, illustrations, and graphics from text descriptions using advanced AI technology.",
  keywords: "AI image generator, text to image, AI art generator, artificial intelligence, image generation, AI artwork, digital art, creative AI, image creation",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Generator - Text to Image | DreamfinityX",
    description: "Transform your words into stunning visuals with our AI image generator. Create professional artwork and graphics from text descriptions.",
    images: [
      {
        url: "https://dreamfinityx.com/seo-images/hero-creative-workspace.png",
        alt: "AI creative workspace preview",
      },
    ],
  },
  alternates: {
    canonical: "https://dreamfinityx.com/generate",
  },
  openGraph: {
    title: "AI Image Generator - Text to Image | DreamfinityX",
    description: "Transform your words into stunning visuals with our AI image generator. Create professional artwork and graphics from text descriptions.",
    url: "https://dreamfinityx.com/generate",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://dreamfinityx.com/seo-images/hero-creative-workspace.png",
        width: 1200,
        height: 630,
        alt: "AI creative workspace preview",
      },
    ],
  },
}

export default function TextToImagePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <nav className="container mx-auto px-4 text-sm py-4 text-gray-500">
        <ol className="flex flex-wrap">
          <li className="flex items-center">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-700 font-medium">AI Image Generator</li>
        </ol>
      </nav>
      
      {/* NoScript SEO内容，确保搜索引擎即使不执行JavaScript也能看到关键内容 */}
      <noscript>
        <div>
          <h2>AI Image Generator - Text to Image | DreamfinityX</h2>
          <p>
            Transform your words into stunning visuals with our AI image generator.
            Create professional artwork, illustrations, and graphics from text descriptions using advanced AI technology.
            Our text to image generator creates high-quality visuals for any creative need.
          </p>
        </div>
      </noscript>
      
      <StructuredData
        type="software"
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "AI Image Generator - Text to Image",
          "applicationCategory": "DesignApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Transform your words into stunning visuals with our AI image generator. Create professional artwork from text descriptions.",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://dreamfinityx.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Generate",
                "item": "https://dreamfinityx.com/generate"
              },
              
            ]
          }
        }}
      />

      {/* Main Function Area */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AI Image Generator
            </h1>
            <p className="text-lg text-gray-600">
              Transform your words into stunning visuals with artificial intelligence
            </p>
          </div>

          {/* Image Generator - Async Client Component */}
          <AsyncTextToImageClient />
        </div>
      </section>

      {/* SEO Content - Directly Rendered */}
      <TextToImageSEO />
    </div>
  )
}
