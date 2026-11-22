'use client';
import React, { useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const categories = [
{
  id: 'men', label: 'Men', count: '320+ styles',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c6ff9e33-1772084686092.png",
  alt: 'Stylish man in modern casual outfit, neutral tones, clean background, editorial fashion photography',
  href: '#men', accent: '#1a1a2e'
},
{
  id: 'women', label: 'Women', count: '480+ styles',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_143e98219-1772124947673.png",
  alt: 'Elegant woman in contemporary Indian fashion, flowing fabric, warm studio lighting',
  href: '#women', accent: '#2d1b2e'
},
{
  id: 'traditional', label: 'Traditional', count: '180+ styles',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c823a5da-1772252510249.png",
  alt: 'Traditional Indian ethnic wear, rich embroidery, vibrant colors, cultural fashion editorial',
  href: '#traditional', accent: '#2e1a0e'
},
{
  id: 'street', label: 'Street', count: '260+ styles',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16a03495c-1772215935841.png",
  alt: 'Urban streetwear outfit, oversized fit, graffiti wall background, modern youth fashion',
  href: '#street', accent: '#0e1a2e'
},
{
  id: 'classic', label: 'Super Syno Classic', count: 'Our Signature Line',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1924807a7-1773082167529.png",
  alt: 'Luxury fashion editorial, minimalist clothing on model, clean white studio, premium brand aesthetic',
  href: '/super-syno-classic', accent: '#1a1a1a'
},
{
  id: 'new', label: 'New Arrivals', count: 'Just Dropped',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b42c455f-1771520074083.png",
  alt: 'Fresh fashion collection drop, model in new season styles, bright editorial photography',
  href: '#new', accent: '#1a2e1a'
}];


export default function CategorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="categories" ref={sectionRef} className="py-20 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium block mb-2">Browse</span>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter text-foreground">Shop by Category</h2>
        </div>
        <Link href="#all" className="hidden md:flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent transition-colors group">
          View All
          <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Asymmetric bento grid */}
      {/* GRID MAP - 3 cols:
           Row 1: [col-1: Men cs-1 rs-2] [col-2: Women cs-1] [col-3: Traditional cs-1]
           Row 2: [col-1: Men FILLED] [col-2: Street cs-1] [col-3: Classic cs-1]
           Row 3: [col-1-3: NewArrivals cs-3]
           Placed 6/6 ✓ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Men - spans 2 rows */}
        <div className="md:row-span-2">
          <CategoryCard cat={categories[0]} tall />
        </div>
        {/* Women */}
        <div><CategoryCard cat={categories[1]} /></div>
        {/* Traditional */}
        <div><CategoryCard cat={categories[2]} /></div>
        {/* Street */}
        <div><CategoryCard cat={categories[3]} /></div>
        {/* Classic */}
        <div><CategoryCard cat={categories[4]} /></div>
        {/* New Arrivals - spans full width */}
        <div className="md:col-span-3">
          <CategoryCard cat={categories[5]} wide />
        </div>
      </div>
    </section>);

}

function CategoryCard({ cat, tall, wide }: {cat: typeof categories[0];tall?: boolean;wide?: boolean;}) {
  return (
    <Link href={cat.href}
    className={`group relative overflow-hidden rounded-3xl block ${tall ? 'h-[480px] md:h-full min-h-[480px]' : wide ? 'h-48 md:h-56' : 'h-64'}`}>
      <AppImage
        src={cat.image} alt={cat.alt}
        fill className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={wide ? '100vw' : tall ? '33vw' : '33vw'} />

      {/* Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
      <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
        <div>
          <p className="text-white/60 text-xs uppercase tracking-widest mb-1">{cat.count}</p>
          <h3 className="font-display font-bold text-white text-xl md:text-2xl tracking-tight">{cat.label}</h3>
        </div>
        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
          <Icon name="ArrowRightIcon" size={16} className="text-accent-foreground" />
        </div>
      </div>
    </Link>);

}