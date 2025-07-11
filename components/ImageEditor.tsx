'use client'

import React, { useState } from 'react'
import { database } from '@/lib/database/actions'
import { useUser, refreshCredits } from '@/lib/hooks/useUser'
import { requireLogin } from '@/lib/utils/requireLogin'
import Image from 'next/image'

interface ImageEditorProps {
  onImagesEdited: (images: string[]) => void
}

export default function ImageEditor({ onImagesEdited }: ImageEditorProps) {
  const [editImage, setEditImage] = useState<File | null>(null)
  const [editPrompt, setEditPrompt] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [size, setSize] = useState('1024x1024')
  const [quality, setQuality] = useState('medium')
  const [numberOfImages, setNumberOfImages] = useState(1)
  const [outputFormat, setOutputFormat] = useState('PNG')
  const { user } = useUser()

  const handleEditImage = async () => {
    if (!(await requireLogin())) return
    if (!editImage || !editPrompt.trim()) {
      alert('Please upload an image and enter edit description')
      return
    }

    setIsEditing(true)
    try {
      const formData = new FormData()
      formData.append('image', editImage)
      formData.append('prompt', editPrompt)
      formData.append('model', 'gpt-image-1')
      formData.append('size', size)
      formData.append('quality', quality)
      formData.append('n', numberOfImages.toString())
      formData.append('output_format', outputFormat.toLowerCase())

      const response = await fetch('/api/edit-image', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      
      if (data.success) {
        const images = Array.isArray(data.images) ? data.images : [data.imageUrl]
        onImagesEdited(images)

        // 刷新credits缓存，因为API已经消费了credits
        refreshCredits()

        // 如果用户已登录，保存到数据库（异步，不阻塞界面）
        if (user && images.length > 0) {
          // 异步保存，不阻塞用户界面
          Promise.all(
            images.map(async (imageUrl: string) => {
              try {
                await database.saveImageGeneration({
                  prompt: editPrompt,
                  imageUrl,
                  originalFilename: editImage.name,
                  settings: {
                    size,
                    quality,
                    numberOfImages,
                    outputFormat,
                    originalImage: editImage.name
                  },
                  generationType: 'image-edit'
                })
              } catch (error) {
                console.error('Failed to save edited image to database:', error)
                // 可以显示一个提示，但不要阻止用户继续使用
              }
            })
          ).then(() => {
            console.log('Edited images saved to database successfully')
          }).catch((error) => {
            console.error('Some edited images failed to save:', error)
            // 可以显示一个非阻塞的提示给用户
          })
        }
      } else {
        alert(data.error || 'Image editing failed')
      }
    } catch (error) {
      console.error('Image editing error:', error)
      alert('Network error, please try again')
    } finally {
      setIsEditing(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setEditImage(file)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gray-900 rounded-md">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">AI Image Editor</h2>
          {user && (
            <p className="text-xs text-gray-500 mt-1">
              Edited images will be saved to your account history
            </p>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image to Edit
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

          {editImage && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800 font-medium mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Image uploaded successfully
              </p>
              <Image
                src={URL.createObjectURL(editImage)}
                alt="Upload preview"
                width={400}
                height={128}
                className="w-full max-h-32 object-contain rounded-md border border-gray-200"
              />
            </div>
          )}
        </div>

        {/* Edit Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Edit Instructions</label>
          <textarea
            value={editPrompt}
            onChange={(e) => setEditPrompt(e.target.value)}
            placeholder="e.g., Convert this image to black and white, add vintage film effect"
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
                <label className="block text-xs font-medium text-gray-600 mb-1">Number of Edits</label>
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

        {/* Edit Button */}
        <button
          onClick={handleEditImage}
          disabled={isEditing}
          className="w-full bg-gray-900 text-white py-3 px-6 rounded-md font-medium text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isEditing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Image
            </>
          )}
        </button>

        {/* Guest User Notice */}
        {!user && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-blue-700">
                Sign in with Google to save your edited images and access them later
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 