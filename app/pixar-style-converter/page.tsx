import { Metadata } from 'next'
import PixarStyleConverterClient from '@/components/PixarStyleConverterClient'
import PixarStyleConverterSEO from '@/components/PixarStyleConverterSEO'
import StructuredData from '@/components/StructuredData'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Pixar Style Image Converter - Transform Photos into Pixar Animation | DreamfinityX",
  description: "Convert your photos into Pixar-style animations with our AI converter. Transform portraits, family photos, and selfies into beautiful Pixar-inspired cartoon characters with professional quality.",
  keywords: "Pixar style converter, photo to Pixar, Pixar animation generator, cartoon converter, AI image transformation, photo to animation, Pixar character maker",
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
  openGraph: {
    title: "Pixar Style Converter | Transform Photos to 3D Animation",
    description: "Turn your photos into Pixar-style 3D animation with our AI style converter. Free online tool to create beautiful Pixar-inspired images.",
    url: "https://dreamfinityx.com/pixar-style-converter",
    type: "website",
    images: [
      {
        url: "https://dreamfinityx.com/seo-images/Pixar-Style-Transformation.png", 
        width: 1200,
        height: 630,
        alt: "Photo transformed into Pixar 3D style"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixar Style Image Converter - Transform Photos into Pixar Animation | DreamfinityX",
    description: "Convert your photos into Pixar-style animations with our AI converter. Transform portraits into beautiful Pixar-inspired cartoon characters.",
  },
  alternates: {
    canonical: "https://dreamfinityx.com/pixar-style-converter",
  },
}

export default function PixarStyleConverterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm py-4 text-gray-500 container mx-auto px-4">
        <ol className="flex flex-wrap">
          <li className="flex items-center">
            <Link href="/images" className="hover:text-blue-600">Image Tools</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-700 font-medium">Pixar Style Converter</li>
        </ol>
      </nav>
      
      {/* NoScript SEO内容，确保搜索引擎即使不执行JavaScript也能看到关键内容 */}
      <noscript>
        <div>
          <h2>Pixar Style Image Converter - Transform Photos into Pixar Animation | DreamfinityX</h2>
          <p>
            Convert your photos into Pixar-style animations with our AI converter.
            Transform portraits, family photos, and selfies into beautiful Pixar-inspired cartoon characters with professional quality.
          </p>
        </div>
      </noscript>

      <StructuredData
        type="software"
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Pixar Style Image Converter",
          "applicationCategory": "DesignApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Convert your photos into Pixar-style animations with our AI converter. Transform portraits into beautiful Pixar-inspired cartoon characters.",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://dreamfinityx.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Image Tools",
                "item": "https://dreamfinityx.com/images"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Pixar Style Converter",
                "item": "https://dreamfinityx.com/images/pixar-style-converter"
              }
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
              Pixar Style Image Converter
            </h1>
            <p className="text-lg text-gray-600">
              Transform your photos into beautiful Pixar-style animations
            </p>
          </div>

          {/* Pixar Style Converter - Client Component */}
          <PixarStyleConverterClient />
        </div>
      </section>

      {/* SEO Content - Directly Rendered */}
      <PixarStyleConverterSEO />
    </div>
  )
} 