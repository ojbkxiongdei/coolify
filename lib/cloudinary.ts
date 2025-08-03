import { v2 as cloudinary } from 'cloudinary'

// Cloudinary配置
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export { cloudinary }

// 上传base64图片到Cloudinary
export async function uploadBase64Image(
  base64Data: string, 
  folder: string = 'dreamfinity/generated-images',
  taskId?: string
): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(base64Data, {
      folder,
      public_id: taskId ? `${taskId}_${Date.now()}` : undefined,
      resource_type: 'image',
      // 不压缩，保持原始质量
      quality: 100,
      // 不转换格式，保持原始格式
    })
    
    return result.secure_url
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error('Failed to upload image to Cloudinary')
  }
}

// 批量上传图片
export async function uploadMultipleImages(
  images: string[], 
  taskId: string,
  folder: string = 'dreamfinity/generated-images'
): Promise<string[]> {
  try {
    const uploadPromises = images.map((imageData, index) => 
      uploadBase64Image(imageData, folder, `${taskId}_img_${index}`)
    )
    
    const urls = await Promise.all(uploadPromises)
    return urls
  } catch (error) {
    console.error('Batch upload error:', error)
    throw new Error('Failed to upload images to Cloudinary')
  }
}

// 删除图片
export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result.result === 'ok'
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    return false
  }
}