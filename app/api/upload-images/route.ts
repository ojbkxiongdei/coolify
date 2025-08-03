import { NextRequest, NextResponse } from 'next/server'
import { uploadMultipleImages } from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  try {
    const { images, taskId } = await request.json()
    
    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: 'No images provided' },
        { status: 400 }
      )
    }
    
    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      )
    }
    
    // 上传图片到Cloudinary，保持原始质量
    const imageUrls = await uploadMultipleImages(images, taskId)
    
    return NextResponse.json({
      success: true,
      urls: imageUrls,
      count: imageUrls.length
    })
    
  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json(
      { error: 'Failed to upload images' },
      { status: 500 }
    )
  }
}