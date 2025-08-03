-- 修复外键约束问题
-- 方案1: 移除外键约束（推荐）
ALTER TABLE public.pending_charges DROP CONSTRAINT IF EXISTS pending_charges_task_id_fkey;

-- 方案2: 修改 reserve_credits 函数，不立即创建 pending_charges 记录
CREATE OR REPLACE FUNCTION public.reserve_credits(
  p_user_id UUID,
  p_task_id TEXT,
  p_amount INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
  current_available INTEGER;
BEGIN
  -- 获取当前可用积分
  SELECT (total_credits - used_credits - frozen_credits) 
  INTO current_available
  FROM public.user_credits 
  WHERE user_id = p_user_id;
  
  -- 检查积分是否足够
  IF current_available < p_amount THEN
    RETURN FALSE;
  END IF;
  
  -- 冻结积分
  UPDATE public.user_credits 
  SET frozen_credits = frozen_credits + p_amount
  WHERE user_id = p_user_id;
  
  -- 注意：不在这里创建 pending_charges 记录
  -- 将在任务创建后再创建 pending_charges 记录
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建一个新函数来创建 pending_charges 记录
CREATE OR REPLACE FUNCTION public.create_pending_charge(
  p_task_id TEXT,
  p_user_id UUID,
  p_amount INTEGER
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.pending_charges (task_id, user_id, amount)
  VALUES (p_task_id, p_user_id, p_amount);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;