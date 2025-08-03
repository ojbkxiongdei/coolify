'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useUser, refreshCredits } from '@/lib/hooks/useUser'
import { useTaskSSE } from '@/lib/hooks/useTaskSSE'
import { requireLogin } from '@/lib/utils/requireLogin'
import TaskQueue from './TaskQueue'
import ImageResults from './ImageResults'

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
  images_generated?: number
  created_at: string
}

interface UserCredits {
  total: number
  used: number
  frozen: number
  available: number
}

export default function AsyncImageGenerator() {
  const { user } = useUser()
  const { tasks, setOnTaskCompleted } = useTaskSSE()
  console.log('🔄 AsyncImageGenerator render - user:', !!user)
  const [prompt, setPrompt] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [size, setSize] = useState('1024x1024')
  const [quality, setQuality] = useState('medium')
  const [numberOfImages, setNumberOfImages] = useState(1)
  const [outputFormat, setOutputFormat] = useState('PNG')
  
  const [userCredits, setUserCredits] = useState<UserCredits | null>(null)
  const [recentImages, setRecentImages] = useState<string[]>([])
  const [isLoadingImages, setIsLoadingImages] = useState(false)
  const [imageLoadingTasks, setImageLoadingTasks] = useState<Set<string>>(new Set())
  // 追踪已处理图片的任务ID，避免重复处理
  const [processedTaskIds, setProcessedTaskIds] = useState<Set<string>>(new Set())
  
  // 添加一个状态来跟踪任务是否正在加载
  const [isLoadingTasks, setIsLoadingTasks] = useState(true)
  
  // 添加一个ref来获取左侧组件的高度
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const [leftPanelHeight, setLeftPanelHeight] = useState(0)
  
  // 添加初始化标记，避免重复请求
  const initializedRef = useRef({
    recentImages: false,
    userCredits: false
  })

  // 节流控制
  const recentImagesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const userCreditsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // 监听左侧面板高度变化
  useEffect(() => {
    const updateHeight = () => {
      if (leftPanelRef.current) {
        const height = leftPanelRef.current.clientHeight;
        setLeftPanelHeight(height);
      }
    };
    
    // 初始更新
    updateHeight();
    
    // 监听窗口大小变化
    window.addEventListener('resize', updateHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  // 监听任务状态，当任务加载完成时更新loading状态
  useEffect(() => {
    // 任务首次加载完成时设置isLoadingTasks为false
    if (tasks.length > 0 && isLoadingTasks) {
      setIsLoadingTasks(false);
    }
  }, [tasks, isLoadingTasks]);

  // 添加一个useEffect来处理用户未登录时的状态
  useEffect(() => {
    if (!user) {
      // 用户未登录时，确保loading状态为false
      setIsLoadingTasks(false);
    }
  }, [user]);

  const IMAGES_PER_PAGE = 6
  // Credit consumption rules
  const CREDIT_COSTS = {
    'low': 1,
    'medium': 4,
    'high': 15
  }

  const creditsNeeded = CREDIT_COSTS[quality as keyof typeof CREDIT_COSTS] * numberOfImages

  // 设置SSE任务完成回调
  useEffect(() => {
    setOnTaskCompleted(async (task: Task) => {
      console.log(`🎯 SSE: Task ${task.task_id} completed, auto-processing...`)
      
      // 检查是否已处理过这个任务
      if (processedTaskIds.has(task.task_id)) {
        console.log(`⚠️ Task ${task.task_id} already processed, skipping`)
        return
      }

      try {
        // 标记为正在处理
        setProcessedTaskIds(prev => {
          const newSet = new Set(Array.from(prev))
          newSet.add(task.task_id)
          return newSet
        })

        setImageLoadingTasks(prev => {
          const newSet = new Set(Array.from(prev))
          newSet.add(task.task_id)
          return newSet
        })

        console.log(`📷 Auto-processing images for task: ${task.task_id}`)

        const imageResponse = await fetch(`/api/tasks/${task.task_id}/images`)
        if (imageResponse.ok) {
          const imageData = await imageResponse.json()
          
          if (imageData.images && imageData.images.length > 0) {
            console.log('📸 Auto-received image data:', {
              taskId: task.task_id,
              source: imageData.source,
              imagesCount: imageData.images.length
            })
            
            // 如果返回的是base64数据，启动后台上传（不等待完成）
            if (imageData.source === 'memory_cache') {
              // 立即更新本地状态显示base64图片，避免fetchRecentImages时缓存已被删除
              setRecentImages(prevImages => {
                const newImages = [...imageData.images, ...prevImages.filter(img => !imageData.images.includes(img))]
                return newImages.slice(0, 12) // 保持最多12张图片
              })
              console.log('🔄 Immediately updated local state to show base64 images')
              
              // 在后台异步上传，不阻塞UI
              uploadToCloudinaryInBackground(task.task_id, imageData.images)
            } else {
              // 添加节流控制，避免频繁请求
              throttledFetchRecentImages()
            }
          }
        }
      } catch (error) {
        console.error(`Auto-process error for task ${task.task_id}:`, error)
      } finally {
        setImageLoadingTasks(prev => {
          const newSet = new Set(Array.from(prev))
          newSet.delete(task.task_id)
          return newSet
        })
      }
    })
  }, [processedTaskIds]) // eslint-disable-line react-hooks/exhaustive-deps

  // 后台异步上传到Cloudinary
  const uploadToCloudinaryInBackground = async (taskId: string, images: string[]) => {
    try {
      console.log(`🌩️ Starting background upload for task: ${taskId}`)
      
      const uploadResponse = await fetch('/api/upload-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images: images,
          taskId: taskId
        }),
      })

      if (uploadResponse.ok) {
        const uploadData = await uploadResponse.json()
        if (uploadData.success && uploadData.urls) {
          // 保存URL到数据库
          await fetch(`/api/tasks/${taskId}/result-urls`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imageUrls: uploadData.urls
            }),
          })
          
          console.log('✅ Background upload completed for task:', taskId)
          // 上传完成后使用节流版本刷新
          throttledFetchRecentImages()
        }
      }
    } catch (uploadError) {
      console.error('Background upload failed:', uploadError)
    }
  }

  // 节流版的fetchRecentImages
  const throttledFetchRecentImages = () => {
    if (recentImagesTimeoutRef.current) {
      return; // 已经有一个待执行的请求
    }
    
    recentImagesTimeoutRef.current = setTimeout(() => {
      fetchRecentImages();
      recentImagesTimeoutRef.current = null;
    }, 1000); // 1秒内不重复请求
  }
  
  // 节流版的fetchUserCredits
  const throttledFetchUserCredits = () => {
    if (userCreditsTimeoutRef.current) {
      return; // 已经有一个待执行的请求
    }
    
    userCreditsTimeoutRef.current = setTimeout(() => {
      fetchUserCredits();
      userCreditsTimeoutRef.current = null;
    }, 1000); // 1秒内不重复请求
  }

  // 获取最近的图片
  const fetchRecentImages = useCallback(async () => {
    if (!user) return // 未登录时不调用
    
    try {
      const response = await fetch('/api/recent-images')
      if (response.ok) {
        const data = await response.json()
        setRecentImages(data.images || [])
      }
    } catch (error) {
      console.error('Failed to fetch recent images:', error)
    }
  }, [user])

  // 获取用户积分信息
  const fetchUserCredits = useCallback(async () => {
    if (!user) return // 未登录时不调用
    
    setIsLoadingTasks(true); // 开始加载任务/积分时设置loading
    
    try {
      const response = await fetch('/api/tasks')
      if (response.ok) {
        const data = await response.json()
        setUserCredits(data.user_credits)
        
        // 如果没有从SSE获取到任务数据，这里也可以设置loading为false
        setTimeout(() => {
          setIsLoadingTasks(false); // 延迟稍微久一点，确保UI加载效果可见
        }, 300);
      }
    } catch (error) {
      console.error('Failed to fetch user credits:', error)
      setIsLoadingTasks(false); // 发生错误也要重置loading状态
    }
  }, [user])

  // 初始化数据加载 - 只在用户登录时执行一次
  useEffect(() => {
    if (user && !initializedRef.current.recentImages) {
      console.log('👤 User logged in, initializing recent images...')
      initializedRef.current.recentImages = true
      fetchRecentImages()
    } else if (!user) {
      console.log('👤 User logged out, clearing recent images...')
      initializedRef.current.recentImages = false
      setRecentImages([])
    }
  }, [user, fetchRecentImages])
  
  // 分开处理用户积分初始化，避免依赖问题
  useEffect(() => {
    if (user && !initializedRef.current.userCredits) {
      console.log('👤 User logged in, initializing credits...')
      initializedRef.current.userCredits = true
      setIsLoadingTasks(true); // 初始加载时设置loading状态
      fetchUserCredits()
    } else if (!user) {
      console.log('👤 User logged out, clearing credits...')
      initializedRef.current.userCredits = false
      setUserCredits(null)
      setProcessedTaskIds(new Set())
      setIsLoadingTasks(false); // 用户登出时重置loading状态
    }
  }, [user, fetchUserCredits])

  const handleViewTask = async (taskId: string) => {
    try {
      const task = tasks.find(t => t.task_id === taskId)
      if (task?.status === 'completed') {
        // 由于图片已经自动处理，这里只需要滚动到结果展示区域
        const resultsElement = document.getElementById('image-results')
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } catch (error) {
      console.error('View task error:', error)
      alert('Failed to view task results.')
    }
  }

  const handleSubmitTask = async () => {
    if (!(await requireLogin())) return
    if (!prompt.trim()) {
      alert('Please enter an image description')
      return
    }

    // Check credit balance
    if (userCredits && userCredits.available < creditsNeeded) {
      alert(`Insufficient credits! Need ${creditsNeeded} credits, but you only have ${userCredits.available} available.`)
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/tasks/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt, 
          size, 
          quality, 
          n: numberOfImages,
          output_format: outputFormat.toLowerCase(),
          generation_type: 'text-to-image'
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        // 清空输入框
        setPrompt('')
        
        // 刷新积分信息，使用节流版本
        setIsLoadingTasks(true); // 提交任务后设置loading状态
        throttledFetchUserCredits()
        refreshCredits()
        
        // 不显示弹窗提示，让用户在页面上看到任务状态
      } else {
        alert(data.error || 'Task submission failed')
      }
    } catch (error) {
      console.error('Submit task error:', error)
      alert('Network error, please try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancelTask = async (taskId: string) => {
    try {
      setIsLoadingTasks(true); // 取消任务时设置loading状态
      
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        // 使用节流版本刷新
        throttledFetchUserCredits()
        refreshCredits()
        alert('Task cancelled and credits refunded')
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to cancel task')
      }
    } catch (error) {
      console.error('Cancel task error:', error)
      alert('Network error, please try again')
    } finally {
      setIsLoadingTasks(false); // 操作完成后重置loading状态
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 生成器和任务队列并排布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
        {/* 左侧：生成器 */}
        <div ref={leftPanelRef} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-900 rounded-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">AI Image Generator</h2>
              {userCredits && (
                <p className="text-xs text-gray-500 mt-1">
                  Available credits: {userCredits.available} | Frozen: {userCredits.frozen}
                </p>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            {/* 输入区域 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe the image you want to generate
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A majestic red fox walking through a golden autumn forest, cinematic lighting, photorealistic"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 resize-none text-sm bg-white transition-all duration-200"
                rows={3}
              />
            </div>

            {/* 设置面板 */}
            <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                Settings
              </h3>
              
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Image Size</label>
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-xs"
                    >
                      <option value="1024x1024">1024×1024 (Square)</option>
                      <option value="1024x1536">1024×1536 (Portrait)</option>
                      <option value="1536x1024">1536×1024 (Landscape)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Quality</label>
                    <select
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-xs"
                    >
                      <option value="low">Low (1 credit)</option>
                      <option value="medium">Medium (4 credits)</option>
                      <option value="high">High (15 credits)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Number of Images</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={numberOfImages}
                      onChange={(e) => setNumberOfImages(parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Output Format</label>
                    <select
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-xs"
                    >
                      <option value="PNG">PNG (High Quality)</option>
                      <option value="JPEG">JPEG (Smaller File)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 提交按钮 */}
            <button
              onClick={handleSubmitTask}
              disabled={isSubmitting || !prompt.trim() || (userCredits ? userCredits.available < creditsNeeded : false)}
              className="w-full bg-gray-900 text-white py-3 px-6 rounded-md font-medium text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Submit Task ({creditsNeeded} credits)
                </>
              )}
            </button>

            {/* Insufficient credits warning */}
            {userCredits && userCredits.available < creditsNeeded && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-xs text-red-700">
                    Insufficient credits! Need {creditsNeeded} credits, but you only have {userCredits.available} available.
                  </p>
                </div>
              </div>
            )}

            {/* 未登录提示 */}
            {!user && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-blue-700">
                    Please login to use task queue features
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 右侧：任务队列 - 将左侧面板的高度传递给TaskQueue */}
        <TaskQueue 
          tasks={tasks}
          onTaskCancel={handleCancelTask}
          onTaskView={handleViewTask}
          imageLoadingTasks={imageLoadingTasks}
          isInitialLoading={isLoadingTasks}
          isLoadingImages={isLoadingImages}
          containerHeight={leftPanelHeight > 0 ? leftPanelHeight : undefined}
        />
      </div>

      {/* 底部：结果展示 */}
      <div id="image-results">
        <ImageResults
          images={recentImages}
          title="Recent Generated Images"
        />
      </div>
    </div>
  )
}