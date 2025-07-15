'use client'

import React, { useState, Suspense, useEffect, useRef } from 'react'
import CharacterHeadcanonGenerator from '@/components/CharacterHeadcanonGenerator'
import dynamic from 'next/dynamic'

// 懒加载SEO组件，启用服务器端渲染以支持SEO
const CharacterHeadcanonSEO = dynamic(() => import('@/components/CharacterHeadcanonSEO'), {
  ssr: true, // 启用服务器端渲染，确保搜索引擎可以索引内容
})

export default function CharacterHeadcanonPage() {
  const [generatedHeadcanons, setGeneratedHeadcanons] = useState<string>('')
  const [shouldLoadSEO, setShouldLoadSEO] = useState(false)
  const seoTriggerRef = useRef<HTMLDivElement>(null)

  const handleHeadcanonsGenerated = (headcanons: string) => {
    setGeneratedHeadcanons(headcanons)
  }

  // 使用 Intersection Observer 监听用户是否滚动到页面底部
  useEffect(() => {
    // 确保SEO内容在页面加载后无论如何都会显示
    // 这有助于搜索引擎爬虫能够看到内容
    const timer = setTimeout(() => {
      setShouldLoadSEO(true)
    }, 100); // 页面加载后很快显示SEO内容
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setShouldLoadSEO(true)
          observer.disconnect() // 一旦触发就断开观察器
        }
      },
      {
        rootMargin: '300px' // 增加触发区域，提前加载
      }
    )

    if (seoTriggerRef.current) {
      observer.observe(seoTriggerRef.current)
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Character Headcanon Generator - Main Function Area */}
      <section className="py-8 px-4" id="generator">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Character Headcanon Generator | Create Character Stories
            </h1>
            <p className="text-lg text-gray-600">
              Our character headcanon generator creates detailed, believable character stories. Use this improved character headcanon generator for fan fiction, roleplaying, and creative writing.
            </p>
          </div>

          {/* Function Module */}
          <div className="max-w-4xl mx-auto">
            <CharacterHeadcanonGenerator onHeadcanonsGenerated={handleHeadcanonsGenerated} />
          </div>

          {/* Usage Examples */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Character Creation Examples
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <h3 className="font-medium text-gray-900 mb-2">Romance Hero</h3>
                    <p className="text-sm text-gray-600">
                      Generate headcanons for a young adult protagonist with romantic story style
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <h3 className="font-medium text-gray-900 mb-2">Fantasy Villain</h3>
                    <p className="text-sm text-gray-600">
                      Create headcanons for an antagonist with supernatural origins and dark themes
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <h3 className="font-medium text-gray-900 mb-2">Sci-Fi Explorer</h3>
                    <p className="text-sm text-gray-600">
                      Develop headcanons for a space explorer with mysterious background
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* SEO Content Trigger Point - 移至更靠前的位置 */}
        <div ref={seoTriggerRef} className="h-1 mt-8" />
      </section>

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
          <CharacterHeadcanonSEO />
        </Suspense>
      )}
    </div>
  )
} 