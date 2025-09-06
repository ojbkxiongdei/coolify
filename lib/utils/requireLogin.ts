import { createClient } from '@/lib/supabase/client'

export async function requireLogin(): Promise<boolean> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) return true

  // 获取当前页面路径
  const currentPath = window.location.pathname + window.location.search

  // 触发Google登录，传递next参数以便登录后返回当前页面
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(currentPath)}`,
    },
  })
  // 登录后页面会刷新，返回false即可
  return false
} 