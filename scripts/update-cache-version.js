#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 生成新的缓存版本
const newVersion = `${Date.now()}.${Math.random().toString(36).substring(7)}`;

// 更新useUser.ts中的缓存版本
const userHookPath = path.join(process.cwd(), 'lib/hooks/useUser.ts');

try {
  let content = fs.readFileSync(userHookPath, 'utf8');
  
  // 替换缓存版本
  content = content.replace(
    /const CACHE_VERSION = ['"][^'"]*['"]/,
    `const CACHE_VERSION = '${newVersion}'`
  );
  
  fs.writeFileSync(userHookPath, content);
  
  console.log(`✅ Cache version updated to: ${newVersion}`);
} catch (error) {
  console.error('❌ Error updating cache version:', error);
  process.exit(1);
} 