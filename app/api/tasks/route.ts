import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 获取用户的所有任务
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // 可选的状态筛选
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // 验证用户身份
    const supabase = await createClient()
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Please login to view tasks' }, { status: 401 })
    }

    // 构建查询
    let query = supabase
      .from('generation_tasks')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // 如果指定了状态，添加状态筛选
    if (status) {
      query = query.eq('status', status)
    }

    const { data: tasks, error: tasksError } = await query

    if (tasksError) {
      console.error('Get tasks error:', tasksError)
      return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
    }

    // 获取用户当前积分状态
    const { data: userCredits } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', currentUser.id)
      .single()

    const availableCredits = userCredits 
      ? userCredits.total_credits - userCredits.used_credits - userCredits.frozen_credits
      : 0

    // 统计各状态任务数量
    const { data: statusCounts } = await supabase
      .from('generation_tasks')
      .select('status')
      .eq('user_id', currentUser.id)

    const stats = {
      total: statusCounts?.length || 0,
      pending: statusCounts?.filter(t => t.status === 'pending').length || 0,
      processing: statusCounts?.filter(t => t.status === 'processing').length || 0,
      completed: statusCounts?.filter(t => t.status === 'completed').length || 0,
      failed: statusCounts?.filter(t => t.status === 'failed').length || 0,
      cancelled: statusCounts?.filter(t => t.status === 'cancelled').length || 0
    }

    return NextResponse.json({
      tasks: tasks || [],
      stats,
      user_credits: {
        total: userCredits?.total_credits || 0,
        used: userCredits?.used_credits || 0,
        frozen: userCredits?.frozen_credits || 0,
        available: availableCredits
      },
      pagination: {
        limit,
        offset,
        has_more: (tasks?.length || 0) === limit
      }
    })

  } catch (error) {
    console.error('Get tasks error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}