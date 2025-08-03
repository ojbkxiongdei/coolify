-- 数据库迁移：移除result_urls字段，添加images_generated字段
-- 执行前请先备份数据库！

-- 1. 添加新字段
ALTER TABLE public.generation_tasks 
ADD COLUMN IF NOT EXISTS images_generated INTEGER DEFAULT 0;

-- 2. 如果已有数据，尝试从result_urls推算images_generated的值
UPDATE public.generation_tasks 
SET images_generated = CASE 
  WHEN result_urls IS NOT NULL THEN array_length(result_urls, 1)
  ELSE 0 
END
WHERE images_generated = 0;

-- 3. 删除旧字段（慎重！会丢失所有已存储的图片URL）
-- 如果你想保留现有图片数据，请先手动备份result_urls列的数据
ALTER TABLE public.generation_tasks 
DROP COLUMN IF EXISTS result_urls;

-- 4. 清理内存缓存表（如果需要）
-- 这一步是可选的，主要是为了清理可能的遗留数据
-- 注意：这会清除所有现有的图片缓存
-- DELETE FROM public.generation_tasks WHERE status = 'completed' AND images_generated = 0;

-- 5. 验证表结构
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'generation_tasks' 
AND table_schema = 'public'
ORDER BY ordinal_position;