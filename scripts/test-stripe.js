// Stripe 配置测试脚本
// 运行命令: node scripts/test-stripe.js

const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function testStripeConfig() {
  console.log('🔍 检查 Stripe 配置...\n');

  // 检查环境变量
  const requiredEnvVars = [
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', 
    'NEXT_PUBLIC_BASE_URL'
  ];

  // 可选的环境变量
  const optionalEnvVars = [
    'STRIPE_WEBHOOK_SECRET'
  ];

  let missingVars = [];
  
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    } else {
      console.log(`✅ ${varName}: ${process.env[varName].substring(0, 20)}...`);
    }
  });

  if (missingVars.length > 0) {
    console.log('\n❌ 缺少以下环境变量:');
    missingVars.forEach(varName => {
      console.log(`   - ${varName}`);
    });
    console.log('\n请在 .env.local 文件中添加这些变量');
    return;
  }

  // 检查可选环境变量
  console.log('\n📋 可选配置:');
  optionalEnvVars.forEach(varName => {
    if (process.env[varName]) {
      console.log(`✅ ${varName}: 已配置 (用于webhook)`)
    } else {
      console.log(`⚠️  ${varName}: 未配置 (不影响基本功能)`)
    }
  })

  // 测试 Stripe API 连接
  try {
    const Stripe = require('stripe');
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    console.log('\n🔗 测试 Stripe API 连接...');
    const account = await stripe.accounts.retrieve();
    console.log(`✅ Stripe 连接成功! 账户: ${account.display_name || account.id}`);
    
  } catch (error) {
    console.log('\n❌ Stripe API 连接失败:');
    console.log(`   错误: ${error.message}`);
    return;
  }

  console.log('\n🎉 Stripe 配置完成！可以开始测试支付功能了。');
  console.log('\n📝 下一步:');
  console.log('1. 启动开发服务器: npm run dev');
  console.log('2. 访问定价页面: http://localhost:3000/pricing');
  console.log('3. 测试订阅和支付流程');
}

testStripeConfig().catch(console.error); 