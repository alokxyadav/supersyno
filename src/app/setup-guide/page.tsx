import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SetupGuideContent from './components/SetupGuideContent';

export default function SetupGuidePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-0">
        <SetupGuideContent />
      </div>
      <Footer />
    </main>
  );
}
