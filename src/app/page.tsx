import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import TrendingSection from './components/TrendingSection';
import NewArrivalsSection from './components/NewArrivalsSection';
import BestSellersSection from './components/BestSellersSection';
import CategoryProductSections from './components/CategoryProductSections';
import FeaturedProducts from './components/FeaturedProducts';
import PromoBanner from './components/PromoBanner';
import BrandStorySection from './components/BrandStorySection';
import ClassicTeaser from './components/ClassicTeaser';
import TestimonialsSection from './components/TestimonialsSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategorySection />
      <TrendingSection />
      <NewArrivalsSection />
      <BestSellersSection />
      <CategoryProductSections />
      <FeaturedProducts />
      <PromoBanner />
      <BrandStorySection />
      <ClassicTeaser />
      <TestimonialsSection />
      {/* Order Tracking Strip */}
      <section className="py-12 px-4 md:px-8 bg-primary text-primary-foreground">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg">Track Your Order</h3>
              <p className="text-primary-foreground/60 text-sm">Real-time updates on every shipment</p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input type="text" placeholder="Enter Order ID or Mobile Number"
              className="flex-1 md:w-72 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-accent" />
            <button className="bg-accent text-accent-foreground px-6 py-3 rounded-full font-bold text-sm hover:bg-white hover:text-foreground transition-colors whitespace-nowrap">
              Track Now
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}