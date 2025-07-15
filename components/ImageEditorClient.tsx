'use client';

import React, { useState } from 'react'
import ImageEditor from '@/components/ImageEditor'
import ImageResults from '@/components/ImageResults'

export default function ImageEditorClient() {
  const [editedImages, setEditedImages] = useState<string[]>([])

  const handleImagesEdited = (images: string[]) => {
    setEditedImages(images)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ImageEditor onImagesEdited={handleImagesEdited} />
      <ImageResults
        images={editedImages}
        title="Edited Results"
      />
    </div>
  )
} 