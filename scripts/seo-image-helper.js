const fs = require('fs');
const path = require('path');

// 创建SEO图片目录
const seoImagesDir = path.join(process.cwd(), 'public', 'seo-images');
if (!fs.existsSync(seoImagesDir)) {
  fs.mkdirSync(seoImagesDir, { recursive: true });
}

// 图片配置
const imageConfigs = {
  homepage: [
    {
      filename: 'hero-creative-workspace.png',
      prompt: 'Professional 3D illustration of a creative person interacting with floating AI-generated art and designs, holographic UI elements showing text-to-image conversion process, soft blue and purple lighting, sleek modern aesthetic, detailed and inspirational, perfect for website hero section',
      alt: 'AI creative workspace with floating designs and holographic UI elements',
      title: 'AI Creative Workspace',
      description: 'Interactive creative workspace powered by AI technology'
    },
    {
      filename: 'hero-showcase.png',
      prompt: 'Professional digital artist workspace with AI tools generating creative artwork, split screen showing text prompt and resulting stunning visual art, modern UI design, soft lighting, detailed visualization of AI creative process',
      alt: 'AI-powered creative workspace with text-to-image generation in action',
      title: 'Creative AI Platform',
      description: 'Professional AI tools for transforming ideas into stunning visual content'
    },
    {
      filename: 'ai-tools-collage.png',
      prompt: 'Elegant collage of AI creative tools showing text-to-image generation, photo editing, character creation, and name generator tools, clean modern interface, professional design, light background with blue accent colors',
      alt: 'Collage of AI creative tools for content generation',
      title: 'All-in-One AI Toolkit',
      description: 'Comprehensive suite of AI tools for all your creative needs'
    },
    {
      filename: 'user-experience.png',
      prompt: 'Person using AI creative tools on computer with smile, showing satisfaction with results, professional home office setting, soft natural lighting, screens showing AI generated images, modern aesthetic',
      alt: 'Satisfied user experience with AI creative platform',
      title: 'Intuitive User Experience',
      description: 'Easy-to-use interface designed for both beginners and professionals'
    }
  ],
  characterHeadcanon: [
    {
      filename: 'character-wizard.png',
      prompt: 'Mysterious wizard character with flowing dark robes and glowing magical staff, ancient spellbook floating nearby, fantasy digital art style, detailed character design, magical atmosphere with purple and blue mystical energy',
      alt: 'AI generated wizard character for headcanon creation',
      title: 'Wizard Character',
      description: 'Mysterious wizard character with ancient magic academy background, perfect for fantasy novels and RPGs'
    },
    {
      filename: 'character-detective.png',
      prompt: 'Modern urban detective in dark coat and fedora hat, standing in rainy city street at night, film noir style, cinematic lighting, professional character illustration, realistic digital art',
      alt: 'AI generated urban detective character for story creation',
      title: 'Urban Detective', 
      description: 'Experienced private detective character, perfect for modern mystery novels and suspense stories'
    },
    {
      filename: 'character-student.png',
      prompt: 'Cheerful anime school student character with bright uniform and backpack, manga art style, detailed character design, school courtyard background, vibrant colors, friendly expression',
      alt: 'AI generated school student character for creative writing',
      title: 'School Character',
      description: 'Cheerful high school student character, perfect for school anime and youth novels'
    }
  ],
  elfName: [
    {
      filename: 'elf-wood-ranger.png',
      prompt: 'Wood elf ranger with bow and quiver in enchanted forest, pointed ears, green cloak, nature magic aura, fantasy concept art, detailed illustration, mystical forest background with glowing plants',
      alt: 'Wood elf ranger character design for fantasy name generation',
      title: 'Wood Elf Ranger',
      description: 'Forest guardian with name: Silverleaf Moonwhisper, skilled in archery and nature magic'
    },
    {
      filename: 'elf-dark-mage.png', 
      prompt: 'Dark elf mage with purple magical aura and silver hair, underground cave setting with crystals, mystical fantasy art, dramatic lighting, elegant dark robes, casting spell with glowing hands',
      alt: 'Dark elf mage character design for fantasy gaming',
      title: 'Dark Elf Mage',
      description: 'Underground world mage with name: Vexara Shadowweaver, master of dark magic and illusions'
    },
    {
      filename: 'elf-high-noble.png',
      prompt: 'High elf noble with golden crown and elegant royal robes, palace throne room setting, majestic fantasy art, regal composition, warm golden lighting, jeweled accessories',
      alt: 'High elf noble character design for fantasy stories', 
      title: 'High Elf Noble',
      description: 'Ancient royal bloodline elf with name: Goldenbrow Starcrown, possessing powerful magical talents'
    }
  ],
  imageEditor: [
    {
      filename: 'image-enhancement.png',
      prompt: 'Split screen comparison showing photo enhancement, left side: dull gray photo of landscape, right side: vibrant enhanced version with bright colors, before and after editing demonstration, professional photography',
      alt: 'AI photo enhancement before and after comparison showcase',
      title: 'Photo Enhancement',
      description: 'AI automatically adjusts brightness, contrast, and colors to make dull photos vibrant and vivid'
    },
    {
      filename: 'style-transfer.png',
      prompt: 'Artistic style transfer demonstration, original photo transforming into oil painting style, side by side comparison, digital art showcase, vibrant artistic effects, painterly transformation',
      alt: 'AI artistic style transfer effect demonstration',
      title: 'Style Transfer',
      description: 'Transform ordinary photos into oil paintings, watercolors, sketches, and various artistic styles'
    },
    {
      filename: 'background-removal.png',
      prompt: 'Background removal showcase, product photography with subject cleanly separated from background, transparent checkerboard pattern showing removed background, professional editing demonstration',
      alt: 'AI smart background removal effect showcase',
      title: 'Background Removal', 
      description: 'One-click smart background removal, perfectly separating subjects with transparent background export'
    }
  ],
  textToImage: [
    {
      filename: 'landscape-sunset.png',
      prompt: 'Peaceful mountain lake at sunset with golden reflections on water, majestic snow-capped peaks, serene landscape photography style, natural beauty, warm golden hour lighting, crystal clear water',
      alt: 'AI generated sunset mountain lake landscape',
      title: 'Natural Landscape',
      description: 'Prompt example: Peaceful lake at sunset with mountain reflections, oil painting style, warm colors, high quality'
    },
    {
      filename: 'cyberpunk-city.png', 
      prompt: 'Futuristic cyberpunk cityscape with neon lights and holographic displays, towering skyscrapers, sci-fi digital art, high-tech urban environment, dramatic purple and blue lighting, flying vehicles',
      alt: 'AI generated futuristic cyberpunk city concept art',
      title: 'Sci-Fi Concept',
      description: 'Prompt example: Futuristic city nightscape, neon lighting, cyberpunk style, digital art, high contrast'
    },
    {
      filename: 'business-portrait.png',
      prompt: 'Professional business portrait of confident businesswoman in modern office, corporate headshot style, studio lighting, contemporary photography, professional attire, confident expression',
      alt: 'AI generated professional business portrait',
      title: 'Portrait Photography',
      description: 'Prompt example: Professional business portrait, confident smile, warm lighting, modern photography style'
    }
  ]
};

// 生成组件代码
function generateComponentCode() {
  console.log('📝 生成的组件代码更新:\n');
  
  // Homepage SEO
  console.log('=== Homepage SEO Images ===');
  console.log(`      <SEOImageGallery
        title="AI Creative Platform"
        description="Professional AI tools for all your creative needs"
        images={[
${imageConfigs.homepage.map(img => `          {
            url: "/seo-images/${img.filename}",
            alt: "${img.alt}",
            title: "${img.title}",
            description: "${img.description}"
          }`).join(',\n')}
        ]}
      />\n`);
  
  // Character Headcanon SEO
  console.log('=== CharacterHeadcanonSEO.tsx ===');
  console.log(`      <SEOImageGallery
        title="Character Headcanon Examples"
        description="Explore AI-generated character headcanon examples to inspire your creative writing"
        images={[
${imageConfigs.characterHeadcanon.map(img => `          {
            url: "/seo-images/${img.filename}",
            alt: "${img.alt}",
            title: "${img.title}",
            description: "${img.description}"
          }`).join(',\n')}
        ]}
      />\n`);

  // Elf Name SEO  
  console.log('=== ElfNameSEO.tsx ===');
  console.log(`          <SEOImageGallery
            title="Elf Character Showcase"
            description="Explore different types of elf character designs to inspire your fantasy creations"
            images={[
${imageConfigs.elfName.map(img => `              {
                url: "/seo-images/${img.filename}",
                alt: "${img.alt}",
                title: "${img.title}",
                description: "${img.description}"
              }`).join(',\n')}
            ]}
          />\n`);

  // Image Editor SEO
  console.log('=== ImageEditorSEO.tsx ===');
  console.log(`          <SEOImageGallery
            title="AI Image Editing Showcase"
            description="Discover the power of AI image editing from photo enhancement to artistic style transformation"
            images={[
${imageConfigs.imageEditor.map(img => `              {
                url: "/seo-images/${img.filename}",
                alt: "${img.alt}",
                title: "${img.title}",
                description: "${img.description}"
              }`).join(',\n')}
            ]}
          />\n`);

  // Text to Image SEO
  console.log('=== TextToImageSEO.tsx ===');
  console.log(`          <SEOImageGallery
            title="AI Text-to-Image Art Gallery"
            description="Explore the infinite possibilities of AI art creation, from photorealistic images to abstract artwork"
            images={[
${imageConfigs.textToImage.map(img => `              {
                url: "/seo-images/${img.filename}",
                alt: "${img.alt}",
                title: "${img.title}",
                description: "${img.description}"
              }`).join(',\n')}
            ]}
          />\n`);
}

// 生成所有提示词供手动生成
function generatePromptList() {
  console.log('🎨 图片生成提示词列表:\n');
  
  let index = 1;
  Object.entries(imageConfigs).forEach(([category, images]) => {
    console.log(`📁 ${category.toUpperCase()}:`);
    images.forEach(img => {
      console.log(`${index}. ${img.title}`);
      console.log(`   文件名: ${img.filename}`);
      console.log(`   提示词: "${img.prompt}"`);
      console.log('');
      index++;
    });
  });
}

console.log('🎨 SEO图片生成助手\n');
console.log('请按照以下步骤生成图片:\n');
console.log('1. 确保开发服务器正在运行: npm run dev');
console.log('2. 访问 http://localhost:3000/text-to-image');
console.log('3. 使用下面的提示词逐个生成图片');
console.log('4. 将生成的图片保存到 public/seo-images/ 目录');
console.log('5. 使用生成的组件代码更新各个SEO组件\n');

generatePromptList();
generateComponentCode();

console.log('📋 生成完成！请按照上述步骤操作。');