import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Credits消耗规则
const CREDIT_COSTS = {
  'low': 1,
  'medium': 4,
  'high': 15
}

export async function POST(request: Request) {
  try {
    // 检查用户认证
    const supabase = await createClient()
    
    // 修复安全警告：使用getUser()替代getSession()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { credits_to_consume } = await request.json()
    
    if (!credits_to_consume || credits_to_consume < 1) {
      return NextResponse.json({ error: 'Invalid credits amount' }, { status: 400 })
    }
    
    // 使用事务处理credits消费
    const { data, error } = await supabase.rpc('consume_user_credits', {
      user_id_param: user.id,
      credits_to_consume_param: credits_to_consume
    })
    
    if (error) {
      if (error.message === 'insufficient_credits') {
        return NextResponse.json({ 
          error: 'Insufficient credits',
          available_credits: 0 
        }, { status: 400 })
      }
      
      console.error('Error consuming credits:', error)
      return NextResponse.json({ error: 'Failed to consume credits' }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true,
      remaining_credits: data
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// 获取用户剩余credits（简化版，用于快速检查）
export async function GET() {
  try {
    const supabase = await createClient()
    
    // 修复安全警告：使用getUser()替代getSession()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // 只获取必要字段，优化查询性能
    let { data: credits, error } = await supabase
      .from('user_credits')
      .select('total_credits, used_credits')
      .eq('user_id', user.id)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        // 用户记录不存在，创建默认记录
        const { data: newCredits, error: createError } = await supabase
          .from('user_credits')
          .upsert({
            user_id: user.id,
            total_credits: 0,
            used_credits: 0,
            last_reset_at: new Date().toISOString()
          }, { onConflict: 'user_id' })
          .select('total_credits, used_credits')
          .single()
        
        if (createError) {
          console.error('Error creating user credits:', createError)
          return NextResponse.json({ error: 'Failed to create credits' }, { status: 500 })
        }
        
        credits = newCredits
      } else {
        console.error('Error fetching user credits:', error)
        return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 })
      }
    }
    
    if (!credits) {
      return NextResponse.json({ error: 'Failed to retrieve credits data' }, { status: 500 })
    }
    
    const availableCredits = credits.total_credits - credits.used_credits
    
    return NextResponse.json({ 
      available_credits: availableCredits 
    }, {
      headers: {
        'Cache-Control': 'private, max-age=10', // 10秒缓存
      }
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 