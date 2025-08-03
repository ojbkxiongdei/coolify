-- 修复触发器递归问题
-- 删除有问题的触发器
DROP TRIGGER IF EXISTS update_queue_positions_trigger ON public.generation_tasks;

-- 删除有问题的函数
DROP FUNCTION IF EXISTS public.update_queue_positions();

-- 创建一个简化的触发器函数，避免递归
CREATE OR REPLACE FUNCTION public.update_queue_positions_simple()
RETURNS TRIGGER AS $$
BEGIN
  -- 只在插入新的 pending 任务时更新队列位置
  IF TG_OP = 'INSERT' AND NEW.status = 'pending' THEN
    -- 计算当前任务的队列位置
    UPDATE public.generation_tasks 
    SET queue_position = (
      SELECT COUNT(*) + 1 
      FROM public.generation_tasks 
      WHERE status = 'pending' 
      AND created_at < NEW.created_at
    )
    WHERE task_id = NEW.task_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建新的触发器，只在插入时触发
CREATE TRIGGER update_queue_position_on_insert
  AFTER INSERT ON public.generation_tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_queue_positions_simple();

-- 或者更简单的方案：完全移除自动更新，在查询时计算队列位置
-- 删除上面的触发器和函数，改为在API中动态计算
DROP TRIGGER IF EXISTS update_queue_position_on_insert ON public.generation_tasks;
DROP FUNCTION IF EXISTS public.update_queue_positions_simple();