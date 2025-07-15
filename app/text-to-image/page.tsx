'use client'

import React, { useState, Suspense } from 'react'
import Head from 'next/head'
import ImageGenerator from '@/components/ImageGenerator'
import ImageResults from '@/components/ImageResults'
import dynamic from 'next/dynamic'

// 动态导入SEO组件，启用服务器端渲染以支持SEO
const TextToImageSEO = dynamic(() => import('@/components/TextToImageSEO'), {
  ssr: true, // 启用服务器端渲染，确保搜索引擎可以索引内容
})

export default function TextToImagePage() {
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [showSEO, setShowSEO] = useState(false)

  const handleImagesGenerated = (images: string[]) => {
    setGeneratedImages(images)
  }
  
  // 在组件挂载时添加关键的静态SEO内容 (noscript标签在return中添加)

  // 使用定时器和 Intersection Observer 确保SEO内容加载
  React.useEffect(() => {
    // 设置一个定时器，确保SEO内容在页面加载后显示，无论是否滚动
    // 这有助于搜索引擎爬虫能够看到内容
    const timer = setTimeout(() => {
      setShowSEO(true);
    }, 100); // 页面加载后很快显示SEO内容
    
    // 同时继续使用 Intersection Observer 监听滚动，优化用户体验
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setShowSEO(true)
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NoScript SEO内容，确保搜索引擎即使不执行JavaScript也能看到关键内容 */}
      <noscript>
        <div style={{display: 'none'}}>
          <h2>AI Image Generator - Text to Image | DreamfinityX</h2>
          <p>
            Transform your words into stunning visuals with our AI image generator.
            Create professional artwork, illustrations, and graphics from text descriptions using advanced AI technology.
            Our text to image generator creates high-quality visuals for any creative need.
          </p>
        </div>
      </noscript>
      <Head>
        <title>AI Image Generator - Text to Image | DreamfinityX</title>
        <meta name="description" content="Transform your words into stunning visuals with our AI image generator. Create professional artwork, illustrations, and graphics from text descriptions using advanced AI technology." />
        <meta name="keywords" content="AI image generator, text to image, AI art generator, artificial intelligence, image generation, AI artwork, digital art, creative AI, image creation" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://dreamfinityx.com/text-to-image" />
        <meta property="og:title" content="AI Image Generator - Text to Image | DreamfinityX" />
        <meta property="og:description" content="Transform your words into stunning visuals with our AI image generator. Create professional artwork and graphics from text descriptions." />
        <meta property="og:url" content="https://dreamfinityx.com/text-to-image" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Image Generator - Text to Image | DreamfinityX" />
        <meta name="twitter:description" content="Transform your words into stunning visuals with our AI image generator. Create professional artwork and graphics from text descriptions." />
      </Head>

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

          {/* Image Generator */}
          <div id="image-generator" className="max-w-4xl mx-auto">
            <ImageGenerator onImagesGenerated={handleImagesGenerated} />
            <ImageResults
              images={generatedImages}
              title="Generated Results"
            />
          </div>
        </div>
      </section>

      {/* SEO Content - Lazy Loaded */}
      {showSEO && (
        <Suspense fallback={
          <div className="py-16 px-4 bg-white border-t border-gray-200">
            <div className="max-w-6xl mx-auto text-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto"></div>
              <p className="mt-3 text-gray-600">Loading content...</p>
            </div>
          </div>
        }>
          <TextToImageSEO />
        </Suspense>
      )}
    </div>
  )
} 