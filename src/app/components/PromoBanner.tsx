'use client';
import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function PromoBanner() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 11, m: 47, s: 23 });
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  const copyCode = (code: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <>
      {/* Flash Sale Banner */}
      <section className="py-16 px-4 md:px-8 bg-primary text-primary-foreground overflow-hidden relative">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(200,169,110,0.3) 10px, rgba(200,169,110,0.3) 11px)' }} />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Flash sale */}
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Flash Sale — Ends Soon
              </div>
              <h2 className="font-display font-black text-4xl md:text-6xl tracking-tighter mb-4">
                Up to <span className="text-accent">70% Off</span><br />Select Styles
              </h2>
              <p className="text-primary-foreground/60 mb-8 text-lg">Limited time. Limited stock. Don&apos;t miss out.</p>

              {/* Countdown */}
              <div className="flex gap-4 mb-8">
                {[{ label: 'Hours', value: pad(timeLeft.h) }, { label: 'Mins', value: pad(timeLeft.m) }, { label: 'Secs', value: pad(timeLeft.s) }].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <div className="bg-accent text-accent-foreground font-display font-black text-3xl md:text-4xl w-20 h-20 rounded-2xl flex items-center justify-center tabular-nums">{value}</div>
                    <p className="text-xs text-primary-foreground/50 mt-2 uppercase tracking-widest">{label}</p>
                  </div>
                ))}
              </div>

              {/* Promo codes */}
              <div className="flex flex-wrap gap-3">
                {[{ code: 'SYNO10', desc: '10% off all orders' }, { code: 'FIRST20', desc: '20% off first order' }, { code: 'SYNO50', desc: '₹50 off on ₹999+' }].map(({ code, desc }) => (
                  <button key={code} onClick={() => copyCode(code)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-2.5 transition-all duration-200 group">
                    <div>
                      <p className="font-display font-bold text-sm text-accent">{code}</p>
                      <p className="text-[10px] text-primary-foreground/50">{desc}</p>
                    </div>
                    <Icon name={copied === code ? 'CheckIcon' : 'ClipboardDocumentIcon'} size={14} className={copied === code ? 'text-green-400' : 'text-primary-foreground/40 group-hover:text-accent'} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Newsletter */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center mb-4">
                <Icon name="EnvelopeIcon" size={24} className="text-accent" />
              </div>
              <h3 className="font-display font-bold text-2xl mb-2">Get Exclusive Deals</h3>
              <p className="text-primary-foreground/60 text-sm mb-6">Subscribe to our newsletter and get early access to sales, new arrivals, and exclusive offers. No spam, ever.</p>

              {subscribed ? (
                <div className="flex items-center gap-3 bg-green-500/20 border border-green-500/30 rounded-2xl p-4">
                  <Icon name="CheckBadgeIcon" size={24} className="text-green-400" />
                  <div>
                    <p className="font-semibold text-sm">You&apos;re in! 🎉</p>
                    <p className="text-xs text-primary-foreground/60">Check your inbox for a welcome gift.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" required className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-accent transition-colors" />
                  <button type="submit" className="w-full bg-accent text-accent-foreground py-3.5 rounded-xl font-bold text-sm hover:bg-white hover:text-foreground transition-all duration-200 flex items-center justify-center gap-2">
                    <Icon name="BellIcon" size={16} />
                    Subscribe & Get 10% Off
                  </button>
                </form>
              )}

              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                {['50K+ Subscribers', 'Weekly Drops', 'Exclusive Codes'].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-xs text-primary-foreground/50">
                    <Icon name="CheckIcon" size={12} className="text-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
