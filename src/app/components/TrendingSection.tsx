'use client';
import React, { useState, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: string; name: string; brand: string; price: number; mrp: number;
  rating: number; reviews: number; badge?: string; image: string;
  category: string; isAffiliate?: boolean; affiliateUrl?: string;
  colors?: string[];
}

const trendingProducts: Product[] = [
  { id: 't1', name: 'Oversized Acid Wash Tee', brand: 'Super Syno', price: 1299, mrp: 1999, rating: 4.9, reviews: 1204, badge: '🔥 Hot', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80', category: 'Street', colors: ['#1a1a1a', '#e8e4dc', '#c8a96e'] },
  { id: 't2', name: 'Flowy Palazzo Set', brand: 'Super Syno', price: 2799, mrp: 3999, rating: 4.8, reviews: 876, badge: '⚡ Trending', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80', category: 'Women', colors: ['#f0ede6', '#c8a96e', '#2d1b2e'] },
  { id: 't3', name: 'Bandhani Kurta Set', brand: 'Amazon Fashion', price: 1599, mrp: 3499, rating: 4.7, reviews: 2341, badge: '🏆 Top Rated', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&q=80', category: 'Traditional', isAffiliate: true, affiliateUrl: '#amazon', colors: ['#e8c98e', '#a8854a'] },
  { id: 't4', name: 'Cargo Utility Jacket', brand: 'Super Syno', price: 3499, mrp: 5499, rating: 4.6, reviews: 543, badge: '🆕 New', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80', category: 'Street', colors: ['#1a1a1a', '#4a4a4a', '#8b7355'] },
  { id: 't5', name: 'Embroidered Anarkali', brand: 'Amazon Fashion', price: 2299, mrp: 4999, rating: 4.9, reviews: 3102, badge: '💎 Premium', image: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=500&q=80', category: 'Traditional', isAffiliate: true, affiliateUrl: '#amazon', colors: ['#c8a96e', '#8b1a1a'] },
  { id: 't6', name: 'Linen Blend Shirt', brand: 'Super Syno', price: 1799, mrp: 2499, rating: 4.5, reviews: 789, image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=500&q=80', category: 'Men', colors: ['#f8f6f2', '#c8a96e', '#1a1a1a'] },
  { id: 't7', name: 'Wrap Midi Dress', brand: 'Super Syno', price: 2499, mrp: 3799, rating: 4.8, reviews: 1567, badge: '❤️ Loved', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80', category: 'Women', colors: ['#c8a96e', '#2d1b2e', '#1a2e1a'] },
  { id: 't8', name: 'Jogger Track Pants', brand: 'Super Syno', price: 1499, mrp: 2199, rating: 4.4, reviews: 934, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80', category: 'Street', colors: ['#1a1a1a', '#4a4a4a'] },
  { id: 't9', name: 'Banarasi Silk Dupatta', brand: 'Amazon Fashion', price: 899, mrp: 1999, rating: 4.7, reviews: 4521, badge: '🌟 Bestseller', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80', category: 'Traditional', isAffiliate: true, affiliateUrl: '#amazon', colors: ['#c8a96e', '#8b1a1a', '#1a4a1a'] },
  { id: 't10', name: 'Relaxed Chino Pants', brand: 'Super Syno', price: 1999, mrp: 2999, rating: 4.6, reviews: 678, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80', category: 'Men', colors: ['#8b7355', '#1a1a1a', '#f8f6f2'] },
  { id: 't11', name: 'Puff Sleeve Crop Top', brand: 'Super Syno', price: 1199, mrp: 1799, rating: 4.7, reviews: 1123, badge: '✨ New', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&q=80', category: 'Women', colors: ['#f8f6f2', '#c8a96e', '#2d1b2e'] },
  { id: 't12', name: 'Graphic Bomber Jacket', brand: 'Super Syno', price: 4299, mrp: 6499, rating: 4.8, reviews: 456, badge: '🔥 Hot', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80', category: 'Street', colors: ['#1a1a1a', '#c8a96e'] },
];

export default function TrendingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cartAdded, setCartAdded] = useState<Set<string>>(new Set());

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const addToCart = (id: string) => {
    setCartAdded(prev => new Set(prev).add(id));
    setTimeout(() => setCartAdded(prev => { const n = new Set(prev); n.delete(id); return n; }), 2000);
  };

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="trending" className="py-20 bg-secondary overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium block mb-2">What&apos;s Hot</span>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter text-foreground">
              Trending Now <span className="text-accent">🔥</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scroll('left')} className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200">
              <Icon name="ChevronLeftIcon" size={18} />
            </button>
            <button onClick={() => scroll('right')} className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200">
              <Icon name="ChevronRightIcon" size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 snap-x-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {trendingProducts.map((product) => {
            const discount = Math.round((1 - product.price / product.mrp) * 100);
            const isWishlisted = wishlist.has(product.id);
            const isAdded = cartAdded.has(product.id);
            return (
              <div key={product.id} className="flex-shrink-0 w-56 md:w-64 snap-start bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="relative h-72 overflow-hidden">
                  <AppImage src={product.image} alt={`${product.name} - ${product.category} fashion`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="256px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">{product.badge}</span>
                  )}
                  {product.isAffiliate && (
                    <span className="absolute top-3 left-3 bg-[#FF9900] text-black text-[10px] font-bold px-2.5 py-1 rounded-full">Amazon</span>
                  )}
                  <span className="absolute top-3 right-12 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full">-{discount}%</span>
                  <button onClick={() => toggleWishlist(product.id)} className={`absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm heart-btn ${isWishlisted ? 'active' : ''}`} aria-label="Wishlist">
                    <Icon name="HeartIcon" size={14} variant={isWishlisted ? 'solid' : 'outline'} className={isWishlisted ? 'text-red-500' : 'text-foreground'} />
                  </button>
                  {/* Color swatches */}
                  {product.colors && (
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      {product.colors.map((c, i) => (
                        <div key={i} className="w-4 h-4 rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-125 transition-transform" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{product.brand} · {product.category}</p>
                  <h3 className="font-display font-semibold text-sm text-foreground leading-tight mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[1,2,3,4,5].map(s => <Icon key={s} name="StarIcon" size={10} variant="solid" className={s <= Math.round(product.rating) ? 'text-accent' : 'text-muted'} />)}
                    <span className="text-[10px] text-muted-foreground ml-1">({product.reviews.toLocaleString('en-IN')})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-display font-bold text-sm text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-muted-foreground line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
                  </div>
                  <button onClick={() => addToCart(product.id)} className={`w-full py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${isAdded ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground'}`}>
                    {isAdded ? <><Icon name="CheckIcon" size={12} /> Added!</> : <><Icon name="ShoppingBagIcon" size={12} /> {product.isAffiliate ? 'Buy on Amazon' : 'Add to Cart'}</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
