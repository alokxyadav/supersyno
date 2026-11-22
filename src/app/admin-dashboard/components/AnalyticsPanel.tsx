'use client';
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '@/components/ui/AppIcon';

const revenueData = [
  { month: 'Nov', revenue: 45000, orders: 18 },
  { month: 'Dec', revenue: 78000, orders: 32 },
  { month: 'Jan', revenue: 62000, orders: 25 },
  { month: 'Feb', revenue: 91000, orders: 38 },
  { month: 'Mar', revenue: 84000, orders: 34 },
  { month: 'Apr', revenue: 112000, orders: 47 },
];

const categoryData = [
  { name: 'Men', value: 28, color: '#C8A96E' },
  { name: 'Women', value: 35, color: '#0A0A0A' },
  { name: 'Traditional', value: 18, color: '#A8854A' },
  { name: 'Street', value: 12, color: '#6B6560' },
  { name: 'Classic', value: 7, color: '#E8C98E' },
];

const topProducts = [
  { name: 'Oversized Linen Kurta', sold: 342, revenue: 854958 },
  { name: 'Super Syno Classic Kurta Set', sold: 334, revenue: 1669166 },
  { name: 'Silk Blend Saree (Amazon)', sold: 291, revenue: 1338309 },
  { name: "Women\'s Co-ord Set", sold: 278, revenue: 1056122 },
  { name: 'Street Drop Hoodie', sold: 218, revenue: 718982 },
];

export default function AnalyticsPanel() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = revenueData.reduce((s, d) => s + d.orders, 0);

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, change: '+23%', icon: 'CurrencyRupeeIcon', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Total Orders', value: totalOrders, change: '+18%', icon: 'ShoppingBagIcon', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg. Order Value', value: `₹${Math.round(totalRevenue / totalOrders).toLocaleString('en-IN')}`, change: '+5%', icon: 'ArrowTrendingUpIcon', color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Conversion Rate', value: '3.8%', change: '+0.4%', icon: 'ChartBarIcon', color: 'text-yellow-600', bg: 'bg-yellow-50' },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                <Icon name={s.icon as Parameters<typeof Icon>[0]['name']} size={20} className={s.color} />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{s.change}</span>
            </div>
            <p className="font-display font-black text-2xl text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Period filter */}
      <div className="flex gap-2">
        {(['week', 'month', 'year'] as const).map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all capitalize ${period === p ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`}>
            {p === 'week' ? 'This Week' : p === 'month' ? 'This Month' : 'This Year'}
          </button>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-display font-bold text-base mb-4">Revenue & Orders</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2DDD4" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B6560' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6B6560' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}K`} />
              <Tooltip formatter={(value: number, name: string) => [name === 'revenue' ? `₹${value.toLocaleString('en-IN')}` : value, name === 'revenue' ? 'Revenue' : 'Orders']} />
              <Bar dataKey="revenue" fill="#C8A96E" radius={[6, 6, 0, 0]} />
              <Bar dataKey="orders" fill="#0A0A0A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category pie */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-display font-bold text-base mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {categoryData.map(c => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-muted-foreground">{c.name}</span>
                </div>
                <span className="font-bold">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top products */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-display font-bold text-base mb-4">Top Selling Products</h3>
        <div className="space-y-3">
          {topProducts.map((p, i) => (
            <div key={p.name} className="flex items-center gap-4">
              <span className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{p.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-muted rounded-full h-1.5">
                    <div className="bg-accent rounded-full h-1.5 transition-all duration-500"
                      style={{ width: `${(p.sold / topProducts[0].sold) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{p.sold} sold</span>
                </div>
              </div>
              <span className="text-sm font-bold text-accent whitespace-nowrap">₹{(p.revenue / 100000).toFixed(1)}L</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}