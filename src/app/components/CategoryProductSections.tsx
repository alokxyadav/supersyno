'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface Product {
  id: string; name: string; price: number; mrp: number;
  rating: number; reviews: number; image: string; badge?: string;
  isAffiliate?: boolean; sizes?: string[];
}

const menProducts: Product[] = [
  { id: 'm1', name: 'Oversized Linen Kurta', price: 2499, mrp: 3499, rating: 4.9, reviews: 4521, image: 'https://images.unsplash.com/photo-1619603364854-1a3c11d2ca17?w=500&q=80', badge: 'Bestseller', sizes: ['S','M','L','XL','XXL'] },
  { id: 'm2', name: 'Structured Blazer', price: 4999, mrp: 7499, rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80', badge: 'Premium', sizes: ['S','M','L','XL'] },
  { id: 'm3', name: 'Graphic Print Tee', price: 999, mrp: 1499, rating: 4.6, reviews: 7890, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80', sizes: ['XS','S','M','L','XL','XXL'] },
  { id: 'm4', name: 'Slim Fit Chinos', price: 1699, mrp: 2499, rating: 4.5, reviews: 789, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80', sizes: ['28','30','32','34','36'] },
  { id: 'm5', name: 'Linen Blend Shirt', price: 1799, mrp: 2499, rating: 4.7, reviews: 1234, image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=500&q=80', badge: 'New', sizes: ['S','M','L','XL'] },
];

const womenProducts: Product[] = [
  { id: 'w1', name: "Women's Co-ord Set", price: 3799, mrp: 5499, rating: 4.8, reviews: 3456, image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&q=80', badge: 'Trending', sizes: ['XS','S','M','L','XL'] },
  { id: 'w2', name: 'Wrap Midi Dress', price: 2499, mrp: 3799, rating: 4.8, reviews: 2134, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80', badge: 'New', sizes: ['XS','S','M','L'] },
  { id: 'w3', name: 'Flowy Palazzo Set', price: 2799, mrp: 3999, rating: 4.7, reviews: 876, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80', sizes: ['XS','S','M','L','XL'] },
  { id: 'w4', name: 'Puff Sleeve Crop Top', price: 1199, mrp: 1799, rating: 4.7, reviews: 1123, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80', badge: 'Hot', sizes: ['XS','S','M','L'] },
  { id: 'w5', name: 'Satin Slip Dress', price: 2999, mrp: 4499, rating: 4.8, reviews: 892, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80', badge: 'New', sizes: ['XS','S','M','L'] },
];

const traditionalProducts: Product[] = [
  { id: 'tr1', name: 'Silk Blend Saree', price: 4599, mrp: 8999, rating: 4.9, reviews: 6789, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80', badge: 'Top Rated', isAffiliate: true },
  { id: 'tr2', name: 'Floral Anarkali Suit', price: 1899, mrp: 3999, rating: 4.8, reviews: 5678, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&q=80', badge: 'Amazon Pick', isAffiliate: true },
  { id: 'tr3', name: 'Embroidered Anarkali', price: 2299, mrp: 4999, rating: 4.9, reviews: 8901, image: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=500&q=80', isAffiliate: true },
  { id: 'tr4', name: 'Lehenga Choli Set', price: 5999, mrp: 12999, rating: 4.9, reviews: 3456, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80', badge: 'Premium', isAffiliate: true },
  { id: 'tr5', name: 'Chanderi Silk Kurta', price: 2799, mrp: 5499, rating: 4.7, reviews: 2134, image: 'https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=500&q=80', badge: 'Amazon Pick', isAffiliate: true },
];

const streetProducts: Product[] = [
  { id: 'st1', name: 'Street Drop Hoodie', price: 3299, mrp: 4299, rating: 4.7, reviews: 2890, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=500&q=80', badge: 'Bestseller', sizes: ['S','M','L','XL','XXL'] },
  { id: 'st2', name: 'Cargo Utility Jacket', price: 3499, mrp: 5499, rating: 4.6, reviews: 543, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80', badge: 'New', sizes: ['S','M','L','XL'] },
  { id: 'st3', name: 'Cargo Jogger Pants', price: 2199, mrp: 2999, rating: 4.7, reviews: 3210, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80', sizes: ['S','M','L','XL','XXL'] },
  { id: 'st4', name: 'Oversized Acid Wash Tee', price: 1299, mrp: 1999, rating: 4.9, reviews: 1204, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&q=80', badge: 'Hot', sizes: ['XS','S','M','L','XL'] },
  { id: 'st5', name: 'Graphic Bomber Jacket', price: 4299, mrp: 6499, rating: 4.8, reviews: 456, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80', badge: 'New', sizes: ['S','M','L','XL'] },
];

interface SectionProps {
  id: string; title: string; emoji: string; subtitle: string;
  products: Product[]; accentColor: string; bgColor?: string;
  viewAllHref: string;
}

function CategoryProductSection({ id, title, emoji, subtitle, products, accentColor, bgColor, viewAllHref }: SectionProps) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cartAdded, setCartAdded] = useState<Set<string>>(new Set());
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const toggleWishlist = (pid: string) => {
    setWishlist(prev => { const n = new Set(prev); n.has(pid) ? n.delete(pid) : n.add(pid); return n; });
  };

  const addToCart = (pid: string) => {
    setCartAdded(prev => new Set(prev).add(pid));
    setTimeout(() => setCartAdded(prev => { const n = new Set(prev); n.delete(pid); return n; }), 2000);
  };

  return (
    <section id={id} className={`py-20 px-4 md:px-8 ${bgColor || ''}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium block mb-2">{subtitle}</span>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter text-foreground">
              {title} <span>{emoji}</span>
            </h2>
          </div>
          <Link href={viewAllHref} className="hidden md:flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent transition-colors group">
            View All
            <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => {
            const discount = Math.round((1 - product.price / product.mrp) * 100);
            const isWishlisted = wishlist.has(product.id);
            const isAdded = cartAdded.has(product.id);
            const size = selectedSizes[product.id];
            return (
              <div key={product.id} className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <AppImage src={product.image} alt={`${product.name} - ${id} fashion`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="20vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase text-white" style={{ backgroundColor: accentColor }}>{product.badge}</span>
                  )}
                  {product.isAffiliate && (
                    <span className="absolute top-3 left-3 bg-[#FF9900] text-black text-[10px] font-bold px-2.5 py-1 rounded-full">Amazon</span>
                  )}
                  <span className="absolute top-3 right-12 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full">-{discount}%</span>
                  <button onClick={() => toggleWishlist(product.id)} className={`absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm heart-btn ${isWishlisted ? 'active' : ''}`} aria-label="Wishlist">
                    <Icon name="HeartIcon" size={14} variant={isWishlisted ? 'solid' : 'outline'} className={isWishlisted ? 'text-red-500' : 'text-foreground'} />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="font-display font-semibold text-sm text-foreground leading-tight mb-2 line-clamp-1">{product.name}</h3>
                  {product.sizes && (
                    <div className="flex gap-1 flex-wrap mb-2">
                      {product.sizes.slice(0, 4).map(s => (
                        <button key={s} onClick={() => setSelectedSizes(prev => ({ ...prev, [product.id]: s }))} className={`text-[10px] px-1.5 py-0.5 rounded border font-medium transition-all ${size === s ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-foreground'}`}>{s}</button>
                      ))}
                      {product.sizes.length > 4 && <span className="text-[10px] text-muted-foreground self-center">+{product.sizes.length - 4}</span>}
                    </div>
                  )}
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

export default function CategoryProductSections() {
  return (
    <>
      <CategoryProductSection id="men" title="Men's Collection" emoji="👔" subtitle="For Him" products={menProducts} accentColor="#1a1a2e" viewAllHref="#men" />
      <CategoryProductSection id="women" title="Women's Collection" emoji="👗" subtitle="For Her" products={womenProducts} accentColor="#2d1b2e" bgColor="bg-secondary" viewAllHref="#women" />
      <CategoryProductSection id="traditional" title="Traditional Wear" emoji="🪷" subtitle="Cultural Heritage" products={traditionalProducts} accentColor="#C8A96E" viewAllHref="#traditional" />
      <CategoryProductSection id="street" title="Street Style" emoji="🛹" subtitle="Urban Edge" products={streetProducts} accentColor="#0e1a2e" bgColor="bg-secondary" viewAllHref="#street" />
    </>
  );
}
