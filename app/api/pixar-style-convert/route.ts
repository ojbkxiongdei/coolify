import { NextRequest, NextResponse } from 'next/server'

const AZURE_ENDPOINT = process.env.AZURE_ENDPOINT
const ***REMOVED*** = process.env.***REMOVED*** 

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get('image') as File
    const prompt = formData.get('prompt') as string
    const user = formData.get('user') as string | null
    const styleStrength = formData.get('style_strength') as string || 'medium'
    
    // New parameters matching image generation API
    const size = formData.get('size') as string || '1024x1024'
    const quality = formData.get('quality') as string || 'high'
    const n = parseInt(formData.get('n') as string || '1')
    const output_format = formData.get('output_format') as string || 'png'
    const model = formData.get('model') as string || 'gpt-image-1'

    if (!imageFile) {
      return NextResponse.json({ error: 'Please upload an image to convert' }, { status: 400 })
    }

    // Validate parameters
    const validSizes = ['1024x1024', '1024x1536', '1536x1024']
    const validQualities = ['low', 'medium', 'high']
    const validFormats = ['png', 'jpeg']
    const validStyleStrengths = ['subtle', 'medium', 'strong']

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

    if (!validStyleStrengths.includes(styleStrength)) {
      return NextResponse.json({ error: 'Invalid style strength. Must be subtle, medium, or strong' }, { status: 400 })
    }

    // 创建基本提示词，根据风格强度调整
    let pixarPrompt = "Convert this image to Pixar animation style";
    
    // 根据风格强度增强或减弱提示词
    if (styleStrength === 'subtle') {
      pixarPrompt = "Convert this image to a subtle Pixar animation style while preserving most of the original features";
    } else if (styleStrength === 'strong') {
      pixarPrompt = "Convert this image to a strong Pixar animation style with exaggerated features, bright colors, and typical Pixar character design";
    }

    // 如果用户提供了自定义提示词，则与风格提示词结合
    if (prompt && prompt !== 'Convert this image to Pixar animation style') {
      pixarPrompt = `${pixarPrompt}. ${prompt}`;
    }

    // Create FormData for Azure API
    const azureFormData = new FormData()
    azureFormData.append('image', imageFile)
    azureFormData.append('prompt', pixarPrompt)
    azureFormData.append('model', model)
    azureFormData.append('size', size)
    azureFormData.append('quality', quality)
    azureFormData.append('n', n.toString())
    azureFormData.append('output_format', output_format)

    if (user) {
      azureFormData.append('user', user)
    }

    const response = await fetch(
      `${AZURE_ENDPOINT}/openai/deployments/gpt-image-1/images/edits?api-version=2025-04-01-preview`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${***REMOVED***}`,
        },
        body: azureFormData,
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Azure API error:', errorData)
      return NextResponse.json(
        { error: 'Pixar style conversion failed, please try again later' },
        { status: 500 }
      )
    }

    const data = await response.json()
    
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      return NextResponse.json(
        { error: 'Invalid conversion image data format' },
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

    return NextResponse.json({
      success: true,
      images,
      count: images.length,
      // Keep backward compatibility
      image: data.data[0].b64_json,
      imageUrl: images[0],
    })
  } catch (error) {
    console.error('Pixar style conversion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}