'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface AdminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  status: 'active' | 'draft' | 'out_of_stock';
  image: string;
  isClassic: boolean;
  isAffiliate: boolean;
}

const products: AdminProduct[] = [
{ id: 'p1', name: 'Oversized Linen Kurta', category: 'Men', price: 2499, stock: 45, sold: 342, status: 'active', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1304f9966-1772723059309.png", isClassic: false, isAffiliate: false },
{ id: 'p2', name: 'Street Drop Shoulder Hoodie', category: 'Street', price: 3299, stock: 28, sold: 218, status: 'active', image: "https://img.rocket.new/generatedImages/rocket_gen_img_10a4d67bd-1764741068022.png", isClassic: false, isAffiliate: false },
{ id: 'p3', name: 'Super Syno Signature Linen Shirt', category: 'Classic', price: 3499, stock: 15, sold: 512, status: 'active', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b75978b8-1772101261225.png", isClassic: true, isAffiliate: false },
{ id: 'p4', name: 'Floral Anarkali Suit', category: 'Traditional', price: 1899, stock: 0, sold: 1204, status: 'out_of_stock', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=100&q=80', isClassic: false, isAffiliate: true },
{ id: 'p5', name: "Women's Co-ord Set", category: 'Women', price: 3799, stock: 33, sold: 445, status: 'active', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=100&q=80', isClassic: false, isAffiliate: false },
{ id: 'p6', name: 'Super Syno Classic Kurta Set', category: 'Classic', price: 4999, stock: 8, sold: 334, status: 'active', image: 'https://images.unsplash.com/photo-1619603364854-1a3c11d2ca17?w=100&q=80', isClassic: true, isAffiliate: false }];


const statusStyle: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  draft: 'bg-gray-100 text-gray-600',
  out_of_stock: 'bg-red-100 text-red-800'
};

export default function ProductsPanel() {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');

  const categories = ['All', 'Men', 'Women', 'Traditional', 'Street', 'Classic'];
  const filtered = products.filter((p) =>
  (filterCat === 'All' || p.category === filterCat) &&
  p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
        { label: 'Total Products', value: products.length, icon: 'TagIcon', color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Active', value: products.filter((p) => p.status === 'active').length, icon: 'CheckCircleIcon', color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Out of Stock', value: products.filter((p) => p.status === 'out_of_stock').length, icon: 'ExclamationCircleIcon', color: 'text-red-600', bg: 'bg-red-50' },
        { label: 'Classic Line', value: products.filter((p) => p.isClassic).length, icon: 'SparklesIcon', color: 'text-yellow-600', bg: 'bg-yellow-50' }].
        map((s) =>
        <div key={s.label} className="bg-card rounded-2xl p-5 border border-border">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon name={s.icon as Parameters<typeof Icon>[0]['name']} size={20} className={s.color} />
            </div>
            <p className="font-display font-black text-2xl">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-accent" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) =>
          <button key={c} onClick={() => setFilterCat(c)}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${filterCat === c ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`}>
              {c}
            </button>
          )}
        </div>
        <button className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
          <Icon name="PlusIcon" size={16} />
          Add Product
        </button>
      </div>

      {/* Products list */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Product</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Price</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Stock</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Sold</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((product) =>
              <tr key={product.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <AppImage src={product.image} alt={product.name} width={40} height={40} className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground line-clamp-1">{product.name}</p>
                        <div className="flex gap-1 mt-0.5">
                          {product.isClassic && <span className="text-[9px] bg-accent/20 text-accent font-bold px-1.5 py-0.5 rounded-full">Classic</span>}
                          {product.isAffiliate && <span className="text-[9px] bg-orange-100 text-orange-700 font-bold px-1.5 py-0.5 rounded-full">Amazon</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{product.category}</td>
                  <td className="px-4 py-3 font-bold">₹{product.price.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`font-semibold ${product.stock === 0 ? 'text-red-500' : product.stock < 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{product.sold}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${statusStyle[product.status]}`}>
                      {product.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Edit">
                        <Icon name="PencilIcon" size={14} className="text-muted-foreground" />
                      </button>
                      <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Delete">
                        <Icon name="TrashIcon" size={14} className="text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}