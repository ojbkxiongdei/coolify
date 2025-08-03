// 任务完成处理Hook
import { useEffect, useRef } from 'react'
import ImageCacheManager from '@/lib/utils/imageCacheManager'

interface Task {
  task_id: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
  progress: number
  queue_position?: number
  estimated_time: number
  prompt: string
  settings: any
  credits_required: number
  error_message?: string
  images_generated?: number
  created_at: string
}

export function useTaskImageHandler(tasks: Task[]) {
  const processedTasks = useRef<Set<string>>(new Set())

  useEffect(() => {
    tasks.forEach(async (task) => {
      // 只处理刚完成且未处理过的任务
      if (
        task.status === 'completed' && 
        task.images_generated && 
        task.images_generated > 0 &&
        !processedTasks.current.has(task.task_id)
      ) {
        try {
          // 标记为已处理，避免重复处理
          processedTasks.current.add(task.task_id)
          
          // 重新生成图片（因为我们需要base64数据）
          // 这里需要调用原始的图片生成逻辑
          const images = await regenerateTaskImages(task)
          
          if (images.length > 0) {
            // 保存到浏览器缓存
            ImageCacheManager.saveImages(
              task.task_id,
              task.prompt,
              images,
              task.settings
            )
            
            console.log(`Cached ${images.length} images for task ${task.task_id}`)
          }
        } catch (error) {
          console.error(`Failed to cache images for task ${task.task_id}:`, error)
        }
      }
    })
  }, [tasks])
}

// 重新生成任务的图片（用于缓存）
async function regenerateTaskImages(task: Task): Promise<string[]> {
  try {
    const AZURE_ENDPOINT = process.env.NEXT_PUBLIC_AZURE_ENDPOINT
    const AZURE_API_KEY = process.env.NEXT_PUBLIC_AZURE_API_KEY

    // 注意：这里暴露了API密钥到前端，这不是最佳实践
    // 更好的做法是创建一个专门的API端点来处理这个
    if (!AZURE_ENDPOINT || !AZURE_API_KEY) {
      throw new Error('Azure configuration not available on client side')
    }

    const response = await fetch(
      `${AZURE_ENDPOINT}/openai/deployments/gpt-image-1/images/generations?api-version=2025-04-01-preview`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AZURE_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: task.prompt,
          size: task.settings.size,
          quality: task.settings.quality,
          output_format: task.settings.output_format,
          n: task.settings.n,
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Azure API error: ${response.status}`)
    }

    const data = await response.json()
    
    return data.data.map((item: any) => {
      if (!item.b64_json) {
        throw new Error('Missing image data')
      }
      return `data:image/${task.settings.output_format};base64,${item.b64_json}`
    })
  } catch (error) {
    console.error('Failed to regenerate images:', error)
    return []
  }
}