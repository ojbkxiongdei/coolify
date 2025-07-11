'use client'

import React, { useState, Suspense, lazy, useEffect } from 'react'
import Head from 'next/head'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Edit3, Book, TreePine, Users, Star, Zap, ArrowRight, Image, Palette, Wand2 } from 'lucide-react'

// 懒加载SEO组件
const SEOContent = lazy(() => import('@/components/SEOContent'))

function HomeContent() {
  const [shouldLoadSEO, setShouldLoadSEO] = useState(false)

  // 使用 Intersection Observer 监听用户是否滚动到页面底部
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setShouldLoadSEO(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '200px'
      }
    )

    const trigger = document.createElement('div')
    trigger.style.height = '1px'
    trigger.style.position = 'absolute'
    trigger.style.bottom = '50%'
    trigger.style.left = '0'
    trigger.style.width = '100%'
    trigger.style.pointerEvents = 'none'
    
    document.body.appendChild(trigger)
    observer.observe(trigger)

    return () => {
      observer.disconnect()
      if (document.body.contains(trigger)) {
        document.body.removeChild(trigger)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>DreamfinityX - AI Creative Tools Platform | Text-to-Image, Image Editor & More</title>
        <meta name="description" content="Professional AI creative tools platform. Generate images from text, edit photos with AI, create character stories, and generate fantasy names. All-in-one creative AI solution for designers, writers, and creators." />
        <meta name="keywords" content="AI creative tools, AI platform, text to image generator, AI image editor, character generator, name generator, creative AI, digital art tools, AI writing tools" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://dreamfinityx.com/" />
        <meta property="og:title" content="DreamfinityX - AI Creative Tools Platform" />
        <meta property="og:description" content="Professional AI creative tools platform with text-to-image generation, image editing, character creation, and name generation tools." />
        <meta property="og:url" content="https://dreamfinityx.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DreamfinityX - AI Creative Tools Platform" />
        <meta name="twitter:description" content="Professional AI creative tools platform with advanced AI-powered creative solutions for designers, writers, and creators." />
      </Head>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              AI Creative Tools
              <span className="block text-blue-600">for Everyone</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your creative ideas into reality with our comprehensive AI-powered platform. 
              Generate stunning images, edit photos, create characters, and explore endless possibilities.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="/text-to-image">
                <Sparkles className="w-5 h-5 mr-2" />
                Try Text-to-Image
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/pricing">View Pricing</a>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">10M+</div>
              <div className="text-sm text-gray-600">Images Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful AI Creative Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to bring your creative ideas to life, all in one platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Text-to-Image Tool */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Image className="w-8 h-8 text-blue-600" aria-label="AI Image Generator Icon" />
                </div>
                <CardTitle className="text-xl">AI Image Generator</CardTitle>
                <CardDescription>Transform text into stunning visuals</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Create professional artwork, illustrations, and graphics from simple text descriptions using advanced AI technology.
                </p>
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  <Badge variant="secondary" className="text-xs">Text-to-Image</Badge>
                  <Badge variant="secondary" className="text-xs">High Quality</Badge>
                  <Badge variant="secondary" className="text-xs">Multiple Styles</Badge>
                </div>
                <Button asChild className="w-full">
                  <a href="/text-to-image">
                    Try Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Image Editor Tool */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Edit3 className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">AI Image Editor</CardTitle>
                <CardDescription>Edit and enhance your photos with AI</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Professional photo editing with AI-powered tools for background removal, style transfer, and artistic effects.
                </p>
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  <Badge variant="secondary" className="text-xs">Photo Editing</Badge>
                  <Badge variant="secondary" className="text-xs">Style Transfer</Badge>
                  <Badge variant="secondary" className="text-xs">AI Enhancement</Badge>
                </div>
                <Button asChild className="w-full" variant="outline">
                  <a href="/image-editor">
                    Edit Photos
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Character Headcanon Tool */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Book className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Character Creator</CardTitle>
                <CardDescription>Generate detailed character stories</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Create detailed character headcanons and backstories for any fandom, perfect for writers and role-players.
                </p>
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  <Badge variant="secondary" className="text-xs">Character Stories</Badge>
                  <Badge variant="secondary" className="text-xs">Fan Fiction</Badge>
                  <Badge variant="secondary" className="text-xs">FREE</Badge>
                </div>
                <Button asChild className="w-full" variant="outline">
                  <a href="/character-headcanon-generator">
                    Create Characters
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Elf Name Generator Tool */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-amber-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <TreePine className="w-8 h-8 text-amber-600" />
                </div>
                <CardTitle className="text-xl">Fantasy Names</CardTitle>
                <CardDescription>Generate authentic fantasy names</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Generate authentic elf names for D&D campaigns, fantasy stories, and RPG characters with cultural accuracy.
                </p>
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  <Badge variant="secondary" className="text-xs">Elf Names</Badge>
                  <Badge variant="secondary" className="text-xs">D&D RPG</Badge>
                  <Badge variant="secondary" className="text-xs">FREE</Badge>
                </div>
                <Button asChild className="w-full" variant="outline">
                  <a href="/elf-name-generator">
                    Generate Names
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose DreamfinityX?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional-grade AI tools designed for creators, with enterprise security and reliability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Generate high-quality results in seconds with our optimized AI infrastructure and advanced algorithms.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Quality</h3>
              <p className="text-gray-600">
                Create professional-grade content with our advanced AI models trained on millions of high-quality images.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">User-Friendly</h3>
              <p className="text-gray-600">
                Intuitive interface designed for both beginners and professionals. No technical knowledge required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Unleash Your Creativity?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators who trust DreamfinityX for their AI-powered creative needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="/text-to-image">
                <Wand2 className="w-5 h-5 mr-2" />
                Start Creating for Free
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-gray-300 text-gray-300 hover:bg-gray-800">
              <a href="/pricing">View Pricing Plans</a>
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Content - Lazy Loaded */}
      {shouldLoadSEO && (
        <Suspense fallback={
          <div className="py-16 px-4 bg-white border-t border-gray-200">
            <div className="max-w-6xl mx-auto text-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto"></div>
              <p className="mt-3 text-gray-600">Loading content...</p>
            </div>
          </div>
        }>
          <SEOContent />
        </Suspense>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
} 