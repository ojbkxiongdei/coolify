import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 更新任务的result_urls字段
export async function POST(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params
    const { imageUrls } = await request.json()

    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      return NextResponse.json(
        { error: 'Image URLs are required' },
        { status: 400 }
      )
    }

    // 验证用户身份
    const supabase = await createClient()
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 更新任务的result_urls字段
    const { data: task, error } = await supabase
      .from('generation_tasks')
      .update({ 
        result_urls: imageUrls,
        updated_at: new Date().toISOString()
      })
      .eq('task_id', taskId)
      .eq('user_id', currentUser.id)
      .select()
      .single()

    if (error) {
      console.error('Database update error:', error)
      return NextResponse.json(
        { error: 'Failed to update task' },
        { status: 500 }
      )
    }

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      task_id: taskId,
      result_urls: imageUrls,
      updated_at: task.updated_at
    })

  } catch (error) {
    console.error('Update result URLs error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}