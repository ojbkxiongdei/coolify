'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Brush, Upload, Download, Zap, Palette, Camera, Settings, Star, Users, Clock, Shield, Award, Wand2, Image, PenTool, Layers } from 'lucide-react'

const TextToImageSEO = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Hero Section */}
          <section className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Text to Image Generator - Create Stunning Visuals from Text
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Transform your imagination into reality with our advanced AI text-to-image generator. Create professional artwork, illustrations, graphics, and digital art from simple text descriptions. Perfect for designers, content creators, marketers, and artists looking to bring their ideas to life.
            </p>
          </section>

          {/* Features Grid */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Advanced Text-to-Image Features</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Sparkles className="h-8 w-8 text-blue-500 mb-2" />
                  <CardTitle className="text-lg">Smart Text Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Advanced natural language processing understands your text descriptions, extracting key elements like objects, styles, colors, and composition to create accurate visual representations.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Brush className="h-8 w-8 text-purple-500 mb-2" />
                  <CardTitle className="text-lg">Artistic Styles</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Generate images in various artistic styles including photorealistic, oil painting, watercolor, digital art, cartoon, anime, sketch, and abstract. Perfect for diverse creative projects and artistic expressions.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Layers className="h-8 w-8 text-green-500 mb-2" />
                  <CardTitle className="text-lg">High-Quality Output</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Generate high-resolution images up to 1536x1024 pixels with exceptional detail and clarity. Choose from multiple quality settings to balance processing speed with output resolution.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Camera className="h-8 w-8 text-orange-500 mb-2" />
                  <CardTitle className="text-lg">Multiple Formats</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Export generated images in PNG, JPEG, and WebP formats. Batch generation allows creating up to 10 images simultaneously for comparison and selection of the best results.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <PenTool className="h-8 w-8 text-red-500 mb-2" />
                  <CardTitle className="text-lg">Prompt Engineering</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Advanced prompt engineering capabilities help you craft detailed descriptions for better results. Include style modifiers, lighting conditions, camera angles, and artistic techniques.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Palette className="h-8 w-8 text-cyan-500 mb-2" />
                  <CardTitle className="text-lg">Color Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Specify color palettes, moods, and lighting conditions in your text prompts. Create vibrant, muted, monochrome, or custom color schemes to match your brand or artistic vision.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Settings className="h-8 w-8 text-indigo-500 mb-2" />
                  <CardTitle className="text-lg">Advanced Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Fine-tune generation parameters including aspect ratios, composition styles, detail levels, and artistic influences. Professional controls for precise creative control.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Wand2 className="h-8 w-8 text-pink-500 mb-2" />
                  <CardTitle className="text-lg">Creative Enhancement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    AI-powered creative suggestions and prompt improvements help enhance your descriptions for better visual results. Get inspired with style recommendations and composition ideas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Use Cases */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Perfect for Every Creative Need</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Users className="h-6 w-6 text-blue-500 mb-2" />
                  <CardTitle>Content Marketing</CardTitle>
                  <CardDescription>Professional visuals for digital marketing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Create compelling visuals for blog posts, social media campaigns, email marketing, and advertising. Generate custom illustrations, hero images, product mockups, and brand-consistent graphics.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Blog Images</Badge>
                    <Badge variant="outline">Social Media</Badge>
                    <Badge variant="outline">Ad Creatives</Badge>
                    <Badge variant="outline">Email Graphics</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Image className="h-6 w-6 text-purple-500 mb-2" />
                  <CardTitle>Graphic Design</CardTitle>
                  <CardDescription>Professional design assets and concepts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Generate concept art, illustrations, logos, icons, and design elements. Perfect for designers looking for inspiration, rapid prototyping, or creating unique visual assets for client projects.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Concept Art</Badge>
                    <Badge variant="outline">Illustrations</Badge>
                    <Badge variant="outline">Design Elements</Badge>
                    <Badge variant="outline">Visual Concepts</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="h-6 w-6 text-green-500 mb-2" />
                  <CardTitle>Creative Projects</CardTitle>
                  <CardDescription>Artistic and personal creative endeavors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Bring your creative visions to life for personal art projects, book illustrations, game assets, character designs, and digital artwork. Perfect for artists, writers, and creative professionals.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Digital Art</Badge>
                    <Badge variant="outline">Character Design</Badge>
                    <Badge variant="outline">Book Illustrations</Badge>
                    <Badge variant="outline">Game Assets</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* AI Technology */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Powered by Advanced AI Technology</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <Zap className="h-6 w-6 text-yellow-500 mb-2" />
                  <CardTitle>GPT-Image AI Engine</CardTitle>
                  <CardDescription>State-of-the-art image generation technology</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Our text-to-image generator is powered by the latest GPT-Image model, featuring advanced diffusion algorithms and neural network architectures trained on millions of high-quality images and text pairs.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Diffusion-based image synthesis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">CLIP-guided text understanding</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Multi-scale feature extraction</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Settings className="h-6 w-6 text-blue-500 mb-2" />
                  <CardTitle>Professional Controls</CardTitle>
                  <CardDescription>Fine-tune every aspect of image generation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Access professional-grade generation controls including style weights, guidance scales, sampling methods, and seed values for reproducible results and artistic fine-tuning.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-xs bg-gray-50 rounded px-2 py-1">Style Guidance</div>
                    <div className="text-xs bg-gray-50 rounded px-2 py-1">Sampling Control</div>
                    <div className="text-xs bg-gray-50 rounded px-2 py-1">Seed Management</div>
                    <div className="text-xs bg-gray-50 rounded px-2 py-1">Quality Settings</div>
                    <div className="text-xs bg-gray-50 rounded px-2 py-1">Aspect Ratios</div>
                    <div className="text-xs bg-gray-50 rounded px-2 py-1">Batch Generation</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Prompt Writing Guide */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Mastering AI Image Prompts</h2>
            <div className="space-y-8">
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Essential Prompt Components</CardTitle>
                  <CardDescription>Build effective prompts for better results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Subject Description</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Main object or character details</li>
                        <li>• Physical attributes and features</li>
                        <li>• Clothing, accessories, or props</li>
                        <li>• Facial expressions and poses</li>
                        <li>• Age, gender, and characteristics</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Environment & Setting</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Background scenery and location</li>
                        <li>• Indoor or outdoor environments</li>
                        <li>• Weather and atmospheric conditions</li>
                        <li>• Time of day and lighting</li>
                        <li>• Architectural or natural elements</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Style & Technique</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Artistic style and medium</li>
                        <li>• Color palette and mood</li>
                        <li>• Camera angle and composition</li>
                        <li>• Lighting setup and shadows</li>
                        <li>• Quality and detail modifiers</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Popular Style Keywords</CardTitle>
                  <CardDescription>Enhance your prompts with these style modifiers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <h4 className="font-semibold mb-3">Photographic Styles</h4>
                      <div className="space-y-1 text-sm">
                        <div className="bg-gray-50 rounded p-2">📸 Portrait photography</div>
                        <div className="bg-gray-50 rounded p-2">🌅 Landscape photography</div>
                        <div className="bg-gray-50 rounded p-2">📷 Street photography</div>
                        <div className="bg-gray-50 rounded p-2">🎯 Macro photography</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Artistic Styles</h4>
                      <div className="space-y-1 text-sm">
                        <div className="bg-gray-50 rounded p-2">🎨 Oil painting</div>
                        <div className="bg-gray-50 rounded p-2">🖌️ Watercolor</div>
                        <div className="bg-gray-50 rounded p-2">✏️ Pencil sketch</div>
                        <div className="bg-gray-50 rounded p-2">🖊️ Ink drawing</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Digital Styles</h4>
                      <div className="space-y-1 text-sm">
                        <div className="bg-gray-50 rounded p-2">💻 Digital art</div>
                        <div className="bg-gray-50 rounded p-2">🎮 Concept art</div>
                        <div className="bg-gray-50 rounded p-2">📺 Anime style</div>
                        <div className="bg-gray-50 rounded p-2">🎭 Cartoon style</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Quality Modifiers</h4>
                      <div className="space-y-1 text-sm">
                        <div className="bg-gray-50 rounded p-2">✨ High quality</div>
                        <div className="bg-gray-50 rounded p-2">🎯 Ultra detailed</div>
                        <div className="bg-gray-50 rounded p-2">🔍 8K resolution</div>
                        <div className="bg-gray-50 rounded p-2">💎 Masterpiece</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Example Prompts */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Example Prompts and Results</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Portrait Photography</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-mono text-gray-700">
                      &quot;Professional headshot of a confident businesswoman, 30s, wearing a navy blue blazer, warm smile, looking directly at camera, studio lighting, white background, high-quality portrait photography, 85mm lens, shallow depth of field&quot;
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">
                    This prompt creates professional business portraits perfect for LinkedIn profiles, company websites, and corporate materials.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Fantasy Illustration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-mono text-gray-700">
                      &quot;Majestic dragon soaring through clouds at sunset, iridescent scales, spread wings, ancient castle on mountain peak below, golden hour lighting, fantasy art style, digital painting, highly detailed, concept art, magical atmosphere&quot;
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">
                    Fantasy art prompts work great for book covers, game assets, and imaginative artwork with mythical creatures and magical settings.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Product Photography</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-mono text-gray-700">
                      &quot;Luxury smartphone on marble surface, minimalist composition, soft rim lighting, reflections, premium product photography, white background, commercial photography style, high-end advertising, ultra-clean, professional&quot;
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">
                    Product photography prompts generate clean, professional images perfect for e-commerce, catalogs, and marketing materials.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Landscape Art</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-mono text-gray-700">
                      &quot;Serene mountain lake at dawn, mist rising from water, pine trees reflection, snow-capped peaks, golden sunrise light, nature photography, wide angle lens, peaceful atmosphere, pristine wilderness, crystal clear water&quot;
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">
                    Nature and landscape prompts create stunning scenic imagery for travel blogs, environmental content, and decorative artwork.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How does text-to-image AI work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our AI uses advanced diffusion models trained on millions of images and text descriptions. It understands the relationship between words and visual concepts, then generates new images by gradually refining random noise into coherent pictures that match your text prompt.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What makes a good text prompt?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Effective prompts include specific details about the subject, setting, style, and mood. Be descriptive but focused, include artistic style references, lighting conditions, and quality modifiers. Experiment with different prompt structures to achieve desired results.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I use generated images commercially?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Yes, all images generated through our platform can be used for commercial purposes including marketing, product design, publishing, and client work. You retain full rights to use the generated content in your projects and business applications.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What image resolutions are available?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    We support multiple resolutions including 1024x1024 (square), 1024x1536 (portrait), and 1536x1024 (landscape). Choose the aspect ratio that best fits your project needs, from social media posts to print materials and web graphics.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How can I improve image quality?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Use detailed, specific prompts with quality modifiers like &quot;high quality&quot;, &quot;ultra detailed&quot;, &quot;professional photography&quot;, or &quot;8K resolution&quot;. Include lighting descriptions, camera settings, and artistic style references for better results.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How many images can I generate?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    You can generate 1-10 images per request for comparison and selection. Our credit system allows unlimited generation based on your subscription plan, with different quality levels consuming different amounts of credits.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Creating Amazing Images Today</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Transform your ideas into stunning visuals with our AI text-to-image generator. No design skills required – just describe what you want to create and watch our AI bring it to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const generator = document.getElementById('image-generator');
                  if (generator) {
                    generator.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Try Text-to-Image Now
              </button>
              <a href="/pricing" className="bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                View Pricing Plans
              </a>
            </div>
          </section>

        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Text to Image Generator",
            "description": "Transform text into stunning visuals with AI. Generate professional artwork, illustrations, and graphics from text descriptions using advanced AI technology.",
            "url": "https://dreamfinityx.com/text-to-image",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "creator": {
              "@type": "Organization",
              "name": "DreamfinityX"
            },
            "keywords": "text to image, AI image generator, AI art, artificial intelligence, image generation, digital art"
          })
        }}
      />
    </div>
  )
}

export default TextToImageSEO 