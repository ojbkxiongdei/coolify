-- 创建 generated-images 存储桶
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'generated-images',
  'generated-images',
  true,
  10485760, -- 10MB 限制
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']
);

-- 启用 RLS 策略
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 允许用户查看自己的图像
CREATE POLICY "Users can view own images" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'generated-images' AND 
    (auth.uid()::text = (storage.foldername(name))[1])
  );

-- 允许用户上传图像到自己的文件夹
CREATE POLICY "Users can upload own images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'generated-images' AND 
    (auth.uid()::text = (storage.foldername(name))[1])
  );

-- 允许用户删除自己的图像
CREATE POLICY "Users can delete own images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'generated-images' AND 
    (auth.uid()::text = (storage.foldername(name))[1])
  );

-- 允许用户更新自己的图像
CREATE POLICY "Users can update own images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'generated-images' AND 
    (auth.uid()::text = (storage.foldername(name))[1])
  ); 