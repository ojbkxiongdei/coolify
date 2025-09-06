import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // 如果有 `next` 参数，使用它作为重定向地址
  const next = searchParams.get('next') ?? '/'

  // 调试：打印请求头和参数
  console.log('[Auth Callback] Request URL:', request.url)
  console.log('[Auth Callback] Origin:', origin)
  console.log('[Auth Callback] Code:', code ? 'present' : 'missing')
  console.log('[Auth Callback] Headers:', Object.fromEntries(request.headers))
  console.log('[Auth Callback] Search params:', Object.fromEntries(searchParams))

  if (code) {
    const supabase = await createClient()
    console.log('[Auth Callback] Attempting to exchange code for session...')
    
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      // 详细打印错误信息
      console.error('[Supabase Auth Callback Error]', {
        error: error,
        errorMessage: error.message,
        errorName: error.name,
        errorCause: (error as any).cause,
        code: code,
        origin: origin,
        requestUrl: request.url
      })
    } else {
      console.log('[Auth Callback] Session exchange successful')
      // 重定向到指定页面
      return NextResponse.redirect(`${origin}${next}`)
    }
  } else {
    console.log('[Auth Callback] No code provided in callback')
  }

  // 如果出错，重定向到错误页面
  console.log('[Auth Callback] Redirecting to error page')
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
} 