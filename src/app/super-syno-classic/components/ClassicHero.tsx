'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function ClassicHero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef?.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-primary">
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_178aea2ce-1775212387987.png"
          alt="Super Syno Classic luxury fashion editorial, elegant model in premium minimal clothing, dramatic studio lighting, deep atmospheric shadows, dark rich environment"
          fill priority className="object-cover"
          sizes="100vw" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>
      {/* Floating product preview */}
      <div className="absolute top-36 right-6 md:right-16 z-20 hidden md:block float-anim">
        <div className="bg-black/70 backdrop-blur-md border border-accent/30 rounded-3xl p-5 w-64 text-white">
          <p className="text-accent text-[10px] uppercase tracking-widest font-bold mb-3">Signature Collection</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
            'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=120&q=80',
            'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=120&q=80',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=120&q=80']?.
            map((img, i) =>
            <div key={i} className="aspect-square rounded-xl overflow-hidden">
                <AppImage src={img} alt={`Super Syno Classic preview ${i + 1}`} width={80} height={80} className="object-cover w-full h-full" />
              </div>
            )}
          </div>
          <p className="text-white/60 text-xs">42 exclusive pieces</p>
          <p className="text-accent font-bold mt-1">From ₹1,999</p>
        </div>
      </div>
      <div className="relative z-10 flex flex-col justify-end min-h-screen px-6 md:px-16 pb-16 pt-40 max-w-[1400px] mx-auto">
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 border border-accent/40 text-accent text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <Icon name="SparklesIcon" size={12} />
            Exclusively Super Syno
          </span>
        </div>

        <h1 className="font-display font-black text-white mb-2 leading-none tracking-tighter" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
          <span className="reveal-text"><span className="reveal-inner" style={{ animationDelay: '0.15s' }}>Super Syno</span></span>
          <span className="reveal-text"><span className="reveal-inner gradient-text" style={{ animationDelay: '0.25s' }}>Classic</span></span>
        </h1>

        <p className="text-white/70 text-lg max-w-xl mb-4 fade-in-up leading-relaxed" style={{ animationDelay: '0.4s', opacity: 0 }}>
          Our signature line. Each piece is designed, crafted, and quality-checked under the Super Syno label — representing our finest work in contemporary Indian fashion.
        </p>
        <p className="text-accent font-semibold text-sm mb-10 fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
          ✦ Every product starts with the name &quot;Super Syno&quot; ✦
        </p>

        <div className="flex flex-wrap gap-4 fade-in-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
          <a href="#classic-products"
          className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold text-sm hover:bg-white hover:text-foreground transition-all duration-300 hover:scale-105 shadow-lg">
            Shop Classic
            <Icon name="ArrowRightIcon" size={16} />
          </a>
          <Link href="/"
          className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 transition-all duration-300">
            Back to Main Store
          </Link>
        </div>
      </div>
    </section>);

}