'use client'

import React, { useState } from 'react'
import { database } from '@/lib/database/actions'
import { getCachedUser, refreshCredits } from '@/lib/hooks/useUser'
import { requireLogin } from '@/lib/utils/requireLogin'

interface ImageGeneratorProps {
  onImagesGenerated: (images: string[]) => void
}

export default function ImageGenerator({ onImagesGenerated }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [size, setSize] = useState('1024x1024')
  const [quality, setQuality] = useState('medium')
  const [numberOfImages, setNumberOfImages] = useState(1)
  const [outputFormat, setOutputFormat] = useState('PNG')

  const handleGenerateImage = async () => {
    if (!(await requireLogin())) return
    if (!prompt.trim()) {
      alert('Please enter an image description')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt, 
          size, 
          quality, 
          n: numberOfImages,
          output_format: outputFormat.toLowerCase()
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        const images = Array.isArray(data.images) ? data.images : [data.imageUrl]
        onImagesGenerated(images)

        // 刷新credits缓存，因为API已经消费了credits
        refreshCredits()

        // 如果用户已登录，保存到数据库（异步，不阻塞界面）
        const user = getCachedUser()
        if (user && images.length > 0) {
          // 异步保存，不阻塞用户界面
          Promise.all(
            images.map(async (imageUrl: string) => {
              try {
                await database.saveImageGeneration({
                  prompt,
                  imageUrl,
                  settings: {
                    size,
                    quality,
                    numberOfImages,
                    outputFormat
                  },
                  generationType: 'text-to-image'
                })
              } catch (error) {
                console.error('Failed to save image to database:', error)
                // 可以显示一个提示，但不要阻止用户继续使用
              }
            })
          ).then(() => {
            console.log('Images saved to database successfully')
          }).catch((error) => {
            console.error('Some images failed to save:', error)
            // 可以显示一个非阻塞的提示给用户
          })
        }
      } else {
        alert(data.error || 'Image generation failed')
      }
    } catch (error) {
      console.error('Image generation error:', error)
      alert('Network error, please try again')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gray-900 rounded-md">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">AI Image Generator</h2>
          {getCachedUser() && (
            <p className="text-xs text-gray-500 mt-1">
              Images will be saved to your account history
            </p>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Main Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe the image you want to generate
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A majestic red fox walking through a golden autumn forest, cinematic lighting, photorealistic"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 resize-none text-sm bg-white transition-all duration-200"
            rows={3}
          />
        </div>

        {/* Settings Panel */}
        <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            Settings
          </h3>
          
          {/* Two Row Layout */}
          <div className="space-y-3">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Image Size</label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-xs"
                >
                  <option value="1024x1024">1024×1024 (Square)</option>
                  <option value="1024x1536">1024×1536 (Portrait)</option>
                  <option value="1536x1024">1536×1024 (Landscape)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Quality</label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-xs"
                >
                  <option value="low">Low (Faster)</option>
                  <option value="medium">Medium (Balanced)</option>
                  <option value="high">High (Best Quality)</option>
                </select>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Number of Images</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={numberOfImages}
                  onChange={(e) => setNumberOfImages(parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Output Format</label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-xs"
                >
                  <option value="PNG">PNG (High Quality)</option>
                  <option value="JPEG">JPEG (Smaller Size)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateImage}
          disabled={isGenerating}
          className="w-full bg-gray-900 text-white py-3 px-6 rounded-md font-medium text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Image
            </>
          )}
        </button>

        {/* Guest User Notice */}
        {!getCachedUser() && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-blue-700">
                Sign in with Google to save your generated images and access them later
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 