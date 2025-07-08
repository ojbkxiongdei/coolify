# 故障排除指南

## 🔧 常见问题解决方案

### 1. 图像生成成功但保存失败

**症状：**
- 图像已生成并显示在浏览器中
- 生成按钮持续转圈
- 控制台显示 "Failed to fetch" 错误
- 数据库插入失败

**原因：**
- 存储桶未创建或配置错误
- 图像URL太长（Base64数据）
- 存储权限问题

**解决方案：**

#### 步骤1：创建存储桶
1. 打开 [Supabase Dashboard](https://app.supabase.com/)
2. 前往您的项目
3. 点击 "Storage" 页面
4. 点击 "Create bucket"
5. 桶名称：`generated-images`
6. 设置为公共 (Public)
7. 点击 "Create bucket"

#### 步骤2：执行存储策略
1. 打开 "SQL Editor"
2. 复制 `lib/database/storage-setup.sql` 的内容
3. 执行 SQL 创建存储策略

#### 步骤3：检查存储桶权限
确保以下策略已创建：
- `Users can view own images`
- `Users can upload own images`
- `Users can delete own images`
- `Users can update own images`

### 2. 图像无法显示

**症状：**
- 历史页面中图像显示为空白
- 控制台显示图像加载错误

**解决方案：**

#### 检查存储桶公共访问
1. 在 Supabase Dashboard 的 Storage 页面
2. 确保 `generated-images` 桶是公共的
3. 如果不是，点击桶名称 → Settings → Make public

#### 检查Next.js配置
确保 `next.config.js` 中包含Supabase域名：
```javascript
domains: ['localhost', 'wweiaejnhpdimbwncvxv.supabase.co']
```

### 3. 用户认证问题

**症状：**
- 无法登录
- 显示 "User not authenticated" 错误

**解决方案：**

#### 检查Google OAuth配置
1. 在 Google Cloud Console 中确认重定向URI：
   - `https://wweiaejnhpdimbwncvxv.supabase.co/auth/v1/callback`
2. 在 Supabase Dashboard 的 Authentication → Settings
3. 确保Google provider已启用并配置正确

### 4. 数据库连接问题

**症状：**
- 数据库查询失败
- 控制台显示Supabase连接错误

**解决方案：**

#### 检查环境变量
确保 `.env.local` 文件中包含：
```
NEXT_PUBLIC_SUPABASE_URL=https://wweiaejnhpdimbwncvxv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

#### 检查数据库表
1. 在 Supabase Dashboard 的 Table Editor
2. 确保以下表已创建：
   - `user_profiles`
   - `image_generations`
   - `user_preferences`

### 5. 开发服务器问题

**症状：**
- 开发服务器无法启动
- 端口冲突

**解决方案：**

#### 更改端口
```bash
npm run dev -- --port 3001
```

#### 清理缓存
```bash
rm -rf .next
npm run dev
```

## 🔍 调试技巧

### 1. 检查控制台日志
打开浏览器开发者工具，查看：
- Console 选项卡：JavaScript错误
- Network 选项卡：API请求状态

### 2. 检查Supabase日志
1. 在 Supabase Dashboard
2. 前往 "Logs" 页面
3. 查看API请求和错误日志

### 3. 测试存储桶
在Supabase Dashboard的Storage页面：
1. 手动上传一张测试图片
2. 检查是否能够访问公共URL
3. 验证权限策略是否正确

## 📞 获取帮助

如果问题仍未解决：

1. **检查版本兼容性**
   - Next.js 14+
   - Supabase JavaScript客户端最新版本

2. **重新部署**
   - 清理缓存：`rm -rf .next node_modules`
   - 重新安装：`npm install`
   - 重启开发服务器：`npm run dev`

3. **查看详细错误**
   - 启用详细日志记录
   - 检查完整的错误堆栈跟踪

## 🎯 预防措施

1. **定期备份**
   - 导出数据库Schema
   - 备份存储桶内容

2. **监控配额**
   - 检查Supabase项目配额
   - 监控存储使用情况

3. **更新依赖**
   - 定期更新Supabase客户端
   - 保持Next.js版本最新 