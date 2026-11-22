'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Step { title: string; code?: string; description: string; note?: string; }
interface Section { id: string; icon: string; title: string; color: string; steps: Step[]; }

const sections: Section[] = [
  {
    id: 'local', icon: '💻', title: 'Local Development Setup', color: 'bg-blue-50 border-blue-200',
    steps: [
      { title: 'Prerequisites', description: 'Install the following on your system before starting:', note: 'Node.js v18+ (download from nodejs.org) | npm v9+ (comes with Node.js) | Git (download from git-scm.com) | VS Code (recommended editor)' },
      { title: 'Clone the Repository', description: 'Open your terminal and run:', code: 'git clone https://github.com/your-username/super-syno.git\ncd super-syno' },
      { title: 'Install Dependencies', description: 'Install all required packages:', code: 'npm install' },
      { title: 'Create Environment File', description: 'Create a .env.local file in the root directory:', code: 'cp .env .env.local\n# Then edit .env.local with your actual values' },
      { title: 'Run Development Server', description: 'Start the local development server:', code: 'npm run dev\n# App runs at: http://localhost:3000' },
      { title: 'Build for Production', description: 'Create an optimized production build:', code: 'npm run build\nnpm run start\n# Production server at: http://localhost:3000' },
    ]
  },
  {
    id: 'env', icon: '🔑', title: 'Environment Variables', color: 'bg-amber-50 border-amber-200',
    steps: [
      { title: 'File Location', description: 'All environment variables go in .env.local (for local dev) or in your hosting platform\'s environment settings.', note: 'NEVER commit .env.local to git. It\'s already in .gitignore.' },
      { title: 'Supabase (Database & Auth)', description: 'Get these from: supabase.com → Your Project → Settings → API', code: 'NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here', note: 'Used for: User authentication, order storage, product database, customer data' },
      { title: 'Razorpay (Payments)', description: 'Get these from: dashboard.razorpay.com → Settings → API Keys', code: 'RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx\nRAZORPAY_KEY_SECRET=your-secret-key-here\n# For production, use rzp_live_ prefix', note: 'Used for: Online payments, UPI, cards, EMI, net banking' },
      { title: 'Twilio (WhatsApp & OTP)', description: 'Get these from: console.twilio.com → Account Info', code: 'TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\nTWILIO_AUTH_TOKEN=your-auth-token-here\nTWILIO_PHONE_NUMBER=+1234567890\nTWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886', note: 'Used for: Mobile OTP login, WhatsApp order notifications, delivery updates' },
      { title: 'Google Analytics (Optional)', description: 'Get from: analytics.google.com → Admin → Data Streams', code: 'NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX', note: 'Used for: Website traffic analytics, conversion tracking' },
      { title: 'Site URL', description: 'Set this to your actual domain:', code: 'NEXT_PUBLIC_SITE_URL=https://yourdomain.com', note: 'Used for: OAuth redirects, email links, sitemap generation' },
    ]
  },
  {
    id: 'supabase', icon: '🗄️', title: 'Supabase Setup (Database)', color: 'bg-green-50 border-green-200',
    steps: [
      { title: 'Create Supabase Account', description: 'Go to supabase.com and create a free account. Then create a new project.', note: 'Free tier: 500MB database, 1GB storage, 50,000 monthly active users' },
      { title: 'Create Database Tables', description: 'In Supabase Dashboard → SQL Editor, run these queries:', code: `-- Users/Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  order_number TEXT UNIQUE,
  status TEXT DEFAULT 'pending',
  total_amount DECIMAL(10,2),
  items JSONB,
  shipping_address JSONB,
  payment_method TEXT,
  payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table (optional - for dynamic products)
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2),
  mrp DECIMAL(10,2),
  category TEXT,
  images TEXT[],
  sizes TEXT[],
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);` },
      { title: 'Enable Row Level Security', description: 'In Supabase → Authentication → Policies, enable RLS and add policies:', code: `-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Allow users to view their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);` },
      { title: 'Configure Auth Providers', description: 'In Supabase → Authentication → Providers:', note: 'Enable: Email/Password | Phone (for OTP) | Google OAuth (optional)\nSet Site URL to: https://yourdomain.com\nSet Redirect URLs to: https://yourdomain.com/auth/callback' },
    ]
  },
  {
    id: 'razorpay', icon: '💳', title: 'Razorpay Payment Setup', color: 'bg-purple-50 border-purple-200',
    steps: [
      { title: 'Create Razorpay Account', description: 'Go to razorpay.com and sign up. Complete KYC for live payments.', note: 'Test mode available immediately. Live mode requires business KYC (1-3 days).' },
      { title: 'Get API Keys', description: 'Dashboard → Settings → API Keys → Generate Test Key', code: 'RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx\nRAZORPAY_KEY_SECRET=your_secret_key', note: 'Keep Key Secret PRIVATE — never expose in frontend code' },
      { title: 'Test Cards for Development', description: 'Use these test card numbers:', note: 'Visa: 4111 1111 1111 1111 | Mastercard: 5267 3181 8797 5449\nExpiry: Any future date | CVV: Any 3 digits\nUPI Test: success@razorpay | Failure: failure@razorpay' },
      { title: 'Enable Payment Methods', description: 'In Razorpay Dashboard → Settings → Payment Methods, enable:', note: 'UPI (most popular in India) | Cards (Visa, Mastercard, RuPay) | Net Banking | EMI | Wallets (Paytm, PhonePe) | Cash on Delivery (manual)' },
      { title: 'Webhook Setup', description: 'Dashboard → Settings → Webhooks → Add Webhook URL:', code: 'Webhook URL: https://yourdomain.com/api/razorpay/webhook\nEvents to select: payment.captured, payment.failed, order.paid', note: 'Webhooks ensure payment status is updated even if user closes browser' },
    ]
  },
  {
    id: 'twilio', icon: '📱', title: 'Twilio (OTP & WhatsApp)', color: 'bg-red-50 border-red-200',
    steps: [
      { title: 'Create Twilio Account', description: 'Go to twilio.com and sign up. Free trial gives $15 credit.', note: 'Free trial: Can only send to verified numbers. Upgrade for production.' },
      { title: 'Get Credentials', description: 'From Twilio Console → Account Info:', code: 'TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\nTWILIO_AUTH_TOKEN=your_auth_token_here' },
      { title: 'Setup SMS/OTP', description: 'Buy a phone number for SMS OTP:', note: 'Twilio Console → Phone Numbers → Buy a Number\nChoose India (+91) number for ₹1-3/month\nOTP cost: ~₹0.50 per SMS in India' },
      { title: 'Setup WhatsApp Business', description: 'For WhatsApp notifications:', note: 'Twilio Console → Messaging → Try WhatsApp\nFor production: Apply for WhatsApp Business API (takes 1-2 weeks)\nSandbox available for testing immediately' },
      { title: 'Message Templates', description: 'Create approved WhatsApp templates:', code: `// Order Confirmation
"Your Super Syno order #{{1}} is confirmed! 
Total: ₹{{2}}. Track at: {{3}}"

// Delivery Update  
"Your order #{{1}} is {{2}}. 
Expected delivery: {{3}}"`, note: 'Templates must be approved by WhatsApp (24-48 hours)' },
    ]
  },
  {
    id: 'deploy', icon: '🚀', title: 'Deployment (Go Live)', color: 'bg-indigo-50 border-indigo-200',
    steps: [
      { title: 'Option 1: Vercel (Recommended)', description: 'Best for Next.js apps. Free tier available.', code: '# Install Vercel CLI\nnpm install -g vercel\n\n# Deploy\nvercel\n\n# Or connect GitHub repo at vercel.com for auto-deploy', note: 'Free tier: 100GB bandwidth, custom domain, SSL certificate included' },
      { title: 'Add Environment Variables on Vercel', description: 'In Vercel Dashboard → Your Project → Settings → Environment Variables:', note: 'Add ALL variables from your .env.local\nSet for: Production, Preview, Development\nNEVER add secrets to git — always use platform env vars' },
      { title: 'Custom Domain Setup', description: 'In Vercel → Your Project → Settings → Domains:', note: 'Add your domain (e.g. supersyno.in)\nVercel provides free SSL certificate\nUpdate DNS records at your domain registrar (GoDaddy, Namecheap, etc.)' },
      { title: 'Option 2: Netlify', description: 'Alternative to Vercel:', code: '# Install Netlify CLI\nnpm install -g netlify-cli\n\n# Build and deploy\nnpm run build\nnetlify deploy --prod --dir=.next', note: 'Similar to Vercel. Free tier available.' },
      { title: 'Option 3: AWS / DigitalOcean', description: 'For more control and scalability:', code: '# Build Docker image\ndocker build -t super-syno .\ndocker run -p 3000:3000 super-syno\n\n# Or use PM2 on VPS\nnpm run build\npm2 start npm --name "super-syno" -- start', note: 'Recommended for high traffic (10K+ daily visitors)' },
      { title: 'Post-Deployment Checklist', description: 'After going live, verify:', note: '✅ All env variables set correctly\n✅ Supabase URL updated to production\n✅ Razorpay switched to live keys (rzp_live_)\n✅ Twilio phone number verified\n✅ Custom domain SSL working\n✅ Google Analytics tracking\n✅ Test a complete purchase flow\n✅ Test OTP login on mobile\n✅ Test WhatsApp notification' },
    ]
  },
  {
    id: 'amazon', icon: '🛒', title: 'Amazon Affiliate Setup', color: 'bg-orange-50 border-orange-200',
    steps: [
      { title: 'Join Amazon Associates', description: 'Go to affiliate-program.amazon.in and sign up:', note: 'Requirements: Active website, content policy compliance\nApproval: Usually 1-3 business days\nCommission: 1-10% depending on category (clothing: ~5%)' },
      { title: 'Get Affiliate Links', description: 'After approval, use SiteStripe toolbar on Amazon:', note: 'Browse to any product → Click "Get Link" in SiteStripe bar\nShorten with: amzn.to links\nTrack performance in Associates Central dashboard' },
      { title: 'Add Affiliate Disclosure', description: 'Required by law — already in your footer:', note: '"Amazon Affiliate Disclosure: We earn from qualifying purchases."\nThis is legally required in India and globally.\nPlace on every page that has affiliate links.' },
      { title: 'Replace Placeholder Links', description: 'In your product files, replace #amazon-affiliate with real links:', code: `// In FeaturedProducts.tsx, CategoryProductSections.tsx etc.
// Change:
affiliateUrl: '#amazon-affiliate'
// To:
affiliateUrl: 'https://amzn.to/your-actual-link'`, note: 'Each product needs its own unique affiliate link for tracking' },
    ]
  },
  {
    id: 'maintenance', icon: '🔧', title: 'Ongoing Maintenance', color: 'bg-gray-50 border-gray-200',
    steps: [
      { title: 'Update Dependencies Monthly', description: 'Keep packages up to date:', code: 'npm outdated\nnpm update\nnpm audit fix' },
      { title: 'Monitor Performance', description: 'Tools to monitor your site:', note: 'Google Analytics: Traffic & conversions\nVercel Analytics: Core Web Vitals\nRazorpay Dashboard: Payment success rates\nSupabase Dashboard: Database performance' },
      { title: 'Backup Database', description: 'Supabase auto-backups daily on paid plans. For free tier:', code: '# Export data via Supabase CLI\nsupabase db dump --file backup.sql', note: 'Recommended: Upgrade to Supabase Pro ($25/month) for daily backups' },
      { title: 'Admin Dashboard Access', description: 'Your admin panel is at:', code: '# Local: http://localhost:3000/admin-dashboard\n# Production: https://yourdomain.com/admin-dashboard', note: 'Add authentication to admin route before going live!\nCreate an admin role in Supabase and protect the route.' },
    ]
  },
];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative mt-3 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between bg-primary px-4 py-2">
        <span className="text-xs text-primary-foreground/50 font-mono">terminal / code</span>
        <button onClick={copy} className="flex items-center gap-1.5 text-xs text-primary-foreground/60 hover:text-accent transition-colors">
          <Icon name={copied ? 'CheckIcon' : 'ClipboardDocumentIcon'} size={12} />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="bg-[#0d1117] text-green-400 p-4 text-xs font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap">{code}</pre>
    </div>
  );
}

export default function SetupGuideContent() {
  const [activeSection, setActiveSection] = useState('local');
  const [openSteps, setOpenSteps] = useState<Set<string>>(new Set(['local-0', 'local-1']));

  const toggleStep = (key: string) => {
    setOpenSteps(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });
  };

  const activeData = sections.find(s => s.id === activeSection);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
          <Icon name="BookOpenIcon" size={14} />
          Master Setup Guide
        </span>
        <h1 className="font-display font-black text-4xl md:text-6xl tracking-tighter text-foreground mb-4">
          Super Syno<br /><span className="gradient-text">Complete Setup Guide</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to run, configure, and deploy your Super Syno fashion platform. Written for developers and non-developers alike.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { icon: '⏱️', label: 'Setup Time', value: '~2 Hours' },
          { icon: '💰', label: 'Monthly Cost', value: '₹0 - ₹2,000' },
          { icon: '🔧', label: 'Integrations', value: '5 Services' },
          { icon: '🚀', label: 'Deploy Time', value: '< 10 mins' },
        ].map(stat => (
          <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 text-center">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="font-display font-black text-xl text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar nav */}
        <div className="lg:col-span-3">
          <div className="sticky top-24 bg-card border border-border rounded-2xl p-4 space-y-1">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium px-3 mb-3">Sections</p>
            {sections.map(section => (
              <button key={section.id} onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${activeSection === section.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                <span className="text-base">{section.icon}</span>
                <span className="leading-tight">{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-9">
          {activeData && (
            <div>
              <div className={`border rounded-2xl p-6 mb-6 ${activeData.color}`}>
                <h2 className="font-display font-black text-2xl md:text-3xl text-foreground flex items-center gap-3">
                  <span className="text-3xl">{activeData.icon}</span>
                  {activeData.title}
                </h2>
              </div>

              <div className="space-y-4">
                {activeData.steps.map((step, i) => {
                  const key = `${activeData.id}-${i}`;
                  const isOpen = openSteps.has(key);
                  return (
                    <div key={key} className="bg-card border border-border rounded-2xl overflow-hidden">
                      <button onClick={() => toggleStep(key)} className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0">
                            {i + 1}
                          </div>
                          <h3 className="font-display font-bold text-base text-foreground">{step.title}</h3>
                        </div>
                        <Icon name={isOpen ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={18} className="text-muted-foreground flex-shrink-0" />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 border-t border-border pt-4">
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.description}</p>
                          {step.code && <CodeBlock code={step.code} />}
                          {step.note && (
                            <div className="mt-3 flex gap-3 bg-accent/10 border border-accent/20 rounded-xl p-4">
                              <Icon name="InformationCircleIcon" size={18} className="text-accent flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line">{step.note}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="mt-16 bg-card border border-border rounded-3xl p-8">
        <h2 className="font-display font-black text-2xl md:text-3xl tracking-tighter mb-6 flex items-center gap-3">
          <span>💰</span> Monthly Cost Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Service</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Free Tier</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Paid Plan</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">What You Get</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { service: 'Vercel (Hosting)', free: '✅ Free', paid: '$20/month', what: 'Custom domain, SSL, CDN, analytics' },
                { service: 'Supabase (Database)', free: '✅ Free', paid: '$25/month', what: 'Auth, database, storage, realtime' },
                { service: 'Razorpay (Payments)', free: '✅ Free', paid: '2% per transaction', what: 'UPI, cards, EMI, net banking' },
                { service: 'Twilio (OTP/WhatsApp)', free: '$15 credit', paid: '~₹0.50/OTP', what: 'SMS OTP, WhatsApp notifications' },
                { service: 'Domain Name', free: '❌', paid: '₹500-2000/year', what: 'yourstore.in or .com' },
                { service: 'Amazon Associates', free: '✅ Free', paid: 'Free', what: '5% commission on clothing sales' },
              ].map(row => (
                <tr key={row.service} className="hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-foreground">{row.service}</td>
                  <td className="py-3 px-4 text-green-600 font-medium">{row.free}</td>
                  <td className="py-3 px-4 text-muted-foreground">{row.paid}</td>
                  <td className="py-3 px-4 text-muted-foreground">{row.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-sm text-green-800 font-medium">💡 <strong>Start for FREE:</strong> You can launch with ₹0/month using free tiers of all services. Only pay as you grow!</p>
        </div>
      </div>

      {/* Support */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: '📧', title: 'Email Support', desc: 'hello@supersyno.in', action: 'Send Email' },
          { icon: '💬', title: 'WhatsApp Support', desc: '+91 98765 43210', action: 'Chat Now' },
          { icon: '📖', title: 'Documentation', desc: 'Full API & component docs', action: 'View Docs' },
        ].map(card => (
          <div key={card.title} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-display font-bold text-base mb-1">{card.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{card.desc}</p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-xs font-bold hover:bg-accent hover:text-accent-foreground transition-colors">
              {card.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
