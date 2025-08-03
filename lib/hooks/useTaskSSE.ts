import { useEffect, useRef, useState, useCallback } from 'react'
import { useUser } from '@/lib/hooks/useUser'

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

interface SSEMessage {
  type: 'connected' | 'initial_tasks' | 'tasks_update' | 'task_completed' | 'heartbeat' | 'error'
  tasks?: Task[]
  task?: Task
  active_count?: number
  message?: string
}

// 全局单例SSE连接管理
const globalSSE = {
  eventSource: null as EventSource | null,
  isConnecting: false,
  connectionId: 0, // 连接ID，用于避免旧连接的回调执行
  connectedClients: 0, // 使用连接的客户端数量
  tasks: [] as Task[], // 共享的任务列表
  callbacks: new Set<Function>(), // 任务更新回调
  taskCompletedCallbacks: new Map<string, Function>(), // 任务完成回调，键为组件ID
  
  // 添加任务更新回调
  addCallback(callback: Function) {
    this.callbacks.add(callback);
    // 如果已有数据，立即触发一次
    if (this.tasks.length > 0) {
      callback(this.tasks);
    }
  },
  
  // 移除任务更新回调
  removeCallback(callback: Function) {
    this.callbacks.delete(callback);
  },
  
  // 设置任务完成回调
  setTaskCompletedCallback(componentId: string, callback: Function) {
    this.taskCompletedCallbacks.set(componentId, callback);
  },
  
  // 移除任务完成回调
  removeTaskCompletedCallback(componentId: string) {
    this.taskCompletedCallbacks.delete(componentId);
  },
  
  // 通知所有注册的回调
  notifyCallbacks() {
    this.callbacks.forEach(callback => callback(this.tasks));
  },
  
  // 通知特定任务完成
  notifyTaskCompleted(task: Task) {
    this.taskCompletedCallbacks.forEach(callback => {
      try {
        callback(task);
      } catch (error) {
        console.error('Error in task completed callback:', error);
      }
    });
  },
  
  // 连接到SSE
  connect(userId: string | undefined) {
    // 如果没有用户ID或已经在连接中，直接返回
    if (!userId || this.isConnecting) return;
    
    // 如果已有连接，不重复连接
    if (this.eventSource) {
      console.log('👌 SSE连接已存在，无需重新连接');
      return;
    }
    
    this.isConnecting = true;
    const currentConnectionId = ++this.connectionId;
    
    console.log('🔌 创建全局SSE连接...');
    const eventSource = new EventSource('/api/tasks/stream');
    
    eventSource.onopen = () => {
      if (currentConnectionId !== this.connectionId) {
        eventSource.close();
        this.isConnecting = false;
        return;
      }
      
      console.log('✅ SSE连接成功');
      this.eventSource = eventSource;
      this.isConnecting = false;
    };
    
    eventSource.onmessage = (event) => {
      if (currentConnectionId !== this.connectionId) {
        eventSource.close();
        return;
      }
      
      try {
        const data: SSEMessage = JSON.parse(event.data);
        
        switch (data.type) {
          case 'connected':
            console.log('📡 SSE连接确认');
            break;
            
          case 'initial_tasks':
            if (data.tasks) {
              console.log(`📋 收到初始任务: ${data.tasks.length}个任务，${data.active_count}个活跃任务`);
              this.tasks = data.tasks;
              this.notifyCallbacks();
            }
            break;
            
          case 'tasks_update':
            if (data.tasks) {
              console.log(`📋 任务更新: ${data.tasks.length}个任务，${data.active_count}个活跃任务`);
              this.tasks = data.tasks;
              this.notifyCallbacks();
            }
            break;
            
          case 'task_completed':
            if (data.task) {
              console.log(`✅ 任务完成: ${data.task.task_id}`);
              this.notifyTaskCompleted(data.task);
            }
            break;
            
          case 'heartbeat':
            // 心跳，保持连接
            break;
            
          case 'error':
            console.error('❌ SSE错误:', data.message);
            break;
        }
      } catch (err) {
        console.error('SSE消息解析失败:', err);
      }
    };
    
    eventSource.onerror = (err) => {
      console.error('SSE连接错误:', err);
      
      // 如果这是一个过期的连接，直接关闭
      if (currentConnectionId !== this.connectionId) {
        eventSource.close();
        return;
      }
      
      // 清理当前连接
      if (this.eventSource === eventSource) {
        this.eventSource = null;
      }
      
      eventSource.close();
      this.isConnecting = false;
      
      // 自动重连逻辑
      setTimeout(() => {
        if (!this.eventSource && this.connectedClients > 0) {
          console.log('🔄 SSE尝试重连...');
          this.connect(userId);
        }
      }, 5000);
    };
  },
  
  // 断开连接
  disconnect() {
    this.connectedClients--;
    
    // 如果没有客户端使用，延迟关闭连接
    if (this.connectedClients <= 0) {
      console.log('⏳ 所有客户端已断开，5秒后关闭SSE连接');
      setTimeout(() => {
        if (this.connectedClients <= 0 && this.eventSource) {
          console.log('🔌 关闭全局SSE连接');
          this.eventSource.close();
          this.eventSource = null;
          this.tasks = [];
        }
      }, 5000);
    }
  },
  
  // 客户端连接
  clientConnect(userId: string | undefined) {
    this.connectedClients++;
    this.connect(userId);
  }
};

// 生成唯一的组件ID
let componentIdCounter = 0;
function generateComponentId() {
  return `sse_client_${componentIdCounter++}_${Date.now()}`;
}

export function useTaskSSE() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>(globalSSE.tasks);
  const [isConnected, setIsConnected] = useState(!!globalSSE.eventSource);
  const [error, setError] = useState<string | null>(null);
  const componentIdRef = useRef<string>(generateComponentId());
  const hasConnectedRef = useRef<boolean>(false);
  
  // 添加本地任务更新回调
  useEffect(() => {
    const handleTasksUpdate = (updatedTasks: Task[]) => {
      setTasks(updatedTasks);
      setIsConnected(true);
      setError(null);
    };
    
    // 注册任务更新回调
    globalSSE.addCallback(handleTasksUpdate);
    
    return () => {
      globalSSE.removeCallback(handleTasksUpdate);
    };
  }, []);
  
  // 管理连接生命周期
  useEffect(() => {
    if (user && !hasConnectedRef.current) {
      hasConnectedRef.current = true;
      globalSSE.clientConnect(user.id);
    }
    
    return () => {
      if (hasConnectedRef.current) {
        globalSSE.disconnect();
        hasConnectedRef.current = false;
      }
    };
  }, [user]);
  
  // 设置任务完成回调
  const setOnTaskCompleted = useCallback((callback: (task: Task) => void) => {
    globalSSE.setTaskCompletedCallback(componentIdRef.current, callback);
  }, []);
  
  // 手动刷新任务（备用方法）
  const refreshTasks = useCallback(async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        if (data.tasks) {
          globalSSE.tasks = data.tasks;
          globalSSE.notifyCallbacks();
        }
        return data;
      }
    } catch (error) {
      console.error('Failed to refresh tasks:', error);
      setError('Failed to refresh tasks');
    }
  }, []);
  
  // 手动连接/断开方法
  const connect = useCallback(() => {
    if (user && !hasConnectedRef.current) {
      hasConnectedRef.current = true;
      globalSSE.clientConnect(user.id);
      setIsConnected(!!globalSSE.eventSource);
    }
  }, [user]);
  
  const disconnect = useCallback(() => {
    if (hasConnectedRef.current) {
      globalSSE.disconnect();
      hasConnectedRef.current = false;
      setIsConnected(false);
    }
  }, []);
  
  return {
    tasks,
    isConnected,
    error,
    setOnTaskCompleted,
    refreshTasks,
    connect,
    disconnect
  };
}