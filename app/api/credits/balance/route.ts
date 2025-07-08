import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    let { data: credits, error } = await supabase
      .from('user_credits')
      .select('total_credits, used_credits, last_reset_at')
      .eq('user_id', user.id)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        const { data: newCredits, error: createError } = await supabase
          .from('user_credits')
          .upsert({
            user_id: user.id,
            total_credits: 0,
            used_credits: 0,
            last_reset_at: new Date().toISOString()
          }, { onConflict: 'user_id' })
          .select('total_credits, used_credits, last_reset_at')
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
    
    // 类型保护：确保 credits 不为 null
    if (!credits) {
      return NextResponse.json({ error: 'Failed to retrieve credits data' }, { status: 500 })
    }
    
    // 计算可用credits
    const availableCredits = credits.total_credits - credits.used_credits
    
    return NextResponse.json({ 
      total_credits: credits.total_credits,
      used_credits: credits.used_credits,
      available_credits: availableCredits,
      last_reset_at: credits.last_reset_at
    }, {
      headers: {
        'Cache-Control': 'private, max-age=30', // 30秒客户端缓存
      }
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 