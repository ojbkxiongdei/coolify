-- 任务队列表
CREATE TABLE public.generation_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id TEXT UNIQUE NOT NULL, -- 客户端可见的任务ID
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  settings JSONB DEFAULT '{}', -- 生成参数（尺寸、质量、数量等）
  generation_type TEXT DEFAULT 'text-to-image', -- 'text-to-image', 'image-edit', 'style-convert'
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed', 'cancelled'
  priority INTEGER DEFAULT 1, -- 优先级，数字越大优先级越高
  credits_required INTEGER NOT NULL, -- 所需积分
  credits_charged INTEGER DEFAULT 0, -- 已扣积分
  queue_position INTEGER, -- 队列位置
  progress INTEGER DEFAULT 0, -- 进度百分比 (0-100)
  error_message TEXT, -- 错误信息
  images_generated INTEGER DEFAULT 0, -- 成功生成的图片数量
  started_at TIMESTAMP WITH TIME ZONE, -- 开始处理时间
  completed_at TIMESTAMP WITH TIME ZONE, -- 完成时间
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 预扣费记录表
CREATE TABLE public.pending_charges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id TEXT REFERENCES public.generation_tasks(task_id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- 预扣积分数量
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'refunded'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  refunded_at TIMESTAMP WITH TIME ZONE
);

-- 修改用户积分表，添加冻结积分字段
ALTER TABLE public.user_credits 
ADD COLUMN IF NOT EXISTS frozen_credits INTEGER DEFAULT 0;

-- 启用行级安全
ALTER TABLE public.generation_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pending_charges ENABLE ROW LEVEL SECURITY;

-- 任务表RLS策略
CREATE POLICY "Users can view own tasks" ON public.generation_tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON public.generation_tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON public.generation_tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON public.generation_tasks
  FOR DELETE USING (auth.uid() = user_id);

-- 预扣费表RLS策略
CREATE POLICY "Users can view own pending charges" ON public.pending_charges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pending charges" ON public.pending_charges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pending charges" ON public.pending_charges
  FOR UPDATE USING (auth.uid() = user_id);

-- 创建索引
CREATE INDEX idx_generation_tasks_user_id ON public.generation_tasks(user_id);
CREATE INDEX idx_generation_tasks_status ON public.generation_tasks(status);
CREATE INDEX idx_generation_tasks_created_at ON public.generation_tasks(created_at DESC);
CREATE INDEX idx_generation_tasks_queue_position ON public.generation_tasks(queue_position);
CREATE INDEX idx_generation_tasks_priority ON public.generation_tasks(priority DESC);
CREATE INDEX idx_pending_charges_task_id ON public.pending_charges(task_id);
CREATE INDEX idx_pending_charges_user_id ON public.pending_charges(user_id);
CREATE INDEX idx_pending_charges_status ON public.pending_charges(status);

-- 更新时间戳触发器
CREATE TRIGGER set_generation_tasks_updated_at
  BEFORE UPDATE ON public.generation_tasks
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 自动更新队列位置的函数
CREATE OR REPLACE FUNCTION public.update_queue_positions()
RETURNS TRIGGER AS $$
BEGIN
  -- 重新计算所有待处理任务的队列位置
  WITH numbered_tasks AS (
    SELECT 
      task_id,
      ROW_NUMBER() OVER (ORDER BY priority DESC, created_at ASC) as new_position
    FROM public.generation_tasks 
    WHERE status = 'pending'
  )
  UPDATE public.generation_tasks 
  SET queue_position = numbered_tasks.new_position
  FROM numbered_tasks 
  WHERE public.generation_tasks.task_id = numbered_tasks.task_id;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 队列位置更新触发器
CREATE TRIGGER update_queue_positions_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.generation_tasks
  FOR EACH STATEMENT EXECUTE FUNCTION public.update_queue_positions();

-- 积分预扣费函数
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
  
  -- 记录预扣费
  INSERT INTO public.pending_charges (task_id, user_id, amount)
  VALUES (p_task_id, p_user_id, p_amount);
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 积分确认扣费函数
CREATE OR REPLACE FUNCTION public.confirm_charge(
  p_task_id TEXT
)
RETURNS VOID AS $$
DECLARE
  charge_record RECORD;
BEGIN
  -- 获取预扣费记录
  SELECT * INTO charge_record
  FROM public.pending_charges 
  WHERE task_id = p_task_id AND status = 'pending';
  
  IF FOUND THEN
    -- 确认扣费：从冻结积分转为已使用积分
    UPDATE public.user_credits 
    SET 
      used_credits = used_credits + charge_record.amount,
      frozen_credits = frozen_credits - charge_record.amount
    WHERE user_id = charge_record.user_id;
    
    -- 更新预扣费状态
    UPDATE public.pending_charges 
    SET 
      status = 'confirmed',
      confirmed_at = NOW()
    WHERE task_id = p_task_id;
    
    -- 记录交易
    INSERT INTO public.credit_transactions (
      user_id, type, amount, description, generation_id
    ) VALUES (
      charge_record.user_id, 
      'spent', 
      -charge_record.amount, 
      'Task completed: ' || p_task_id,
      p_task_id
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 积分退款函数
CREATE OR REPLACE FUNCTION public.refund_charge(
  p_task_id TEXT,
  p_reason TEXT DEFAULT 'Task failed'
)
RETURNS VOID AS $$
DECLARE
  charge_record RECORD;
BEGIN
  -- 获取预扣费记录
  SELECT * INTO charge_record
  FROM public.pending_charges 
  WHERE task_id = p_task_id AND status = 'pending';
  
  IF FOUND THEN
    -- 退还积分：从冻结积分中减去
    UPDATE public.user_credits 
    SET frozen_credits = frozen_credits - charge_record.amount
    WHERE user_id = charge_record.user_id;
    
    -- 更新预扣费状态
    UPDATE public.pending_charges 
    SET 
      status = 'refunded',
      refunded_at = NOW()
    WHERE task_id = p_task_id;
    
    -- 记录交易
    INSERT INTO public.credit_transactions (
      user_id, type, amount, description, generation_id
    ) VALUES (
      charge_record.user_id, 
      'earned', 
      charge_record.amount, 
      'Refund: ' || p_reason || ' - ' || p_task_id,
      p_task_id
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;