import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// SSE for real-time task updates
export async function GET(request: NextRequest) {
  // 验证用户身份
  const supabase = await createClient()
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  
  if (!currentUser) {
    return NextResponse.json({ error: 'Please login' }, { status: 401 })
  }

  // 创建 SSE 流
  const stream = new ReadableStream({
    start(controller) {
      let isActive = true // 添加连接状态标记
      
      // 安全的enqueue函数
      const safeEnqueue = (data: string) => {
        if (isActive) {
          try {
            controller.enqueue(data)
          } catch (error) {
            console.log('SSE: Connection closed, stopping enqueue')
            isActive = false
          }
        }
      }
      
      // 发送初始连接确认
      safeEnqueue(`data: ${JSON.stringify({ type: 'connected' })}\n\n`)

      let intervalId: NodeJS.Timeout | null = null
      let lastTaskStates = new Map<string, string>()
      let isInitialized = false

      const checkTasks = async () => {
        // 如果连接已断开，停止检查
        if (!isActive) {
          return
        }
        
        try {
          // 获取用户任务
          const { data: tasks, error } = await supabase
            .from('generation_tasks')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false })
            .limit(20)

          if (error) {
            console.error('SSE: Database query error:', error)
            return
          }

          const activeTasks = tasks?.filter(task => 
            task.status === 'pending' || task.status === 'processing'
          ) || []

          // 首次初始化时，只发送任务列表，不触发图片处理
          if (!isInitialized) {
            isInitialized = true
            
            // 记录所有任务的当前状态，避免将历史完成任务视为"新完成"
            for (const task of tasks || []) {
              lastTaskStates.set(task.task_id, task.status)
            }

            // 发送初始任务列表
            safeEnqueue(`data: ${JSON.stringify({
              type: 'initial_tasks',
              tasks: tasks,
              active_count: activeTasks.length
            })}\n\n`)

            // 如果有活跃任务，开始监控
            if (activeTasks.length > 0 && isActive) {
              intervalId = setTimeout(checkTasks, 2000)
            } else if (isActive) {
              intervalId = setTimeout(checkTasks, 10000)
            }
            return
          }

          // 后续检查：只处理状态变化的任务
          let hasChanges = false
          const currentStates = new Map<string, string>()

          for (const task of tasks || []) {
            currentStates.set(task.task_id, task.status)
            
            const previousStatus = lastTaskStates.get(task.task_id)
            if (previousStatus !== task.status) {
              hasChanges = true
              
              // 如果任务刚完成，发送特殊事件
              if (task.status === 'completed' && previousStatus !== 'completed') {
                safeEnqueue(`data: ${JSON.stringify({
                  type: 'task_completed',
                  task: task
                })}\n\n`)
              }
            }
          }

          // 如果有变化，发送更新
          if (hasChanges) {
            safeEnqueue(`data: ${JSON.stringify({
              type: 'tasks_update',
              tasks: tasks,
              active_count: activeTasks.length
            })}\n\n`)
          }

          lastTaskStates = currentStates

          // 调整检查频率 - 只在连接活跃时设置
          if (isActive) {
            if (activeTasks.length === 0) {
              intervalId = setTimeout(checkTasks, 10000) // 10秒检查一次
            } else {
              intervalId = setTimeout(checkTasks, 2000) // 2秒检查一次
            }
          }

        } catch (error) {
          console.error('SSE: Error checking tasks:', error)
          safeEnqueue(`data: ${JSON.stringify({
            type: 'error',
            message: 'Failed to check tasks'
          })}\n\n`)
        }
      }

      // 立即开始第一次检查
      checkTasks()

      // 设置心跳，防止连接超时
      const heartbeatId = setInterval(() => {
        if (isActive) {
          safeEnqueue(`data: ${JSON.stringify({ type: 'heartbeat' })}\n\n`)
        } else {
          clearInterval(heartbeatId)
        }
      }, 30000) // 30秒心跳

      // 清理函数
      return () => {
        isActive = false // 标记连接为非活跃
        if (intervalId) clearTimeout(intervalId)
        if (heartbeatId) clearInterval(heartbeatId)
        console.log('SSE: Cleanup completed')
      }
    },

    cancel() {
      console.log('SSE: Client disconnected')
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control'
    }
  })
}