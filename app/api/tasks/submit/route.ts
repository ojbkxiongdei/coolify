import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Credits消耗规则
const CREDIT_COSTS = {
  'low': 1,
  'medium': 4,
  'high': 15
}

// 添加全局类型声明，确保tempImageCache可以被添加到global对象
declare global {
  var tempImageCache: Map<string, {
    images: string[],
    timestamp: number,
    ttl: number
  }> | undefined;
}

export async function POST(request: NextRequest) {
  try {
    const { 
      prompt, 
      size = '1024x1024', 
      quality = 'high',
      n = 1,
      output_format = 'png',
      generation_type = 'text-to-image',
      priority = 1
    } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Please enter an image description' }, { status: 400 })
    }

    // 验证用户身份
    const supabase = await createClient()
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Please login to submit tasks' }, { status: 401 })
    }

    // 计算所需积分
    const creditsNeeded = CREDIT_COSTS[quality as keyof typeof CREDIT_COSTS] * n
    
    // 生成任务ID
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // 验证参数
    const validSizes = ['1024x1024', '1024x1536', '1536x1024']
    const validQualities = ['low', 'medium', 'high']
    const validFormats = ['png', 'jpeg']
    const validTypes = ['text-to-image', 'image-edit', 'style-convert']

    if (!validSizes.includes(size)) {
      return NextResponse.json({ error: 'Invalid size. Must be 1024x1024, 1024x1536, or 1536x1024' }, { status: 400 })
    }

    if (!validQualities.includes(quality)) {
      return NextResponse.json({ error: 'Invalid quality. Must be low, medium, or high' }, { status: 400 })
    }

    if (!validFormats.includes(output_format)) {
      return NextResponse.json({ error: 'Invalid format. Must be png or jpeg' }, { status: 400 })
    }

    if (!validTypes.includes(generation_type)) {
      return NextResponse.json({ error: 'Invalid generation type' }, { status: 400 })
    }

    if (n < 1 || n > 10) {
      return NextResponse.json({ error: 'Number of images must be between 1 and 10' }, { status: 400 })
    }

    // 预扣费积分
    const { data: reserveResult, error: reserveError } = await supabase
      .rpc('reserve_credits', {
        p_user_id: currentUser.id,
        p_task_id: taskId,
        p_amount: creditsNeeded
      })

    if (reserveError) {
      console.error('Reserve credits error:', reserveError)
      return NextResponse.json({ error: 'Failed to reserve credits' }, { status: 500 })
    }

    if (!reserveResult) {
      // 获取当前积分余额用于错误提示
      const { data: userCredits } = await supabase
        .from('user_credits')
        .select('*')
        .eq('user_id', currentUser.id)
        .single()
      
      const availableCredits = userCredits 
        ? userCredits.total_credits - userCredits.used_credits - userCredits.frozen_credits
        : 0

      return NextResponse.json({ 
        error: 'Insufficient credits',
        required: creditsNeeded,
        available: availableCredits,
        message: `您需要 ${creditsNeeded} Credits 来生成 ${n} 张 ${quality} 质量的图片，但您只有 ${availableCredits} Credits 可用。`
      }, { status: 400 })
    }

    // 创建任务记录
    const settings = {
      size,
      quality,
      n,
      output_format
    }

    const { data: task, error: taskError } = await supabase
      .from('generation_tasks')
      .insert({
        task_id: taskId,
        user_id: currentUser.id,
        prompt,
        settings,
        generation_type,
        status: 'pending',
        priority,
        credits_required: creditsNeeded
      })
      .select()
      .single()

    if (taskError) {
      console.error('Task creation error:', taskError)
      
      // 创建任务失败，手动退还积分
      const { data: currentCredits } = await supabase
        .from('user_credits')
        .select('frozen_credits')
        .eq('user_id', currentUser.id)
        .single()
      
      if (currentCredits) {
        await supabase
          .from('user_credits')
          .update({ 
            frozen_credits: currentCredits.frozen_credits - creditsNeeded 
          })
          .eq('user_id', currentUser.id)
      }
      
      return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
    }

    // 任务创建成功后，创建预扣费记录
    const { error: chargeError } = await supabase
      .from('pending_charges')
      .insert({
        task_id: taskId,
        user_id: currentUser.id,
        amount: creditsNeeded,
        status: 'pending'
      })

    if (chargeError) {
      console.error('Failed to create pending charge:', chargeError)
      // 不阻止任务创建，只记录错误
    }

    // 获取队列位置（动态计算）
    const { data: queueData } = await supabase
      .from('generation_tasks')
      .select('created_at')
      .eq('status', 'pending')
      .lt('created_at', task.created_at)
    
    const queuePosition = (queueData?.length || 0) + 1

    // 启动后台处理（异步）
    // 这里可以使用队列系统，现在先用简单的异步处理
    processTaskAsync(taskId).catch(error => {
      console.error('Background task processing error:', error)
    })

    return NextResponse.json({
      success: true,
      task_id: taskId,
      queue_position: queuePosition,
      credits_reserved: creditsNeeded,
      estimated_time: Math.max(1, queuePosition * 30), // 预估30秒每个任务
      message: `Task submitted to queue, position #${queuePosition}`
    })

  } catch (error) {
    console.error('Submit task error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// 后台异步处理任务
async function processTaskAsync(taskId: string) {
  const supabase = await createClient()
  
  try {
    // 等待轮到当前任务（简单实现，实际应该用队列系统）
    await waitForTurn(taskId)
    
    // 更新任务状态为处理中
    await supabase
      .from('generation_tasks')
      .update({ 
        status: 'processing', 
        started_at: new Date().toISOString(),
        progress: 10
      })
      .eq('task_id', taskId)

    // 获取任务详情
    const { data: task } = await supabase
      .from('generation_tasks')
      .select('*')
      .eq('task_id', taskId)
      .single()

    if (!task) {
      throw new Error('Task not found')
    }

    // 更新进度
    await supabase
      .from('generation_tasks')
      .update({ progress: 30 })
      .eq('task_id', taskId)

    // 调用Azure OpenAI API
    const AZURE_ENDPOINT = process.env.AZURE_ENDPOINT 
    const AZURE_API_KEY = process.env.AZURE_API_KEY

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
      throw new Error(`Azure API error: ${response.status} ${response.statusText}`)
    }

    // 更新进度
    await supabase
      .from('generation_tasks')
      .update({ progress: 70 })
      .eq('task_id', taskId)

    const data = await response.json()
    
    // 处理图片数据，不存储到数据库，让前端缓存处理
    const images = data.data.map((item: any) => {
      if (!item.b64_json) {
        throw new Error('Missing image data')
      }
      return `data:image/${task.settings.output_format};base64,${item.b64_json}`
    })
    
    const imagesGenerated = images.length

    // 更新进度
    await supabase
      .from('generation_tasks')
      .update({ progress: 90 })
      .eq('task_id', taskId)

    // 完成任务，只记录生成数量，不存储图片数据
    await supabase
      .from('generation_tasks')
      .update({ 
        status: 'completed',
        progress: 100,
        images_generated: imagesGenerated,
        completed_at: new Date().toISOString()
      })
      .eq('task_id', taskId)
    
    // 将图片数据临时存储在内存中，供前端轮询时获取
    // 使用简单的内存缓存（实际项目中建议使用Redis）
    global.tempImageCache = global.tempImageCache || new Map()
    global.tempImageCache.set(taskId, {
      images,
      timestamp: Date.now(),
      ttl: 10 * 60 * 1000 // 10分钟过期
    })

    // 确认积分扣费
    await supabase.rpc('confirm_charge', { p_task_id: taskId })

    console.log(`Task ${taskId} completed successfully`)

  } catch (error) {
    console.error(`Task ${taskId} failed:`, error)
    
    // 任务失败，更新状态并退还积分
    await supabase
      .from('generation_tasks')
      .update({ 
        status: 'failed',
        error_message: error instanceof Error ? error.message : 'Unknown error'
      })
      .eq('task_id', taskId)

    // 退还积分
    await supabase.rpc('refund_charge', {
      p_task_id: taskId,
      p_reason: `Task failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }
}

// 等待轮到当前任务的简单实现
async function waitForTurn(taskId: string) {
  const supabase = await createClient()
  
  while (true) {
    const { data: task } = await supabase
      .from('generation_tasks')
      .select('queue_position, status')
      .eq('task_id', taskId)
      .single()

    if (!task || task.status === 'cancelled') {
      throw new Error('Task cancelled or not found')
    }

    // 如果是第一个或者前面没有待处理的任务，就可以开始了
    if (task.queue_position <= 1) {
      const { data: processingTasks } = await supabase
        .from('generation_tasks')
        .select('count')
        .eq('status', 'processing')

      // 如果没有正在处理的任务，或者处理数量少于并发限制，就可以开始
      if (!processingTasks || processingTasks.length < 2) { // 限制最多2个并发
        break
      }
    }

    // 等待5秒后再检查
    await new Promise(resolve => setTimeout(resolve, 5000))
  }
}