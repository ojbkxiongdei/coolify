#!/bin/bash

echo "🔧 Stripe配置更新脚本"
echo "===================="
echo ""

# 检查当前配置
echo "📋 当前配置:"
grep STRIPE .env.local
echo ""

echo "请按照以下步骤获取Stripe密钥:"
echo "1. 访问: https://dashboard.stripe.com/apikeys"
echo "2. 选择模式:"
echo "   - 测试模式 (Test mode): 用于开发和测试"
echo "   - 生产模式 (Live mode): 用于实际用户交易"
echo "3. 复制以下两个密钥:"
echo "   - Publishable key (pk_test_... 或 pk_live_...)"
echo "   - Secret key (sk_test_... 或 sk_live_...) - 点击 'Reveal' 显示"
echo ""

# 交互式更新
read -p "请输入您的 Secret Key (sk_test_... 或 sk_live_...): " SECRET_KEY
read -p "请输入您的 Publishable Key (pk_test_... 或 pk_live_...): " PUBLISHABLE_KEY

# 验证密钥格式
if [[ ! $SECRET_KEY =~ ^sk_(test|live)_ ]]; then
    echo "❌ Secret Key格式错误，应该以 'sk_test_' 或 'sk_live_' 开头"
    exit 1
fi

if [[ ! $PUBLISHABLE_KEY =~ ^pk_(test|live)_ ]]; then
    echo "❌ Publishable Key格式错误，应该以 'pk_test_' 或 'pk_live_' 开头"
    exit 1
fi

# 检查模式一致性
if [[ $SECRET_KEY =~ ^sk_test_ && $PUBLISHABLE_KEY =~ ^pk_test_ ]]; then
    echo "✅ 检测到测试模式配置"
    MODE="测试模式"
elif [[ $SECRET_KEY =~ ^sk_live_ && $PUBLISHABLE_KEY =~ ^pk_live_ ]]; then
    echo "✅ 检测到生产模式配置"
    MODE="生产模式"
else
    echo "❌ 密钥模式不一致！请确保两个密钥都来自同一模式（测试或生产）"
    exit 1
fi

# 备份原文件
cp .env.local .env.local.backup

# 更新配置
sed -i '' "s/***REMOVED***=.*/***REMOVED***=$SECRET_KEY/" .env.local
sed -i '' "s/***REMOVED***=.*/***REMOVED***=$PUBLISHABLE_KEY/" .env.local

echo ""
echo "✅ 配置已更新为 $MODE！"
echo ""
echo "📋 新配置:"
grep STRIPE .env.local
echo ""

if [[ $MODE == "测试模式" ]]; then
    echo "🧪 现在可以测试配置:"
    echo "node scripts/test-stripe.js"
    echo ""
    echo "🚀 重启开发服务器:"
    echo "npm run dev"
else
    echo "🚀 生产模式已配置完成！"
    echo "⚠️  注意：生产模式将处理真实的付款，请谨慎操作"
    echo "🚀 重启服务器:"
    echo "npm run dev"
fi
echo "" 