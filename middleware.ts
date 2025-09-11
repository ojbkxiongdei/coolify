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
    // 新的内部路由重定向
    { source: '/images/ai-image-generator', destination: '/generate' },
    { source: '/images/ai-image-editor', destination: '/edit' },
    { source: '/images/ghibli-style-converter', destination: '/ghibli-style-converter' },
    { source: '/images/pixar-style-converter', destination: '/pixar-style-converter' },
    { source: '/images', destination: '/' },
    
    // 将 names 和 stories 重定向到首页
    { source: '/names', destination: '/' },
    { source: '/stories', destination: '/' },
    
    // 历史路径兼容
    { source: '/ai-image-generator', destination: '/generate' },
    { source: '/images/text-to-image/ai-image-generator', destination: '/generate' },
    { source: '/ai-image-editor', destination: '/edit' },
    { source: '/images/editing/ai-image-editor', destination: '/edit' },
    { source: '/text-to-image', destination: '/generate' },
    { source: '/image-editor', destination: '/edit' },
    { source: '/images/style-transfer/ghibli-style-converter', destination: '/ghibli-style-converter' },
    { source: '/images/style-transfer/pixar-style-converter', destination: '/pixar-style-converter' },
    
    // 二级页面重定向
    { source: '/names/fantasy', destination: '/' },
    { source: '/images/style-transfer', destination: '/' },
    { source: '/images/text-to-image', destination: '/generate' },
    { source: '/images/editing', destination: '/edit' },
    { source: '/stories/backstory', destination: '/' },
    { source: '/stories/character-headcanon', destination: '/' },
  ];

  // 检查当前URL是否需要重定向
  const url = request.nextUrl.clone();
  // 规范化路径：移除尾部斜杠，保留根路径为"/"
  const rawPath = url.pathname;
  const normalizedPath = rawPath !== '/' ? rawPath.replace(/\/+$/, '') : rawPath;
  
  // 查找匹配的重定向规则
  // 精确匹配
  let redirect = redirects.find((r) => r.source === normalizedPath);
  // 前缀匹配（处理带有子路径或多余斜杠的情况）
  if (!redirect) {
    redirect = redirects.find((r) =>
      normalizedPath === r.source || normalizedPath.startsWith(r.source + '/')
    );
  }

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