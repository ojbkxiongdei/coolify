# DreamfinityX 配置指南

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 环境变量配置
复制 `.env.local` 文件并填入实际值：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🗄️ Supabase 数据库配置

### 1. 创建 Supabase 项目
1. 访问 [Supabase Dashboard](https://app.supabase.com/)
2. 点击 "New Project"
3. 填写项目信息并创建项目
4. 等待项目初始化完成

### 2. 获取配置信息
在项目设置中获取：
- `NEXT_PUBLIC_SUPABASE_URL`: 项目 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 匿名密钥
- `SUPABASE_SERVICE_ROLE_KEY`: 服务角色密钥

### 3. 执行数据库 Schema
1. 打开 Supabase Dashboard 的 SQL Editor
2. 复制 `lib/database/schema.sql` 的内容
3. 执行 SQL 创建表结构

### 4. 设置存储桶 (Storage) - 简化配置

#### 方法1：手动创建（推荐）
1. 前往 "Storage" 页面
2. 点击 "Create bucket"
3. **配置参数：**
   - 桶名称：`generated-images`
   - **Public**: ✅ **设为公共**（简化方案）
   - 文件大小限制：10MB
   - 允许的文件类型：image/png, image/jpeg, image/jpg, image/gif, image/webp

#### 方法2：使用SQL脚本
1. 在 Supabase Dashboard 中打开 SQL Editor
2. 复制 `lib/database/storage-setup.sql` 的内容
3. 执行 SQL 创建存储桶

#### 🔒 安全特性

虽然使用公共存储桶，但仍有安全保护：
1. **用户隔离**：文件按用户ID分文件夹存储
2. **复杂文件名**：使用时间戳+随机字符串防止猜测
3. **访问控制**：只有登录用户才能上传文件
4. **应用层保护**：通过代码逻辑限制访问

#### 📝 关于安全性

- **开发测试**：当前方案足够安全，便于开发
- **生产环境**：如需更高安全性，可考虑私有存储桶+手动RLS策略
- **文件保护**：即使是公共存储桶，也很难被恶意访问

## 🔐 Google OAuth 配置

### 1. 创建 Google Cloud 项目
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API

### 2. 配置 OAuth 同意屏幕
1. 导航至 "API和服务" → "OAuth同意屏幕"
2. 选择 "外部" 用户类型
3. 填写应用信息：
   - 应用名称：DreamfinityX
   - 用户支持邮箱：您的邮箱
   - 开发者联系信息：您的邮箱

### 3. 创建 OAuth 凭据
1. 前往 "API和服务" → "凭据"
2. 点击 "创建凭据" → "OAuth 2.0客户端ID"
3. 应用类型：Web应用
4. 添加授权的重定向URI：
   - 本地开发：`http://localhost:3000/api/auth/callback`
   - 生产环境：`https://yourdomain.com/api/auth/callback`
5. 保存并记录客户端ID和客户端密钥

### 4. 在 Supabase 中配置 Google OAuth
1. 打开 Supabase Dashboard
2. 导航至 "Authentication" → "Settings"
3. 在 "Auth Providers" 部分找到 Google
4. 启用 Google 认证并填入：
   - Client ID：从 Google Cloud Console 获取
   - Client Secret：从 Google Cloud Console 获取
5. 保存设置

## 🔧 本地开发

### 1. 启动开发服务器
```bash
npm run dev
```

### 2. 访问应用
打开浏览器访问 `http://localhost:3000`

## 📋 功能说明

### 用户认证
- ✅ Google OAuth 登录
- ✅ 自动创建用户配置
- ✅ 会话管理

### 图像生成
- ✅ 文本到图像生成
- ✅ 图像编辑
- ✅ 多种尺寸和质量选项
- ✅ 批量生成

### 数据库功能
- ✅ 保存生成历史
- ✅ 用户偏好设置
- ✅ 收藏功能
- ✅ 行级安全策略

### 页面功能
- ✅ 主页：图像生成和编辑
- ✅ 历史页面：`/history`
- ✅ 响应式设计
- ✅ SEO 优化

## 🔒 安全特性

### 行级安全 (RLS)
- 用户只能访问自己的数据
- 自动的数据隔离
- 防止未授权访问

### 中间件保护
- 自动会话刷新
- 安全的 Cookie 管理
- 跨域保护

## 🚀 部署

### Vercel 部署
1. 连接 GitHub 仓库
2. 设置环境变量
3. 部署应用

### 环境变量检查清单
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `NEXT_PUBLIC_SITE_URL`

### 部署后配置
1. 更新 Google OAuth 重定向URI
2. 更新 Supabase 站点URL设置
3. 测试认证流程

## 🔧 故障排除

### 常见问题

#### Google 登录失败
1. 检查 OAuth 配置是否正确
2. 确认重定向URI配置
3. 检查 Supabase 中的 Google 设置

#### 数据库连接失败
1. 检查 Supabase 环境变量
2. 确认数据库表已创建
3. 检查 RLS 策略

#### 图像生成失败
1. 检查 Azure OpenAI API 配置
2. 确认 API 密钥有效
3. 检查网络连接

## 🎯 下一步

### 可选增强功能
- [ ] 支付集成（Stripe）
- [ ] 图像云存储
- [ ] 用户仪表板
- [ ] 图像分享功能
- [ ] 批量下载

### 性能优化
- [ ] 图像 CDN
- [ ] 缓存策略
- [ ] 数据库优化
- [ ] 代码分割

## 📞 技术支持

如果遇到问题，请检查：
1. 环境变量配置
2. 数据库表结构
3. Google OAuth 设置
4. Supabase 项目状态

---

**注意：** 请妥善保管您的API密钥和数据库凭据，不要提交到版本控制系统中。 