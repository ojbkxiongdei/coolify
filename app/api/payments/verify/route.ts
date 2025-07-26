import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil'
})

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }
    
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // 从Stripe获取支付会话信息
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
    }
    
    // 验证会话是否属于当前用户
    if (session.client_reference_id !== user.id) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 400 })
    }
    
    const { metadata } = session
    
    // 处理订阅支付
    if (session.mode === 'subscription' && metadata?.plan_id) {
      await handleSubscriptionPayment(user.id, metadata.plan_id, session, supabase)
    }
    
    // 处理credit包购买
    if (session.mode === 'payment' && metadata?.package_id && metadata?.type === 'credit_purchase') {
      await handleCreditPurchase(user.id, metadata.package_id, session, supabase)
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Payment verified and processed successfully' 
    })
    
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handleSubscriptionPayment(userId: string, planId: string, session: Stripe.Checkout.Session, supabase: any) {
  // 获取订阅计划
  const { data: plan } = await supabase
    .from('subscription_plans')
    .select('*')
    .eq('id', planId)
    .single()
  
  if (!plan) return
  
  // 检查是否已经处理过这个支付
  const { data: existingSubscription } = await supabase
    .from('user_subscriptions')
    .select('*')
    .eq('stripe_subscription_id', session.subscription)
    .single()
  
  if (existingSubscription) {
    return // 已经处理过，避免重复
  }
  
  // 创建或更新用户订阅
  await supabase
    .from('user_subscriptions')
    .upsert({
      user_id: userId,
      plan_id: planId,
      stripe_customer_id: session.customer,
      stripe_subscription_id: session.subscription,
      status: 'active',
      current_period_start: new Date(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30天后
    })
  
  // 添加订阅credits
  await addCreditsToUser(userId, plan.credits_per_month, 'subscription_reset', supabase, {
    subscription_id: session.subscription
  })
}

async function handleCreditPurchase(userId: string, packageId: string, session: Stripe.Checkout.Session, supabase: any) {
  // 获取credit包
  const { data: creditPackage } = await supabase
    .from('credit_packages')
    .select('*')
    .eq('id', packageId)
    .single()
  
  if (!creditPackage) return
  
  // 检查是否已经处理过这个支付
  const { data: existingTransaction } = await supabase
    .from('credit_transactions')
    .select('*')
    .eq('user_id', userId)
    .eq('description', `购买 ${creditPackage.credits} credits - Session: ${session.id}`)
    .single()
  
  if (existingTransaction) {
    return // 已经处理过，避免重复
  }
  
  // 添加购买的credits
  await addCreditsToUser(userId, creditPackage.credits, 'purchased', supabase, {
    package_id: packageId,
    session_id: session.id
  })
}

async function addCreditsToUser(userId: string, amount: number, type: string, supabase: any, metadata: any = {}) {
  // 获取用户当前credits
  const { data: userCredits } = await supabase
    .from('user_credits')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (userCredits) {
    // 更新用户credits
    const newTotalCredits = userCredits.total_credits + amount
    const newPurchasedCredits = type === 'purchased' ? userCredits.purchased_credits + amount : userCredits.purchased_credits
    const newSubscriptionCredits = type === 'subscription_reset' ? amount : userCredits.subscription_credits
    
    await supabase
      .from('user_credits')
      .update({
        total_credits: newTotalCredits,
        purchased_credits: newPurchasedCredits,
        subscription_credits: newSubscriptionCredits,
        last_reset_at: type === 'subscription_reset' ? new Date() : userCredits.last_reset_at
      })
      .eq('user_id', userId)
    
    // 记录交易
    const description = type === 'purchased' 
      ? `购买 ${amount} credits - Session: ${metadata.session_id}`
      : `订阅获得 ${amount} credits`
    
    await supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        type: type,
        amount: amount,
        description: description,
        package_id: metadata.package_id || null,
        subscription_id: metadata.subscription_id || null
      })
  }
} 