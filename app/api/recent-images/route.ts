import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 获取用户最近的图片
export async function GET(request: NextRequest) {
  try {
    // 验证用户身份
    const supabase = await createClient()
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Please login' }, { status: 401 })
    }

    // 获取最近完成的任务，包含图片URL
    const { data: tasks, error } = await supabase
      .from('generation_tasks')
      .select('task_id, result_urls, completed_at')
      .eq('user_id', currentUser.id)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(10) // 最近10个任务

    if (error) {
      console.error('Database query error:', error)
      return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 })
    }

    // 收集所有图片URL
    const allImages: string[] = []
    
    // 首先尝试从数据库获取Cloudinary URL
    tasks?.forEach(task => {
      if (task.result_urls && Array.isArray(task.result_urls) && task.result_urls.length > 0) {
        allImages.push(...task.result_urls)
      }
    })

    // 如果没有足够的Cloudinary图片，从内存缓存获取base64图片
    if (allImages.length < 12) {
      const tempCache = (global as any).tempImageCache as Map<string, any>
      if (tempCache) {
        for (const task of tasks || []) {
          if (allImages.length >= 12) break
          
          // 如果这个任务没有Cloudinary URL，尝试从缓存获取
          if (!task.result_urls || task.result_urls.length === 0) {
            if (tempCache.has(task.task_id)) {
              const cached = tempCache.get(task.task_id)
              
              // 检查是否过期
              if (Date.now() - cached.timestamp < cached.ttl) {
                allImages.push(...cached.images.slice(0, 12 - allImages.length))
              }
            }
          }
        }
      }
    }

    // 返回最近的图片（最多12张）
    const recentImages = allImages.slice(0, 12)

    return NextResponse.json({
      images: recentImages,
      total: allImages.length
    })

  } catch (error) {
    console.error('Get recent images error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}