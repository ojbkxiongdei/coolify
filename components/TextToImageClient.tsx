'use client';

import React, { useState } from 'react'
import ImageGenerator from '@/components/ImageGenerator'
import ImageResults from '@/components/ImageResults'

export default function TextToImageClient() {
  const [generatedImages, setGeneratedImages] = useState<string[]>([])

  const handleImagesGenerated = (images: string[]) => {
    setGeneratedImages(images)
  }

  return (
    <div id="image-generator" className="max-w-4xl mx-auto">
      <ImageGenerator onImagesGenerated={handleImagesGenerated} />
      <ImageResults
        images={generatedImages}
        title="Generated Results"
      />
    </div>
  )
} 