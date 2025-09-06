# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
DreamfinityX 是一个面向海外用户的 AI 创意平台，使用 Next.js 14 App Router 构建。平台提供 AI 图像生成、编辑和风格转换等功能。

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui components
- **认证/数据库**: Supabase
- **支付**: Stripe
- **AI 服务**: Azure OpenAI (GPT-4, DALL-E)
- **图片存储**: Cloudinary
- **部署**: Vercel

## Common Development Commands

### 基础命令
```bash
npm run dev        # 启动开发服务器 (localhost:3000)
npm run build      # 构建生产版本（会自动更新缓存版本）
npm run start      # 启动生产服务器
npm run lint       # 运行 ESLint 检查
```

### 测试相关
```bash
npx playwright test           # 运行所有 Playwright 测试
npx playwright test --ui      # 使用 UI 模式运行测试
```

## 项目架构

### 目录结构
- **app/**: Next.js App Router 页面和 API 路由
  - **api/**: 后端 API endpoints
    - `generate-image/`: AI 图像生成
    - `edit-image/`: AI 图像编辑
    - `tasks/`: 异步任务队列系统
    - `credits/`: 积分系统
    - `subscriptions/`: 订阅管理
    - `webhooks/stripe/`: Stripe 支付回调
  - **images/**: 图像相关页面
  - **pricing/**: 定价页面
  - **auth/**: 认证相关页面

- **components/**: React 组件
  - **ui/**: 基础 UI 组件 (基于 shadcn/ui)
  - 核心功能组件: ImageGenerator, TaskQueue, UserDropdown 等

- **lib/**: 工具函数和配置
  - **supabase/**: Supabase 客户端配置
  - **hooks/**: 自定义 React Hooks
  - **utils/**: 工具函数
  - **cloudinary.ts**: 图片上传配置

### 核心功能模块

#### 1. 任务队列系统 (Task Queue)
- 位置: `components/TaskQueue.tsx`, `app/api/tasks/*`
- 功能: 处理异步 AI 图像生成任务
- 流程: 提交任务 → 轮询状态 → 获取结果
- SSE 支持: 实时状态更新

#### 2. 积分系统 (Credits System)
- API: `/api/credits/*`
- 功能: 用户积分购买、消费、余额查询
- 与 Stripe 集成处理支付

#### 3. 图像生成与编辑
- Text-to-Image: `components/ImageGenerator.tsx`
- Image Editor: `components/ImageEditor.tsx`
- 风格转换: GhibliStyleConverter, PixarStyleConverter
- 支持异步和同步两种模式

#### 4. 认证系统
- 基于 Supabase Auth
- Google OAuth 登录
- Middleware 处理会话更新

## 环境变量配置
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Azure OpenAI
AZURE_ENDPOINT=
AZURE_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## 重要的中间件和路由规则

### Middleware (`middleware.ts`)
处理以下重定向:
- 历史页面到外部独立站的永久重定向 (如 elf-name-generator → elfname.pro)
- 图像功能页面的规范化路径重定向
- URL 参数规范化，避免重复内容

### URL 规范化
- 自动移除尾部斜杠
- 处理带参数的 URL 规范链接
- 308 永久重定向优化 SEO

## 开发注意事项

1. **代码风格**: 
   - 使用英文作为代码和注释的默认语言
   - 遵循现有的 TypeScript 严格模式配置
   - 使用 shadcn/ui 组件库的设计模式

2. **异步处理**:
   - 优先使用任务队列系统处理耗时操作
   - 实现适当的加载状态和错误处理

3. **SEO 优化**:
   - 每个页面都有独立的 SEO 组件
   - 使用 StructuredData 组件添加结构化数据
   - 注意 URL 规范化避免重复内容

4. **性能优化**:
   - 图片使用 Cloudinary 进行优化和 CDN 分发
   - 实施图片缓存管理 (`lib/utils/imageCacheManager.ts`)
   - Webpack chunk 分割配置优化加载性能

5. **错误处理**:
   - 使用 ErrorBoundary 组件捕获组件错误
   - API 路由统一返回格式，包含 success 标识

## 部署流程
1. 代码推送到 GitHub main 分支
2. Vercel 自动构建和部署
3. 构建时自动更新缓存版本 (`scripts/update-cache-version.js`)
4. 生产环境自动应用环境变量

## 常见问题排查
- Chunk 加载错误: 检查 `lib/utils/chunkErrorHandler.ts`
- 支付问题: 查看 Stripe webhook 日志和 `/api/webhooks/stripe/route.ts`
- 图片上传失败: 检查 Cloudinary 配置和 API 限额
- 任务队列卡住: 检查任务状态和错误日志