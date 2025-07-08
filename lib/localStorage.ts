// 浏览器本地存储工具函数
// 用于存储和读取用户生成的图片

interface StoredImage {
  id: string
  imageData: string // Base64 图片数据
  timestamp: number
  prompt: string
  settings: Record<string, any>
  generationType: 'text-to-image' | 'image-edit'
}

class LocalImageStorage {
  private readonly STORAGE_KEY = 'dreamfinity_images'
  private readonly MAX_IMAGES = 100 // 最多存储100张图片

  // 存储图片到本地
  saveImage(imageData: {
    id: string
    imageData: string
    prompt: string
    settings: Record<string, any>
    generationType: 'text-to-image' | 'image-edit'
  }): void {
    try {
      const storedImage: StoredImage = {
        ...imageData,
        timestamp: Date.now()
      }

      // 获取现有图片
      const existingImages = this.getAllImages()
      
      // 添加新图片到开头
      existingImages.unshift(storedImage)
      
      // 保持最新的100张图片
      if (existingImages.length > this.MAX_IMAGES) {
        existingImages.splice(this.MAX_IMAGES)
      }

      // 保存到 localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingImages))
      
      console.log('图片已保存到本地存储:', imageData.id)
    } catch (error) {
      console.error('保存图片到本地存储失败:', error)
      
      // 如果存储满了，尝试清理旧数据
      if (error instanceof Error && error.message.includes('QuotaExceededError')) {
        this.cleanupOldImages()
        // 重试保存
        try {
          const storedImage: StoredImage = {
            ...imageData,
            timestamp: Date.now()
          }
          const existingImages = this.getAllImages()
          existingImages.unshift(storedImage)
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingImages))
        } catch (retryError) {
          console.error('重试保存图片失败:', retryError)
        }
      }
    }
  }

  // 根据ID获取图片
  getImageById(id: string): StoredImage | null {
    try {
      const images = this.getAllImages()
      return images.find(img => img.id === id) || null
    } catch (error) {
      console.error('获取图片失败:', error)
      return null
    }
  }

  // 获取所有图片
  getAllImages(): StoredImage[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return []
      
      const images = JSON.parse(stored)
      return Array.isArray(images) ? images : []
    } catch (error) {
      console.error('解析存储的图片数据失败:', error)
      return []
    }
  }

  // 删除图片
  deleteImage(id: string): void {
    try {
      const images = this.getAllImages()
      const filteredImages = images.filter(img => img.id !== id)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredImages))
      console.log('图片已从本地存储删除:', id)
    } catch (error) {
      console.error('删除图片失败:', error)
    }
  }

  // 清理旧图片（保留最新的50张）
  private cleanupOldImages(): void {
    try {
      const images = this.getAllImages()
      const cleanedImages = images.slice(0, 50) // 只保留最新的50张
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cleanedImages))
      console.log('已清理旧图片，保留最新的50张')
    } catch (error) {
      console.error('清理旧图片失败:', error)
    }
  }

  // 获取存储使用情况
  getStorageInfo(): {
    imageCount: number
    storageSize: string
    isNearLimit: boolean
  } {
    try {
      const images = this.getAllImages()
      const storageData = localStorage.getItem(this.STORAGE_KEY) || ''
      const sizeInBytes = new Blob([storageData]).size
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2)
      
      // localStorage 通常限制在 5-10MB
      const isNearLimit = sizeInBytes > 4 * 1024 * 1024 // 超过4MB认为接近限制
      
      return {
        imageCount: images.length,
        storageSize: `${sizeInMB}MB`,
        isNearLimit
      }
    } catch (error) {
      console.error('获取存储信息失败:', error)
      return {
        imageCount: 0,
        storageSize: '0MB',
        isNearLimit: false
      }
    }
  }

  // 清空所有图片
  clearAllImages(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY)
      console.log('已清空所有本地存储的图片')
    } catch (error) {
      console.error('清空图片失败:', error)
    }
  }
}

// 导出单例实例
export const localImageStorage = new LocalImageStorage()

// 导出类型
export type { StoredImage } 