'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  badge?: string;
  images: string[];
  category: string;
  isAffiliate?: boolean;
  affiliateUrl?: string;
}

const products: Product[] = [
  {
    id: 'p1', name: 'Oversized Linen Kurta', brand: 'Super Syno', price: 2499, mrp: 3499,
    rating: 4.8, reviews: 342, badge: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1619603364854-1a3c11d2ca17?w=600&q=80',
      'https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=600&q=80',
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=80',
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=80',
    ],
    category: 'Men', isAffiliate: false,
  },
  {
    id: 'p2', name: 'Street Drop Shoulder Hoodie', brand: 'Super Syno', price: 3299, mrp: 4299,
    rating: 4.7, reviews: 218, badge: 'New',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
      'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=600&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80',
      'https://images.unsplash.com/photo-1565693413579-8ff3fdc1b03b?w=600&q=80',
    ],
    category: 'Street', isAffiliate: false,
  },
  {
    id: 'p3', name: 'Floral Anarkali Suit', brand: 'Amazon Fashion', price: 1899, mrp: 3999,
    rating: 4.5, reviews: 1204, badge: 'Amazon Pick',
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80',
      'https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=600&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    ],
    category: 'Traditional', isAffiliate: true, affiliateUrl: '#amazon-affiliate',
  },
  {
    id: 'p4', name: 'Cargo Jogger Pants', brand: 'Super Syno', price: 2199, mrp: 2999,
    rating: 4.6, reviews: 567,
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600&q=80',
    ],
    category: 'Street', isAffiliate: false,
  },
  {
    id: 'p5', name: 'Silk Blend Saree', brand: 'Amazon Fashion', price: 4599, mrp: 8999,
    rating: 4.9, reviews: 2341, badge: 'Top Rated',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
    ],
    category: 'Traditional', isAffiliate: true, affiliateUrl: '#amazon-affiliate',
  },
  {
    id: 'p6', name: 'Graphic Print Tee', brand: 'Super Syno', price: 999, mrp: 1499,
    rating: 4.4, reviews: 893,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80',
      'https://images.unsplash.com/photo-1588118853135-7b8f4c3a6d1d?w=600&q=80',
    ],
    category: 'Men', isAffiliate: false,
  },
  {
    id: 'p7', name: "Women's Co-ord Set", brand: 'Super Syno', price: 3799, mrp: 5499,
    rating: 4.8, reviews: 445, badge: 'Trending',
    images: [
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    ],
    category: 'Women', isAffiliate: false,
  },
  {
    id: 'p8', name: 'Premium Denim Jacket', brand: 'Amazon Fashion', price: 2799, mrp: 5999,
    rating: 4.5, reviews: 678, badge: 'Amazon Pick',
    images: [
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600&q=80',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
      'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=600&q=80',
    ],
    category: 'Street', isAffiliate: true, affiliateUrl: '#amazon-affiliate',
  },
];

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Men', 'Women', 'Traditional', 'Street'];

  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);

  return (
    <section id="featured" className="py-20 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium block mb-2">Handpicked</span>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter">Featured Products</h2>
        </div>
        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid - bento style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {filtered.slice(0, 8).map((product, i) => (
          <ProductCard key={product.id} product={product} featured={i === 0} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, featured }: { product: Product; featured?: boolean }) {
  const [currentImg, setCurrentImg] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const discount = Math.round((1 - product.price / product.mrp) * 100);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className={`group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
      {/* Image carousel */}
      <div className={`relative product-img-wrap ${featured ? 'h-72 md:h-96' : 'h-52 md:h-64'}`}>
        <AppImage
          src={product.images[currentImg]}
          alt={`${product.name} - view ${currentImg + 1}`}
          fill className="object-cover"
          sizes={featured ? '50vw' : '25vw'}
        />
        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badge && (
            <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase">{product.badge}</span>
          )}
          {product.isAffiliate && (
            <span className="bg-[#FF9900] text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase">Amazon</span>
          )}
          <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full">-{discount}%</span>
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className={`heart-btn absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm transition-all ${wishlisted ? 'active' : ''}`}
          aria-label="Add to wishlist">
          <Icon name={wishlisted ? 'HeartIcon' : 'HeartIcon'} size={14} variant={wishlisted ? 'solid' : 'outline'}
            className={wishlisted ? 'text-red-500' : 'text-foreground'} />
        </button>

        {/* Image dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
          {product.images.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentImg(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImg ? 'bg-white w-4' : 'bg-white/50'}`} />
          ))}
        </div>

        {/* Hover image switch */}
        <div className="absolute inset-0 grid grid-cols-4 opacity-0 group-hover:opacity-100">
          {product.images.map((_, idx) => (
            <div key={idx} onMouseEnter={() => setCurrentImg(idx)} className="h-full" />
          ))}
        </div>
      </div>

      {/* Product info */}
      <div className="p-3 md:p-4">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{product.brand} · {product.category}</p>
        <h3 className="font-display font-semibold text-sm md:text-base text-foreground leading-tight mb-2 line-clamp-1">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => (
              <Icon key={s} name="StarIcon" size={10} variant="solid"
                className={s <= Math.round(product.rating) ? 'text-accent' : 'text-muted'} />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-display font-bold text-base text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="text-xs text-muted-foreground line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
        </div>

        {/* CTA */}
        <button onClick={handleAddToCart}
          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 ${added ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground'}`}>
          {added ? (
            <><Icon name="CheckIcon" size={14} /> Added to Cart</>
          ) : (
            <><Icon name="ShoppingBagIcon" size={14} /> {product.isAffiliate ? 'Buy on Amazon' : 'Add to Cart'}</>
          )}
        </button>
      </div>
    </div>
  );
}