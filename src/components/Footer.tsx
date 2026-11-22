import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 px-6 md:px-12 rounded-t-[60px] md:rounded-t-[80px] mt-0 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="max-w-[1400px] mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand col */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <AppLogo size={40} />
              <span className="font-display font-bold text-2xl text-primary-foreground">Super Syno</span>
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs mb-6">
              Wear your story. Super Syno blends contemporary design with cultural heritage — crafted for the bold generation.
            </p>
            <div className="flex gap-3">
              {['instagram', 'facebook', 'twitter', 'youtube']?.map(s => (
                <a key={s} href="#" className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
                  <Icon name={s === 'instagram' ? 'PhotoIcon' : s === 'facebook' ? 'GlobeAltIcon' : s === 'twitter' ? 'ChatBubbleLeftIcon' : 'PlayIcon'} size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div className="md:col-span-2">
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest mb-5 text-primary-foreground/50">Shop</h4>
            <ul className="space-y-3">
              {['Men', 'Women', 'Traditional', 'Street', 'Super Syno Classic', 'New Arrivals', 'Sale']?.map(l => (
                <li key={l}>
                  <Link href={l === 'Super Syno Classic' ? '/super-syno-classic' : `#${l?.toLowerCase()}`}
                    className="text-sm text-primary-foreground/70 hover:text-accent hover-underline transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help links */}
          <div className="md:col-span-2">
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest mb-5 text-primary-foreground/50">Help</h4>
            <ul className="space-y-3">
              {['Track Order', 'Returns & Exchange', 'Size Guide', 'FAQs', 'Contact Us', 'Support']?.map(l => (
                <li key={l}>
                  <a href="#" className="text-sm text-primary-foreground/70 hover:text-accent hover-underline transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest mb-5 text-primary-foreground/50">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Press', 'Affiliates', 'Blog', 'Sustainability']?.map(l => (
                <li key={l}>
                  <a href="#" className="text-sm text-primary-foreground/70 hover:text-accent hover-underline transition-colors">{l}</a>
                </li>
              ))}
              <li>
                <a href="/setup-guide" className="text-sm text-accent hover:text-primary-foreground hover-underline transition-colors font-semibold">⚙️ Setup Guide</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="font-display font-semibold text-sm uppercase tracking-widest mb-5 text-primary-foreground/50">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2">
                <Icon name="MapPinIcon" size={14} className="mt-0.5 flex-shrink-0 text-accent" />
                Mumbai, Maharashtra, India
              </li>
              <li className="flex items-center gap-2">
                <Icon name="PhoneIcon" size={14} className="text-accent" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <Icon name="EnvelopeIcon" size={14} className="text-accent" />
                <a href="mailto:hello@supersyno.in" className="hover:text-accent transition-colors">hello@supersyno.in</a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="ClockIcon" size={14} className="text-accent" />
                Mon–Sat, 10am–7pm IST
              </li>
            </ul>
          </div>
        </div>

        {/* Payment methods */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-primary-foreground/40 mr-2">We Accept:</span>
              {['Razorpay', 'UPI', 'Visa', 'Mastercard', 'COD', 'EMI']?.map(p => (
                <span key={p} className="px-3 py-1 border border-white/20 rounded-md text-xs font-medium text-primary-foreground/60">{p}</span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Icon name="ShieldCheckIcon" size={14} className="text-accent" />
              <span className="text-xs text-primary-foreground/50">100% Secure Payments</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/40">
          <p>© 2026 Super Syno. All rights reserved. Crafted with ♥ in India.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Cookie Policy</a>
          </div>
          <p>Amazon Affiliate Disclosure: We earn from qualifying purchases.</p>
        </div>
      </div>
    </footer>
  );
}