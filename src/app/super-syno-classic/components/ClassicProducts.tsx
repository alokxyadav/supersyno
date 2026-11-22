'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ClassicProduct {
  id: string;
  name: string;
  tagline: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  badge?: string;
  images: string[];
  sizes: string[];
  colors: string[];
  fabric: string;
  fit: string;
  description: string;
}

const classicProducts: ClassicProduct[] = [
  {
    id: 'sc1',
    name: 'Super Syno Signature Linen Shirt',
    tagline: 'The shirt that started it all',
    price: 3499, mrp: 5499, rating: 4.9, reviews: 512, badge: 'Signature',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&q=80',
      'https://images.unsplash.com/photo-1603251579431-8041402bdeda?w=700&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=700&q=80',
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=700&q=80',
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=700&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#F5F0E8', '#2C2C2C', '#8B7355', '#4A5568'],
    fabric: '100% Pure Linen', fit: 'Regular Fit',
    description: 'The cornerstone of the Super Syno Classic collection. Crafted from premium Indian linen, this shirt drapes beautifully and gets better with every wash.',
  },
  {
    id: 'sc2',
    name: 'Super Syno Classic Kurta Set',
    tagline: 'Heritage reimagined for today',
    price: 4999, mrp: 7999, rating: 4.8, reviews: 334, badge: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1619603364854-1a3c11d2ca17?w=700&q=80',
      'https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=700&q=80',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=700&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=700&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#F5F0E8', '#1A1A2E', '#8B4513', '#2D5016'],
    fabric: 'Cotton Blend with Embroidery', fit: 'Relaxed Fit',
    description: 'A modern take on the classic Indian kurta. Features hand-block printed details and premium cotton blend fabric that is perfect for both casual and formal occasions.',
  },
  {
    id: 'sc3',
    name: "Super Syno Classic Women's Dress",
    tagline: 'Effortless elegance, every day',
    price: 3999, mrp: 6499, rating: 4.9, reviews: 678, badge: 'New',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=700&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=80',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=700&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#F5F0E8', '#C8A96E', '#2C2C2C', '#8B7355'],
    fabric: 'Organic Cotton Muslin', fit: 'Flowy / Relaxed',
    description: 'Designed for the modern Indian woman who refuses to choose between comfort and style. The Super Syno Classic Dress in organic cotton muslin flows beautifully in every movement.',
  },
  {
    id: 'sc4',
    name: 'Super Syno Artisan Jacket',
    tagline: 'Street meets heritage',
    price: 5999, mrp: 9999, rating: 4.7, reviews: 221, badge: 'Limited',
    images: [
      'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=700&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700&q=80',
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=700&q=80',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=700&q=80',
      'https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=700&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#2C2C2C', '#8B7355', '#1A1A2E'],
    fabric: 'Handwoven Khadi Blend', fit: 'Structured / Slim',
    description: 'A limited-edition jacket that merges traditional Indian handwoven khadi with contemporary street silhouettes. Each jacket features unique hand-stitched detailing making it one-of-a-kind.',
  },
];

export default function ClassicProducts() {
  const [selectedProduct, setSelectedProduct] = useState<ClassicProduct | null>(null);

  return (
    <section id="classic-products" className="py-20 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium block mb-2">Exclusive Line</span>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter">Super Syno Classic Collection</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {classicProducts.map(product => (
          <ClassicProductCard key={product.id} product={product} onSelect={() => setSelectedProduct(product)} />
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
}

function ClassicProductCard({ product, onSelect }: { product: ClassicProduct; onSelect: () => void }) {
  const [currentImg, setCurrentImg] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const discount = Math.round((1 - product.price / product.mrp) * 100);

  return (
    <div className="group bg-card rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Image gallery */}
      <div className="relative h-80 overflow-hidden">
        <AppImage
          src={product.images[currentImg]}
          alt={`${product.name} - ${currentImg === 0 ? 'front view' : `view ${currentImg + 1}`}`}
          fill className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button onClick={e => { e.stopPropagation(); setWishlisted(!wishlisted); }}
          className={`heart-btn absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm ${wishlisted ? 'active' : ''}`}>
          <Icon name="HeartIcon" size={16} variant={wishlisted ? 'solid' : 'outline'}
            className={wishlisted ? 'text-red-500' : 'text-foreground'} />
        </button>

        {/* Image strip */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          {product.images.map((img, idx) => (
            <button key={idx} onClick={() => setCurrentImg(idx)}
              className={`flex-1 h-1.5 rounded-full transition-all ${idx === currentImg ? 'bg-accent' : 'bg-white/40'}`} />
          ))}
        </div>

        {/* Hover to switch images */}
        <div className="absolute inset-0 grid opacity-0 group-hover:opacity-100" style={{ gridTemplateColumns: `repeat(${product.images.length}, 1fr)` }}>
          {product.images.map((_, idx) => (
            <div key={idx} onMouseEnter={() => setCurrentImg(idx)} className="h-full" />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">{product.tagline}</p>
        <h3 className="font-display font-bold text-xl tracking-tight mb-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
          <Icon name="SwatchIcon" size={12} className="text-accent" />
          <span>{product.fabric}</span>
          <span className="mx-1">·</span>
          <span>{product.fit}</span>
        </div>

        {/* Colors */}
        <div className="flex gap-2 mb-4">
          {product.colors.map(c => (
            <div key={c} className="w-5 h-5 rounded-full border-2 border-border hover:border-accent cursor-pointer transition-colors"
              style={{ backgroundColor: c }} />
          ))}
        </div>

        {/* Price + Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-2xl">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-muted-foreground line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">-{discount}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="StarIcon" size={14} variant="solid" className="text-accent" />
            <span className="text-sm font-bold">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={onSelect}
            className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-bold text-sm hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center gap-2">
            <Icon name="ShoppingBagIcon" size={16} />
            Add to Cart
          </button>
          <button onClick={onSelect}
            className="px-4 py-3 border border-border rounded-xl hover:bg-muted transition-colors">
            <Icon name="EyeIcon" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductDetailModal({ product, onClose }: { product: ClassicProduct; onClose: () => void }) {
  const [currentImg, setCurrentImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card w-full md:max-w-4xl md:rounded-3xl overflow-hidden max-h-[95vh] overflow-y-auto shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
          <Icon name="XMarkIcon" size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images */}
          <div className="relative">
            <div className="relative h-80 md:h-full min-h-[320px]">
              <AppImage src={product.images[currentImg]} alt={`${product.name} detail view ${currentImg + 1}`}
                fill className="object-cover" sizes="50vw" />
            </div>
            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              {product.images.map((img, idx) => (
                <button key={idx} onClick={() => setCurrentImg(idx)}
                  className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${idx === currentImg ? 'border-accent' : 'border-transparent opacity-60'}`}>
                  <AppImage src={img} alt={`Thumbnail ${idx + 1}`} width={40} height={40} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col gap-5">
            <div>
              <span className="text-accent text-xs font-bold uppercase tracking-widest">{product.tagline}</span>
              <h2 className="font-display font-black text-2xl md:text-3xl tracking-tight mt-1">{product.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <Icon key={s} name="StarIcon" size={12} variant="solid" className={s <= Math.round(product.rating) ? 'text-accent' : 'text-muted'} />)}
                </div>
                <span className="text-sm font-bold">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-3">
              <span className="font-display font-black text-3xl">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-muted-foreground line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                Save ₹{(product.mrp - product.price).toLocaleString('en-IN')}
              </span>
            </div>

            {/* Color */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Color</p>
              <div className="flex gap-2">
                {product.colors.map(c => (
                  <button key={c} onClick={() => setSelectedColor(c)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === c ? 'border-accent scale-110' : 'border-border'}`}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Size</p>
                <button className="text-xs text-accent font-semibold hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 rounded-lg border text-sm font-semibold transition-all ${selectedSize === size ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-accent text-foreground'}`}>
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && <p className="text-xs text-red-500 mt-1">Please select a size</p>}
            </div>

            {/* Qty */}
            <div className="flex items-center gap-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Qty</p>
              <div className="flex items-center gap-3 bg-secondary rounded-xl px-4 py-2">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-6 h-6 flex items-center justify-center font-bold hover:text-accent">-</button>
                <span className="font-bold w-4 text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-6 h-6 flex items-center justify-center font-bold hover:text-accent">+</button>
              </div>
            </div>

            {/* Fabric & Fit */}
            <div className="bg-secondary rounded-xl p-4 grid grid-cols-2 gap-3 text-xs">
              <div><p className="text-muted-foreground mb-0.5">Fabric</p><p className="font-semibold">{product.fabric}</p></div>
              <div><p className="text-muted-foreground mb-0.5">Fit</p><p className="font-semibold">{product.fit}</p></div>
              <div><p className="text-muted-foreground mb-0.5">Delivery</p><p className="font-semibold">2–5 Business Days</p></div>
              <div><p className="text-muted-foreground mb-0.5">Returns</p><p className="font-semibold">15 Days Easy Return</p></div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button onClick={handleAddToCart} disabled={!selectedSize}
                className={`flex-1 py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${added ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed'}`}>
                {added ? <><Icon name="CheckIcon" size={16} />Added!</> : <><Icon name="ShoppingBagIcon" size={16} />Add to Cart</>}
              </button>
              <button className="px-4 py-4 border border-border rounded-xl hover:bg-muted transition-colors">
                <Icon name="HeartIcon" size={16} className="text-muted-foreground" />
              </button>
            </div>

            {/* Payment info */}
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Icon name="ShieldCheckIcon" size={12} className="text-accent" />Secure Payment</span>
              <span className="flex items-center gap-1"><Icon name="TruckIcon" size={12} className="text-accent" />Free Delivery ₹999+</span>
              <span className="flex items-center gap-1"><Icon name="ArrowPathIcon" size={12} className="text-accent" />Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}