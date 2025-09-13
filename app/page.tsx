"use client"

import React, { useState, Suspense, useEffect } from 'react'
import Head from 'next/head'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Edit3, Book, TreePine, Users, Star, Zap, ArrowRight, Image as ImageIcon, Palette, Wand2, Mountain } from 'lucide-react'
import SEOImageGallery from '@/components/SEOImageGallery'
import StructuredData from '@/components/StructuredData'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { LeftScrollButton, RightScrollButton } from '@/components/ui/ScrollButtons'

// 动态导入SEO组件，启用服务器端渲染以支持SEO
const SEOContent = dynamic(() => import('@/components/SEOContent'), {
  ssr: true, // 启用服务器端渲染，确保搜索引擎可以索引内容
})

function HomeContent() {
  const [shouldLoadSEO, setShouldLoadSEO] = useState(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const hasParams = searchParams && searchParams.toString().length > 0
  const canonicalUrl = "https://dreamfinityx.com/"

  // 使用定时器和 Intersection Observer 确保SEO内容加载，同时优化用户体验
  useEffect(() => {
    // 设置一个定时器，确保SEO内容在页面加载后显示，无论是否滚动
    // 这有助于搜索引擎爬虫能够看到内容
    const timer = setTimeout(() => {
      setShouldLoadSEO(true);
    }, 100); // 页面加载后很快显示SEO内容
    
    // 同时继续使用 Intersection Observer 监听滚动，优化用户体验
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setShouldLoadSEO(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '300px' // 增加触发区域，提前加载
      }
    )

    const trigger = document.createElement('div')
    trigger.style.height = '1px'
    trigger.style.position = 'absolute'
    trigger.style.bottom = '80%' // 移至更靠近顶部，确保早点触发
    trigger.style.left = '0'
    trigger.style.width = '100%'
    trigger.style.pointerEvents = 'none'
    
    document.body.appendChild(trigger)
    observer.observe(trigger)

    return () => {
      clearTimeout(timer);
      observer.disconnect()
      if (document.body.contains(trigger)) {
        document.body.removeChild(trigger)
      }
    }
  }, [])

  // Canonical handled by Next/head below; no client-side override

  return (
    <>
      <Head>
        <title>DreamfinityX - Professional AI Image Generator & Creative Platform</title>
        <meta name="description" content="Create stunning AI images from text in seconds with DreamfinityX. Professional AI image generation, editing, and style conversion tools. Start creating for free today." />
        <meta name="keywords" content="AI image generator, text to image, AI art generator, image generation, AI creative tools, artificial intelligence, digital art, AIGC" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://dreamfinityx.com/" />

        <meta property="og:title" content="DreamfinityX - Professional AI Image Generator" />
        <meta property="og:description" content="Create stunning AI images from text in seconds with DreamfinityX. Professional AI image generation, editing, and style conversion tools." />
        <meta property="og:url" content="https://dreamfinityx.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://dreamfinityx.com/seo-images/hero-creative-workspace.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DreamfinityX - Professional AI Image Generator" />
        <meta name="twitter:description" content="Create stunning AI images from text in seconds with DreamfinityX. Professional AI image generation, editing, and style conversion tools." />
        <meta name="twitter:image" content="https://dreamfinityx.com/seo-images/hero-creative-workspace.png" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-wide">
                  <span className="block">Create Stunning</span>
                  <span className="block mt-2 md:mt-3">
                    <span className="text-blue-600">AI Images</span>
                  </span>
                  <span className="block mt-2 md:mt-3">in Seconds</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto md:mx-0">
                  Transform your ideas into professional visuals with our AI-powered image generation, editing, and style transfer tools.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-6 md:mb-0">
                <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
                  <a href="/generate">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Creating
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/ghibli-style-converter">View Styles</a>
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-blue-100 max-w-md mx-auto">
                <div className="w-full aspect-square relative">
                  <Image 
                    src="/seo-images/hero-creative-workspace.png" 
                    alt="AI creative workspace with floating designs and holographic UI elements" 
                    fill 
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="bg-white shadow-sm">
                  AI Art Generation
                </Badge>
                <Badge variant="outline" className="bg-white shadow-sm">
                  Professional Tools
                </Badge>
                <Badge variant="outline" className="bg-white shadow-sm">
                  Creative Suite
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-16 pt-6 border-t border-gray-200">
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

      {/* Showcase Section with SEO Image Gallery - 核心功能展示 */}
      <section className="py-16 px-4 bg-gradient-to-br from-white to-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete AI Image Creation Suite</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, edit, and transform images with professional-quality AI tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                <ImageIcon className="w-6 h-6 mr-2" />
                Text-to-Image Generation
              </h3>
              <p className="text-gray-700 mb-6">
                Transform text descriptions into stunning visuals with our AI image generator. Create professional artwork, 
                illustrations, and graphics for any creative need.
              </p>
              <div className="mb-6 rounded-xl overflow-hidden shadow-md max-w-sm mx-auto">
                <Image 
                  src="/seo-images/Natural Landscape.png" 
                  alt="AI generated sunset mountain lake landscape"
                  width={500}
                  height={350}
                  className="w-full object-cover"
                />
              </div>
              <div className="text-center">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5">
                  <a href="/generate">Try Generator <ArrowRight className="w-4 h-4 ml-2" /></a>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                <Edit3 className="w-6 h-6 mr-2" />
                AI Image Editing
              </h3>
              <p className="text-gray-700 mb-6">
                Edit and enhance your photos with AI. Background removal, style transfer, image enhancement, 
                and more - all with professional-grade results.
              </p>
              <div className="mb-6 rounded-xl overflow-hidden shadow-md max-w-sm mx-auto">
                <Image 
                  src="/seo-images/Style Transfer.png" 
                  alt="AI artistic style transfer effect demonstration"
                  width={500}
                  height={350}
                  className="w-full object-cover"
                />
              </div>
              <div className="text-center">
                <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5">
                  <a href="/edit">Edit Images <ArrowRight className="w-4 h-4 ml-2" /></a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
                <Palette className="w-6 h-6 mr-2" />
                Pixar Style Converter
              </h3>
              <p className="text-gray-700 mb-6">
                Transform your photos into charming Pixar-style animations. Turn portraits, family photos, and selfies
                into beautiful cartoon characters with the iconic Pixar look.
              </p>
              <div className="mb-6 rounded-xl overflow-hidden shadow-md max-w-sm mx-auto">
                <Image 
                  src="/seo-images/Pixar-Style-Transformation.png" 
                  alt="Before and after photo transformation to Pixar animation style showing exaggerated features and vibrant colors"
                  width={500}
                  height={350}
                  className="w-full object-cover"
                />
              </div>
              <div className="text-center">
                <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5">
                  <a href="/pixar-style-converter">Try Pixar Converter <ArrowRight className="w-4 h-4 ml-2" /></a>
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-cyan-600 mb-4 flex items-center">
                <Mountain className="w-6 h-6 mr-2" />
                Studio Ghibli Style Converter
              </h3>
              <p className="text-gray-700 mb-6">
                Transform your photos into enchanting Studio Ghibli-style artwork. Convert portraits, landscapes, and scenes 
                into beautiful watercolor-style art with the iconic dreamy Ghibli aesthetic.
              </p>
              <div className="mb-6 rounded-xl overflow-hidden shadow-md max-w-sm mx-auto">
                <Image 
                  src="/seo-images/Ghibli-Style-Transformation.png" 
                  alt="Before and after photo transformation to Studio Ghibli style showing watercolor textures and dreamy atmosphere"
                  width={500}
                  height={350}
                  className="w-full object-cover"
                />
              </div>
              <div className="text-center">
                <Button asChild className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5">
                  <a href="/ghibli-style-converter">Try Ghibli Converter <ArrowRight className="w-4 h-4 ml-2" /></a>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AI Image Creation Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional AI-powered tools for creating, editing, and transforming images with ease
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Text-to-Image Tool */}
              <div>
                <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200 h-full flex flex-col">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                      <ImageIcon className="w-8 h-8 text-blue-600" aria-label="AI Image Generator Icon" />
                    </div>
                    <CardTitle className="text-xl">AI Image Generator</CardTitle>
                    <CardDescription>Transform text into stunning visuals</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center flex-1 flex flex-col">
                    <p className="text-sm text-gray-600 mb-4">
                      Create professional artwork, illustrations, and graphics from simple text descriptions using advanced AI technology.
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      <Badge variant="secondary" className="text-xs">Text-to-Image</Badge>
                      <Badge variant="secondary" className="text-xs">High Quality</Badge>
                      <Badge variant="secondary" className="text-xs">Multiple Styles</Badge>
                    </div>
                    <div className="mt-auto">
                      <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <a href="/generate">
                          Try Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Image Editor Tool */}
              <div>
                <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200 h-full flex flex-col">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                      <Edit3 className="w-8 h-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">AI Image Editor</CardTitle>
                    <CardDescription>Edit and enhance your photos with AI</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center flex-1 flex flex-col">
                    <p className="text-sm text-gray-600 mb-4">
                      Professional photo editing with AI-powered tools for background removal, style transfer, and artistic effects.
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      <Badge variant="secondary" className="text-xs">Photo Editing</Badge>
                      <Badge variant="secondary" className="text-xs">Style Transfer</Badge>
                      <Badge variant="secondary" className="text-xs">AI Enhancement</Badge>
                    </div>
                    <div className="mt-auto">
                      <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        <a href="/edit">
                          Edit Photos
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Pixar Style Converter Tool */}
              <div>
                <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-200 h-full flex flex-col">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                      <Palette className="w-8 h-8 text-orange-600" />
                    </div>
                    <CardTitle className="text-xl">Pixar Style Converter</CardTitle>
                    <CardDescription>Transform photos into Pixar animations</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center flex-1 flex flex-col">
                    <p className="text-sm text-gray-600 mb-4">
                      Convert portraits and photos into Pixar-style animated characters with signature large eyes, smooth textures, and vibrant colors.
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      <Badge variant="secondary" className="text-xs">Pixar Animation</Badge>
                      <Badge variant="secondary" className="text-xs">Photo Conversion</Badge>
                      <Badge variant="secondary" className="text-xs">Character Design</Badge>
                    </div>
                    <div className="mt-auto">
                      <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                        <a href="/pixar-style-converter">
                          Transform Photos
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Studio Ghibli Style Converter Tool */}
              <div>
                <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-cyan-200 h-full flex flex-col">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-200 transition-colors">
                      <Mountain className="w-8 h-8 text-cyan-600" />
                    </div>
                    <CardTitle className="text-xl">Ghibli Style Converter</CardTitle>
                    <CardDescription>Transform photos into Ghibli artwork</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center flex-1 flex flex-col">
                    <p className="text-sm text-gray-600 mb-4">
                      Convert portraits and landscapes into Studio Ghibli-style artwork with the signature watercolor aesthetic, dreamy atmosphere, and hand-painted look.
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      <Badge variant="secondary" className="text-xs">Studio Ghibli</Badge>
                      <Badge variant="secondary" className="text-xs">Watercolor Style</Badge>
                      <Badge variant="secondary" className="text-xs">Artistic Conversion</Badge>
                    </div>
                    <div className="mt-auto">
                      <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                        <a href="/ghibli-style-converter">
                          Transform Photos
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
        </div>
      </section>

      {/* Enhanced Image Editing Showcase */}
      {/* 移除重复的图片展示，已在核心功能部分展示 */}

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

      {/* Fantasy Character Showcase */}
      {/* 移除重复的角色展示，已在核心功能部分展示 */}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Unleash Your Creativity?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who trust DreamfinityX for their AI-powered creative needs
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button size="lg" asChild className="bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800">
              <a href="/generate">
                <Wand2 className="w-5 h-5 mr-2" />
                Start Creating for Free
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <a href="/pricing">View Pricing Plans</a>
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="font-bold text-2xl text-white mb-1">10M+</div>
              <div className="text-sm text-blue-100">Images Generated</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="font-bold text-2xl text-white mb-1">50K+</div>
              <div className="text-sm text-blue-100">Happy Users</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="font-bold text-2xl text-white mb-1">99.9%</div>
              <div className="text-sm text-blue-100">Uptime</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="font-bold text-2xl text-white mb-1">24/7</div>
              <div className="text-sm text-blue-100">Support</div>
            </div>
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

      {/* Enhanced Structured Data for SEO */}
      <StructuredData
        type="software"
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "DreamfinityX",
          "description": "Complete AI creative platform for generating images, crafting stories, and creating character names - the ultimate toolkit for designers, writers, and world-builders",
          "url": "https://dreamfinityx.com",
          "applicationCategory": "CreativeSuite, DigitalArtApplication, StoryGenerationSoftware, NameGenerationTool",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "0",
            "highPrice": "39.99",
            "priceCurrency": "USD",
            "offerCount": 4
          },
          "screenshot": [
            "https://dreamfinityx.com/seo-images/Natural Landscape.png",
            "https://dreamfinityx.com/seo-images/Portrait Photography.png",
            "https://dreamfinityx.com/seo-images/Wizard Character.png"
          ],
          "featureList": [
            "AI Image Generation",
            "Character Story Creation",
            "Fantasy Name Generation",
            "Style Transfer",
            "World Building",
            "Creative Writing Support",
            "RPG Character Development",
            "High Quality Visual Design"
          ],
          "creator": {
            "@type": "Organization",
            "name": "DreamfinityX",
            "url": "https://dreamfinityx.com"
          }
        }}
      />
      {/* Add FAQ structured data to match on-page FAQ content */}
      <StructuredData type="faq" />
    </div>
    </>
  )
}

export default function Home() {
  return (
    <>
      {/* NoScript SEO内容，确保搜索引擎即使不执行JavaScript也能看到关键内容 */}
      <noscript>
        <div style={{display: 'none'}}>
          <h2>DreamfinityX - Complete AI Creative Platform</h2>
          <p>
            All-in-one AI creative platform for generating stunning images, crafting compelling stories, and creating authentic character names. 
            The ultimate toolkit for designers, writers, and world-builders. Our integrated suite includes text-to-image generation, 
            character headcanon creator, and fantasy name generators to support your complete creative workflow.
          </p>
        </div>
      </noscript>
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent"></div>
        </div>
      }>
        <HomeContent />
      </Suspense>
    </>
  )
} 
