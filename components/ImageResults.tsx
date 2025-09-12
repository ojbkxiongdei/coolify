'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface ImageResultsProps {
  images: string[]
  title: string
  onDownload?: (imageUrl: string) => void
  onEdit?: (imageUrl: string) => void
  imageSizes?: Record<string, string> // 图片尺寸信息
}

export default function ImageResults({ 
  images, 
  title, 
  onDownload, 
  onEdit,
  imageSizes 
}: ImageResultsProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  if (images.length === 0) {
    return null
  }

  // 根据图片尺寸获取对应的 aspect-ratio 类
  const getAspectRatioClass = (imageUrl: string) => {
    if (!imageSizes) return 'aspect-square' // 默认正方形
    
    const size = imageSizes[imageUrl]
    if (!size) return 'aspect-square'
    
    switch (size) {
      case '1024x1536':
        return 'aspect-[2/3]' // Portrait
      case '1536x1024':
        return 'aspect-[3/2]' // Landscape
      case '1024x1024':
      default:
        return 'aspect-square' // Square
    }
  }

  const handleDownloadAll = async () => {
    for (let i = 0; i < images.length; i++) {
      await handleSingleDownload(images[i], i)
      // 添加小延迟避免浏览器阻止多个下载
      if (i < images.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
  }

  const handleSingleDownload = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${index + 1}.png`
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // 清理临时URL
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
      // 如果fetch失败，回退到原始方法
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${index + 1}.png`
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {title}
        </h3>
        <button 
          onClick={handleDownloadAll}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors text-sm"
        >
          Download All
        </button>
      </div>
      
      {/* 优化后的响应式网格布局：手机1列，平板2列，电脑3列，大屏4列 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image, index) => {
          console.log(`Image ${index}: `, image.substring(0, 100) + '...'); // 调试日志
          return (
            <div key={index} className="relative group overflow-hidden rounded-lg bg-gray-100">
              {/* 使用动态宽高比容器 */}
              <div className={`${getAspectRatioClass(image)} w-full relative`}>
                <img
                  src={image}
                  alt={`${title} ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                  onError={(e) => {
                    console.error(`Image ${index} load error:`, e);
                    console.error('Failed image src:', image.substring(0, 100));
                  }}
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    console.log(`Image ${index} loaded successfully - dimensions: ${img.naturalWidth}x${img.naturalHeight}`);
                  }}
                />
              </div>
              
              {/* 悬停时的操作按钮 */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
                <button 
                  onClick={() => setSelectedImage(image)}
                  className="px-3 py-1 bg-white/90 text-gray-900 rounded-md text-sm hover:bg-white transition-colors"
                >
                  View
                </button>
                <button 
                  onClick={() => handleSingleDownload(image, index)}
                  className="px-3 py-1 bg-white/90 text-gray-900 rounded-md text-sm hover:bg-white transition-colors"
                >
                  Download
                </button>
                {onEdit && (
                  <button 
                    onClick={() => onEdit(image)}
                    className="px-3 py-1 bg-white/90 text-gray-900 rounded-md text-sm hover:bg-white transition-colors"
                  >
                    Edit
                  </button>
                )}
                {onDownload && (
                  <button 
                    onClick={() => onDownload(image)}
                    className="px-3 py-1 bg-white/90 text-gray-900 rounded-md text-sm hover:bg-white transition-colors"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* 模态预览 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex flex-col p-4 md:p-6"
          onClick={() => setSelectedImage(null)}
        >
          {/* 顶部关闭按钮 */}
          <div className="w-full flex justify-end mb-3">
            <button
              onClick={() => setSelectedImage(null)}
              className="p-3 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full backdrop-blur-sm hover:bg-black/70"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* 大图显示容器 */}
          <div className="flex-1 flex items-center justify-center min-h-0 mb-3">
            <img
              src={selectedImage}
              alt="Full size preview"
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
              style={{
                maxWidth: 'min(90vw, 1200px)',
                maxHeight: 'min(75vh, 800px)'
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          {/* 底部操作栏 */}
          <div className="w-full flex items-center justify-center gap-3">
            <button
              onClick={() => {
                const index = images.indexOf(selectedImage)
                handleSingleDownload(selectedImage, index)
              }}
              className="px-4 py-2 bg-white/95 text-gray-900 rounded-lg hover:bg-white transition-colors backdrop-blur-sm font-medium shadow-lg"
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
            {onEdit && (
              <button
                onClick={() => {
                  onEdit(selectedImage)
                  setSelectedImage(null)
                }}
                className="px-4 py-2 bg-white/95 text-gray-900 rounded-lg hover:bg-white transition-colors backdrop-blur-sm font-medium shadow-lg"
              >
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 