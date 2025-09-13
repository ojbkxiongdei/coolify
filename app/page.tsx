import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import SEOContent from '@/components/SEOContent'
import HomeContent from '@/components/home/HomeContent'

export const metadata: Metadata = {
  title: 'DreamfinityX - Professional AI Image Generator & Creative Platform',
  description:
    'Create stunning AI images from text in seconds with DreamfinityX. Professional AI image generation, editing, and style conversion tools. Start creating for free today.',
  keywords: [
    'AI image generator',
    'text to image',
    'AI art generator',
    'image generation',
    'AI creative tools',
    'artificial intelligence',
    'digital art',
    'AIGC',
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://dreamfinityx.com/' },
  openGraph: {
    title: 'DreamfinityX - Professional AI Image Generator',
    description:
      'Create stunning AI images from text in seconds with DreamfinityX. Professional AI image generation, editing, and style conversion tools.',
    url: 'https://dreamfinityx.com/',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://dreamfinityx.com/seo-images/hero-creative-workspace.png',
        width: 1200,
        height: 630,
        alt: 'DreamfinityX AI creative workspace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DreamfinityX - Professional AI Image Generator',
    description:
      'Create stunning AI images from text in seconds with DreamfinityX. Professional AI image generation, editing, and style conversion tools.',
    images: ['https://dreamfinityx.com/seo-images/hero-creative-workspace.png'],
  },
}

export default function Home() {
  return (
    <>
      {/* NoScript SEO内容：可见的静态兜底文案 */}
      <noscript>
        <div>
          <h2>DreamfinityX - Complete AI Creative Platform</h2>
          <p>
            All-in-one AI creative platform for generating stunning images, crafting compelling stories, and creating authentic character names.
            The ultimate toolkit for designers, writers, and world-builders. Our integrated suite includes text-to-image generation,
            character headcanon creator, and fantasy name generators to support your complete creative workflow.
          </p>
        </div>
      </noscript>

      <Suspense
        fallback={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent"></div>
          </div>
        }
      >
        <HomeContent />
      </Suspense>

      {/* 直接服务端渲染SEO内容，确保可抓取 */}
      <SEOContent />

      {/* 首页结构化数据（补充截图URL编码） */}
      <StructuredData
        type="software"
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'DreamfinityX',
          description:
            'Complete AI creative platform for generating images, crafting stories, and creating character names - the ultimate toolkit for designers, writers, and world-builders',
          url: 'https://dreamfinityx.com',
          applicationCategory:
            'CreativeSuite, DigitalArtApplication, StoryGenerationSoftware, NameGenerationTool',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'AggregateOffer',
            lowPrice: '0',
            highPrice: '39.99',
            priceCurrency: 'USD',
            offerCount: 4,
          },
          screenshot: [
            'https://dreamfinityx.com/seo-images/Natural%20Landscape.png',
            'https://dreamfinityx.com/seo-images/Portrait%20Photography.png',
            'https://dreamfinityx.com/seo-images/Wizard%20Character.png',
          ],
          featureList: [
            'AI Image Generation',
            'Character Story Creation',
            'Fantasy Name Generation',
            'Style Transfer',
            'World Building',
            'Creative Writing Support',
            'RPG Character Development',
            'High Quality Visual Design',
          ],
          creator: {
            '@type': 'Organization',
            name: 'DreamfinityX',
            url: 'https://dreamfinityx.com',
          },
        }}
      />
    </>
  )
}

