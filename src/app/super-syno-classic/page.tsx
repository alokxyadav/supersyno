import React from 'react';
import ClassicHero from './components/ClassicHero';
import ClassicProducts from './components/ClassicProducts';
import ClassicBrandValues from './components/ClassicBrandValues';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SuperSynoClassicPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ClassicHero />
      <ClassicBrandValues />
      <ClassicProducts />
      <Footer />
    </main>
  );
}