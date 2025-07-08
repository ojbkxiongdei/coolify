import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_PROXY_URL = process.env.OPENAI_PROXY_URL

// Credits消耗规则 - Character Headcanon Generator
const CREDIT_COSTS = {
  'short': 1,
  'medium': 2,
  'long': 3
}

export async function POST(request: NextRequest) {
  try {
    // 检查必要的环境变量
    if (!OPENAI_API_KEY) {
      console.error('Missing OPENAI_API_KEY environment variable')
      return NextResponse.json(
        { error: 'AI service configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    if (!OPENAI_PROXY_URL) {
      console.error('Missing OPENAI_PROXY_URL environment variable')
      return NextResponse.json(
        { error: 'AI service configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    const { 
      characterName = '', 
      gender = '',
      storyStyle = '',
      writingStyle = '',
      characterType = '',
      ageRange = '',
      personalityArchetype = '',
      backgroundOrigin = '',
      relationshipStatus = '',
      occupation = '',
      traits = [], 
      length = 'medium',
      style = 'detailed',
      user
    } = await request.json()

    // 角色名称现在是可选的，至少需要一个配置项来生成有意义的内容
    if (!characterName && !gender && !storyStyle && !writingStyle && !characterType && !ageRange && !personalityArchetype && !backgroundOrigin && !relationshipStatus && !occupation && traits.length === 0) {
      return NextResponse.json({ error: 'Please provide at least some character details to generate headcanons' }, { status: 400 })
    }

    // 验证用户身份（暂时免费使用，不检查credits）
    const supabase = await createClient()
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Please login to generate character headcanons' }, { status: 401 })
    }

    // 暂时免费使用期间，不检查credits
    const creditsNeeded = CREDIT_COSTS[length as keyof typeof CREDIT_COSTS] || 2

    // 验证参数
    const validLengths = ['short', 'medium', 'long']
    const validStyles = ['detailed', 'creative', 'analytical']

    if (!validLengths.includes(length)) {
      return NextResponse.json({ error: 'Invalid length. Must be short, medium, or long' }, { status: 400 })
    }

    if (!validStyles.includes(style)) {
      return NextResponse.json({ error: 'Invalid style. Must be detailed, creative, or analytical' }, { status: 400 })
    }

    // 构建prompt
    const traitsText = traits.length > 0 ? `\nAdditional traits to consider: ${traits.join(', ')}` : ''
    const lengthInstructions = {
      'short': 'Generate 3-5 headcanons, each in 1-2 sentences.',
      'medium': 'Generate 5-8 headcanons, each in 2-3 sentences with more detail.',
      'long': 'Generate 8-12 headcanons, each in 3-4 sentences with comprehensive detail and reasoning.'
    }
    
    const styleInstructions = {
      'detailed': 'Focus on specific, realistic details that fit the character and world.',
      'creative': 'Be imaginative and explore unique possibilities while staying true to the character.',
      'analytical': 'Provide psychological insights and logical reasoning for each headcanon.'
    }

    // 构建角色描述
    const characterDetails = []
    
    // 如果没有提供角色名称，则在prompt中要求生成一个
    let finalCharacterName = characterName
    if (!characterName) {
      characterDetails.push('Generate an appropriate character name based on the character details')
    } else {
      characterDetails.push(`Character name: ${characterName}`)
    }
    
    if (gender) characterDetails.push(`Gender: ${gender}`)
    if (storyStyle) characterDetails.push(`Story style: ${storyStyle}`)
    if (writingStyle) characterDetails.push(`Writing style: ${writingStyle}`)
    if (characterType) characterDetails.push(`Character type: ${characterType}`)
    if (ageRange) characterDetails.push(`Age range: ${ageRange}`)
    if (personalityArchetype) characterDetails.push(`Personality archetype: ${personalityArchetype}`)
    if (backgroundOrigin) characterDetails.push(`Background/Origin: ${backgroundOrigin}`)
    if (relationshipStatus) characterDetails.push(`Relationship status: ${relationshipStatus}`)
    if (occupation) characterDetails.push(`Occupation/Role: ${occupation}`)

    const characterDesc = characterDetails.length > 0 ? characterDetails.join('\n') : 'A fictional character'

    const prompt = `Generate character headcanons based on the following character details:

${characterDesc}

${lengthInstructions[length as keyof typeof lengthInstructions]}
${styleInstructions[style as keyof typeof styleInstructions]}${traitsText}

${!characterName ? 'Start by creating an appropriate character name, then ' : ''}Format the response as a numbered list with clear, engaging headcanons that would be interesting and believable. Each headcanon should be well-developed and add depth to the character. Focus on personality traits, backstory elements, relationships, habits, secrets, motivations, and other character development aspects.

${!characterName ? 'Make sure to consistently use the character name throughout all headcanons to create a cohesive character profile.' : ''}

Generation style: ${style}
Content length: ${length}`

    // 调用OpenAI API (添加超时和重试机制)
    console.log(`Making request to: ${OPENAI_PROXY_URL}/chat/completions`)
    console.log(`Using model: gpt-4.1-mini`)
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30秒超时
    
    let response
    try {
      response = await fetch(`${OPENAI_PROXY_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an expert character analyst and creative writer who specializes in developing believable, engaging character headcanons for various fandoms. You understand character psychology, world-building, and fan culture.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: length === 'short' ? 500 : length === 'medium' ? 800 : 1200,
          temperature: style === 'creative' ? 0.8 : style === 'analytical' ? 0.3 : 0.6,
          top_p: 0.9,
          frequency_penalty: 0.3,
          presence_penalty: 0.3
        }),
        signal: controller.signal
      })
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      console.error('OpenAI API fetch error:', fetchError)
      
      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout. The AI service is taking too long to respond. Please try again.' },
          { status: 408 }
        )
      }
      
      return NextResponse.json(
        { error: 'Unable to connect to AI service. Please check your internet connection and try again.' },
        { status: 503 }
      )
    } finally {
      clearTimeout(timeoutId)
    }

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI API error:', errorData)
      return NextResponse.json(
        { error: 'Character headcanon generation failed, please try again later' },
        { status: 500 }
      )
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return NextResponse.json(
        { error: 'Invalid response format from OpenAI' },
        { status: 500 }
      )
    }

    const generatedHeadcanons = data.choices[0].message.content

    // 免费期间不消耗credits，仅记录生成ID用于追踪
    const generationId = `headcanon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // 免费期间跳过credit消耗和交易记录
    console.log(`Free generation: ${generationId} for user ${currentUser.id}`)

    return NextResponse.json({
      success: true,
      headcanons: generatedHeadcanons,
      characterName,
      gender,
      storyStyle,
      writingStyle,
      characterType,
      ageRange,
      personalityArchetype,
      backgroundOrigin,
      relationshipStatus,
      occupation,
      length,
      style,
      traits,
      creditsConsumed: 0, // 免费期间不消耗credits
      remainingCredits: null, // 免费期间不显示剩余credits
      generationId,
      isFreeGeneration: true
    })
  } catch (error) {
    console.error('Character headcanon generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 