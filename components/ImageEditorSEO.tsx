'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit3, Sparkles, Brush, Upload, Download, Zap, Palette, Layers, Filter, Camera, Settings, Star, Users, Clock, Shield, Award, Wand2 } from 'lucide-react'
import SEOImageGallery from './SEOImageGallery'

export default function ImageEditorSEO() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Hero Section */}
          <section className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Image Editor - Professional Image Editing Tool
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Transform your images with cutting-edge AI image editing technology. Edit photos, apply filters, enhance quality, remove backgrounds, and create stunning visual effects with our advanced AI-powered image editor. Perfect for photographers, designers, content creators, and social media enthusiasts.
            </p>
          </section>

          {/* Features Grid */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Advanced AI Image Editing Features</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Edit3 className="h-8 w-8 text-blue-500 mb-2" />
                  <CardTitle className="text-lg">Photo Enhancement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Enhance image quality, adjust brightness, contrast, saturation, and sharpness with AI-powered photo enhancement tools. Perfect for improving low-light photos and enhancing image clarity.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Brush className="h-8 w-8 text-purple-500 mb-2" />
                  <CardTitle className="text-lg">Style Transfer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Apply artistic styles to your images with AI style transfer. Convert photos to paintings, sketches, oil paintings, watercolors, and digital art styles. Transform ordinary photos into masterpieces.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Layers className="h-8 w-8 text-green-500 mb-2" />
                  <CardTitle className="text-lg">Background Removal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Remove backgrounds from images automatically with AI background removal. Perfect for product photography, portrait editing, and creating transparent backgrounds for graphic design projects.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Filter className="h-8 w-8 text-orange-500 mb-2" />
                  <CardTitle className="text-lg">AI Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Apply intelligent filters that understand image content. Vintage effects, black and white conversion, color grading, HDR effects, and cinematic filters powered by artificial intelligence.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Camera className="h-8 w-8 text-red-500 mb-2" />
                  <CardTitle className="text-lg">Object Removal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Remove unwanted objects from photos intelligently. Remove people, objects, watermarks, and distractions from your images while maintaining natural-looking results.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Palette className="h-8 w-8 text-cyan-500 mb-2" />
                  <CardTitle className="text-lg">Color Correction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Professional color correction and grading tools. Adjust color balance, temperature, tint, and apply professional color grading techniques to achieve cinematic looks.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Sparkles className="h-8 w-8 text-yellow-500 mb-2" />
                  <CardTitle className="text-lg">Face Enhancement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Enhance portraits with AI-powered face enhancement. Smooth skin, brighten eyes, whiten teeth, and improve facial features while maintaining natural appearance.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Wand2 className="h-8 w-8 text-indigo-500 mb-2" />
                  <CardTitle className="text-lg">Magic Eraser</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Magically erase unwanted elements from your photos. Remove blemishes, scratches, dust, and imperfections with intelligent content-aware fill technology.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Image Editing Examples Gallery */}
          <SEOImageGallery
            title="AI Image Editing Showcase"
            description="Discover the power of AI image editing from photo enhancement to artistic style transformation"
            images={[
              {
                url: "/seo-images/Photo Enhancement.png",
                alt: "AI photo enhancement before and after comparison showcase",
                title: "Photo Enhancement",
                description: "AI automatically adjusts brightness, contrast, and colors to make dull photos vibrant and vivid"
              },
              {
                url: "/seo-images/Style Transfer.png",
                alt: "AI artistic style transfer effect demonstration",
                title: "Style Transfer",
                description: "Transform ordinary photos into oil paintings, watercolors, sketches, and various artistic styles"
              },
              {
                url: "/seo-images/Background Removal.png",
                alt: "AI smart background removal effect showcase",
                title: "Background Removal",
                description: "One-click smart background removal, perfectly separating subjects with transparent background export"
              }
            ]}
          />

          {/* Use Cases */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Perfect for Every Image Editing Need</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Users className="h-6 w-6 text-blue-500 mb-2" />
                  <CardTitle>Social Media Content</CardTitle>
                  <CardDescription>Create engaging content for all platforms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Edit photos for Instagram, Facebook, Twitter, TikTok, and LinkedIn. Create stunning social media posts with professional-quality image editing. Apply filters, adjust colors, and enhance photos for maximum engagement.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Instagram Posts</Badge>
                    <Badge variant="outline">Facebook Covers</Badge>
                    <Badge variant="outline">Twitter Headers</Badge>
                    <Badge variant="outline">TikTok Videos</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Camera className="h-6 w-6 text-purple-500 mb-2" />
                  <CardTitle>Photography</CardTitle>
                  <CardDescription>Professional photo editing and enhancement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Perfect for photographers to edit portraits, landscapes, wedding photos, and commercial photography. Advanced color correction, exposure adjustment, and artistic effects for professional results.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Portrait Photography</Badge>
                    <Badge variant="outline">Landscape Photos</Badge>
                    <Badge variant="outline">Wedding Photography</Badge>
                    <Badge variant="outline">Commercial Photos</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="h-6 w-6 text-green-500 mb-2" />
                  <CardTitle>E-commerce</CardTitle>
                  <CardDescription>Product photography and marketing images</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Edit product photos for online stores. Remove backgrounds, enhance colors, adjust lighting, and create professional product images that drive sales and conversions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Product Photos</Badge>
                    <Badge variant="outline">Background Removal</Badge>
                    <Badge variant="outline">Color Enhancement</Badge>
                    <Badge variant="outline">Lighting Adjustment</Badge>
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
                  <CardTitle>GPT-Vision AI Engine</CardTitle>
                  <CardDescription>State-of-the-art computer vision technology</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Our AI image editor is powered by GPT-Vision, the latest advancement in computer vision technology. It understands image content, objects, faces, and scenes to provide intelligent editing suggestions and automated enhancements.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Content-aware editing algorithms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Intelligent object recognition</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Advanced neural network processing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Settings className="h-6 w-6 text-blue-500 mb-2" />
                  <CardTitle>Professional Controls</CardTitle>
                  <CardDescription>Fine-tune every aspect of your edits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Access professional-grade editing controls including exposure, highlights, shadows, contrast, clarity, vibrance, and saturation. Perfect for photographers and designers who need precise control over their edits.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-xs bg-gray-50 rounded px-2 py-1">Exposure Control</div>
                    <div className="text-xs bg-gray-50 rounded px-2 py-1">Color Grading</div>
                    <div className="text-xs bg-gray-50 rounded px-2 py-1">Noise Reduction</div>
                    <div className="text-xs bg-gray-50 rounded px-2 py-1">Sharpening</div>
                    <div className="text-xs bg-gray-50 rounded px-2 py-1">Lens Correction</div>
                    <div className="text-xs bg-gray-50 rounded px-2 py-1">Vignette Effects</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Image Format Support */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Universal Image Format Support</h2>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Upload className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Input Formats</h3>
                  <p className="text-sm text-gray-600">
                    Support for JPEG, PNG, WebP, HEIC, TIFF, BMP, and RAW image formats. Upload images from any device or camera.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Download className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Output Formats</h3>
                  <p className="text-sm text-gray-600">
                    Export edited images in JPEG, PNG, WebP, and TIFF formats with customizable quality settings for different use cases.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Settings className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Batch Processing</h3>
                  <p className="text-sm text-gray-600">
                    Process multiple images simultaneously with batch editing features. Apply the same edits to multiple photos at once.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Privacy Protection</h3>
                  <p className="text-sm text-gray-600">
                    Your images are processed securely with end-to-end encryption. We never store your personal photos permanently.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Editing Techniques */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Advanced Image Editing Techniques</h2>
            <div className="space-y-8">
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Color Grading and Correction</CardTitle>
                  <CardDescription>Professional color editing techniques</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Color Grading Techniques</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Cinematic color grading for movie-like effects</li>
                        <li>• Vintage and retro color schemes</li>
                        <li>• Modern Instagram-style color palettes</li>
                        <li>• Professional film emulation presets</li>
                        <li>• Custom color lookup tables (LUTs)</li>
                        <li>• Split-toning for highlights and shadows</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Color Correction Tools</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• White balance correction and adjustment</li>
                        <li>• Exposure compensation and recovery</li>
                        <li>• Highlight and shadow detail enhancement</li>
                        <li>• Vibrance and saturation control</li>
                        <li>• Selective color editing by hue range</li>
                        <li>• Color temperature and tint adjustment</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Portrait Enhancement</CardTitle>
                  <CardDescription>Specialized tools for portrait photography</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Skin Enhancement</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Skin smoothing and texture enhancement</li>
                        <li>• Blemish and acne removal</li>
                        <li>• Wrinkle reduction and anti-aging</li>
                        <li>• Skin tone correction and evening</li>
                        <li>• Natural-looking skin retouching</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Eye Enhancement</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Eye brightening and whitening</li>
                        <li>• Iris color enhancement</li>
                        <li>• Eyelash darkening and definition</li>
                        <li>• Under-eye circle removal</li>
                        <li>• Eye shape and symmetry adjustment</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Teeth & Smile</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Teeth whitening and brightening</li>
                        <li>• Gum color correction</li>
                        <li>• Smile enhancement and shaping</li>
                        <li>• Lip color and texture improvement</li>
                        <li>• Facial symmetry adjustment</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Artistic Effects and Filters</CardTitle>
                  <CardDescription>Creative editing options for unique results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Artistic Styles</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-50 rounded p-3 text-center">
                          <div className="text-sm font-medium">Oil Painting</div>
                          <div className="text-xs text-gray-600">Classic oil painting effect</div>
                        </div>
                        <div className="bg-gray-50 rounded p-3 text-center">
                          <div className="text-sm font-medium">Watercolor</div>
                          <div className="text-xs text-gray-600">Soft watercolor style</div>
                        </div>
                        <div className="bg-gray-50 rounded p-3 text-center">
                          <div className="text-sm font-medium">Pencil Sketch</div>
                          <div className="text-xs text-gray-600">Hand-drawn sketch look</div>
                        </div>
                        <div className="bg-gray-50 rounded p-3 text-center">
                          <div className="text-sm font-medium">Pop Art</div>
                          <div className="text-xs text-gray-600">Bold pop art style</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Creative Filters</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-50 rounded p-3 text-center">
                          <div className="text-sm font-medium">Vintage</div>
                          <div className="text-xs text-gray-600">Retro film look</div>
                        </div>
                        <div className="bg-gray-50 rounded p-3 text-center">
                          <div className="text-sm font-medium">HDR</div>
                          <div className="text-xs text-gray-600">High dynamic range</div>
                        </div>
                        <div className="bg-gray-50 rounded p-3 text-center">
                          <div className="text-sm font-medium">Dramatic</div>
                          <div className="text-xs text-gray-600">High contrast drama</div>
                        </div>
                        <div className="bg-gray-50 rounded p-3 text-center">
                          <div className="text-sm font-medium">Soft Focus</div>
                          <div className="text-xs text-gray-600">Dreamy soft effect</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Comparison Table */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our AI Image Editor?</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">DreamfinityX AI</th>
                    <th className="text-center p-4 font-semibold">Traditional Editors</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4 font-medium">AI-Powered Editing</td>
                    <td className="p-4 text-center">✅ Advanced AI</td>
                    <td className="p-4 text-center">❌ Manual Only</td>
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="p-4 font-medium">Background Removal</td>
                    <td className="p-4 text-center">✅ One-Click</td>
                    <td className="p-4 text-center">⚠️ Complex Process</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Style Transfer</td>
                    <td className="p-4 text-center">✅ Instant</td>
                    <td className="p-4 text-center">❌ Not Available</td>
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="p-4 font-medium">Learning Curve</td>
                    <td className="p-4 text-center">✅ Easy</td>
                    <td className="p-4 text-center">❌ Steep</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Processing Speed</td>
                    <td className="p-4 text-center">✅ Fast</td>
                    <td className="p-4 text-center">⚠️ Slow</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What image formats are supported?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our AI image editor supports all major image formats including JPEG, PNG, WebP, HEIC, TIFF, BMP, and RAW image formats. You can upload images up to 50MB in size and export in various formats with customizable quality settings.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How does AI image editing work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our AI uses advanced machine learning algorithms to analyze your image content, identify objects, faces, and scenes, then apply intelligent edits based on your instructions. The AI understands context and applies edits that look natural and professional.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is my data secure?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Yes, we prioritize your privacy and security. All images are processed using encrypted connections, and we don&apos;t store your personal photos permanently. Your edited images are temporarily cached for download and then automatically deleted.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I batch edit multiple images?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Yes, our AI image editor supports batch processing. You can apply the same edits to multiple images simultaneously, saving time when editing photo series, product catalogs, or social media content.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What quality settings are available?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    We offer three quality levels: Low (fast processing), Medium (balanced), and High (best quality). You can also choose output resolution from 1024x1024 to 1536x1024 pixels, perfect for different use cases from web to print.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How much does it cost?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our AI image editor uses a credit-based system. Low quality edits cost 1 credit, medium quality costs 4 credits, and high quality costs 15 credits. You can purchase credits or subscribe to monthly plans for unlimited access.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Editing Your Images Today</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Transform your photos with professional-quality AI image editing. No complex software, no steep learning curve – just powerful AI tools that make image editing simple and fun.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Try Image Editor Now
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
            "name": "AI Image Editor",
            "description": "Professional AI-powered image editing tool with background removal, style transfer, and artistic effects. Edit photos with artificial intelligence.",
            "url": "https://dreamfinityx.com/image-editor",
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
            "keywords": "AI image editor, photo editing, background removal, style transfer, image processing, photo retouching"
          })
        }}
      />
    </div>
  )
} 