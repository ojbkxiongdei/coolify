'use client'

import { useState, useEffect } from 'react'
// Remove next/head usage; rely on metadata in layout/pricing layout
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Zap, CreditCard, Star, Crown } from 'lucide-react'
import { useSubscription } from '@/lib/hooks/useUser'
import { useUser } from '@/lib/hooks/useUser'
import { loadStripe } from '@stripe/stripe-js'
import { requireLogin } from '@/lib/utils/requireLogin'

// 预加载Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface SubscriptionPlan {
  id: string
  name: string
  display_name: string
  description: string
  price_cents: number
  credits_per_month: number
  is_active: boolean
}

interface CreditPackage {
  id: string
  name: string
  display_name: string
  description: string
  credits: number
  price_cents: number
  is_active: boolean
}

// 全局缓存
let plansCache: { plans: SubscriptionPlan[]; timestamp: number } | null = null
let packagesCache: { packages: CreditPackage[]; timestamp: number } | null = null
const PRICING_CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

// 防止重复请求
let isPricingDataLoading = false

export default function PricingPage() {
  const { subscription, isMember, loading: subscriptionLoading } = useSubscription()
  const { user, loading: userLoading } = useUser()
  
  // 初始化时检查缓存
  const getCachedData = () => {
    const now = Date.now()
    const validPlansCache = plansCache && (now - plansCache.timestamp) < PRICING_CACHE_DURATION
    const validPackagesCache = packagesCache && (now - packagesCache.timestamp) < PRICING_CACHE_DURATION
    
    return {
      plans: validPlansCache && plansCache ? plansCache.plans : [],
      packages: validPackagesCache && packagesCache ? packagesCache.packages : [],
      hasCache: validPlansCache && validPackagesCache
    }
  }

  const initialData = getCachedData()
  const [plans, setPlans] = useState<SubscriptionPlan[]>(initialData.plans)
  const [packages, setPackages] = useState<CreditPackage[]>(initialData.packages)
  const [loading, setLoading] = useState(!initialData.hasCache)
  const [subscribing, setSubscribing] = useState<string | null>(null)
  const [purchasing, setPurchasing] = useState<string | null>(null)


  useEffect(() => {
    async function fetchData() {
      // 如果有有效缓存，直接使用
      const cachedData = getCachedData()
      if (cachedData.hasCache) {
        setPlans(cachedData.plans)
        setPackages(cachedData.packages)
        setLoading(false)
        return
      }

      // 防止重复请求
      if (isPricingDataLoading) {
        return
      }

      isPricingDataLoading = true
      try {
        // 添加超时控制
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        )

        const [plansResponse, packagesResponse] = await Promise.race([
          Promise.all([
            fetch('/api/subscriptions/plans'),
            fetch('/api/credits/packages')
          ]),
          timeoutPromise
        ]) as [Response, Response]

        if (plansResponse.ok && packagesResponse.ok) {
          const [plansData, packagesData] = await Promise.all([
            plansResponse.json(),
            packagesResponse.json()
          ])
          
          const newPlans = plansData.plans || []
          const newPackages = packagesData.packages || []
          
          // 更新缓存
          plansCache = {
            plans: newPlans,
            timestamp: Date.now()
          }
          packagesCache = {
            packages: newPackages,
            timestamp: Date.now()
          }
          
          setPlans(newPlans)
          setPackages(newPackages)
        } else {
          console.error('API responses not ok:', {
            plansStatus: plansResponse.status,
            packagesStatus: packagesResponse.status
          })
        }
      } catch (error) {
        console.error('Error fetching pricing data:', error)
        // 即使出错也要停止loading状态
      } finally {
        setLoading(false)
        isPricingDataLoading = false
      }
    }

    fetchData()
  }, [])

  const handleSubscribe = async (planId: string) => {
    if (!(await requireLogin())) return
    setSubscribing(planId)
    try {
      const response = await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      })

      if (response.ok) {
        const { sessionId } = await response.json()
        // 使用预加载的Stripe实例
        const stripe = await stripePromise
        if (stripe) {
          await stripe.redirectToCheckout({ sessionId })
        }
      } else {
        const error = await response.json()
        alert(error.error || 'Subscription failed')
      }
    } catch (error) {
      console.error('Error subscribing:', error)
      alert('Subscription failed')
    } finally {
      setSubscribing(null)
    }
  }

  const handlePurchase = async (packageId: string) => {
    if (!(await requireLogin())) return
    setPurchasing(packageId)
    try {
      const response = await fetch('/api/credits/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ packageId }),
      })

      if (response.ok) {
        const { sessionId } = await response.json()
        // 使用预加载的Stripe实例
        const stripe = await stripePromise
        if (stripe) {
          await stripe.redirectToCheckout({ sessionId })
        }
      } else {
        const error = await response.json()
        alert(error.error || 'Purchase failed')
      }
    } catch (error) {
      console.error('Error purchasing:', error)
      alert('Purchase failed')
    } finally {
      setPurchasing(null)
    }
  }

  // 在订阅状态未确定时显示loading，避免内容闪烁
  if (loading || subscriptionLoading || userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Header */}
        <div className="text-center mb-16">
          {isMember ? (
            // 会员用户的标题
            <>
              <div className="flex items-center justify-center mb-4">
                <Crown className="w-8 h-8 text-gray-700 mr-2" />
                <h1 className="text-3xl font-bold text-gray-900">
                  Member Dashboard
                </h1>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                You&apos;re a premium member! Purchase additional credits to boost your generation capacity.
              </p>
              {subscription && subscription.subscription_plans && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-600">
                    Current Plan: <span className="font-semibold text-gray-900">{subscription.subscription_plans.display_name}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Monthly Credits: <span className="font-semibold text-gray-900">{subscription.subscription_plans.credits_per_month}</span>
                  </p>
                </div>
              )}
            </>
          ) : (
            // 非会员用户的标题
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your Plan
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Start your AI image generation journey with a monthly subscription plan that fits your needs.
              </p>
            </>
          )}
        </div>

        {/* 根据用户状态显示不同内容 */}
        {isMember ? (
          // 会员用户：只显示Credit包
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Purchase Additional Credits</h2>
              <p className="text-gray-600">Boost your generation capacity with extra credits</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="border-2 border-gray-200 hover:border-gray-300 transition-colors">
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="w-6 h-6 text-gray-700 mr-2" />
                      <CardTitle className="text-xl">{pkg.display_name}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-600">{pkg.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-gray-900">
                        ${(pkg.price_cents / 100).toFixed(2)}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        ${((pkg.price_cents / 100) / pkg.credits).toFixed(3)}/Credit
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-sm">{pkg.credits} Credits</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-sm">≈ {Math.floor(pkg.credits / 4)} medium quality images</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-sm">≈ {Math.floor(pkg.credits / 15)} high quality images</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-sm">Never expires</span>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-6 bg-gray-900 text-white hover:bg-gray-800"
                      onClick={() => handlePurchase(pkg.id)}
                      disabled={purchasing === pkg.id}
                    >
                      {purchasing === pkg.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Purchase Now
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // 非会员用户：只显示订阅计划
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Monthly Subscription Plans</h2>
              <p className="text-gray-600">Choose a plan to get started with AI image generation</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <Card key={plan.id} className={`relative ${index === 1 ? 'border-2 border-gray-900 shadow-lg scale-105' : 'border-2 border-gray-200'}`}>
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gray-900 text-white px-4 py-1">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.display_name}</CardTitle>
                    <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ${(plan.price_cents / 100).toFixed(2)}
                      </span>
                      <span className="text-gray-600">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-sm">{plan.credits_per_month} Credits/month</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-sm">≈ {Math.floor(plan.credits_per_month / 4)} medium quality images</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-sm">≈ {Math.floor(plan.credits_per_month / 15)} high quality images</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-sm">Credits auto-reset monthly</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-sm">Cancel anytime</span>
                      </div>
                    </div>
                    <Button
                      className={`w-full mt-6 ${index === 1 ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={subscribing === plan.id}
                    >
                      {subscribing === plan.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Start Subscription
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Credit Usage Guide */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Credits Consumption Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-gray-700 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900">Low Quality</h4>
                <p className="text-sm text-gray-600">1 Credit = 1 image</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-gray-700 font-bold">4</span>
                </div>
                <h4 className="font-semibold text-gray-900">Medium Quality</h4>
                <p className="text-sm text-gray-600">4 Credits = 1 image</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-gray-700 font-bold">15</span>
                </div>
                <h4 className="font-semibold text-gray-900">High Quality</h4>
                <p className="text-sm text-gray-600">15 Credits = 1 image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
