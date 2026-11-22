import React from 'react';
import Icon from '@/components/ui/AppIcon';

const values = [
  { icon: 'SparklesIcon', title: 'Super Syno Designed', desc: 'Every piece conceived by our in-house design team — not sourced, not generic.' },
  { icon: 'ShieldCheckIcon', title: 'Quality Certified', desc: 'Triple quality check — fabric, stitching, and finish — before it reaches you.' },
  { icon: 'HeartIcon', title: 'Made in India', desc: 'Crafted by skilled artisans across India, supporting local craftsmanship.' },
  { icon: 'ArrowPathIcon', title: '15-Day Returns', desc: 'Not satisfied? Easy returns with full refund. No questions asked.' },
];

export default function ClassicBrandValues() {
  return (
    <section className="py-20 px-4 md:px-8 bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium block mb-2">Why Classic</span>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter">The Super Syno Promise</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={v.title}
              className="bg-card rounded-2xl p-8 border border-border hover:border-accent transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group fade-in-up opacity-100"
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent transition-colors duration-300">
                <Icon name={v.icon as Parameters<typeof Icon>[0]['name']} size={22} className="text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}