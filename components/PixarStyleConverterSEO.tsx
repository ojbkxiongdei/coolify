import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit3, Sparkles, Brush, Upload, Download, Zap, Palette, Layers, Filter, Camera, Settings, Star, Users, Clock, Shield, Award, Wand2 } from 'lucide-react'
import SEOImageGallery from './SEOImageGallery'
import LinkButton from './ui/LinkButton'
import PixarCtaButton from './ui/PixarCtaButton'
import ScrollTopWrapper from './ui/ScrollTopWrapper'

export default function PixarStyleConverterSEO() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Hero Section */}
          <section className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Pixar Style Image Converter - Transform Photos into Animation
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Transform your photos into stunning Pixar-style animations with our AI-powered converter. Turn portraits, family photos, selfies, and any image into beautiful Pixar-inspired cartoon characters. Perfect for social media, personal projects, and creative transformation.
            </p>
          </section>

          {/* Features Grid */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Pixar Style Conversion Features</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Brush className="h-8 w-8 text-blue-500 mb-2" />
                  <CardTitle className="text-lg">Pixar Character Styling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Transform photos into characters with Pixar's signature style. Get the iconic big eyes, smooth textures, and expressive features that define Pixar animation characters.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Palette className="h-8 w-8 text-purple-500 mb-2" />
                  <CardTitle className="text-lg">Pixar Color Palette</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Enjoy the vibrant and warm color palette that Pixar is known for. Our converter applies the characteristic color grading that makes Pixar animations feel inviting and lively.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Sparkles className="h-8 w-8 text-green-500 mb-2" />
                  <CardTitle className="text-lg">Adjustable Style Strength</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Choose how strongly to apply the Pixar style. Select subtle for a light touch that preserves more original features, or go strong for full Pixar character transformation.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Users className="h-8 w-8 text-orange-500 mb-2" />
                  <CardTitle className="text-lg">Multi-Person Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Convert group photos and family portraits with multiple people. Our AI identifies each person and applies the Pixar style while maintaining individual characteristics.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Wand2 className="h-8 w-8 text-red-500 mb-2" />
                  <CardTitle className="text-lg">Background Enhancement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Not just faces - our converter also transforms backgrounds into Pixar-style environments with the characteristic depth, lighting and texture of Pixar animations.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Layers className="h-8 w-8 text-cyan-500 mb-2" />
                  <CardTitle className="text-lg">Texture Refinement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Experience the smooth, slightly textured surfaces that define Pixar's 3D animation style. Our converter adds the perfect amount of texture for that authentic Pixar look.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Download className="h-8 w-8 text-yellow-500 mb-2" />
                  <CardTitle className="text-lg">High-Resolution Export</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Download your Pixar-style conversions in high resolution. Perfect for printing, sharing on social media, or using in creative projects requiring quality images.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Filter className="h-8 w-8 text-indigo-500 mb-2" />
                  <CardTitle className="text-lg">Multiple Variations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Generate multiple Pixar-style variations of the same photo. Explore different character interpretations to find the perfect Pixar transformation for your image.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Image Examples Gallery */}
          <SEOImageGallery
            title="Pixar Style Transformation Examples"
            description="See how our AI converter transforms ordinary photos into Pixar-style animations"
            images={[
              {
                url: "/seo-images/Pixar-Portrait-Transform.png",
                alt: "Before and after portrait transformation showing realistic photo converted to Pixar-style character with large eyes and smooth textures",
                title: "Portrait to Pixar Character",
                description: "Transform portrait photos into authentic Pixar-style characters with expressive features and the iconic Pixar animation look"
              },
              {
                url: "/seo-images/Pixar-Family-Transform.png",
                alt: "Family photo transformed into Pixar animation style with characteristic Pixar features applied to each family member",
                title: "Family Pixar Transformation",
                description: "Convert entire family photos into cohesive Pixar animation scenes with each person styled as a Pixar character"
              },
              {
                url: "/seo-images/Pixar-Scene-Transform.png",
                alt: "Person in outdoor scene transformed into complete Pixar animation style environment with vibrant colors and Pixar character design",
                title: "Complete Pixar Scene Conversion",
                description: "Transform both people and environments into complete Pixar animation scenes with the signature Pixar lighting and color palette"
              }
            ]}
          />

          {/* Use Cases */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Perfect for Creative Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Users className="h-6 w-6 text-blue-500 mb-2" />
                  <CardTitle>Social Media Content</CardTitle>
                  <CardDescription>Stand out with unique profile pictures</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Create eye-catching profile pictures and posts for Instagram, Facebook, Twitter, and TikTok. Transform your selfies and portraits into Pixar-style characters that will make your profile memorable and engaging.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Profile Pictures</Badge>
                    <Badge variant="outline">Social Posts</Badge>
                    <Badge variant="outline">Story Highlights</Badge>
                    <Badge variant="outline">Content Creation</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Star className="h-6 w-6 text-purple-500 mb-2" />
                  <CardTitle>Family Fun</CardTitle>
                  <CardDescription>Memorable family transformations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Transform family photos into Pixar-style animations for unique holiday cards, family reunions, or just for fun. Create magical versions of your favorite family moments that everyone will love.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Holiday Cards</Badge>
                    <Badge variant="outline">Family Portraits</Badge>
                    <Badge variant="outline">Birthday Celebrations</Badge>
                    <Badge variant="outline">Special Occasions</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Brush className="h-6 w-6 text-green-500 mb-2" />
                  <CardTitle>Creative Projects</CardTitle>
                  <CardDescription>Enhance your digital creations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Use Pixar-style conversions for creative projects like custom illustrations, children's books, classroom materials, personalized gifts, and digital art collections.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Digital Art</Badge>
                    <Badge variant="outline">Personal Projects</Badge>
                    <Badge variant="outline">Custom Gifts</Badge>
                    <Badge variant="outline">Educational Materials</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How It Works */}
          <section className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">How Pixar Style Conversion Works</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-blue-100 rounded-full p-3 text-blue-600">
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">1. Upload Your Photo</h3>
                  <p className="text-gray-600">
                    Upload any portrait, selfie, group photo, or picture you want to transform into Pixar style. Our system works with most image formats including JPEG, PNG, and WebP.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-purple-100 rounded-full p-3 text-purple-600">
                  <Settings className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">2. Adjust Style Settings</h3>
                  <p className="text-gray-600">
                    Choose your preferred style strength (subtle, medium, or strong), output size, and quality settings. You can also select the number of variations you'd like to generate.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-green-100 rounded-full p-3 text-green-600">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">3. Generate Pixar Style</h3>
                  <p className="text-gray-600">
                    Our advanced AI analyzes your image and applies Pixar animation characteristics including signature styling, color treatment, texturing, and lighting effects.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-orange-100 rounded-full p-3 text-orange-600">
                  <Download className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">4. Download Your Creation</h3>
                  <p className="text-gray-600">
                    Preview your Pixar-style transformations and download your favorites in high resolution. Share them on social media, print them, or use them in your creative projects.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 特征解析部分 - 精简SEO内容，提高关键词密度 */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Pixar Style Transformation Essentials</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">The Pixar Style Animation Look</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-4">
                    Our Pixar style converter transforms your photos using the iconic Pixar animation aesthetics. The Pixar style is famous for its distinctive character design featuring exaggerated yet believable proportions with larger eyes, smooth textures, and simplified facial features that maintain expressiveness. The Pixar animation look balances realism with stylized cartoon features.
                  </p>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Pixar Style Visual Elements</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Large, expressive eyes - signature Pixar style feature</li>
                    <li>Smooth skin with subtle Pixar-style texturing</li>
                    <li>Vibrant Pixar animation color palette</li>
                    <li>Distinctive Pixar lighting techniques</li>
                    <li>Stylized yet relatable Pixar character proportions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Our Pixar Style Converter Technology</h4>
                  <p className="text-gray-700 mb-4">
                    The Pixar style converter uses advanced AI to analyze your photos and apply authentic Pixar animation transformations. Our system doesn't just apply filters—it reimagines your photos with true Pixar character styling while preserving recognizable features of the original subjects.
                  </p>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Pixar Animation Transformation Process</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Photo analysis for Pixar-style conversion</li>
                    <li>Facial feature mapping to Pixar character proportions</li>
                    <li>Application of Pixar animation color palette</li>
                    <li>Pixar-style texture and lighting implementation</li>
                    <li>Refinement of final Pixar animation look</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Before-After 比较 - 精简版 */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Pixar Style Photo Transformations</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Pixar Style Portrait Converter</h3>
                <p className="text-gray-700 mb-3">
                  Our Pixar style converter transforms ordinary photos into authentic Pixar animation characters. The Pixar style transformation maintains key facial features while adding the signature Pixar animation look - large expressive eyes, smooth texturing, and vibrant Pixar color treatment.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="text-lg font-medium text-blue-800 mb-2">Pixar Animation Features</h4>
                  <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                    <li className="text-sm text-blue-700">✓ Pixar-style large eyes</li>
                    <li className="text-sm text-blue-700">✓ Smooth Pixar textures</li>
                    <li className="text-sm text-blue-700">✓ Vibrant Pixar colors</li>
                    <li className="text-sm text-blue-700">✓ Pixar character appeal</li>
                    <li className="text-sm text-blue-700">✓ Pixar animation lighting</li>
                    <li className="text-sm text-blue-700">✓ Pixar-style proportions</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Pixar Style Family Photos</h3>
                <p className="text-gray-700 mb-3">
                  The Pixar style converter handles group photos by transforming each person into a Pixar animation character while maintaining family resemblances. Create Pixar-style family portraits with consistent styling across all subjects for memorable keepsakes.
                </p>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h4 className="text-lg font-medium text-green-800 mb-2">Pixar Style Benefits</h4>
                  <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                    <li className="text-sm text-green-700">✓ Pixar character styling</li>
                    <li className="text-sm text-green-700">✓ Family resemblance kept</li>
                    <li className="text-sm text-green-700">✓ Consistent Pixar look</li>
                    <li className="text-sm text-green-700">✓ Pixar-style backgrounds</li>
                    <li className="text-sm text-green-700">✓ Pixar scene cohesion</li>
                    <li className="text-sm text-green-700">✓ Perfect for sharing</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Tips for Best Results */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Tips for Best Pixar Style Results</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Photo Selection Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-green-500 mt-1"></div>
                      <p className="text-sm text-gray-600">Choose clear, well-lit photos with minimal shadows for optimal Pixar style conversion</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-green-500 mt-1"></div>
                      <p className="text-sm text-gray-600">Front-facing or slightly angled portraits work best for authentic Pixar character results</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-green-500 mt-1"></div>
                      <p className="text-sm text-gray-600">Photos with clear facial features produce better Pixar-style character transformations</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-green-500 mt-1"></div>
                      <p className="text-sm text-gray-600">Simple backgrounds help focus the Pixar animation transformation on the subject</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-green-500 mt-1"></div>
                      <p className="text-sm text-gray-600">Natural expressions result in more authentic Pixar character emotions</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-green-500 mt-1"></div>
                      <p className="text-sm text-gray-600">Photos with colorful clothing help achieve the vibrant Pixar animation palette</p>
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
                      <p className="text-sm text-gray-600">Try different Pixar style strength settings to find your preferred animation look</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-blue-500 mt-1"></div>
                      <p className="text-sm text-gray-600">Generate multiple variations to explore different Pixar character interpretations</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-blue-500 mt-1"></div>
                      <p className="text-sm text-gray-600">For portraits, medium or strong style settings create more dramatic Pixar animation characters</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-blue-500 mt-1"></div>
                      <p className="text-sm text-gray-600">For family photos, subtle or medium settings preserve recognizable features while applying Pixar style</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-blue-500 mt-1"></div>
                      <p className="text-sm text-gray-600">Higher quality settings produce more detailed Pixar-style texture and lighting effects</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 rounded-full bg-blue-500 mt-1"></div>
                      <p className="text-sm text-gray-600">PNG format preserves the highest quality for your Pixar animation transformations</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Creative Applications */}
          <section className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Creative Applications for Pixar Style Images</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Social Media Profiles</h3>
                <p className="text-gray-700 mb-4">
                  Stand out on social platforms with a unique Pixar-style profile picture. Transform your selfie into a charming Pixar animation character that captures your personality with the iconic Pixar look. These distinctive profile images increase engagement and make your social media presence instantly recognizable.
                </p>
                <p className="text-sm text-gray-600">
                  Ideal for: Instagram, TikTok, Twitter, Facebook, LinkedIn, YouTube channels
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Family Keepsakes</h3>
                <p className="text-gray-700 mb-4">
                  Create unique family mementos by transforming your favorite family photos into Pixar-style animations. These charming Pixar-inspired transformations make perfect custom prints, holiday cards, personalized gifts, and keepsakes that showcase your family with the beloved Pixar animation aesthetic.
                </p>
                <p className="text-sm text-gray-600">
                  Perfect for: Holiday cards, family portraits, anniversary gifts, nursery decorations
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Creative Content</h3>
                <p className="text-gray-700 mb-4">
                  Enhance your creative projects with Pixar-style character transformations. Convert reference photos into Pixar animation style characters for illustrations, stories, presentations, and educational materials. These Pixar-inspired images add charm and visual appeal to any creative endeavor.
                </p>
                <p className="text-sm text-gray-600">
                  Great for: Blog illustrations, presentations, children's books, educational materials
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
                  <CardTitle className="text-lg">What is the Pixar Style Converter?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our Pixar Style Converter is an AI-powered tool that transforms regular photos into Pixar-inspired animations. It applies the characteristic Pixar animation style including big expressive eyes, smooth textures, stylized features, and vibrant color palettes to create charming cartoon characters from your photos.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">What types of photos work best with the converter?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    The best results come from clear portraits with good lighting and minimal shadows. Front-facing or slightly angled faces work particularly well for Pixar style conversion. However, our converter can handle various photos including family pictures, group shots, full-body images, and even photos with pets or objects, transforming them all into the Pixar animation style.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">How do I control how "Pixar-like" my photo becomes?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    You can adjust the style strength with three settings: subtle (maintains more original photo details), medium (balanced Pixar transformation), or strong (full Pixar character styling). This allows you to control how dramatically your photo is converted to Pixar animation style.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Can I use the converted images commercially?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    The images you create with our Pixar Style Converter are for personal use. For commercial purposes, please ensure you have the appropriate rights to both the original photos and be aware that "Pixar style" is inspired by Pixar's aesthetic but should not be represented as official Pixar animation content in commercial applications.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">How long does the Pixar style conversion process take?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Most Pixar style conversions are completed within 10-30 seconds, depending on the complexity of the image, the number of variations requested, and server load. Higher quality settings for Pixar animation transformations may take slightly longer to process but produce more detailed results.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Can I convert group photos to Pixar style?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Yes, our Pixar Style Converter works excellently with group photos. The AI identifies each person in the image and applies the Pixar animation style to each face individually, while maintaining a cohesive look across the entire image. This makes it perfect for transforming family photos, friend groups, and team pictures into charming Pixar-style animations.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">What resolution do the Pixar style images come in?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our Pixar Style Converter supports multiple output resolutions for your Pixar animation transformations. You can choose from 1024×1024 (square), 1024×1536 (portrait), or 1536×1024 (landscape) depending on your needs. All options produce high-quality Pixar-style images suitable for both digital use and printing.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">How does the Pixar style technology work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our Pixar Style Converter uses advanced AI neural networks trained on thousands of Pixar animation frames and character designs. The system analyzes facial features, expressions, lighting, and colors in your photo, then applies transformations that match the distinctive Pixar animation aesthetic. This includes modifying proportions, enhancing eyes, smoothing textures, and adjusting colors to create authentic Pixar-style characters from your photos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-blue-50 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Photos?</h2>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Convert your photos into magical Pixar-style animations in seconds. Perfect for social media, family fun, and creative projects.
            </p>
            <div className="flex justify-center">
              {/* 使用客户端组件处理交互 */}
              <PixarCtaButton />
            </div>
          </section>
          
          {/* 使用客户端组件处理交互 */}
          <ScrollTopWrapper />
        </div>
      </div>
    </div>
  )
} 