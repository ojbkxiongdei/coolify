'use client';

import React, { useState } from 'react'
import PixarStyleConverter from '@/components/PixarStyleConverter'
import ImageResults from '@/components/ImageResults'

export default function PixarStyleConverterClient() {
  const [convertedImages, setConvertedImages] = useState<string[]>([])

  const handleImagesConverted = (images: string[]) => {
    setConvertedImages(images)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PixarStyleConverter onImagesConverted={handleImagesConverted} />
      <ImageResults
        images={convertedImages}
        title="Pixar Style Results"
      />
    </div>
  )
} 