'use client'

import React, { useState, Suspense, lazy, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ImageGenerator from '@/components/ImageGenerator'
import ImageResults from '@/components/ImageResults'

// 懒加载大型组件
const ImageEditor = lazy(() => import('@/components/ImageEditor'))
const SEOContent = lazy(() => import('@/components/SEOContent'))

function HomeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  // 服务器端始终使用默认状态避免hydration错误
  const [activeTab, setActiveTab] = useState<'generate' | 'edit'>('generate')
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [editedImages, setEditedImages] = useState<string[]>([])
  const [shouldLoadSEO, setShouldLoadSEO] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const seoTriggerRef = useRef<HTMLDivElement>(null)

  // 客户端mount后设置正确的tab状态
  useEffect(() => {
    setIsClient(true)
    const tab = searchParams.get('tab')
    if (tab === 'edit' || tab === 'generate') {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleTabChange = (tab: 'generate' | 'edit') => {
    setActiveTab(tab)
    // 更新URL参数
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', tab)
    router.replace(`/?${params.toString()}`, { scroll: false })
  }

  const handleImagesGenerated = (images: string[]) => {
    setGeneratedImages(images)
  }

  const handleImagesEdited = (images: string[]) => {
    setEditedImages(images)
  }

  const handleEditFromGenerated = (imageUrl: string) => {
    // TODO: Implement edit functionality from generated image
    console.log('Edit image:', imageUrl)
    handleTabChange('edit')
  }

  // 使用 Intersection Observer 监听用户是否滚动到页面底部
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setShouldLoadSEO(true)
          observer.disconnect() // 一旦触发就断开观察器
        }
      },
      {
        rootMargin: '200px' // 提前200px触发加载
      }
    )

    if (seoTriggerRef.current) {
      observer.observe(seoTriggerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Function Area - Direct to First Screen */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Simple Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AI Image Generator & Editor
            </h1>
            <p className="text-lg text-gray-600">
              Create and edit stunning images with artificial intelligence
            </p>
          </div>

          {/* 客户端mount前显示加载状态 */}
          {!isClient ? (
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                <div className="flex gap-1">
                  <div className="px-6 py-3 rounded-md bg-gray-100 text-gray-400">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin inline-block mr-2"></div>
                    Loading...
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Tab Navigation */
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                <div className="flex gap-1">
                  <button
                    onClick={() => handleTabChange('generate')}
                    className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center gap-2 ${
                      activeTab === 'generate'
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Text to Image
                  </button>
                  <button
                    onClick={() => handleTabChange('edit')}
                    className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center gap-2 ${
                      activeTab === 'edit'
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Image Editor
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Function Modules - 只在客户端mount后显示 */}
          {isClient && (
            <div className="max-w-4xl mx-auto">
              {activeTab === 'generate' && (
                <div>
                  <ImageGenerator onImagesGenerated={handleImagesGenerated} />
                  <ImageResults
                    images={generatedImages}
                    title="Generated Results"
                    onEdit={handleEditFromGenerated}
                  />
                </div>
              )}

              {activeTab === 'edit' && (
                <div>
                  <Suspense fallback={
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-center py-12">
                        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                        <span className="ml-3 text-gray-600">Loading Image Editor...</span>
                      </div>
                    </div>
                  }>
                    <ImageEditor onImagesEdited={handleImagesEdited} />
                  </Suspense>
                  <ImageResults
                    images={editedImages}
                    title="Edited Results"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* SEO Content Trigger Point */}
      <div ref={seoTriggerRef} className="h-1" />

      {/* SEO Content Sections - Intersection Observer Lazy Loaded */}
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