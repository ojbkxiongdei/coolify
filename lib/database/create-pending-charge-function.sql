-- 创建 create_pending_charge 函数
CREATE OR REPLACE FUNCTION public.create_pending_charge(
  p_task_id TEXT,
  p_user_id UUID,
  p_amount INTEGER
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.pending_charges (task_id, user_id, amount, status, created_at)
  VALUES (p_task_id, p_user_id, p_amount, 'pending', NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;