import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mountain, Sparkles } from 'lucide-react'
import SEOImageGallery from '@/components/SEOImageGallery'
import ScrollTopWrapper from '@/components/ui/ScrollTopWrapper'
import GhibliCtaButton from '@/components/ui/GhibliCtaButton'

export default function GhibliStyleConverterSEO() {
  return (
    <div>
      {/* SEO Content */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Benefits Section */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Transform Your Images into Studio Ghibli Style</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-cyan-50 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mountain className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dreamy Watercolor Aesthetic</h3>
                <p className="text-gray-600">
                  Transform ordinary photos into magical Studio Ghibli-inspired artwork with the signature soft watercolor textures, dreamy atmosphere, and hand-painted look that make Ghibli films so distinctive and beloved.
                </p>
              </div>
              
              <div className="bg-cyan-50 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enchanting Visual Style</h3>
                <p className="text-gray-600">
                  Convert your photos into the enchanting Studio Ghibli art style with its iconic visual elements - soft pastels, detailed backgrounds, magical atmosphere, and the distinctive Studio Ghibli character aesthetics.
                </p>
              </div>
              
              <div className="bg-cyan-50 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-cyan-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.67 18.95L7.6 15.64C8.39 15.11 9.53 15.17 10.24 15.78L10.57 16.07C11.35 16.74 12.61 16.74 13.39 16.07L17.55 12.5C18.33 11.83 19.59 11.83 20.37 12.5L22 13.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Perfect for Any Image</h3>
                <p className="text-gray-600">
                  Whether you have portraits, landscapes, nature scenes, or urban photos, our Ghibli Style Converter transforms them all into beautiful Studio Ghibli-inspired artwork with the characteristic watercolor aesthetic.
                </p>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Studio Ghibli Style Examples</h2>
            <div className="mb-8">
              <SEOImageGallery
                title="Studio Ghibli Style Examples"
                description="See how our AI converter transforms photos into magical Studio Ghibli-inspired artwork"
                images={[
                  {
                    url: "/seo-images/Ghibli-Style-Portrait.png",
                    alt: "Portrait photo transformed into Studio Ghibli style with watercolor textures and dreamy aesthetic",
                    title: "Portrait to Ghibli Style",
                    description: "Transform portraits into Studio Ghibli style with soft watercolor textures"
                  },
                  {
                    url: "/seo-images/Ghibli-Style-Landscape.png",
                    alt: "Landscape transformed into Studio Ghibli style with magical atmosphere and pastel colors",
                    title: "Landscape to Ghibli Style",
                    description: "Convert landscapes into magical Ghibli scenes with dreamy atmosphere"
                  },
                  {
                    url: "/seo-images/Ghibli-Style-Transformation.png",
                    alt: "Before and after comparison of photo transformed into Studio Ghibli style artwork",
                    title: "Complete Ghibli Transformation",
                    description: "Side-by-side comparison showing the Studio Ghibli style conversion process"
                  }
                ]}
              />
            </div>
            <div className="text-center">
              <p className="text-gray-600 max-w-3xl mx-auto mb-6">
                Experience the magic of Studio Ghibli&apos;s iconic art style with our AI-powered converter. 
                Transform your photos into stunning Ghibli-inspired artwork with the signature watercolor textures,
                dreamy atmosphere, and hand-painted aesthetic that defines films like Spirited Away, My Neighbor Totoro, and Princess Mononoke.
              </p>
            </div>
          </section>

          {/* Tips and Techniques */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Tips for Perfect Studio Ghibli Style Transformations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Best Photo Selection Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-green-500 mt-1"></div>
                      <p className="text-sm text-gray-600">Choose images with natural elements like forests, water, and skies for authentic Ghibli transformations</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-green-500 mt-1"></div>
                      <p className="text-sm text-gray-600">Photos with soft lighting and natural colors create the best Studio Ghibli style results</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-green-500 mt-1"></div>
                      <p className="text-sm text-gray-600">For portraits, simple backgrounds help focus the Ghibli transformation on the subject</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-green-500 mt-1"></div>
                      <p className="text-sm text-gray-600">Landscape photos with depth and interesting compositions produce magical Ghibli-style scenes</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-green-500 mt-1"></div>
                      <p className="text-sm text-gray-600">Photos with interesting weather elements like clouds, fog, or rain enhance the dreamy Ghibli aesthetic</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Style Optimization Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-blue-500 mt-1"></div>
                      <p className="text-sm text-gray-600">Try different Ghibli style strength settings to find your preferred watercolor look</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-blue-500 mt-1"></div>
                      <p className="text-sm text-gray-600">Generate multiple variations to explore different Studio Ghibli style interpretations</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-blue-500 mt-1"></div>
                      <p className="text-sm text-gray-600">For landscapes, medium or strong style settings create more dramatic Ghibli watercolor effects</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-blue-500 mt-1"></div>
                      <p className="text-sm text-gray-600">For portraits, subtle settings preserve recognizable features while applying the Ghibli aesthetic</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-blue-500 mt-1"></div>
                      <p className="text-sm text-gray-600">Higher quality settings produce more detailed Ghibli-style textures and color gradients</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-blue-500 mt-1"></div>
                      <p className="text-sm text-gray-600">PNG format preserves the highest quality for your Ghibli style transformations</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Creative Applications */}
          <section className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Creative Applications for Ghibli Style Images</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Artistic Profiles</h3>
                <p className="text-gray-700 mb-4">
                  Transform your profile pictures into magical Studio Ghibli-inspired art. Create stunning social media profiles with the dreamy watercolor aesthetic and enchanting Ghibli style that instantly captures attention and showcases your artistic personality.
                </p>
                <p className="text-sm text-gray-600">
                  Perfect for: Instagram, Twitter, Facebook, art portfolios, creative networks
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fantasy Artwork</h3>
                <p className="text-gray-700 mb-4">
                  Convert your travel photos, nature shots, and landscapes into enchanting fantasy scenes inspired by Studio Ghibli films. Create magical wall art, digital prints, postcards, and keepsakes with the distinctive Ghibli watercolor aesthetic.
                </p>
                <p className="text-sm text-gray-600">
                  Great for: Wall art, digital prints, travel memories, fantasy collections
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Creative Storytelling</h3>
                <p className="text-gray-700 mb-4">
                  Enhance your creative projects with Ghibli-inspired transformations. Convert reference photos into Studio Ghibli style artwork for stories, blog illustrations, presentations, and artistic visions with the magical Ghibli aesthetics.
                </p>
                <p className="text-sm text-gray-600">
                  Ideal for: Blog illustrations, stories, artistic concepts, mood boards
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">What is the Studio Ghibli Style Converter?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our Studio Ghibli Style Converter is an AI-powered tool that transforms regular photos into Ghibli-inspired artwork. It applies the characteristic Ghibli animation style including soft watercolor textures, dreamy atmospheres, pastel color palettes, and hand-painted aesthetics to create enchanting artwork from your photos.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">What types of photos work best with the Ghibli converter?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    The best results come from photos with natural elements like landscapes, forests, water features, and skies. Studio Ghibli&apos;s style embraces nature, so photos with these elements transform beautifully. Our converter also works well with portraits, architectural shots, and everyday scenes, transforming them all into the magical Studio Ghibli aesthetic.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">How do I control the Ghibli style intensity?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    You can adjust the style strength with three settings: subtle (maintains more original photo details), medium (balanced Ghibli transformation), or strong (full Ghibli styling with enhanced watercolor effects and dreamy atmosphere). This allows you to control how dramatically your photo is converted to Studio Ghibli style.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Can I use the converted images commercially?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    The images you create with our Studio Ghibli Style Converter are for personal use. For commercial purposes, please ensure you have the appropriate rights to both the original photos and be aware that &quot;Ghibli style&quot; is inspired by Studio Ghibli&apos;s aesthetic but should not be represented as official Studio Ghibli content in commercial applications.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">How long does the Ghibli style conversion process take?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Most Studio Ghibli style conversions are completed within 10-30 seconds, depending on the complexity of the image, the number of variations requested, and server load. Higher quality settings for Ghibli transformations may take slightly longer but produce more detailed watercolor textures and color gradients.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Can I convert multiple photos to Ghibli style?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Yes, you can convert multiple photos by processing them one at a time. Each photo will be transformed into the Studio Ghibli style with its signature watercolor textures and dreamy aesthetic. This is perfect for creating collections of Ghibli-inspired artwork from your favorite photos.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">What resolution do the Ghibli style images come in?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our Studio Ghibli Style Converter supports multiple output resolutions for your Ghibli transformations. You can choose from 1024×1024 (square), 1024×1536 (portrait), or 1536×1024 (landscape) depending on your needs. All options produce high-quality Ghibli-style images suitable for both digital use and printing.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">How does the Ghibli style technology work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our Studio Ghibli Style Converter uses advanced AI neural networks trained on thousands of Studio Ghibli animation frames and artwork. The system analyzes colors, textures, lighting, and composition in your photo, then applies transformations that match the distinctive Ghibli aesthetic. This includes softening textures, adjusting colors to match Ghibli&apos;s pastel palette, and adding the characteristic watercolor effect to create authentic Ghibli-inspired artwork from your photos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-blue-50 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Photos?</h2>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Convert your photos into magical Studio Ghibli-style artwork in seconds. Perfect for art lovers, fantasy enthusiasts, and creative projects.
            </p>
            <div className="flex justify-center">
              {/* 使用客户端组件处理交互 */}
              <GhibliCtaButton />
            </div>
          </section>
          
          {/* 使用客户端组件处理交互 */}
          <ScrollTopWrapper />
        </div>
      </div>
    </div>
  )
} 