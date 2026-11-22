'use client';
import React, { useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import OrdersPanel from './OrdersPanel';
import ProductsPanel from './ProductsPanel';
import CustomersPanel from './CustomersPanel';
import AnalyticsPanel from './AnalyticsPanel';
import ReturnsPanel from './ReturnsPanel';
import SupportPanel from './SupportPanel';

type AdminTab = 'orders' | 'products' | 'customers' | 'analytics' | 'returns' | 'support';

const navItems: { id: AdminTab; label: string; icon: string; badge?: number }[] = [
  { id: 'orders', label: 'Orders', icon: 'ShoppingBagIcon', badge: 12 },
  { id: 'products', label: 'Products', icon: 'TagIcon' },
  { id: 'customers', label: 'Customers', icon: 'UserGroupIcon' },
  { id: 'analytics', label: 'Analytics', icon: 'ChartBarIcon' },
  { id: 'returns', label: 'Returns', icon: 'ArrowPathIcon', badge: 3 },
  { id: 'support', label: 'Support', icon: 'ChatBubbleLeftRightIcon', badge: 5 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('orders');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPanel = () => {
    switch (activeTab) {
      case 'orders': return <OrdersPanel />;
      case 'products': return <ProductsPanel />;
      case 'customers': return <CustomersPanel />;
      case 'analytics': return <AnalyticsPanel />;
      case 'returns': return <ReturnsPanel />;
      case 'support': return <SupportPanel />;
      default: return <OrdersPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar */}
      <aside className={`bg-primary text-primary-foreground flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} flex-shrink-0 fixed h-full z-40 lg:relative`}>
        {/* Logo */}
        <div className={`flex items-center gap-3 p-4 border-b border-white/10 h-16 ${!sidebarOpen && 'justify-center'}`}>
          <AppLogo size={32} />
          {sidebarOpen && <span className="font-display font-bold text-base truncate">Super Syno Admin</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`admin-sidebar-link w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id ? 'active' : 'text-primary-foreground/60 hover:text-primary-foreground hover:bg-white/10'} ${!sidebarOpen && 'justify-center'}`}>
              <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={20} className="flex-shrink-0" />
              {sidebarOpen && (
                <span className="flex-1 text-left">{item.label}</span>
              )}
              {sidebarOpen && item.badge && (
                <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
              )}
              {!sidebarOpen && item.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className={`p-4 border-t border-white/10 space-y-2`}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-primary-foreground/60 hover:text-primary-foreground hover:bg-white/10 text-sm transition-all ${!sidebarOpen && 'justify-center'}`}>
            <Icon name={sidebarOpen ? 'ChevronLeftIcon' : 'ChevronRightIcon'} size={18} />
            {sidebarOpen && <span>Collapse</span>}
          </button>
          <a href="/" className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-primary-foreground/60 hover:text-primary-foreground hover:bg-white/10 text-sm transition-all ${!sidebarOpen && 'justify-center'}`}>
            <Icon name="ArrowLeftIcon" size={18} />
            {sidebarOpen && <span>Back to Store</span>}
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'} ml-16 lg:ml-0`}>
        {/* Top bar */}
        <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-muted rounded-lg">
              <Icon name="Bars3Icon" size={20} />
            </button>
            <div>
              <h1 className="font-display font-bold text-lg capitalize">{activeTab}</h1>
              <p className="text-xs text-muted-foreground">Super Syno Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
              <Icon name="BellIcon" size={20} className="text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2">
              <div className="w-7 h-7 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-accent-foreground">A</span>
              </div>
              <span className="text-sm font-medium hidden md:block">Admin</span>
            </div>
          </div>
        </header>

        {/* Panel */}
        <main className="flex-1 p-6 overflow-auto">
          {renderPanel()}
        </main>
      </div>
    </div>
  );
}