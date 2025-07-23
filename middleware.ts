import { updateSession } from '@/lib/supabase/middleware'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // 定义重定向规则 - 旧页面到新结构的映射
  const redirects = [
    // 名字生成器重定向
    { source: '/elf-name-generator', destination: '/names/fantasy/elf-name-generator' },
    
    // 图像处理工具重定向
    { source: '/text-to-image', destination: '/images/text-to-image/ai-image-generator' },
    { source: '/image-editor', destination: '/images/editing/ai-image-editor' },
    { source: '/images/editor', destination: '/images/editing' },  // 修复导航中的链接
    { source: '/ghibli-style-converter', destination: '/images/style-transfer/ghibli-style-converter' },
    { source: '/pixar-style-converter', destination: '/images/style-transfer/pixar-style-converter' },
    
    // 故事/角色生成器重定向
    { source: '/character-headcanon-generator', destination: '/stories/backstory/character-headcanon-generator' },
    { source: '/stories/character-headcanon/generator', destination: '/stories/backstory/character-headcanon-generator' },
    { source: '/stories/character-headcanon', destination: '/stories/backstory' },
    { source: '/stories/character-headcanon/examples', destination: '/stories/backstory' },
    { source: '/stories/character-headcanon/tips', destination: '/stories/backstory' },
    { source: '/stories/world-building', destination: '/stories' },  // 添加处理world-building的重定向
  ];

  // 检查当前URL是否需要重定向
  const url = request.nextUrl.clone();
  const path = url.pathname;
  
  // 查找匹配的重定向规则
  const redirect = redirects.find((r) => r.source === path);
  
  // 如果找到匹配项，进行重定向
  if (redirect) {
    url.pathname = redirect.destination;
    return NextResponse.redirect(url);
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