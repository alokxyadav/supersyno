'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const testimonials = [
{
  id: 1, name: 'Priya Sharma', location: 'Mumbai', rating: 5,
  text: 'The Oversized Kurta is absolutely stunning. The fabric quality is exceptional — soft, breathable, and the fit is perfect. Super Syno has become my go-to brand!',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_155e13316-1773073560320.png",
  product: 'Oversized Linen Kurta'
},
{
  id: 2, name: 'Arjun Mehta', location: 'Delhi', rating: 5,
  text: 'Ordered the Street Hoodie and the cargo pants together. The quality is premium — way better than what I expected at this price point. Fast delivery too!',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10a4d67bd-1764741068022.png",
  product: 'Street Drop Shoulder Hoodie'
},
{
  id: 3, name: 'Kavitha Reddy', location: 'Bengaluru', rating: 5,
  text: 'The traditional saree collection is breathtaking. I wore the silk blend saree to a wedding and got so many compliments. The Amazon affiliate pick was spot on!',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_194afb234-1764672693697.png",
  product: 'Silk Blend Saree'
},
{
  id: 4, name: 'Rohit Patel', location: 'Ahmedabad', rating: 4,
  text: "Super Syno Classic line is genuinely premium. The stitching, fabric, and packaging — everything feels luxury. Worth every rupee. Already placed my second order.",
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_188a3fd77-1767716579419.png",
  product: 'Super Syno Classic Shirt'
}];


export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 px-4 md:px-8 bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium block mb-2">Social Proof</span>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tighter">What Our Customers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials?.map((t, i) =>
          <div key={t?.id}
          className={`bg-card rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${i === active ? 'border-accent shadow-lg scale-105' : 'border-border hover:border-accent/50'}`}
          onClick={() => setActive(i)}>
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5]?.map((s) =>
              <Icon key={s} name="StarIcon" size={14} variant="solid"
              className={s <= t?.rating ? 'text-accent' : 'text-muted'} />
              )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">{t?.text}</p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage src={t?.avatar} alt={`${t?.name} - happy Super Syno customer`} width={40} height={40} className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{t?.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t?.location} · {t?.product}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}