import { NextRequest, NextResponse } from 'next/server'

const AZURE_ENDPOINT = process.env.AZURE_ENDPOINT
const AZURE_API_KEY = process.env.AZURE_API_KEY 

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get('image') as File
    const prompt = formData.get('prompt') as string
    const maskFile = formData.get('mask') as File | null
    const user = formData.get('user') as string | null
    
    // New parameters matching image generation API
    const size = formData.get('size') as string || '1024x1024'
    const quality = formData.get('quality') as string || 'high'
    const n = parseInt(formData.get('n') as string || '1')
    const output_format = formData.get('output_format') as string || 'png'
    const model = formData.get('model') as string || 'gpt-image-1'

    if (!imageFile || !prompt) {
      return NextResponse.json({ error: 'Please upload an image and enter edit description' }, { status: 400 })
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

    // Create FormData for Azure API
    const azureFormData = new FormData()
    azureFormData.append('image', imageFile)
    azureFormData.append('prompt', prompt)
    azureFormData.append('model', model)
    azureFormData.append('size', size)
    azureFormData.append('quality', quality)
    azureFormData.append('n', n.toString())
    azureFormData.append('output_format', output_format)
    
    if (maskFile) {
      azureFormData.append('mask', maskFile)
    }

    if (user) {
      azureFormData.append('user', user)
    }

    const response = await fetch(
      `${AZURE_ENDPOINT}/openai/deployments/gpt-image-1/images/edits?api-version=2025-04-01-preview`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AZURE_API_KEY}`,
        },
        body: azureFormData,
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Azure API error:', errorData)
      return NextResponse.json(
        { error: 'Image editing failed, please try again later' },
        { status: 500 }
      )
    }

    const data = await response.json()
    
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      return NextResponse.json(
        { error: 'Invalid edited image data format' },
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
    console.error('Image editing error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 