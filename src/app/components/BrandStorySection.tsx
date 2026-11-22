'use client';
import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const stats = [
{ value: '50K+', label: 'Happy Customers', icon: 'UserGroupIcon' },
{ value: '1200+', label: 'Unique Styles', icon: 'SparklesIcon' },
{ value: '4.8★', label: 'Average Rating', icon: 'StarIcon' },
{ value: '48hr', label: 'Pan-India Delivery', icon: 'TruckIcon' }];


export default function BrandStorySection() {
  const [counted, setCounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setCounted(true);},
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Image side - 5 cols */}
        <div className="lg:col-span-5 relative">
          <div className="relative overflow-hidden rounded-3xl aspect-[3/4]" style={{ borderTopRightRadius: '120px' }}>
            <AppImage
              src="https://img.rocket.new/generatedImages/rocket_gen_img_14af37433-1777014634413.png"
              alt="Fashion model in Super Syno brand clothing, confident pose, bright studio, premium fashion editorial"
              fill className="object-cover"
              sizes="40vw" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -right-4 md:right-4 bg-accent text-accent-foreground rounded-2xl p-5 shadow-2xl">
            <p className="font-display font-black text-3xl leading-none">6+</p>
            <p className="text-xs font-semibold mt-1 uppercase tracking-wider">Years of Style</p>
          </div>
        </div>

        {/* Text side - 7 cols */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium block mb-3">Our Story</span>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter leading-tight mb-6">
              Fashion That Speaks<br />
              <span className="gradient-text">Your Language</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-lg mb-4">
              Super Syno was born from a simple belief: great fashion should be accessible to everyone. We blend contemporary design with cultural roots — creating pieces that work from morning chai to midnight outings.
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-lg">
              Our Super Syno Classic line represents our finest craftsmanship — each piece thoughtfully designed and ethically made in India. Alongside our own designs, we curate the best from Amazon&apos;s fashion catalog so you never miss a trend.
            </p>
          </div>

          {/* Stats grid */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${counted ? 'stagger-children' : ''}`}>
            {stats.map((stat, i) =>
            <div key={stat.label}
            className={`bg-secondary rounded-2xl p-4 text-center ${counted ? 'fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: `${i * 0.1}s` }}>
                <Icon name={stat.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-accent mx-auto mb-2" />
                <p className="font-display font-black text-2xl text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            )}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3">
            {['Free Returns', 'Secure Payment', 'Authentic Products', 'Made in India'].map((badge) =>
            <span key={badge} className="flex items-center gap-1.5 text-xs font-semibold bg-muted px-3 py-1.5 rounded-full text-foreground">
                <Icon name="CheckBadgeIcon" size={14} className="text-accent" />
                {badge}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>);

}