import { updateSession } from '@/lib/supabase/middleware'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // 定义重定向规则
  const redirects = [
    // 历史功能页面 → 外部独立站（永久重定向）
    { source: '/names/elf-name-generator', destination: 'https://elfname.pro' },
    { source: '/elf-name-generator', destination: 'https://elfname.pro' },
    { source: '/names/fantasy/elf-name-generator', destination: 'https://elfname.pro' },

    { source: '/stories/character-headcanon-generator', destination: 'https://characterheadcanon.pro' },
    { source: '/character-headcanon-generator', destination: 'https://characterheadcanon.pro' },
    { source: '/stories/backstory/character-headcanon-generator', destination: 'https://characterheadcanon.pro' },
    { source: '/stories/character-headcanon/generator', destination: 'https://characterheadcanon.pro' },
    // 图像风格转换
    { source: '/ghibli-style-converter', destination: '/images/ghibli-style-converter' },
    { source: '/pixar-style-converter', destination: '/images/pixar-style-converter' },
    { source: '/images/style-transfer/ghibli-style-converter', destination: '/images/ghibli-style-converter' },
    { source: '/images/style-transfer/pixar-style-converter', destination: '/images/pixar-style-converter' },
    
    // 图像生成和编辑
    { source: '/ai-image-generator', destination: '/images/ai-image-generator' },
    { source: '/images/text-to-image/ai-image-generator', destination: '/images/ai-image-generator' },
    { source: '/ai-image-editor', destination: '/images/ai-image-editor' },
    { source: '/images/editing/ai-image-editor', destination: '/images/ai-image-editor' },
    { source: '/text-to-image', destination: '/images/ai-image-generator' },
    { source: '/image-editor', destination: '/images/ai-image-editor' },
    
    // 二级页面重定向到一级页面
    { source: '/names/fantasy', destination: '/names' },
    { source: '/images/style-transfer', destination: '/images' },
    { source: '/images/text-to-image', destination: '/images' },
    { source: '/images/editing', destination: '/images' },
    { source: '/stories/backstory', destination: '/stories' },
    { source: '/stories/character-headcanon', destination: '/stories' },
  ];

  // 检查当前URL是否需要重定向
  const url = request.nextUrl.clone();
  const path = url.pathname;
  
  // 查找匹配的重定向规则
  const redirect = redirects.find((r) => r.source === path);

  // 如果找到匹配项，进行重定向
  if (redirect) {
    // 如果目标是外部域名，直接返回永久重定向到该完整URL
    if (redirect.destination.startsWith('http')) {
      return NextResponse.redirect(redirect.destination, { status: 308 });
    }
    // 站内重定向
    url.pathname = redirect.destination;
    return NextResponse.redirect(url, { status: 308 });
  }
  
  // 否则，继续处理认证会话
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 