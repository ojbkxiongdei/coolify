import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 获取指定任务的生成图片
export async function GET(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params

    // 验证用户身份
    const supabase = await createClient()
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Please login to view images' }, { status: 401 })
    }

    // 获取任务信息
    const { data: task, error: taskError } = await supabase
      .from('generation_tasks')
      .select('*')
      .eq('task_id', taskId)
      .eq('user_id', currentUser.id)
      .single()

    if (taskError || !task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    // 如果任务未完成，返回空数组
    if (task.status !== 'completed') {
      return NextResponse.json({ 
        images: [],
        status: task.status,
        progress: task.progress 
      })
    }

    // 如果任务已完成但没有图片数据，需要重新生成（这种情况不应该发生）
    if (!task.images_generated || task.images_generated === 0) {
      return NextResponse.json({ error: 'No images found for this task' }, { status: 404 })
    }

    // 优先返回数据库中的Cloudinary URL
    if (task.result_urls && task.result_urls.length > 0) {
      return NextResponse.json({
        task_id: task.task_id,
        status: task.status,
        images: task.result_urls, // 返回Cloudinary URL
        images_generated: task.images_generated,
        prompt: task.prompt,
        settings: task.settings,
        completed_at: task.completed_at,
        source: 'cloudinary'
      })
    }

    // 检查内存缓存中是否有图片数据（向后兼容）
    const tempCache = (global as any).tempImageCache as Map<string, any>
    if (tempCache && tempCache.has(taskId)) {
      const cached = tempCache.get(taskId)
      
      // 检查是否过期
      if (Date.now() - cached.timestamp < cached.ttl) {
        // 返回图片数据供前端缓存
        tempCache.delete(taskId) // 取出后删除，避免内存泄漏
        
        return NextResponse.json({
          task_id: task.task_id,
          status: task.status,
          images: cached.images,
          images_generated: task.images_generated,
          prompt: task.prompt,
          settings: task.settings,
          completed_at: task.completed_at,
          source: 'memory_cache'
        })
      } else {
        // 过期的缓存，清理掉
        tempCache.delete(taskId)
      }
    }

    // 如果任务已完成但没有图片数据，说明缓存已过期或丢失
    return NextResponse.json({
      task_id: task.task_id,
      status: task.status,
      images_generated: task.images_generated,
      prompt: task.prompt,
      settings: task.settings,
      completed_at: task.completed_at,
      message: 'Images were generated but cache has expired. Please regenerate if needed.'
    })

  } catch (error) {
    console.error('Get task images error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}