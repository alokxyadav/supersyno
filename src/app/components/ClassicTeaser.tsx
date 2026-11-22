import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function ClassicTeaser() {
  return (
    <section className="px-4 md:px-8 py-12 max-w-[1400px] mx-auto">
      <div className="relative overflow-hidden rounded-[40px] md:rounded-[60px] bg-primary min-h-[400px] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_19920190d-1776336277787.png"
            alt="Luxury fashion editorial, premium clothing on elegant model, dim dramatic lighting, rich fabric textures, dark moody atmosphere"
            fill className="object-cover opacity-40"
            sizes="100vw" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-10 md:p-16 max-w-2xl">
          <span className="inline-flex items-center gap-2 border border-accent/40 text-accent text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6">
            <Icon name="SparklesIcon" size={12} />
            Exclusive Collection
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white tracking-tighter leading-tight mb-6">
            Super Syno<br />
            <span className="gradient-text">Classic</span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
            Our signature line. Every piece tells a story of craft, quality, and timeless design — exclusively designed and made under the Super Syno label.
          </p>
          <Link href="/super-syno-classic"
          className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold text-sm hover:bg-white hover:text-foreground transition-all duration-300 hover:scale-105 shadow-lg">
            Explore Classic Collection
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>
      </div>
    </section>);

}