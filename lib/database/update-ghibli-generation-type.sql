-- 首先删除现有的约束（如果存在）
ALTER TABLE image_generations DROP CONSTRAINT IF EXISTS check_generation_type;

-- 添加新的约束，包括ghibli-style-convert类型
ALTER TABLE image_generations 
ADD CONSTRAINT check_generation_type 
CHECK (generation_type IN ('text-to-image', 'image-edit', 'pixar-style-convert', 'ghibli-style-convert'));

-- 添加索引，以优化按类型查询
CREATE INDEX IF NOT EXISTS idx_image_generations_type 
  ON public.image_generations(generation_type);

-- 更新表注释
COMMENT ON COLUMN image_generations.generation_type IS 
'Generation type: text-to-image, image-edit, pixar-style-convert, or ghibli-style-convert'; 