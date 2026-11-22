'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface CartItem { id: string; name: string; price: number; qty: number; image: string; size?: string; }

// Global cart state (simple in-memory for demo)
const INITIAL_CART: CartItem[] = [
  { id: '1', name: 'Oversized Linen Kurta', price: 2499, qty: 1, image: 'https://images.unsplash.com/photo-1619603364854-1a3c11d2ca17?w=200&q=80', size: 'M' },
  { id: '2', name: 'Street Drop Hoodie', price: 3299, qty: 1, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=200&q=80', size: 'L' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistItems] = useState([
    { id: 'w1', name: "Women's Co-ord Set", price: 3799, image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=200&q=80' },
    { id: 'w2', name: 'Silk Blend Saree', price: 4599, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80' },
  ]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const updateQty = useCallback((id: string, delta: number) => {
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  }, []);

  const removeItem = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const navLinks = [
    { label: 'Men', href: '#men' },
    { label: 'Women', href: '#women' },
    { label: 'Traditional', href: '#traditional' },
    { label: 'Street', href: '#street' },
    { label: 'Classic', href: '/super-syno-classic' },
    { label: 'Sale', href: '#sale' },
    { label: 'Setup Guide', href: '/setup-guide' },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div className="noise-overlay" />
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-xs font-medium tracking-widest uppercase hidden md:block">
        🎉 Free Delivery on Orders Above ₹999 &nbsp;|&nbsp; Use Code: <span className="text-accent font-bold">SYNO10</span> for 10% Off &nbsp;|&nbsp; 48hr Pan-India Delivery
      </div>

      <header className={`fixed left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'top-0 bg-background/95 backdrop-blur-md border-b border-border shadow-sm' : 'top-8 bg-transparent'}`}>
        <nav className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <AppLogo size={36} onClick={() => {}} />
            <span className="font-display font-bold text-xl tracking-tighter text-foreground group-hover:text-accent transition-colors">
              Super Syno
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              link.href.startsWith('#') ? (
                <button key={link.label} onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground hover-underline transition-colors">
                  {link.label}
                </button>
              ) : (
                <Link key={link.label} href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground hover-underline transition-colors">
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(true)} className="hidden md:flex p-2 hover:bg-muted rounded-full transition-colors" aria-label="Search">
              <Icon name="MagnifyingGlassIcon" size={20} className="text-foreground" />
            </button>
            <Link href="/sign-up-login" className="hidden md:flex p-2 hover:bg-muted rounded-full transition-colors" aria-label="Account">
              <Icon name="UserIcon" size={20} className="text-foreground" />
            </Link>
            <button onClick={() => setWishlistOpen(true)} className="relative p-2 hover:bg-muted rounded-full transition-colors" aria-label="Wishlist">
              <Icon name="HeartIcon" size={20} className="text-foreground" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </button>
            <button onClick={() => setCartOpen(true)} className="relative p-2 hover:bg-muted rounded-full transition-colors" aria-label="Cart">
              <Icon name="ShoppingBagIcon" size={20} className="text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center badge-pulse">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 hover:bg-muted rounded-full transition-colors" aria-label="Menu">
              <Icon name="Bars3Icon" size={22} className="text-foreground" />
            </button>
          </div>
        </nav>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="w-full max-w-2xl bg-card rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <Icon name="MagnifyingGlassIcon" size={20} className="text-muted-foreground" />
              <input autoFocus type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for clothes, brands, styles..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-base focus:outline-none" />
              <button onClick={() => setSearchOpen(false)} className="p-1 hover:bg-muted rounded-full">
                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>
            <div className="p-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Kurta', 'Saree', 'Hoodie', 'Co-ord Set', 'Cargo Pants', 'Anarkali', 'Blazer', 'Dress'].map(term => (
                  <button key={term} onClick={() => { setSearchQuery(term); }} className="px-3 py-1.5 bg-muted rounded-full text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[70] transition-transform duration-700 ease-spring ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="bg-primary h-full w-full max-w-sm flex flex-col pt-8 px-8 pb-12">
          <div className="flex justify-between items-center mb-12">
            <span className="font-display font-bold text-xl text-primary-foreground">Super Syno</span>
            <button onClick={() => setMenuOpen(false)} className="p-2 text-primary-foreground hover:opacity-70">
              <Icon name="XMarkIcon" size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-2 flex-1">
            {navLinks.map((link, i) => (
              link.href.startsWith('#') ? (
                <button key={link.label} onClick={() => handleNavClick(link.href)}
                  className="group flex items-center justify-between py-4 border-b border-white/10 text-left"
                  style={{ animationDelay: `${i * 0.07}s` }}>
                  <span className="font-display text-3xl font-bold text-primary-foreground group-hover:text-accent transition-colors uppercase">{link.label}</span>
                  <Icon name="ArrowRightIcon" size={20} className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ) : (
                <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between py-4 border-b border-white/10"
                  style={{ animationDelay: `${i * 0.07}s` }}>
                  <span className="font-display text-3xl font-bold text-primary-foreground group-hover:text-accent transition-colors uppercase">{link.label}</span>
                  <Icon name="ArrowRightIcon" size={20} className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              )
            ))}
          </nav>
          <div className="mt-8 flex gap-4">
            <Link href="/sign-up-login" onClick={() => setMenuOpen(false)}
              className="flex-1 bg-accent text-accent-foreground py-3 rounded-full text-sm font-bold text-center hover:opacity-90 transition-opacity">
              Sign In
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-black/60" onClick={() => setMenuOpen(false)} />
      </div>

      {/* Wishlist Drawer */}
      <div className={`fixed inset-0 z-[80] ${wishlistOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${wishlistOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setWishlistOpen(false)} />
        <div className={`cart-drawer absolute right-0 top-0 h-full w-full max-w-md bg-card flex flex-col ${wishlistOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-display font-bold text-lg flex items-center gap-2">
              <Icon name="HeartIcon" size={20} className="text-red-500" />
              Wishlist ({wishlistItems.length})
            </h2>
            <button onClick={() => setWishlistOpen(false)} className="p-2 hover:bg-muted rounded-full">
              <Icon name="XMarkIcon" size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistItems.map(item => (
              <div key={item.id} className="flex gap-4 p-3 bg-secondary rounded-xl">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-accent font-bold mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                  <button className="mt-2 text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-full font-semibold hover:bg-accent hover:text-accent-foreground transition-colors">
                    Move to Cart
                  </button>
                </div>
                <button className="p-1 hover:text-red-500 transition-colors">
                  <Icon name="TrashIcon" size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-border">
            <button onClick={() => { setWishlistOpen(false); setCartOpen(true); }}
              className="w-full bg-primary text-primary-foreground py-4 rounded-full text-sm font-bold hover:bg-accent hover:text-accent-foreground transition-colors">
              Move All to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <div className={`fixed inset-0 z-[80] ${cartOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${cartOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setCartOpen(false)} />
        <div className={`cart-drawer absolute right-0 top-0 h-full w-full max-w-md bg-card flex flex-col ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-display font-bold text-lg">Your Cart ({totalItems})</h2>
            <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-muted rounded-full">
              <Icon name="XMarkIcon" size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="ShoppingBagIcon" size={32} className="text-muted-foreground" />
                </div>
                <p className="font-semibold text-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">Add items to get started</p>
                <button onClick={() => setCartOpen(false)} className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-bold hover:bg-accent hover:text-accent-foreground transition-colors">
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex gap-4 p-3 bg-secondary rounded-xl">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.name}</p>
                    {item.size && <p className="text-xs text-muted-foreground">Size: {item.size}</p>}
                    <p className="text-accent font-bold mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 bg-muted rounded-full flex items-center justify-center text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors">-</button>
                      <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 bg-muted rounded-full flex items-center justify-center text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-1 hover:text-red-500 transition-colors self-start">
                    <Icon name="TrashIcon" size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-border space-y-4">
              {/* Promo code */}
              <div className="flex gap-2">
                <input type="text" placeholder="Promo code (e.g. SYNO10)" className="flex-1 px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:border-accent bg-background" />
                <button className="px-4 py-2 bg-muted rounded-xl text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">Apply</button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-green-600 font-semibold">{totalPrice >= 999 ? 'FREE' : '₹99'}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg border-t border-border pt-2">
                  <span>Total</span>
                  <span>₹{(totalPrice + (totalPrice >= 999 ? 0 : 99)).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Taxes calculated at checkout</p>
              <Link href="/sign-up-login" onClick={() => setCartOpen(false)}
                className="block w-full bg-primary text-primary-foreground py-4 rounded-full text-sm font-bold text-center hover:bg-accent hover:text-accent-foreground transition-colors">
                Proceed to Checkout →
              </Link>
              <button onClick={() => setCartOpen(false)}
                className="block w-full border border-border py-3 rounded-full text-sm font-medium text-center hover:bg-muted transition-colors">
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}