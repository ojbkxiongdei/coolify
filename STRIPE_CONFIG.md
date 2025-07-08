# 🏦 Stripe 快速配置指南 (测试模式)

## 📍 当前状态
❌ 需要配置 Stripe API 密钥 (Webhook 可选)
🧪 **推荐**: 使用测试模式进行开发和测试

## 🚀 快速设置步骤

### 1. 获取 API 密钥 (2分钟)

1. 访问: [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
2. **确保处于测试模式** (页面左上角应显示 "Test mode")
3. 复制两个密钥:
   - **Publishable key** (pk_test_...)
   - **Secret key** (sk_test_...) - 点击 "Reveal" 显示

### 2. 设置 Webhook (可选 - 推荐但非必需)

**💡 说明**: 我们已经实现了支付验证API，Webhook不再是必需的。但设置Webhook可以提供更好的可靠性。

**如果要设置Webhook**:
1. 访问: [https://dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. 点击 "Add endpoint"
3. 端点URL: `http://localhost:3000/api/webhooks/stripe`
4. 选择事件:
   ```
   ✅ checkout.session.completed
   ✅ customer.subscription.created
   ✅ customer.subscription.updated
   ✅ customer.subscription.deleted
   ✅ invoice.payment_succeeded
   ```
5. 创建后复制 "Signing secret" (whsec_...)

**如果跳过Webhook**: 支付成功后会通过success页面自动验证并处理。

### 3. 更新 .env.local 文件

在 `.env.local` 文件中添加 (替换现有的占位符):

```bash
# Stripe 配置 (必需 - 测试模式)
***REMOVED***=sk_test_你从控制台复制的密钥
***REMOVED***=pk_test_你从控制台复制的密钥
NEXT_PUBLIC_BASE_URL=http://localhost:3001

# Webhook 配置 (可选)
# ***REMOVED***=whsec_你从webhook设置中复制的密钥
```

**注意**: 
- 确保使用 `sk_test_` 开头的密钥 (测试模式)
- 服务器运行在 3001 端口，所以 BASE_URL 应该是 `http://localhost:3001`

### 4. 测试配置

```bash
node scripts/test-stripe.js
```

看到 "🎉 Stripe 配置完成！" 就说明设置成功了。

## 🔗 重要链接

- **API 密钥**: https://dashboard.stripe.com/apikeys
- **Webhook 设置**: https://dashboard.stripe.com/webhooks  
- **测试卡号**: https://stripe.com/docs/testing#cards

## 🧪 测试卡号 (用于开发测试)

| 卡号 | 用途 |
|------|------|
| `4242424242424242` | 成功支付 |
| `4000000000000002` | 卡被拒绝 |
| `4000000000009995` | 余额不足 |

## ❓ 常见问题

**Q: 找不到 Secret key?**
A: 在 API keys 页面点击 "Reveal" 按钮显示完整密钥

**Q: 不想配置 Webhook?**
A: 没问题！系统会通过支付成功页面自动处理，功能完全正常

**Q: Webhook 测试失败?**  
A: Webhook是可选的，不影响核心功能。如需配置，确保开发服务器运行在 localhost:3000

**Q: 支付测试失败?**
A: 使用测试卡号 4242424242424242，过期日期任选未来日期

## 🆘 需要帮助？

配置过程中遇到问题，请：
1. 检查 Stripe 控制台是否正确显示密钥
2. 确认 .env.local 文件格式正确
3. 运行测试脚本查看具体错误信息 