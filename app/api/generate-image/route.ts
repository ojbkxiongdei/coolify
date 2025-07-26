import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const AZURE_ENDPOINT = process.env.AZURE_ENDPOINT 
const AZURE_API_KEY = process.env.AZURE_API_KEY

// Credits消耗规则
const CREDIT_COSTS = {
  'low': 1,
  'medium': 4,
  'high': 15
}

export async function POST(request: NextRequest) {
  try {
    const { 
      prompt, 
      size = '1024x1024', 
      quality = 'high',
      n = 1,
      output_format = 'png',
      user
    } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Please enter an image description' }, { status: 400 })
    }

    // 验证用户身份和credits
    const supabase = await createClient()
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Please login to generate images' }, { status: 401 })
    }

    // 检查用户是否有足够的credits
    const creditsNeeded = CREDIT_COSTS[quality as keyof typeof CREDIT_COSTS] * n
    
    const { data: userCredits, error: creditsError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', currentUser.id)
      .single()
    
    if (creditsError || !userCredits) {
      return NextResponse.json({ error: 'Failed to fetch user credits' }, { status: 500 })
    }
    
    const availableCredits = userCredits.total_credits - userCredits.used_credits
    if (availableCredits < creditsNeeded) {
      return NextResponse.json({ 
        error: 'Insufficient credits',
        required: creditsNeeded,
        available: availableCredits,
        message: `您需要 ${creditsNeeded} Credits 来生成 ${n} 张 ${quality} 质量的图片，但您只有 ${availableCredits} Credits 可用。`
      }, { status: 400 })
    }

    // Validate parameters
    const validSizes = ['1024x1024', '1024x1536', '1536x1024']
    const validQualities = ['low', 'medium', 'high']
    const validFormats = ['png', 'jpeg']

    if (!validSizes.includes(size)) {
      return NextResponse.json({ error: 'Invalid size. Must be 1024x1024, 1024x1536, or 1536x1024' }, { status: 400 })
    }

    if (!validQualities.includes(quality)) {
      return NextResponse.json({ error: 'Invalid quality. Must be low, medium, or high' }, { status: 400 })
    }

    if (!validFormats.includes(output_format)) {
      return NextResponse.json({ error: 'Invalid format. Must be png or jpeg' }, { status: 400 })
    }

    if (n < 1 || n > 10) {
      return NextResponse.json({ error: 'Number of images must be between 1 and 10' }, { status: 400 })
    }

    const response = await fetch(
      `${AZURE_ENDPOINT}/openai/deployments/gpt-image-1/images/generations?api-version=2025-04-01-preview`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AZURE_API_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          size,
          quality,
          output_format,
          n,
          ...(user && { user }),
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Azure API error:', errorData)
      return NextResponse.json(
        { error: 'Image generation failed, please try again later' },
        { status: 500 }
      )
    }

    const data = await response.json()
    
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      return NextResponse.json(
        { error: 'Invalid image data format received' },
        { status: 500 }
      )
    }

    // Process multiple images
    const images = data.data.map((item: any) => {
      if (!item.b64_json) {
        throw new Error('Missing image data')
      }
      return `data:image/${output_format};base64,${item.b64_json}`
    })

    // 生成成功后消耗credits
    const generationId = `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const { error: updateError } = await supabase
      .from('user_credits')
      .update({
        used_credits: userCredits.used_credits + creditsNeeded
      })
      .eq('user_id', currentUser.id)
    
    if (updateError) {
      console.error('Failed to consume credits:', updateError)
      // 不阻止响应，但记录错误
    }
    
    // 记录交易
    const { error: transactionError } = await supabase
      .from('credit_transactions')
      .insert({
        user_id: currentUser.id,
        type: 'spent',
        amount: -creditsNeeded,
        description: `生成${n}张${quality}质量图片: ${prompt.substring(0, 50)}...`,
        generation_id: generationId
      })
    
    if (transactionError) {
      console.error('Failed to record transaction:', transactionError)
    }

    return NextResponse.json({
      success: true,
      images,
      count: images.length,
      // Keep backward compatibility
      image: data.data[0].b64_json,
      imageUrl: images[0],
      creditsConsumed: creditsNeeded,
      remainingCredits: availableCredits - creditsNeeded,
      generationId
    })
  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 