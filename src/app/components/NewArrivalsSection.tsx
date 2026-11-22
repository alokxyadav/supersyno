'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: string; name: string; brand: string; price: number; mrp: number;
  rating: number; reviews: number; image: string; category: string;
  isAffiliate?: boolean; tag?: string; sizes?: string[];
}

const newArrivals: Product[] = [
  { id: 'na1', name: 'Structured Blazer', brand: 'Super Syno', price: 4999, mrp: 7499, rating: 4.9, reviews: 234, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80', category: 'Men', tag: 'Just Dropped', sizes: ['S','M','L','XL','XXL'] },
  { id: 'na2', name: 'Ruched Bodycon Dress', brand: 'Super Syno', price: 2199, mrp: 3299, rating: 4.7, reviews: 567, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80', category: 'Women', tag: 'New', sizes: ['XS','S','M','L'] },
  { id: 'na3', name: 'Phulkari Dupatta', brand: 'Amazon Fashion', price: 1299, mrp: 2499, rating: 4.8, reviews: 1892, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80', category: 'Traditional', isAffiliate: true, tag: 'Amazon Pick' },
  { id: 'na4', name: 'Oversized Flannel Shirt', brand: 'Super Syno', price: 1899, mrp: 2799, rating: 4.6, reviews: 445, image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80', category: 'Street', tag: 'New', sizes: ['S','M','L','XL'] },
  { id: 'na5', name: 'Lehenga Choli Set', brand: 'Amazon Fashion', price: 5999, mrp: 12999, rating: 4.9, reviews: 3456, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', category: 'Traditional', isAffiliate: true, tag: 'Premium' },
  { id: 'na6', name: 'Slim Fit Chinos', brand: 'Super Syno', price: 1699, mrp: 2499, rating: 4.5, reviews: 789, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80', category: 'Men', tag: 'New', sizes: ['28','30','32','34','36'] },
  { id: 'na7', name: 'Tie-Dye Co-ord Set', brand: 'Super Syno', price: 3299, mrp: 4999, rating: 4.8, reviews: 678, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80', category: 'Women', tag: 'Just Dropped', sizes: ['XS','S','M','L','XL'] },
  { id: 'na8', name: 'Utility Cargo Shorts', brand: 'Super Syno', price: 1299, mrp: 1999, rating: 4.4, reviews: 1023, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80', category: 'Street', tag: 'New', sizes: ['S','M','L','XL'] },
  { id: 'na9', name: 'Chanderi Silk Kurta', brand: 'Amazon Fashion', price: 2799, mrp: 5499, rating: 4.7, reviews: 2134, image: 'https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=600&q=80', category: 'Traditional', isAffiliate: true, tag: 'Amazon Pick' },
  { id: 'na10', name: 'Ribbed Knit Sweater', brand: 'Super Syno', price: 2499, mrp: 3799, rating: 4.6, reviews: 345, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80', category: 'Men', tag: 'New', sizes: ['S','M','L','XL'] },
  { id: 'na11', name: 'Satin Slip Dress', brand: 'Super Syno', price: 2999, mrp: 4499, rating: 4.8, reviews: 892, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80', category: 'Women', tag: 'Just Dropped', sizes: ['XS','S','M','L'] },
  { id: 'na12', name: 'Denim Overalls', brand: 'Super Syno', price: 3499, mrp: 5499, rating: 4.5, reviews: 567, image: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=600&q=80', category: 'Street', tag: 'New', sizes: ['XS','S','M','L','XL'] },
];

export default function NewArrivalsSection() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cartAdded, setCartAdded] = useState<Set<string>>(new Set());
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});
  const [showAll, setShowAll] = useState(false);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const addToCart = (id: string) => {
    setCartAdded(prev => new Set(prev).add(id));
    setTimeout(() => setCartAdded(prev => { const n = new Set(prev); n.delete(id); return n; }), 2000);
  };

  const displayed = showAll ? newArrivals : newArrivals.slice(0, 8);

  return (
    <section id="new" className="py-20 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium block mb-2">Fresh Drops</span>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter text-foreground">
            New Arrivals <span className="text-accent">✨</span>
          </h2>
        </div>
        <button onClick={() => setShowAll(!showAll)} className="hidden md:flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent transition-colors group">
          {showAll ? 'Show Less' : 'View All 12'}
          <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayed.map((product, i) => {
          const discount = Math.round((1 - product.price / product.mrp) * 100);
          const isWishlisted = wishlist.has(product.id);
          const isAdded = cartAdded.has(product.id);
          const size = selectedSize[product.id];
          return (
            <div key={product.id} className={`group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <div className={`relative overflow-hidden ${i === 0 ? 'h-64 md:h-[480px]' : 'h-52 md:h-60'}`}>
                <AppImage src={product.image} alt={`${product.name} - new arrival ${product.category}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes={i === 0 ? '50vw' : '25vw'} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">{product.tag}</span>
                )}
                {product.isAffiliate && (
                  <span className="absolute top-3 left-3 bg-[#FF9900] text-black text-[10px] font-bold px-2.5 py-1 rounded-full">Amazon</span>
                )}
                <span className="absolute top-3 right-12 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full">-{discount}%</span>
                <button onClick={() => toggleWishlist(product.id)} className={`absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm heart-btn ${isWishlisted ? 'active' : ''}`} aria-label="Add to wishlist">
                  <Icon name="HeartIcon" size={14} variant={isWishlisted ? 'solid' : 'outline'} className={isWishlisted ? 'text-red-500' : 'text-foreground'} />
                </button>
              </div>
              <div className="p-3 md:p-4">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{product.brand} · {product.category}</p>
                <h3 className="font-display font-semibold text-sm md:text-base text-foreground leading-tight mb-2 line-clamp-1">{product.name}</h3>
                {product.sizes && (
                  <div className="flex gap-1 flex-wrap mb-2">
                    {product.sizes.map(s => (
                      <button key={s} onClick={() => setSelectedSize(prev => ({ ...prev, [product.id]: s }))} className={`text-[10px] px-2 py-0.5 rounded border font-medium transition-all ${size === s ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-foreground'}`}>{s}</button>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display font-bold text-sm md:text-base text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-muted-foreground line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-green-600 font-semibold">{discount}% off</span>
                </div>
                <button onClick={() => addToCart(product.id)} className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 ${isAdded ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground'}`}>
                  {isAdded ? <><Icon name="CheckIcon" size={14} /> Added to Cart</> : <><Icon name="ShoppingBagIcon" size={14} /> {product.isAffiliate ? 'Buy on Amazon' : 'Add to Cart'}</>}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center md:hidden">
        <button onClick={() => setShowAll(!showAll)} className="px-8 py-3 border border-border rounded-full text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200">
          {showAll ? 'Show Less' : 'View All 12 New Arrivals'}
        </button>
      </div>
    </section>
  );
}
