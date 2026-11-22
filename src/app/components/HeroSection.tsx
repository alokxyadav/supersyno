'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef?.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-primary" style={{ borderBottomLeftRadius: '80px' }}>
      {/* Parallax background image */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_17e9f2bee-1772383968119.png"
          alt="Dimly lit fashion editorial, models in dark minimalist clothing, moody studio lighting, deep shadows, black background"
          fill
          priority
          className="object-cover"
          sizes="100vw" />

        {/* Scrim - dark overlay for white text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>
      {/* Floating info card */}
      <div className="absolute top-32 right-6 md:right-16 z-20 hidden md:block float-anim">
        <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 w-72 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50 mb-1">New Drop</p>
              <h3 className="font-display font-bold text-base leading-tight">Super Syno Classic<br />SS26 Collection</h3>
            </div>
            <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase">Live</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
            { label: 'Styles', value: '240+' },
            { label: 'Sold Today', value: '1.2K' }]?.
            map((s) =>
            <div key={s?.label} className="bg-white/10 rounded-xl p-3 text-center">
                <p className="font-display font-bold text-xl text-accent">{s?.value}</p>
                <p className="text-[10px] text-white/60 uppercase tracking-wider">{s?.label}</p>
              </div>
            )}
          </div>
          <Link href="/super-syno-classic"
          className="flex items-center justify-between text-sm font-medium text-white/80 hover:text-accent transition-colors group">
            <span>Explore Classic</span>
            <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      {/* Hero content */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen px-6 md:px-16 pb-16 pt-40 max-w-[1400px] mx-auto">
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            New Collection 2026
          </span>
        </div>

        <h1 className="font-display font-black text-white mb-6 leading-none tracking-tighter" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
          <span className="reveal-text"><span className="reveal-inner" style={{ animationDelay: '0.15s' }}>Wear</span></span>
          <span className="reveal-text"><span className="reveal-inner text-accent" style={{ animationDelay: '0.25s' }}>Your</span></span>
          <span className="reveal-text"><span className="reveal-inner" style={{ animationDelay: '0.35s' }}>Story.</span></span>
        </h1>

        <p className="text-white/70 text-lg max-w-xl mb-10 fade-in-up leading-relaxed" style={{ animationDelay: '0.5s', opacity: 0 }}>
          From streets to ceremonies — Super Syno brings you premium fashion for every chapter of your life.
        </p>

        <div className="flex flex-wrap gap-4 fade-in-up" style={{ animationDelay: '0.65s', opacity: 0 }}>
          <Link href="#categories"
          className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold text-sm hover:bg-white hover:text-foreground transition-all duration-300 hover:scale-105 shadow-lg">
            Shop Now
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
          <Link href="/super-syno-classic"
          className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 transition-all duration-300">
            Super Syno Classic
            <Icon name="SparklesIcon" size={16} />
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-bounce" />
        </div>
      </div>
    </section>);

}