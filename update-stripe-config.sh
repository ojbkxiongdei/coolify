#!/bin/bash

echo "🔧 Stripe配置更新脚本"
echo "===================="
echo ""

# 检查当前配置
echo "📋 当前配置:"
grep STRIPE .env.local
echo ""

echo "请按照以下步骤获取真实的Stripe密钥:"
echo "1. 访问: https://dashboard.stripe.com/apikeys"
echo "2. 确保左上角显示 'Test mode'"
echo "3. 复制以下两个密钥:"
echo "   - Publishable key (pk_test_...)"
echo "   - Secret key (sk_test_...) - 点击 'Reveal' 显示"
echo ""

# 交互式更新
read -p "请输入您的 Secret Key (sk_test_...): " SECRET_KEY
read -p "请输入您的 Publishable Key (pk_test_...): " PUBLISHABLE_KEY

# 验证密钥格式
if [[ ! $SECRET_KEY =~ ^sk_test_ ]]; then
    echo "❌ Secret Key格式错误，应该以 'sk_test_' 开头"
    exit 1
fi

if [[ ! $PUBLISHABLE_KEY =~ ^pk_test_ ]]; then
    echo "❌ Publishable Key格式错误，应该以 'pk_test_' 开头"
    exit 1
fi

# 备份原文件
cp .env.local .env.local.backup

# 更新配置
sed -i '' "s/***REMOVED***=.*/***REMOVED***=$SECRET_KEY/" .env.local
sed -i '' "s/***REMOVED***=.*/***REMOVED***=$PUBLISHABLE_KEY/" .env.local

echo ""
echo "✅ 配置已更新！"
echo ""
echo "📋 新配置:"
grep STRIPE .env.local
echo ""
echo "🧪 现在可以测试配置:"
echo "node scripts/test-stripe.js"
echo ""
echo "🚀 重启开发服务器:"
echo "npm run dev" 