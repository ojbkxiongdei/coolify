'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState, useCallback } from 'react'
import type { User } from '@supabase/supabase-js'

interface UserCredits {
  total_credits: number
  used_credits: number
  available_credits: number
}

// 全局用户缓存和状态，避免重复请求和loading闪烁
let userCache: { user: User | null; timestamp: number } | null = null
let globalLoading = false
let globalUser: User | null = null
const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

// 全局credits缓存
let creditsCache: { credits: UserCredits | null; timestamp: number } | null = null
let globalCredits: UserCredits | null = null
const CREDITS_CACHE_DURATION = 30 * 1000 // 30秒缓存，credits变化比较频繁

// 全局状态更新回调
const stateCallbacks = new Set<(user: User | null, loading: boolean) => void>()
const creditsCallbacks = new Set<(credits: UserCredits | null) => void>()

// 获取当前最新的用户状态（考虑缓存）
const getCurrentUserState = () => {
  const now = Date.now()
  const hasValidCache = userCache && (now - userCache.timestamp) < CACHE_DURATION
  
  if (hasValidCache) {
    return { 
      user: userCache!.user, 
      loading: false 
    }
  }
  
  // 如果有全局用户但缓存过期，仍然返回用户但需要重新获取
  if (globalUser) {
    return { 
      user: globalUser, 
      loading: false 
    }
  }
  
  return { 
    user: null, 
    loading: true 
  }
}

export function useUser() {
  // 始终基于最新状态初始化，避免loading闪烁
  const currentState = getCurrentUserState()
  const [user, setUser] = useState<User | null>(currentState.user)
  const [loading, setLoading] = useState(currentState.loading)

  const updateUser = useCallback((newUser: User | null) => {
    globalUser = newUser
    globalLoading = false
    
    // 更新缓存
    userCache = {
      user: newUser,
      timestamp: Date.now()
    }
    
    // 如果用户变化，清除credits缓存
    if (globalUser?.id !== newUser?.id) {
      creditsCache = null
      globalCredits = null
      creditsCallbacks.forEach(callback => callback(null))
    }
    
    // 通知所有组件更新
    stateCallbacks.forEach(callback => callback(newUser, false))
  }, [])

  // 立即同步到全局状态（如果有更新的缓存）
  useEffect(() => {
    const latestState = getCurrentUserState()
    if (user !== latestState.user || loading !== latestState.loading) {
      setUser(latestState.user)
      setLoading(latestState.loading)
    }
  }, [])

  useEffect(() => {
    // 注册状态更新回调
    const callback = (newUser: User | null, newLoading: boolean) => {
      setUser(newUser)
      setLoading(newLoading)
    }
    stateCallbacks.add(callback)

    const supabase = createClient()
    let mounted = true

    // 检查是否需要重新获取用户数据
    const now = Date.now()
    const hasValidCache = userCache && (now - userCache.timestamp) < CACHE_DURATION
    
    if (hasValidCache) {
      // 缓存有效，无需任何操作
      return () => {
        stateCallbacks.delete(callback)
      }
    }

    // 只有在没有有效缓存时才获取用户数据
    // 注意：不设置loading状态，因为我们可能已经有globalUser
    const fetchUserIfNeeded = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (mounted) {
          updateUser(session?.user ?? null)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchUserIfNeeded()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          updateUser(session?.user ?? null)
        }
      }
    )

    return () => {
      mounted = false
      stateCallbacks.delete(callback)
      subscription.unsubscribe()
    }
  }, [])

  return { user, loading }
}

// 防止重复请求的状态
let isCreditsLoading = false

// 全局credits hook
export function useCredits() {
  const { user } = useUser()
  
  // 检查缓存
  const cachedCredits = creditsCache && (Date.now() - creditsCache.timestamp) < CREDITS_CACHE_DURATION ? creditsCache.credits : null
  const [credits, setCredits] = useState<UserCredits | null>(cachedCredits || globalCredits)

  const updateCredits = useCallback((newCredits: UserCredits | null) => {
    globalCredits = newCredits
    
    // 更新缓存
    if (newCredits) {
      creditsCache = {
        credits: newCredits,
        timestamp: Date.now()
      }
    }
    
    // 通知所有组件更新
    creditsCallbacks.forEach(callback => callback(newCredits))
  }, [])

  useEffect(() => {
    // 注册credits更新回调
    const callback = (newCredits: UserCredits | null) => {
      setCredits(newCredits)
    }
    creditsCallbacks.add(callback)

    return () => {
      creditsCallbacks.delete(callback)
    }
  }, [])

  useEffect(() => {
    if (!user) {
      // 用户未登录，清除credits
      updateCredits(null)
      return
    }

    // 如果有有效缓存，直接使用
    if (creditsCache && (Date.now() - creditsCache.timestamp) < CREDITS_CACHE_DURATION) {
      if (credits !== creditsCache.credits) {
        setCredits(creditsCache.credits)
      }
      return
    }

    // 防止重复请求：如果已经在加载中，不再发起新请求
    if (isCreditsLoading) {
      return
    }

    // 获取credits数据
    const fetchCredits = async () => {
      if (isCreditsLoading) return // 双重检查
      
      isCreditsLoading = true
      try {
        const response = await fetch('/api/credits/balance')
        if (response.ok) {
          const data = await response.json()
          updateCredits(data)
        }
      } catch (error) {
        console.error('Error fetching credits:', error)
      } finally {
        isCreditsLoading = false
      }
    }

    fetchCredits()
  }, [user]) // 只依赖user，移除credits避免循环

  return credits
}

// 提供一个获取缓存用户的方法
export function getCachedUser(): User | null {
  if (userCache && (Date.now() - userCache.timestamp) < CACHE_DURATION) {
    return userCache.user
  }
  return null
}

// 清除缓存的方法（用于登出时）
export function clearUserCache() {
  userCache = null
  globalUser = null
  globalLoading = false
  
  // 同时清除credits缓存
  creditsCache = null
  globalCredits = null
  creditsCallbacks.forEach(callback => callback(null))
}

// 刷新credits缓存的方法（用于消费credits后）
export function refreshCredits() {
  creditsCache = null
  globalCredits = null
} 

// 全局subscription缓存
let subscriptionCache: { subscription: UserSubscription | null; timestamp: number } | null = null
let globalSubscription: UserSubscription | null = null
const SUBSCRIPTION_CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

// 全局订阅状态更新回调
const subscriptionCallbacks = new Set<(subscription: UserSubscription | null) => void>()

// 防止重复请求的状态
let isSubscriptionLoading = false

// 用户订阅类型
interface UserSubscription {
  id: string
  user_id: string
  stripe_subscription_id: string
  plan_id: string
  status: 'active' | 'inactive' | 'cancelled' | 'trialing' | 'past_due'
  current_period_start: string
  current_period_end: string
  created_at: string
  updated_at: string
  subscription_plans: {
    name: string
    display_name: string
    description: string
    price_cents: number
    credits_per_month: number
  }
}

// 用户订阅hook
export function useSubscription() {
  const { user } = useUser()
  
  // 检查缓存
  const cachedSubscription = subscriptionCache && (Date.now() - subscriptionCache.timestamp) < SUBSCRIPTION_CACHE_DURATION ? subscriptionCache.subscription : null
  const [subscription, setSubscription] = useState<UserSubscription | null>(cachedSubscription || globalSubscription)
  const [loading, setLoading] = useState(false)



  const updateSubscription = useCallback((newSubscription: UserSubscription | null) => {
    globalSubscription = newSubscription
    
    // 更新缓存
    subscriptionCache = {
      subscription: newSubscription,
      timestamp: Date.now()
    }
    
    // 通知所有组件更新
    subscriptionCallbacks.forEach(callback => callback(newSubscription))
  }, [])

  useEffect(() => {
    // 注册subscription更新回调
    const callback = (newSubscription: UserSubscription | null) => {
      setSubscription(newSubscription)
    }
    subscriptionCallbacks.add(callback)

    return () => {
      subscriptionCallbacks.delete(callback)
    }
  }, [])

  useEffect(() => {
    if (!user) {
      // 用户未登录，清除subscription
      updateSubscription(null)
      return
    }

    // 如果有有效缓存，且缓存的订阅数据不为空，直接使用
    if (subscriptionCache && 
        (Date.now() - subscriptionCache.timestamp) < SUBSCRIPTION_CACHE_DURATION &&
        subscriptionCache.subscription !== null) {
      if (subscription !== subscriptionCache.subscription) {
        setSubscription(subscriptionCache.subscription)
      }
      return
    }

    // 防止重复请求：如果已经在加载中，不再发起新请求
    if (isSubscriptionLoading) {
      return
    }

    // 获取subscription数据
    const fetchSubscription = async () => {
      if (isSubscriptionLoading) {
        return // 双重检查
      }
      
      isSubscriptionLoading = true
      setLoading(true)
      try {
        const response = await fetch('/api/subscriptions/current')
        
        if (response.ok) {
          const data = await response.json()
          updateSubscription(data.subscription)
        } else {
          const errorData = await response.text()
          console.error('Subscription API error:', errorData)
        }
      } catch (error) {
        console.error('Error fetching subscription:', error)
      } finally {
        isSubscriptionLoading = false
        setLoading(false)
      }
    }

    fetchSubscription()
  }, [user]) // 只依赖user，移除subscription避免循环

  // 检查用户是否有活跃的订阅
  const hasActiveSubscription = subscription?.status === 'active'
  
  // 检查订阅是否在试用期
  const isTrialing = subscription?.status === 'trialing'
  
  // 检查是否是会员（活跃订阅或试用期）
  const isMember = hasActiveSubscription || isTrialing



  return { 
    subscription, 
    loading, 
    hasActiveSubscription, 
    isTrialing, 
    isMember,
    // 便捷方法
    refreshSubscription: () => {
      subscriptionCache = null
      globalSubscription = null
      isSubscriptionLoading = false
    }
  }
}

// 刷新subscription缓存的方法（用于订阅后）
export function refreshSubscription() {
  subscriptionCache = null
  globalSubscription = null
} 