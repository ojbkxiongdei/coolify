'use client'

import React, { useState, Suspense } from 'react'
import Head from 'next/head'
import ImageEditor from '@/components/ImageEditor'
import ImageResults from '@/components/ImageResults'
import dynamic from 'next/dynamic'

// 动态导入SEO组件，启用服务器端渲染以支持SEO
const ImageEditorSEO = dynamic(() => import('@/components/ImageEditorSEO'), {
  ssr: true, // 启用服务器端渲染，确保搜索引擎可以索引内容
})

export default function ImageEditorPage() {
  const [editedImages, setEditedImages] = useState<string[]>([])
  const [showSEO, setShowSEO] = useState(false)

  const handleImagesEdited = (images: string[]) => {
    setEditedImages(images)
  }

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
          <h2>AI Image Editor - Professional Photo Editing Tool | DreamfinityX</h2>
          <p>
            Edit and enhance your images with our AI-powered image editor.
            Professional photo editing, background removal, style transfer, and artistic effects.
            Transform your photos with artificial intelligence for professional results.
          </p>
        </div>
      </noscript>
      <Head>
        <title>AI Image Editor - Professional Photo Editing Tool | DreamfinityX</title>
        <meta name="description" content="Edit and enhance your images with our AI-powered image editor. Professional photo editing, background removal, style transfer, and artistic effects. Transform your photos with artificial intelligence." />
        <meta name="keywords" content="AI image editor, photo editor, image editing, AI photo editing, background removal, style transfer, photo enhancement, image processing, photo retouching" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://dreamfinityx.com/image-editor" />
        <meta property="og:title" content="AI Image Editor - Professional Photo Editing Tool | DreamfinityX" />
        <meta property="og:description" content="Edit and enhance your images with our AI-powered image editor. Professional photo editing and artistic effects with artificial intelligence." />
        <meta property="og:url" content="https://dreamfinityx.com/image-editor" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Image Editor - Professional Photo Editing Tool | DreamfinityX" />
        <meta name="twitter:description" content="Edit and enhance your images with our AI-powered image editor. Professional photo editing and artistic effects with AI." />
      </Head>

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

          {/* Image Editor */}
          <div className="max-w-4xl mx-auto">
            <ImageEditor onImagesEdited={handleImagesEdited} />
            <ImageResults
              images={editedImages}
              title="Edited Results"
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
          <ImageEditorSEO />
        </Suspense>
      )}
    </div>
  )
} 