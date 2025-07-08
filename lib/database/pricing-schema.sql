-- 订阅计划表
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE, -- 'starter', 'creator', 'pro_studio'
  display_name TEXT NOT NULL, -- 'Starter', 'Creator', 'Pro Studio'
  description TEXT,
  price_cents INTEGER NOT NULL, -- 价格（分）
  credits_per_month INTEGER NOT NULL, -- 每月获得的credits
  stripe_price_id TEXT, -- Stripe价格ID
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 用户订阅表
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.subscription_plans(id) ON DELETE SET NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'canceled', 'expired', 'pending'
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id) -- 一个用户只能有一个活跃订阅
);

-- Credit包表
CREATE TABLE public.credit_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE, -- '300_credits', '1000_credits'
  display_name TEXT NOT NULL, -- '300 Credits', '1000 Credits'
  description TEXT,
  credits INTEGER NOT NULL, -- 包含的credits数量
  price_cents INTEGER NOT NULL, -- 价格（分）
  stripe_price_id TEXT, -- Stripe价格ID
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 用户credits表
CREATE TABLE public.user_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  total_credits INTEGER DEFAULT 0, -- 总credits
  used_credits INTEGER DEFAULT 0, -- 已使用的credits
  subscription_credits INTEGER DEFAULT 0, -- 订阅获得的credits
  purchased_credits INTEGER DEFAULT 0, -- 购买的credits
  last_reset_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), -- 上次重置时间
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Credits交易记录表
CREATE TABLE public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'earned', 'spent', 'purchased', 'subscription_reset'
  amount INTEGER NOT NULL, -- 正数表示获得，负数表示消费
  description TEXT,
  generation_id TEXT, -- 关联的图片生成ID（如果是消费）
  package_id UUID REFERENCES public.credit_packages(id) ON DELETE SET NULL, -- 关联的购买包
  subscription_id UUID REFERENCES public.user_subscriptions(id) ON DELETE SET NULL, -- 关联的订阅
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用行级安全
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

-- 订阅计划表 - 所有人都可以查看
CREATE POLICY "Anyone can view subscription plans" ON public.subscription_plans
  FOR SELECT USING (is_active = true);

-- 用户订阅表 - 只能查看自己的订阅
CREATE POLICY "Users can view own subscriptions" ON public.user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON public.user_subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions" ON public.user_subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Credit包表 - 所有人都可以查看
CREATE POLICY "Anyone can view credit packages" ON public.credit_packages
  FOR SELECT USING (is_active = true);

-- 用户credits表 - 只能查看自己的credits
CREATE POLICY "Users can view own credits" ON public.user_credits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own credits" ON public.user_credits
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own credits" ON public.user_credits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Credits交易记录表 - 只能查看自己的交易
CREATE POLICY "Users can view own credit transactions" ON public.credit_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own credit transactions" ON public.credit_transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 创建索引
CREATE INDEX idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status ON public.user_subscriptions(status);
CREATE INDEX idx_user_credits_user_id ON public.user_credits(user_id);
CREATE INDEX idx_credit_transactions_user_id ON public.credit_transactions(user_id);
CREATE INDEX idx_credit_transactions_type ON public.credit_transactions(type);
CREATE INDEX idx_credit_transactions_created_at ON public.credit_transactions(created_at DESC);

-- 更新时间戳触发器
CREATE TRIGGER set_subscription_plans_updated_at
  BEFORE UPDATE ON public.subscription_plans
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_user_subscriptions_updated_at
  BEFORE UPDATE ON public.user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_credit_packages_updated_at
  BEFORE UPDATE ON public.credit_packages
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_user_credits_updated_at
  BEFORE UPDATE ON public.user_credits
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 创建用户时自动创建credits记录
CREATE OR REPLACE FUNCTION public.handle_new_user_credits()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_credits (user_id, total_credits, used_credits, subscription_credits, purchased_credits)
  VALUES (NEW.id, 0, 0, 0, 0);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 修改现有的用户创建触发器
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  
  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id);
  
  INSERT INTO public.user_credits (user_id, total_credits, used_credits, subscription_credits, purchased_credits)
  VALUES (NEW.id, 0, 0, 0, 0);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 插入默认的订阅计划
INSERT INTO public.subscription_plans (name, display_name, description, price_cents, credits_per_month, is_active) VALUES
('starter', 'Starter', 'Perfect for individuals, 400 Credits per month', 1490, 400, true),
('creator', 'Creator', 'Ideal for content creators, 1000 Credits per month', 2990, 1000, true),
('pro_studio', 'Pro Studio', 'For professional studios, 2400 Credits per month', 4990, 2400, true);

-- 插入默认的Credit包
INSERT INTO public.credit_packages (name, display_name, description, credits, price_cents, is_active) VALUES
('300_credits', '300 Credits', 'On-demand credit bundle for extra generation power', 300, 990, true),
('1000_credits', '1000 Credits', 'Large credit bundle for heavy usage', 1000, 2900, true); 