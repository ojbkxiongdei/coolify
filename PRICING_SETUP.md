# DreamfinityX 定价模块设置指南

## 📋 功能概述

定价模块包含以下核心功能：
- 🎯 **订阅计划**：Starter、Creator、Pro Studio 三种月度订阅
- 💳 **Credits系统**：按质量消耗credits（低=1, 中=4, 高=15 credits）
- 🛒 **按需购买**：300/1000 credits包
- 📊 **用户控制台**：订阅状态、credits余额、使用历史
- 🔄 **自动重置**：每月自动重置订阅credits
- 🔐 **权限控制**：未登录用户无法生成，非会员引导转化

## 🚀 快速开始

### 1. 数据库设置

在您的Supabase项目中执行以下SQL：

```sql
-- 执行 lib/database/pricing-schema.sql 中的所有SQL语句
```

### 2. 环境变量配置

在您的 `.env.local` 文件中添加：

```bash
# Stripe 配置
***REMOVED***=sk_test_xxx                    # Stripe 私钥
***REMOVED***=pk_test_xxx   # Stripe 公钥
***REMOVED***=whsec_xxx                  # Webhook 密钥

# 项目配置
NEXT_PUBLIC_BASE_URL=http://localhost:3000       # 网站基础URL（生产环境改为实际域名）
```

### 3. 安装依赖

```bash
npm install stripe @stripe/stripe-js @types/stripe
```

### 4. 创建 Stripe 产品

在Stripe控制台中创建产品和价格，或者让系统自动创建（推荐）。

### 5. 设置 Webhook

在Stripe控制台中设置webhook端点：
- URL: `https://yourdomain.com/api/webhooks/stripe`
- 事件: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`

## 💰 定价计划

### 订阅计划

| 计划 | 价格 | Credits/月 | 适用场景 |
|------|------|-----------|----------|
| **Starter** | $14.9/月 | 400 | 个人用户，≈100中质量或26高质量图片 |
| **Creator** | $29.9/月 | 1000 | 内容创作者，≈250中质量或66高质量图片 |
| **Pro Studio** | $49.9/月 | 2400 | 专业工作室，≈600中质量或160高质量图片 |

### 按需购买

| 包 | 价格 | Credits | 单价 |
|------|------|---------|------|
| **小包** | $9.9 | 300 | $0.033/Credit |
| **大包** | $29.0 | 1000 | $0.029/Credit |

### Credits消耗规则

| 图片质量 | 消耗Credits | OpenAI成本 |
|----------|-------------|-----------|
| **低质量** | 1 Credit | ≈$0.01 |
| **中质量** | 4 Credits | ≈$0.04 |
| **高质量** | 15 Credits | ≈$0.17 |

## 📁 文件结构

```
app/
├── api/
│   ├── subscriptions/
│   │   ├── plans/route.ts          # 获取订阅计划
│   │   ├── current/route.ts        # 获取当前订阅
│   │   └── create/route.ts         # 创建订阅
│   ├── credits/
│   │   ├── packages/route.ts       # 获取credit包
│   │   ├── balance/route.ts        # 获取credit余额
│   │   ├── consume/route.ts        # 消耗credits
│   │   └── purchase/route.ts       # 购买credits
│   ├── webhooks/
│   │   └── stripe/route.ts         # Stripe webhook处理
│   └── generate-image/route.ts     # 修改后的图片生成API
├── pricing/page.tsx                # 定价页面
├── dashboard/page.tsx              # 用户控制台
├── success/page.tsx                # 支付成功页面
└── ...

lib/
└── database/
    └── pricing-schema.sql          # 数据库表结构

components/
└── ui/
    └── badge.tsx                   # 新增Badge组件
```

## 🔧 API 端点

### 订阅相关
- `GET /api/subscriptions/plans` - 获取订阅计划
- `GET /api/subscriptions/current` - 获取当前订阅
- `POST /api/subscriptions/create` - 创建订阅

### Credits相关
- `GET /api/credits/packages` - 获取credit包
- `GET /api/credits/balance` - 获取credit余额
- `GET /api/credits/consume` - 检查credit是否足够
- `POST /api/credits/consume` - 消耗credits
- `POST /api/credits/purchase` - 购买credits

### Webhook
- `POST /api/webhooks/stripe` - Stripe webhook处理

## 🎨 页面路由

- `/pricing` - 定价页面，显示所有订阅计划和credit包
- `/dashboard` - 用户控制台，显示订阅状态和credit余额
- `/success` - 支付成功页面

## 🔐 权限控制

### 图片生成权限
1. **未登录用户**：无法生成图片，提示登录
2. **已登录用户**：检查credit余额
3. **余额不足**：提示购买credits或升级订阅
4. **余额充足**：允许生成并消耗相应credits

### 用户状态检查
- 每次生成图片前检查用户身份
- 验证credit余额是否充足
- 记录credit消耗和交易历史

## 📊 数据库表结构

### 核心表
- `subscription_plans` - 订阅计划
- `user_subscriptions` - 用户订阅记录
- `credit_packages` - Credit包
- `user_credits` - 用户credit余额
- `credit_transactions` - Credit交易历史

### 关键字段
- `total_credits` - 总credits（订阅+购买）
- `used_credits` - 已使用credits
- `subscription_credits` - 订阅获得的credits
- `purchased_credits` - 购买的credits
- `last_reset_at` - 上次重置时间

## 🔄 Credit重置逻辑

### 月度重置
- 每月订阅续费时自动重置
- 保留购买的credits
- 重置订阅credits到满额
- 清零used_credits

### 重置示例
```
重置前：
- total_credits: 1500 (订阅400 + 购买1100)
- used_credits: 300
- available: 1200

重置后：
- total_credits: 1500 (订阅400 + 购买1100)
- used_credits: 0
- available: 1500
```

## 🚨 错误处理

### 常见错误
1. **Insufficient credits** - Credit余额不足
2. **Unauthorized** - 未登录
3. **Invalid plan/package** - 无效的计划或包
4. **Payment failed** - 支付失败

### 错误响应格式
```json
{
  "error": "错误信息",
  "required": 15,
  "available": 5,
  "message": "您需要 15 Credits 但只有 5 Credits 可用"
}
```

## 🔧 开发测试

### 测试用例
1. **订阅流程**：选择计划 → 支付 → 激活订阅
2. **Credit购买**：选择包 → 支付 → 添加credits
3. **图片生成**：检查权限 → 消耗credits → 生成图片
4. **Monthly reset**：模拟webhook → 重置credits

### 测试数据
```sql
-- 插入测试用户credits
INSERT INTO public.user_credits (user_id, total_credits, used_credits, subscription_credits, purchased_credits)
VALUES ('test-user-id', 100, 20, 50, 50);
```

## 📝 部署清单

- [ ] 数据库迁移执行完成
- [ ] 环境变量配置完成
- [ ] Stripe webhook设置完成
- [ ] 测试支付流程正常
- [ ] 测试图片生成credit消耗
- [ ] 验证用户权限控制
- [ ] 测试订阅续费逻辑

## 🆘 故障排除

### 常见问题

1. **支付失败**
   - 检查Stripe密钥配置
   - 验证webhook URL
   - 查看Stripe日志

2. **Credit未增加**
   - 检查webhook事件处理
   - 验证数据库触发器
   - 查看交易记录

3. **图片生成失败**
   - 检查用户登录状态
   - 验证credit余额
   - 查看API错误日志

### 调试命令
```bash
# 查看数据库连接
npm run db:check

# 测试Stripe连接
npm run stripe:test

# 查看用户credits
npm run credits:check [user_id]
```

## 📞 技术支持

如有问题，请提供：
- 错误日志
- 用户ID
- 操作时间
- 预期行为vs实际行为

---

**注意**: 这是一个完整的定价模块实现，包含所有必要的功能和安全措施。在生产环境中使用前，请确保所有配置正确无误。 