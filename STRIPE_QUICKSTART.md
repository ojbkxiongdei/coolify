# 🚀 Stripe 测试模式快速开始

## 🎯 目标
让您快速配置 Stripe 测试模式，立即开始测试支付功能

## ⚡ 3分钟配置步骤

### 步骤 1: 获取 Stripe 测试密钥
1. 访问: https://dashboard.stripe.com/apikeys
2. **确保左上角显示 "Test mode"** 
3. 复制这两个密钥:
   - `Publishable key` (以 pk_test_ 开头)
   - `Secret key` (以 sk_test_ 开头，点击 "Reveal" 显示)

### 步骤 2: 配置环境变量
打开项目根目录的 `.env.local` 文件，替换以下三行:

```bash
***REMOVED***=sk_test_您的密钥
***REMOVED***=pk_test_您的密钥  
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

### 步骤 3: 测试配置
```bash
npm run dev
node scripts/test-stripe.js
```

看到 "🎉 Stripe 配置完成！" 就成功了！

## 🧪 开始测试

1. 访问: http://localhost:3001/pricing
2. 选择任意订阅计划或 Credits 包
3. 使用测试卡号: `4242 4242 4242 4242`
4. 输入任意未来日期和 CVC

## 💡 测试卡号

| 卡号 | 结果 |
|------|------|
| `4242 4242 4242 4242` | ✅ 支付成功 |
| `4000 0000 0000 0002` | ❌ 卡被拒绝 |
| `4000 0000 0000 9995` | ❌ 余额不足 |

## ❓ 遇到问题？

**支付失败**: 确保使用测试卡号，不要用真实卡号
**配置错误**: 运行 `node scripts/test-stripe.js` 查看详细错误信息
**Webhook**: 不是必需的，可以跳过

配置完成后您就可以测试完整的支付流程了！🎉 