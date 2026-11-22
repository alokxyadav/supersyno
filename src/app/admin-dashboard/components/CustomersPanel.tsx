'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Customer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  city: string;
  orders: number;
  totalSpent: number;
  joined: string;
  avatar: string;
  status: 'active' | 'inactive';
}

const customers: Customer[] = [
  { id: 'c1', name: 'Priya Sharma', mobile: '+91 98765 43210', email: 'priya@example.com', city: 'Mumbai', orders: 8, totalSpent: 22450, joined: 'Jan 2026', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80', status: 'active' },
  { id: 'c2', name: 'Arjun Mehta', mobile: '+91 87654 32109', email: 'arjun@example.com', city: 'Delhi', orders: 5, totalSpent: 16890, joined: 'Feb 2026', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80', status: 'active' },
  { id: 'c3', name: 'Kavitha Reddy', mobile: '+91 76543 21098', email: 'kavitha@example.com', city: 'Bengaluru', orders: 12, totalSpent: 45200, joined: 'Dec 2025', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&q=80', status: 'active' },
  { id: 'c4', name: 'Rohit Patel', mobile: '+91 65432 10987', email: 'rohit@example.com', city: 'Ahmedabad', orders: 3, totalSpent: 8750, joined: 'Mar 2026', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80', status: 'active' },
  { id: 'c5', name: 'Sneha Iyer', mobile: '+91 54321 09876', email: 'sneha@example.com', city: 'Chennai', orders: 7, totalSpent: 19340, joined: 'Jan 2026', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80', status: 'inactive' },
];

export default function CustomersPanel() {
  const [search, setSearch] = useState('');
  const [messageCustomer, setMessageCustomer] = useState<Customer | null>(null);
  const [messageText, setMessageText] = useState('');
  const [sent, setSent] = useState(false);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.mobile.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = () => {
    setSent(true);
    setTimeout(() => { setSent(false); setMessageText(''); setMessageCustomer(null); }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Customers', value: customers.length, icon: 'UserGroupIcon', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active', value: customers.filter(c => c.status === 'active').length, icon: 'CheckCircleIcon', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Avg. Orders', value: (customers.reduce((s, c) => s + c.orders, 0) / customers.length).toFixed(1), icon: 'ShoppingBagIcon', color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Total Revenue', value: `₹${customers.reduce((s, c) => s + c.totalSpent, 0).toLocaleString('en-IN')}`, icon: 'CurrencyRupeeIcon', color: 'text-yellow-600', bg: 'bg-yellow-50' },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-2xl p-5 border border-border">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon name={s.icon as Parameters<typeof Icon>[0]['name']} size={20} className={s.color} />
            </div>
            <p className="font-display font-black text-2xl">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="relative">
        <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-accent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(customer => (
          <div key={customer.id} className="bg-card rounded-2xl p-5 border border-border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage src={customer.avatar} alt={`${customer.name} customer profile`} width={48} height={48} className="object-cover w-full h-full" />
                </div>
                <div>
                  <p className="font-bold text-foreground">{customer.name}</p>
                  <p className="text-xs text-muted-foreground">{customer.city} · Since {customer.joined}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${customer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {customer.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
              <div className="bg-secondary rounded-xl p-3 text-center">
                <p className="font-display font-black text-lg text-foreground">{customer.orders}</p>
                <p className="text-muted-foreground">Orders</p>
              </div>
              <div className="bg-secondary rounded-xl p-3 text-center">
                <p className="font-display font-black text-lg text-accent">₹{(customer.totalSpent / 1000).toFixed(1)}K</p>
                <p className="text-muted-foreground">Spent</p>
              </div>
            </div>

            <div className="text-xs text-muted-foreground space-y-1 mb-4">
              <p className="flex items-center gap-1.5"><Icon name="PhoneIcon" size={11} className="text-accent" />{customer.mobile}</p>
              <p className="flex items-center gap-1.5"><Icon name="EnvelopeIcon" size={11} className="text-accent" />{customer.email}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setMessageCustomer(customer)}
                className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground py-2 rounded-xl text-xs font-bold hover:bg-accent hover:text-accent-foreground transition-colors">
                <Icon name="ChatBubbleLeftIcon" size={12} />
                Message
              </button>
              <a href={`https://wa.me/${customer.mobile.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-green-500 text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-green-600 transition-colors">
                <Icon name="ChatBubbleLeftRightIcon" size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Message Modal */}
      {messageCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMessageCustomer(null)} />
          <div className="relative bg-card rounded-3xl w-full max-w-md shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg">Message {messageCustomer.name}</h2>
              <button onClick={() => setMessageCustomer(null)} className="p-2 hover:bg-muted rounded-full">
                <Icon name="XMarkIcon" size={18} />
              </button>
            </div>
            <textarea value={messageText} onChange={e => setMessageText(e.target.value)}
              placeholder="Type your message..." rows={4}
              className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:border-accent resize-none mb-3" />
            <div className="flex gap-3">
              <button onClick={handleSend}
                className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${sent ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground'}`}>
                {sent ? <><Icon name="CheckIcon" size={16} />Sent!</> : <><Icon name="PaperAirplaneIcon" size={16} />Send</>}
              </button>
              <a href={`https://wa.me/${messageCustomer.mobile.replace(/\D/g, '')}?text=${encodeURIComponent(messageText)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-green-600 transition-colors">
                <Icon name="ChatBubbleLeftRightIcon" size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}