'use client'

import React from 'react'
import Image from 'next/image'

interface ImageResultsProps {
  images: string[]
  title: string
  onDownload?: (imageUrl: string) => void
  onEdit?: (imageUrl: string) => void
}

export default function ImageResults({ 
  images, 
  title, 
  onDownload, 
  onEdit 
}: ImageResultsProps) {
  if (images.length === 0) {
    return null
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
              {/* 固定高度容器，使用aspect-ratio确保统一比例 */}
              <div className="aspect-square w-full relative">
                <img
                  src={image}
                  alt={`${title} ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:scale-105"
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
    </div>
  )
} 