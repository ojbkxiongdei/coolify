'use client';

import React, { useState } from 'react'
import GhibliStyleConverter from '@/components/GhibliStyleConverter'
import ImageResults from '@/components/ImageResults'

export default function GhibliStyleConverterClient() {
  const [convertedImages, setConvertedImages] = useState<string[]>([])

  const handleImagesConverted = (images: string[]) => {
    setConvertedImages(images)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <GhibliStyleConverter onImagesConverted={handleImagesConverted} />
      <ImageResults
        images={convertedImages}
        title="Studio Ghibli Style Results"
      />
    </div>
  )
} 