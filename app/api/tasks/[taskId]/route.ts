import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 获取单个任务状态
export async function GET(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const taskId = params.taskId

    if (!taskId) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 })
    }

    // 验证用户身份
    const supabase = await createClient()
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Please login to view tasks' }, { status: 401 })
    }

    // 获取任务详情
    const { data: task, error: taskError } = await supabase
      .from('generation_tasks')
      .select('*')
      .eq('task_id', taskId)
      .eq('user_id', currentUser.id) // 确保用户只能查看自己的任务
      .single()

    if (taskError || !task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    // 获取预扣费信息
    const { data: chargeInfo } = await supabase
      .from('pending_charges')
      .select('*')
      .eq('task_id', taskId)
      .single()

    // 动态计算队列位置
    let queuePosition = null
    if (task.status === 'pending') {
      const { data: beforeTasks } = await supabase
        .from('generation_tasks')
        .select('created_at')
        .eq('status', 'pending')
        .lt('created_at', task.created_at)
      
      queuePosition = (beforeTasks?.length || 0) + 1
    }

    // 计算预估完成时间
    let estimatedTime = 0
    if (task.status === 'pending' && queuePosition) {
      // 基于队列位置估算时间（每个任务预估30秒）
      estimatedTime = queuePosition * 30
    } else if (task.status === 'processing') {
      // 处理中的任务预估剩余时间基于进度
      const remainingProgress = 100 - (task.progress || 0)
      estimatedTime = Math.max(10, remainingProgress * 0.5) // 剩余进度 * 0.5秒
    }

    return NextResponse.json({
      task_id: task.task_id,
      status: task.status,
      progress: task.progress || 0,
      queue_position: queuePosition,
      estimated_time: estimatedTime,
      prompt: task.prompt,
      settings: task.settings,
      generation_type: task.generation_type,
      credits_required: task.credits_required,
      credits_charged: task.credits_charged,
      error_message: task.error_message,
      result_urls: task.result_urls,
      charge_status: chargeInfo?.status,
      created_at: task.created_at,
      started_at: task.started_at,
      completed_at: task.completed_at
    })

  } catch (error) {
    console.error('Get task status error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// 取消任务
export async function DELETE(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const taskId = params.taskId

    if (!taskId) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 })
    }

    // 验证用户身份
    const supabase = await createClient()
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Please login to cancel tasks' }, { status: 401 })
    }

    // 获取任务当前状态
    const { data: task, error: taskError } = await supabase
      .from('generation_tasks')
      .select('status')
      .eq('task_id', taskId)
      .eq('user_id', currentUser.id)
      .single()

    if (taskError || !task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    // 只有pending状态的任务才能被取消
    if (task.status !== 'pending') {
      return NextResponse.json({ 
        error: 'Can only cancel pending tasks',
        current_status: task.status 
      }, { status: 400 })
    }

    // 更新任务状态为取消
    const { error: updateError } = await supabase
      .from('generation_tasks')
      .update({ 
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('task_id', taskId)
      .eq('user_id', currentUser.id)

    if (updateError) {
      console.error('Cancel task error:', updateError)
      return NextResponse.json({ error: 'Failed to cancel task' }, { status: 500 })
    }

    // 退还积分
    await supabase.rpc('refund_charge', {
      p_task_id: taskId,
      p_reason: 'Task cancelled by user'
    })

    return NextResponse.json({
      success: true,
      message: 'Task cancelled and credits refunded'
    })

  } catch (error) {
    console.error('Cancel task error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}