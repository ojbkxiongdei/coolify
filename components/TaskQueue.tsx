import React from 'react'

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
  result_urls?: string[]
  created_at: string
  size?: string
}

interface TaskQueueProps {
  tasks: Task[]
  onTaskCancel: (taskId: string) => void
  onTaskView: (taskId: string) => void
  imageLoadingTasks?: Set<string>
  isInitialLoading?: boolean
  isLoadingImages?: boolean
  containerHeight?: number // 添加从父组件接收高度的属性
}

export default function TaskQueue({ 
  tasks, 
  onTaskCancel, 
  onTaskView, 
  imageLoadingTasks,
  isInitialLoading = false,
  isLoadingImages = false,
  containerHeight
}: TaskQueueProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return '🟠'
      case 'processing':
        return '🟡'
      case 'completed':
        return '🟢'
      case 'failed':
        return '🔴'
      case 'cancelled':
        return '⚫'
      default:
        return '❓'
    }
  }

  const getStatusText = (task: Task) => {
    // 检查是否正在加载图片
    if (task.status === 'completed' && imageLoadingTasks?.has(task.task_id)) {
      return 'Loading images...'
    }
    
    switch (task.status) {
      case 'pending':
        return `Queued #${task.queue_position || 1}`
      case 'processing':
        return `Generating ${task.progress}%`
      case 'completed':
        return 'Completed'
      case 'failed':
        return 'Failed'
      case 'cancelled':
        return 'Cancelled'
      default:
        return task.status
    }
  }

  const getTimeText = (task: Task) => {
    if (task.status === 'completed') return ''
    if (task.status === 'failed' || task.status === 'cancelled') return ''
    
    if (task.estimated_time > 0) {
      const minutes = Math.floor(task.estimated_time / 60)
      const seconds = task.estimated_time % 60
      if (minutes > 0) {
        return `${minutes}m ${seconds}s remaining`
      } else {
        return `${seconds}s remaining`
      }
    }
    return ''
  }

  const formatPrompt = (prompt: string, maxLength: number = 30) => {
    if (prompt.length <= maxLength) return prompt
    return prompt.substring(0, maxLength) + '...'
  }

  // 设置容器样式，优先使用传入的高度，否则使用默认高度
  const containerStyle = containerHeight 
    ? `bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col`
    : `bg-white rounded-lg shadow-sm border border-gray-200 h-[500px] flex flex-col`

  if (isInitialLoading) {
    return (
      <div className={containerStyle} style={containerHeight ? { height: containerHeight } : undefined}>
        <div className="px-6 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            📋 Task Queue
          </h3>
        </div>
        <div className="flex items-center justify-center flex-1 py-6 px-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Loading your tasks...</p>
          </div>
        </div>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className={containerStyle} style={containerHeight ? { height: containerHeight } : undefined}>
        <div className="px-6 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            📋 Task Queue
          </h3>
        </div>
        <div className="text-center text-gray-500 flex-1 flex flex-col items-center justify-center py-6 px-6">
          <svg className="w-12 h-12 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p>No tasks</p>
        </div>
      </div>
    )
  }

  const hasActiveTasks = tasks.some(task => 
    task.status === 'pending' || task.status === 'processing'
  )

  return (
    <div className={containerStyle} style={containerHeight ? { height: containerHeight } : undefined}>
      {/* 头部区域 */}
      <div className="px-6 pt-6 pb-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          📋 Task Queue ({tasks.length})
        </h3>
        
        {/* 显示处理中任务的提示 - 只在需要时显示，不占用多余空间 */}
        {hasActiveTasks && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-blue-700">
                Please keep your browser open while tasks are processing
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* 任务列表区域 - 使用flex-1自动填充剩余空间 */}
      <div 
        className="flex-1 overflow-y-auto px-6 pb-0"
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE and Edge */
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none; /* Chrome, Safari and Opera */
          }
        `}</style>
        <div className="space-y-3 pb-6"> {/* 只在列表底部添加padding */}
          {tasks.map((task) => (
            <div 
              key={task.task_id} 
              className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{getStatusIcon(task.status)}</span>
                    <span className="text-xs font-medium text-gray-900 flex items-center gap-2">
                      {getStatusText(task)}
                      {/* 加载图片时显示spinner */}
                      {task.status === 'completed' && imageLoadingTasks?.has(task.task_id) && (
                        <div className="w-3 h-3 border border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </span>
                    {getTimeText(task) && (
                      <span className="text-xs text-gray-500">
                        | {getTimeText(task)}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-1">
                    {formatPrompt(task.prompt)}
                  </p>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{task.settings?.quality || 'medium'} quality</span>
                    <span>{task.credits_required} credits</span>
                    {(task.size || task.settings?.size) && (
                      <span>📐 {task.size || task.settings?.size}</span>
                    )}
                  </div>

                  {/* 进度条 */}
                  {task.status === 'processing' && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* 错误信息 */}
                  {task.error_message && (
                    <div className="mt-1 text-xs text-red-600 bg-red-50 p-2 rounded">
                      {task.error_message}
                    </div>
                  )}
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center gap-2 ml-4">
                  {task.status === 'pending' && (
                    <button
                      onClick={() => onTaskCancel(task.task_id)}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  {task.status === 'completed' && (
                    <button
                      onClick={() => onTaskView(task.task_id)}
                      disabled={imageLoadingTasks?.has(task.task_id)}
                      className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {imageLoadingTasks?.has(task.task_id) ? 'Processing...' : 'View Results'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}