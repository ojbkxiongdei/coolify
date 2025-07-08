# DreamfinityX - AI Creative Platform

DreamfinityX is a cutting-edge AI creative platform built with Next.js, providing text-to-image generation and advanced image editing capabilities.

## 🚀 Key Features

- **Text to Image Generation** - Powered by Azure OpenAI GPT-image-1 model
- **AI Image Editing** - Upload and transform images with intelligent AI editing
- **Advanced Configuration** - Customize size, quality, format, compression, and batch generation
- **Responsive Design** - Optimized for both mobile and desktop
- **SEO Optimized** - Search engine friendly page structure
- **Modern UI** - Beautiful interface with glass morphism effects and smooth animations
- **Professional Quality** - High-resolution outputs with customizable parameters
- **International Ready** - Built for global audience with English interface

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework with modern effects
- **Azure OpenAI** - Powerful AI image generation and editing services
- **Lucide React** - Beautiful SVG icons

## 📦 Installation & Setup

1. Clone the repository
```bash
git clone <repository-url>
cd dreamfinityX
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env.local` file:
```
AZURE_ENDPOINT=https://your-azure-endpoint.cognitiveservices.azure.com
***REMOVED***=your-azure-api-key
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 How to Use

### Text to Image Generation
1. Select "Text to Image" tab on the homepage
2. Enter image description, e.g., "A majestic red fox walking through golden autumn forest, cinematic lighting, photorealistic, 4K quality"
3. Configure generation settings (size, quality, number of images, format, compression)
4. Click "Generate Image" button
5. Wait for AI processing and view results

### Image Editing
1. Select "Image Editor" tab on the homepage
2. Upload the image you want to edit
3. Enter editing instructions, e.g., "Convert this image to black and white with vintage film effect"
4. Click "Edit Image" button
5. Wait for processing and view the edited result

## ⚙️ API Configuration Options

- **Image Sizes**: 1024×1024 (Square), 1024×1536 (Portrait), 1536×1024 (Landscape)
- **Quality Levels**: Low (faster), Medium, High (best quality)
- **Batch Generation**: Generate 1-10 images in a single request
- **Output Formats**: PNG, JPEG
- **Compression**: Adjustable from 0-100% for file size optimization
- **User Tracking**: Optional user ID for usage monitoring

## 📝 API Reference

### POST /api/generate-image
Generate images from text descriptions

**Request Parameters:**
```json
{
  "prompt": "Image description",
  "size": "1024x1024",
  "quality": "high",
  "n": 1,
  "output_format": "png",
  "output_compression": 100,
  "user": "optional-user-id"
}
```

**Response:**
```json
{
  "success": true,
  "images": ["data:image/png;base64,..."],
  "count": 1,
  "image": "base64-encoded-data",
  "imageUrl": "data:image/png;base64,..."
}
```

### POST /api/edit-image
Edit existing images with AI

**Request Parameters:**
- `image`: Image file (multipart/form-data)
- `prompt`: Editing instructions
- `mask`: Optional mask file
- `user`: Optional user ID

**Response:**
```json
{
  "success": true,
  "image": "base64-encoded-data",
  "imageUrl": "data:image/png;base64,..."
}
```

## 🔧 Deployment

### Vercel Deployment
1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Docker Deployment
```bash
# Build image
docker build -t dreamfinityx .

# Run container
docker run -p 3000:3000 -e AZURE_ENDPOINT=your-endpoint -e ***REMOVED***=your-key dreamfinityx
```

## 🎨 SEO & Performance Features

- **Server-Side Rendering** - Fast initial page loads
- **Optimized Images** - WebP format support and lazy loading
- **Meta Tags** - Comprehensive SEO meta information
- **Structured Data** - Rich snippets for better search visibility
- **Performance Optimized** - Code splitting and asset optimization
- **Mobile-First Design** - Responsive across all devices
- **Analytics Ready** - Easy integration with Google Analytics

## 🌍 Use Cases

Perfect for various creative professionals and use cases:

- **Digital Marketing** - Social media content, advertisements, promotional materials
- **Product Design** - Concept visualization, mockups, design exploration
- **Content Creation** - Blog images, article illustrations, digital publications
- **Art & Illustration** - Original artwork, creative compositions, artistic exploration
- **E-commerce** - Product images, lifestyle photos, marketing visuals
- **Educational Content** - Instructional graphics, presentations, learning materials

## 🤝 Contributing

We welcome contributions! Please feel free to submit Issues and Pull Requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

For questions, suggestions, or support:
- Email: [support@dreamfinityx.com](mailto:support@dreamfinityx.com)
- Website: [https://dreamfinityx.com](https://dreamfinityx.com)
- GitHub Issues: [Report a bug or request a feature](https://github.com/your-username/dreamfinityX/issues)

---

Built with ❤️ using Azure OpenAI and Next.js 