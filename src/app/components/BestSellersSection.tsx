'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: string; name: string; brand: string; price: number; mrp: number;
  rating: number; reviews: number; image: string; category: string;
  isAffiliate?: boolean; soldCount: number;
}

const bestSellers: Product[] = [
  { id: 'bs1', name: 'Oversized Linen Kurta', brand: 'Super Syno', price: 2499, mrp: 3499, rating: 4.9, reviews: 4521, image: 'https://images.unsplash.com/photo-1619603364854-1a3c11d2ca17?w=600&q=80', category: 'Men', soldCount: 12400 },
  { id: 'bs2', name: 'Silk Blend Saree', brand: 'Amazon Fashion', price: 4599, mrp: 8999, rating: 4.9, reviews: 6789, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80', category: 'Traditional', isAffiliate: true, soldCount: 9800 },
  { id: 'bs3', name: "Women's Co-ord Set", brand: 'Super Syno', price: 3799, mrp: 5499, rating: 4.8, reviews: 3456, image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80', category: 'Women', soldCount: 8700 },
  { id: 'bs4', name: 'Street Drop Hoodie', brand: 'Super Syno', price: 3299, mrp: 4299, rating: 4.7, reviews: 2890, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80', category: 'Street', soldCount: 7600 },
  { id: 'bs5', name: 'Floral Anarkali Suit', brand: 'Amazon Fashion', price: 1899, mrp: 3999, rating: 4.8, reviews: 5678, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80', category: 'Traditional', isAffiliate: true, soldCount: 6900 },
  { id: 'bs6', name: 'Graphic Print Tee', brand: 'Super Syno', price: 999, mrp: 1499, rating: 4.6, reviews: 7890, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', category: 'Men', soldCount: 15200 },
  { id: 'bs7', name: 'Cargo Jogger Pants', brand: 'Super Syno', price: 2199, mrp: 2999, rating: 4.7, reviews: 3210, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80', category: 'Street', soldCount: 5400 },
  { id: 'bs8', name: 'Premium Denim Jacket', brand: 'Amazon Fashion', price: 2799, mrp: 5999, rating: 4.6, reviews: 4321, image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600&q=80', category: 'Street', isAffiliate: true, soldCount: 4800 },
  { id: 'bs9', name: 'Wrap Midi Dress', brand: 'Super Syno', price: 2499, mrp: 3799, rating: 4.8, reviews: 2134, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', category: 'Women', soldCount: 4200 },
  { id: 'bs10', name: 'Embroidered Anarkali', brand: 'Amazon Fashion', price: 2299, mrp: 4999, rating: 4.9, reviews: 8901, image: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=600&q=80', category: 'Traditional', isAffiliate: true, soldCount: 3900 },
];

export default function BestSellersSection() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cartAdded, setCartAdded] = useState<Set<string>>(new Set());

  const toggleWishlist = (id: string) => {
    setWishlist(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const addToCart = (id: string) => {
    setCartAdded(prev => new Set(prev).add(id));
    setTimeout(() => setCartAdded(prev => { const n = new Set(prev); n.delete(id); return n; }), 2000);
  };

  const rankColors = ['#C8A96E', '#A8A8A8', '#CD7F32', '#6B6560', '#6B6560'];

  return (
    <section id="bestsellers" className="py-20 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium block mb-2">Most Loved</span>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter text-foreground">
            Best Sellers <span className="text-accent">🏆</span>
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="FireIcon" size={16} className="text-accent" />
          <span className="font-medium">Based on last 30 days</span>
        </div>
      </div>

      {/* Top 3 hero + list layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top 3 featured */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {bestSellers.slice(0, 3).map((product, i) => {
            const discount = Math.round((1 - product.price / product.mrp) * 100);
            const isWishlisted = wishlist.has(product.id);
            const isAdded = cartAdded.has(product.id);
            return (
              <div key={product.id} className={`group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${i === 0 ? 'md:col-span-1' : ''}`}>
                <div className="relative h-64 overflow-hidden">
                  <AppImage src={product.image} alt={`${product.name} - bestseller rank ${i+1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Rank badge */}
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-sm text-black shadow-lg" style={{ backgroundColor: rankColors[i] }}>
                    #{i + 1}
                  </div>
                  <span className="absolute top-3 right-12 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full">-{discount}%</span>
                  <button onClick={() => toggleWishlist(product.id)} className={`absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm heart-btn ${isWishlisted ? 'active' : ''}`} aria-label="Wishlist">
                    <Icon name="HeartIcon" size={14} variant={isWishlisted ? 'solid' : 'outline'} className={isWishlisted ? 'text-red-500' : 'text-foreground'} />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white/70 text-[10px] uppercase tracking-widest">{product.brand}</p>
                    <h3 className="font-display font-bold text-white text-sm leading-tight">{product.name}</h3>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => <Icon key={s} name="StarIcon" size={10} variant="solid" className={s <= Math.round(product.rating) ? 'text-accent' : 'text-muted'} />)}
                      <span className="text-[10px] text-muted-foreground ml-1">({product.reviews.toLocaleString('en-IN')})</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{(product.soldCount / 1000).toFixed(1)}K sold</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-display font-bold text-base text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-muted-foreground line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
                  </div>
                  <button onClick={() => addToCart(product.id)} className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 ${isAdded ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground'}`}>
                    {isAdded ? <><Icon name="CheckIcon" size={14} /> Added!</> : <><Icon name="ShoppingBagIcon" size={14} /> {product.isAffiliate ? 'Buy on Amazon' : 'Add to Cart'}</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ranked list #4-10 */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {bestSellers.slice(3, 10).map((product, i) => {
            const isAdded = cartAdded.has(product.id);
            const discount = Math.round((1 - product.price / product.mrp) * 100);
            return (
              <div key={product.id} className="flex gap-3 bg-card rounded-xl p-3 border border-border hover:shadow-md hover:border-accent/30 transition-all duration-200 group">
                <div className="flex-shrink-0 w-8 flex items-center justify-center">
                  <span className="font-display font-black text-lg text-muted-foreground/40">#{i + 4}</span>
                </div>
                <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <AppImage src={product.image} alt={`${product.name} bestseller`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="56px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{product.category}</p>
                  <h4 className="font-semibold text-xs text-foreground leading-tight truncate">{product.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-sm text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-green-600 font-semibold">-{discount}%</span>
                  </div>
                </div>
                <button onClick={() => addToCart(product.id)} className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${isAdded ? 'bg-green-500 text-white' : 'bg-muted hover:bg-primary hover:text-primary-foreground'}`} aria-label="Add to cart">
                  <Icon name={isAdded ? 'CheckIcon' : 'PlusIcon'} size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
