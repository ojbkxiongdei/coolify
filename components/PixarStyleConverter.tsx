'use client'

import React, { useState } from 'react'
import { database } from '@/lib/database/actions'
import { useUser, refreshCredits } from '@/lib/hooks/useUser'
import { requireLogin } from '@/lib/utils/requireLogin'
import Image from 'next/image'

interface PixarStyleConverterProps {
  onImagesConverted: (images: string[]) => void
}

export default function PixarStyleConverter({ onImagesConverted }: PixarStyleConverterProps) {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [size, setSize] = useState('1024x1024')
  const [quality, setQuality] = useState('medium')
  const [numberOfImages, setNumberOfImages] = useState(1)
  const [outputFormat, setOutputFormat] = useState('PNG')
  const { user } = useUser()
  const [styleStrength, setStyleStrength] = useState('medium') // 新增风格强度选项

  const handleConvertImage = async () => {
    // 如果未登录，重定向到登录页面，然后返回
    if (!(await requireLogin())) return
    
    // 登录成功后检查是否上传了图片
    if (!uploadedImage) {
      alert('Please upload an image to convert')
      return
    }

    setIsConverting(true)
    try {
      const formData = new FormData()
      formData.append('image', uploadedImage)
      formData.append('prompt', 'Convert this image to Pixar animation style')
      formData.append('model', 'gpt-image-1')
      formData.append('size', size)
      formData.append('quality', quality)
      formData.append('n', numberOfImages.toString())
      formData.append('output_format', outputFormat.toLowerCase())
      formData.append('style_strength', styleStrength)

      const response = await fetch('/api/pixar-style-convert', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      
      if (data.success) {
        const images = Array.isArray(data.images) ? data.images : [data.imageUrl]
        onImagesConverted(images)

        // 刷新credits缓存，因为API已经消费了credits
        refreshCredits()

        // 如果用户已登录，保存到数据库（异步，不阻塞界面）
        if (user && images.length > 0) {
          // 异步保存，不阻塞用户界面
          Promise.all(
            images.map(async (imageUrl: string) => {
              try {
                await database.saveImageGeneration({
                  prompt: 'Pixar style conversion',
                  imageUrl,
                  originalFilename: uploadedImage.name,
                  settings: {
                    size,
                    quality,
                    numberOfImages,
                    outputFormat,
                    styleStrength,
                    originalImage: uploadedImage.name
                  },
                  generationType: 'pixar-style-convert'
                })
              } catch (error) {
                console.error('Failed to save converted image to database:', error)
                // 可以显示一个提示，但不要阻止用户继续使用
              }
            })
          ).then(() => {
            console.log('Converted images saved to database successfully')
          }).catch((error) => {
            console.error('Some converted images failed to save:', error)
            // 可以显示一个非阻塞的提示给用户
          })
        }
      } else {
        alert(data.error || 'Image conversion failed')
      }
    } catch (error) {
      console.error('Image conversion error:', error)
      alert('Network error, please try again')
    } finally {
      setIsConverting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedImage(file)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gray-900 rounded-md">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">Pixar Style Converter</h2>
          {user && (
            <p className="text-xs text-gray-500 mt-1">
              Converted images will be saved to your account history
            </p>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image to Convert
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <label 
              htmlFor="image-upload" 
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-sm text-gray-600">
                Click to upload PNG, JPEG, or WebP
              </span>
              <span className="text-xs text-gray-500">
                Maximum file size: 4MB
              </span>
            </label>
          </div>

          {uploadedImage && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800 font-medium mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Image uploaded successfully
              </p>
              <Image
                src={URL.createObjectURL(uploadedImage)}
                alt="Upload preview"
                width={400}
                height={128}
                className="w-full max-h-32 object-contain rounded-md border border-gray-200"
              />
            </div>
          )}
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
                <label className="block text-xs font-medium text-gray-600 mb-1">Output Size</label>
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
                <label className="block text-xs font-medium text-gray-600 mb-1">Number of Variations</label>
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

            {/* Third Row - Style Strength */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Pixar Style Strength</label>
              <select
                value={styleStrength}
                onChange={(e) => setStyleStrength(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-xs"
              >
                <option value="subtle">Subtle (Light Effect)</option>
                <option value="medium">Medium (Balanced)</option>
                <option value="strong">Strong (Full Pixar Style)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvertImage}
          disabled={isConverting}
          className={`w-full py-3 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors
            ${isConverting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
        >
          {isConverting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Converting to Pixar Style...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Convert to Pixar Style
            </>
          )}
        </button>

        {/* Style Examples */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About Pixar Style Conversion
          </h4>
          <p className="text-xs text-blue-700 mb-3">
            This tool uses AI to transform your photos into a Pixar animation style. 
            Upload portraits, family photos or selfies to see them converted into 
            beautiful Pixar-inspired characters.
          </p>
          <div className="text-xs text-gray-600">
            <p className="mb-1 font-medium">Best results with:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Portrait photos with clear faces</li>
              <li>Good lighting with minimal shadows</li>
              <li>Simple backgrounds</li>
              <li>Front-facing or slightly angled faces</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 