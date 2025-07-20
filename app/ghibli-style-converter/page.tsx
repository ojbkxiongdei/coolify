import { Metadata } from 'next'
import GhibliStyleConverterClient from '@/components/GhibliStyleConverterClient'
import { GhibliStyleConverterSEO, StructuredData } from '@/components'

export const metadata: Metadata = {
  title: "Studio Ghibli Style Image Converter - Transform Photos into Ghibli Art | DreamfinityX",
  description: "Convert your photos into Studio Ghibli-style animations with our AI converter. Transform portraits, landscapes and selfies into beautiful Ghibli-inspired artwork with the signature hand-painted watercolor aesthetic.",
  keywords: "studio ghibli style, ghibli style image generator, ghibli ai image generator, convert image to ghibli style, studio ghibli art style, ghibli-style, studio ghibli style ai, studio ghibli-style, free ghibli style image generator",
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
    title: "Studio Ghibli Style Image Converter - Transform Photos into Ghibli Art | DreamfinityX",
    description: "Convert your photos into Studio Ghibli-style animations with our AI converter. Transform landscapes and portraits into magical Ghibli-inspired watercolor art.",
    url: "https://dreamfinityx.com/ghibli-style-converter",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Ghibli Style Image Converter - Transform Photos into Ghibli Art | DreamfinityX",
    description: "Convert your photos into Studio Ghibli-style animations with our AI converter. Transform landscapes and portraits into magical Ghibli-inspired watercolor art.",
  },
  alternates: {
    canonical: "https://dreamfinityx.com/ghibli-style-converter",
  },
}

export default function GhibliStyleConverterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* NoScript SEO内容，确保搜索引擎即使不执行JavaScript也能看到关键内容 */}
      <noscript>
        <div>
          <h2>Studio Ghibli Style Image Converter - Transform Photos into Ghibli Animation Art | DreamfinityX</h2>
          <p>
            Convert your photos into Studio Ghibli-style animations with our AI converter.
            Transform portraits, landscapes, and selfies into beautiful Ghibli-inspired artwork with the signature hand-painted watercolor aesthetic from films like Spirited Away, My Neighbor Totoro, and Princess Mononoke.
          </p>
        </div>
      </noscript>

      <StructuredData
        type="software"
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Studio Ghibli Style Image Converter",
          "applicationCategory": "DesignApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Convert your photos into Studio Ghibli-style animations with our AI converter. Transform portraits and landscapes into magical Ghibli-inspired watercolor art with hand-drawn aesthetics."
        }}
      />

      {/* Main Function Area */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Studio Ghibli Style Image Converter
            </h1>
            <p className="text-lg text-gray-600">
              Transform your photos into magical Studio Ghibli-inspired art
            </p>
          </div>

          {/* Ghibli Style Converter - Client Component */}
          <GhibliStyleConverterClient />
        </div>
      </section>

      {/* SEO Content - Directly Rendered */}
      <GhibliStyleConverterSEO />
    </div>
  )
} 