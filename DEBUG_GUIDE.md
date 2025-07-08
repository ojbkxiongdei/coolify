# 🔧 调试指南

## 🎯 常见问题排查

### 1. Dashboard页面报错

#### 问题现象
- 访问 `/dashboard` 时出现错误
- API调用失败
- 数据无法加载

#### 排查步骤

1. **检查登录状态**
   ```bash
   # 在浏览器控制台执行
   localStorage.getItem('supabase.auth.token')
   ```

2. **检查API响应**
   ```bash
   # 检查Network标签页中的API调用
   /api/credits/balance
   /api/subscriptions/current
   ```

3. **查看控制台错误**
   - 打开浏览器开发者工具
   - 查看Console标签页的错误信息
   - 查看Network标签页的失败请求

#### 常见解决方案

**用户未登录**
- 现象：API返回401 Unauthorized
- 解决：重新登录或清除浏览器数据

**数据初始化失败**
- 现象：credits balance API报错
- 解决：系统会自动创建初始记录

**Supabase连接问题**
- 现象：所有API调用失败
- 解决：检查环境变量配置

### 2. 登录状态频繁Loading

#### 问题现象
- 每次切换页面都显示loading
- 用户状态不稳定

#### 解决方案

✅ **已优化**: 新版本useUser hook使用了：
- 全局状态缓存
- 5分钟缓存时间
- 减少重复API调用

#### 验证修复
1. 刷新页面，登录一次
2. 切换不同页面
3. 应该不再频繁显示loading

### 3. Stripe配置错误

#### 问题现象
- 支付流程失败
- API密钥错误

#### 排查步骤

1. **测试配置**
   ```bash
   node scripts/test-stripe.js
   ```

2. **检查环境变量**
   ```bash
   cat .env.local | grep STRIPE
   ```

3. **验证密钥格式**
   - Secret key: `sk_test_...`
   - Publishable key: `pk_test_...`

## 🚨 错误代码对照

| 错误代码 | 含义 | 解决方案 |
|---------|------|----------|
| 401 | 未授权 | 重新登录 |
| 500 | 服务器错误 | 检查API实现 |
| PGRST116 | 数据不存在 | 系统自动创建 |

## 🔍 实时调试

### 浏览器控制台命令

```javascript
// 检查用户状态
console.log('User:', localStorage.getItem('supabase.auth.token'))

// 测试API
fetch('/api/credits/balance').then(r => r.json()).then(console.log)
fetch('/api/subscriptions/current').then(r => r.json()).then(console.log)

// 清除缓存
localStorage.clear()
location.reload()
```

### 开发者工具

1. **Network面板**：查看API请求和响应
2. **Console面板**：查看错误日志
3. **Application面板**：查看localStorage数据

## 📞 获取帮助

如果问题仍然存在：

1. 截图错误信息
2. 提供浏览器控制台日志
3. 描述重现步骤

**调试完成后记得清除敏感信息！** 🔒 