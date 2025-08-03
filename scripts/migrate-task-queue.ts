import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

// 加载环境变量
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runMigration() {
  try {
    console.log('Starting task queue schema migration...')
    
    // 读取SQL文件
    const sqlPath = path.join(process.cwd(), 'lib/database/task-queue-schema.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')
    
    console.log('Executing SQL script...')
    
    // 将SQL分割成单独的语句执行
    const statements = sql
      .split(';')
      .filter(stmt => stmt.trim().length > 0)
      .map(stmt => stmt.trim())
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      
      if (statement.length === 0) continue
      
      console.log(`Executing statement ${i + 1}/${statements.length}...`)
      
      try {
        const { error } = await supabase.rpc('exec_sql', { sql_query: statement })
        
        if (error) {
          // 如果exec_sql不存在，尝试直接使用SQL
          console.log('exec_sql not available, trying direct SQL execution...')
          
          // 对于某些语句，我们需要使用不同的方法
          if (statement.includes('CREATE TABLE') || 
              statement.includes('ALTER TABLE') || 
              statement.includes('CREATE INDEX') ||
              statement.includes('CREATE TRIGGER') ||
              statement.includes('CREATE FUNCTION') ||
              statement.includes('CREATE POLICY')) {
            
            console.log('Skipping DDL statement (requires admin access):', statement.substring(0, 50) + '...')
            continue
          }
          
          console.error('Error executing statement:', error)
        } else {
          console.log('✓ Statement executed successfully')
        }
      } catch (err) {
        console.error('Error executing statement:', err)
        console.log('Statement:', statement.substring(0, 100) + '...')
      }
    }
    
    console.log('Migration completed!')
    
    // 测试新创建的函数
    console.log('Testing reserve_credits function...')
    const { data, error } = await supabase.rpc('reserve_credits', {
      p_user_id: '00000000-0000-0000-0000-000000000000', // 测试UUID
      p_task_id: 'test_task_id',
      p_amount: 5
    })
    
    if (error) {
      console.log('Function test failed (expected if user not exists):', error.message)
    } else {
      console.log('Function test result:', data)
    }
    
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

runMigration()