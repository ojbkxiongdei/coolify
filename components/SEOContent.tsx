import React from 'react'

/* eslint-disable react/no-unescaped-entities */
export default function SEOContent() {
  return (
    <>
      {/* Features Section */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful AI Creative Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Advanced AI-powered tools designed for professionals and enthusiasts
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="bg-gray-900 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Text to Image</h3>
              <p className="text-gray-600 text-sm">
                Transform your words into stunning visuals. Support for multiple art styles, aspect ratios, and quality settings.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="bg-gray-900 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Image Editing</h3>
              <p className="text-gray-600 text-sm">
                Upload and transform existing images with AI. Style transfers, object removal, and artistic effects.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="bg-gray-900 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Settings</h3>
              <p className="text-gray-600 text-sm">
                Fine-tune every aspect: image dimensions, quality levels, output formats, and batch processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section - New */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Creative Tools for Every Need</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how our AI-powered platform can revolutionize your creative workflow
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Digital Artists</h3>
              <p className="text-gray-700 text-sm mb-4">
                Generate concept art and inspiration using AI text-to-image technology. Refine your art direction with multiple style variations and enhance your workflow.
              </p>
              <p className="text-gray-500 text-xs">
                Keywords: concept art, digital painting, AI art generation, artist workflow
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Content Creators</h3>
              <p className="text-gray-700 text-sm mb-4">
                Create eye-catching thumbnails, social media graphics, and promotional materials. Generate consistent visual content that matches your brand identity.
              </p>
              <p className="text-gray-500 text-xs">
                Keywords: social media graphics, content creation, visual marketing, AI design tools
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Game Developers</h3>
              <p className="text-gray-700 text-sm mb-4">
                Design characters, environments, and assets for your game with AI assistance. Generate fantasy characters and worlds with detailed backstories.
              </p>
              <p className="text-gray-500 text-xs">
                Keywords: game development, character design, fantasy worlds, RPG characters
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Writers & Authors</h3>
              <p className="text-gray-700 text-sm mb-4">
                Visualize your characters and scenes with AI image generation. Create authentic names for your fantasy characters with our elf name generator.
              </p>
              <p className="text-gray-500 text-xs">
                Keywords: character visualization, fantasy writing, world-building, creative writing aids
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What is DreamfinityX and how does it work?
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                DreamfinityX is an AI-powered creative platform that uses Azure OpenAI&apos;s GPT-image-1 model - ChatGPT&apos;s most advanced image generation model - to generate and edit images. 
                Simply describe what you want to create, and our AI will generate high-quality images that match your description.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What image sizes and formats are supported?
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We support three image sizes: 1024×1024 (square), 1024×1536 (portrait), and 1536×1024 (landscape). 
                You can choose between PNG and JPEG output formats. You can also generate up to 10 images in a single request.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How do I get the best results?
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Be specific and descriptive in your prompts. Include details about style, lighting, composition, and quality. 
                Use medium or high quality settings for better results. Use specific keywords like "photorealistic", "4K", "professional lighting".
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is DreamfinityX free to use?
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                DreamfinityX offers both free and premium tiers. The free tier allows you to explore our AI capabilities. 
                For unlimited generations and advanced features, consider upgrading to premium plans.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What makes DreamfinityX different from other AI art tools?
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                DreamfinityX combines cutting-edge Azure OpenAI image generation with powerful editing tools, character creation, and name generation features in one platform. 
                We focus on quality, ease of use, and providing a complete creative solution rather than just a single tool.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I use the images commercially?
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Yes, with our premium plans, you receive full commercial usage rights for all generated images. 
                This makes DreamfinityX perfect for professional creators, designers, and businesses needing AI-generated content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Keyword Rich Content Section - New */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced AI Image Generation</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                <p>
                  DreamfinityX's text-to-image AI technology represents the cutting edge of artificial intelligence in creative design. Our platform harnesses the power of Azure OpenAI's GPT-image-1 model, providing unparalleled image quality and creative capabilities.
                </p>
                <p>
                  Whether you need photorealistic renderings, digital paintings, concept art, or stylized illustrations, our AI art generator delivers professional results with simple text prompts. Create stunning digital artwork without extensive technical knowledge.
                </p>
                <p>
                  The AI image generator supports various artistic styles including photorealism, oil painting, watercolor, digital art, anime, cartoon, and abstract art. Generate multiple variations with a single prompt to explore different creative directions.
                </p>
                <p>
                  For professionals in graphic design, marketing, and content creation, DreamfinityX offers an invaluable tool to accelerate workflows and enhance creative output with AI-powered image generation technology.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Comprehensive AI Creative Suite</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                <p>
                  Beyond image generation, DreamfinityX offers powerful AI image editing tools including background removal, style transfer, image enhancement, and composition tools. Transform ordinary photos into extraordinary artwork.
                </p>
                <p>
                  Our character headcanon generator helps writers, game developers, and role-players create detailed character backgrounds and stories with AI assistance. Develop rich characters with complex personalities, histories, and motivations.
                </p>
                <p>
                  The fantasy name generator creates authentic elf names with cultural backgrounds and meanings. Perfect for fantasy authors, game developers, and D&D players looking for unique character names.
                </p>
                <p>
                  With continuous updates and new features, DreamfinityX remains at the forefront of AI creative technology, providing professional-grade tools for every creative need. Join our community of artists, designers, and creators leveraging AI to enhance their creative workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">DreamfinityX</h3>
              <p className="text-gray-300 text-sm">
                Professional AI-powered image generation and editing platform powered by Azure OpenAI technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">AI Tools</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/images/ai-image-generator" className="hover:underline hover:text-white">Text to Image</a></li>
                <li><a href="/images/ai-image-editor" className="hover:underline hover:text-white">Image Editor</a></li>
                <li><a href="/stories/character-headcanon-generator" className="hover:underline hover:text-white">Character Headcanon Generator</a></li>
                <li><a href="/names/elf-name-generator" className="hover:underline hover:text-white">Elf Name Generator</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Pages</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/pricing" className="hover:underline hover:text-white">Pricing</a></li>
                <li><a href="/privacy" className="hover:underline hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:underline hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Friend Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {/* 新增：AInails.pro 友链 */}
                <li><a href="https://ainails.pro" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white">AInails.pro</a></li>
                <li><a href="https://characterheadcanon.pro" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white">Characterheadcanon.pro</a></li>
                <li><a href="https://elfname.pro" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white">Elfname.pro</a></li>
                <li><a href="https://chinesenamegenerate.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white">Chinesenamegenerate.com</a></li>
                <li><a href="https://dressmeai.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white">dressmeai.com</a></li>
                <li><a href="https://checkios.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white">checkios.com</a></li>
                <li><a href="mailto:zeta@myowncoach.online" className="hover:underline hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2025 DreamfinityX. All rights reserved. Powered by Azure OpenAI.
            </p>
          </div>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "DreamfinityX",
            "description": "Professional AI-powered image generation and editing platform using Azure OpenAI technology",
            "url": "https://dreamfinityx.com",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Web Browser",
            "creator": {
              "@type": "Organization",
              "name": "DreamfinityX"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "category": "Free with Premium Options"
            },
            "featureList": [
              "AI Text to Image Generation",
              "AI Image Editing",
              "Multiple Output Formats",
              "Batch Processing",
              "Custom Resolution Support",
              "Professional Quality Output"
            ]
          }`
        }}
      />
    </>
  )
} 