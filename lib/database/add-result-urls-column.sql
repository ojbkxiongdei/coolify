-- 添加图片URL字段到generation_tasks表
ALTER TABLE public.generation_tasks 
ADD COLUMN IF NOT EXISTS result_urls TEXT[]; -- 存储Cloudinary图片URL数组

-- 添加注释
COMMENT ON COLUMN public.generation_tasks.result_urls IS 'Array of Cloudinary image URLs for completed tasks';

-- 创建索引以优化查询
CREATE INDEX IF NOT EXISTS idx_generation_tasks_result_urls ON public.generation_tasks USING GIN(result_urls);

-- 更新现有完成的任务，将result_urls设置为空数组（如果它们是NULL）
UPDATE public.generation_tasks 
SET result_urls = '{}' 
WHERE result_urls IS NULL AND status = 'completed';