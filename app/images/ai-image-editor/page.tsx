import { Metadata } from 'next'
import ImageEditorClient from '@/components/ImageEditorClient'
import ImageEditorSEO from '@/components/ImageEditorSEO'
import StructuredData from '@/components/StructuredData'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "AI Image Editor - Professional Photo Editing Tool | DreamfinityX",
  description: "Edit and enhance your images with our AI-powered image editor. Professional photo editing, background removal, style transfer, and artistic effects. Transform your photos with artificial intelligence.",
  keywords: "AI image editor, photo editor, image editing, AI photo editing, background removal, style transfer, photo enhancement, image processing, photo retouching",
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
    title: "AI Image Editor - Professional Photo Editing Tool | DreamfinityX",
    description: "Edit and enhance your images with our AI-powered image editor. Professional photo editing and artistic effects with artificial intelligence.",
    url: "https://dreamfinityx.com/images/editing/ai-image-editor",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Editor - Professional Photo Editing Tool | DreamfinityX",
    description: "Edit and enhance your images with our AI-powered image editor. Professional photo editing and artistic effects with AI.",
  },
  alternates: {
    canonical: "https://dreamfinityx.com/images/ai-image-editor",
  },
}

export default function ImageEditorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <nav className="container mx-auto px-4 text-sm py-4 text-gray-500">
        <ol className="flex flex-wrap">
          <li className="flex items-center">
            <Link href="/images" className="hover:text-blue-600">Image Tools</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-700 font-medium">AI Image Editor</li>
        </ol>
      </nav>
      
      {/* NoScript SEO内容，确保搜索引擎即使不执行JavaScript也能看到关键内容 */}
      <noscript>
        <div>
          <h2>AI Image Editor - Professional Photo Editing Tool | DreamfinityX</h2>
          <p>
            Edit and enhance your images with our AI-powered image editor.
            Professional photo editing, background removal, style transfer, and artistic effects.
            Transform your photos with artificial intelligence for professional results.
          </p>
        </div>
      </noscript>

      <StructuredData
        type="software"
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "AI Image Editor - Professional Photo Editing",
          "applicationCategory": "DesignApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Edit and enhance your images with our AI-powered editor. Professional photo editing and artistic effects with artificial intelligence.",
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
                "name": "AI Image Editor",
                "item": "https://dreamfinityx.com/images/ai-image-editor"
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
              AI Image Editor
            </h1>
            <p className="text-lg text-gray-600">
              Edit and enhance your images with powerful AI technology
            </p>
          </div>

          {/* Image Editor - Client Component */}
          <ImageEditorClient />
        </div>
      </section>

      {/* SEO Content - Directly Rendered */}
      <ImageEditorSEO />
    </div>
  )
} 