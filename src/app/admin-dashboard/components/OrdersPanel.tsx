'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  customer: string;
  mobile: string;
  items: string;
  total: number;
  status: OrderStatus;
  date: string;
  address: string;
  paymentMethod: string;
}

const mockOrders: Order[] = [
  { id: 'SS2026001', customer: 'Priya Sharma', mobile: '+91 98765 43210', items: 'Oversized Linen Kurta (M)', total: 2499, status: 'pending', date: '30 Apr 2026', address: 'Bandra West, Mumbai 400050', paymentMethod: 'Razorpay UPI' },
  { id: 'SS2026002', customer: 'Arjun Mehta', mobile: '+91 87654 32109', items: 'Street Drop Hoodie (L), Cargo Jogger (M)', total: 5498, status: 'confirmed', date: '30 Apr 2026', address: 'Connaught Place, Delhi 110001', paymentMethod: 'Razorpay Card' },
  { id: 'SS2026003', customer: 'Kavitha Reddy', mobile: '+91 76543 21098', items: 'Super Syno Classic Kurta Set (S)', total: 4999, status: 'shipped', date: '29 Apr 2026', address: 'Koramangala, Bengaluru 560034', paymentMethod: 'COD' },
  { id: 'SS2026004', customer: 'Rohit Patel', mobile: '+91 65432 10987', items: "Women's Co-ord Set (XS)", total: 3799, status: 'delivered', date: '28 Apr 2026', address: 'CG Road, Ahmedabad 380009', paymentMethod: 'Razorpay NetBanking' },
  { id: 'SS2026005', customer: 'Sneha Iyer', mobile: '+91 54321 09876', items: 'Super Syno Artisan Jacket (M)', total: 5999, status: 'shipped', date: '28 Apr 2026', address: 'Anna Nagar, Chennai 600040', paymentMethod: 'Razorpay UPI' },
  { id: 'SS2026006', customer: 'Vikram Singh', mobile: '+91 43210 98765', items: 'Graphic Print Tee (XL) x2', total: 1998, status: 'pending', date: '30 Apr 2026', address: 'Hazratganj, Lucknow 226001', paymentMethod: 'COD' },
];

const statusConfig: Record<OrderStatus, { label: string; bg: string; text: string }> = {
  pending: { label: 'Pending', bg: 'bg-yellow-100', text: 'text-yellow-800' },
  confirmed: { label: 'Confirmed', bg: 'bg-blue-100', text: 'text-blue-800' },
  shipped: { label: 'Shipped', bg: 'bg-purple-100', text: 'text-purple-800' },
  delivered: { label: 'Delivered', bg: 'bg-green-100', text: 'text-green-800' },
  cancelled: { label: 'Cancelled', bg: 'bg-red-100', text: 'text-red-800' },
};

export default function OrdersPanel() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const [messageModal, setMessageModal] = useState<Order | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const filtered = filterStatus === 'all' ? orders : orders.filter(o => o.status === filterStatus);

  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder?.id === orderId) setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    setMessageSent(true);
    setTimeout(() => { setMessageSent(false); setMessageText(''); setMessageModal(null); }, 2000);
  };

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: 'ShoppingBagIcon', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, icon: 'ClockIcon', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Shipped', value: orders.filter(o => o.status === 'shipped').length, icon: 'TruckIcon', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: "Today\'s Revenue", value: `₹${orders.reduce((s, o) => s + o.total, 0).toLocaleString('en-IN')}`, icon: 'CurrencyRupeeIcon', color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-card rounded-2xl p-5 border border-border">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon name={s.icon as Parameters<typeof Icon>[0]['name']} size={20} className={s.color} />
            </div>
            <p className="font-display font-black text-2xl text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as (OrderStatus | 'all')[]).map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all capitalize ${filterStatus === s ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`}>
            {s === 'all' ? 'All Orders' : s}
          </button>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Order ID</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Items</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Total</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(order => (
                <tr key={order.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-accent">{order.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-foreground">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.mobile}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell max-w-[160px] truncate">{order.items}</td>
                  <td className="px-4 py-3 font-bold text-foreground">₹{order.total.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${statusConfig[order.status].bg} ${statusConfig[order.status].text}`}>
                      {statusConfig[order.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setSelectedOrder(order)}
                        className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="View Details">
                        <Icon name="EyeIcon" size={14} className="text-muted-foreground" />
                      </button>
                      <button onClick={() => setMessageModal(order)}
                        className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Message Customer">
                        <Icon name="ChatBubbleLeftIcon" size={14} className="text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-card rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="font-display font-bold text-lg">Order {selectedOrder.id}</h2>
                <p className="text-xs text-muted-foreground">{selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-muted rounded-full">
                <Icon name="XMarkIcon" size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-muted-foreground text-xs mb-1">Customer</p><p className="font-semibold">{selectedOrder.customer}</p></div>
                <div><p className="text-muted-foreground text-xs mb-1">Mobile</p><p className="font-semibold">{selectedOrder.mobile}</p></div>
                <div className="col-span-2"><p className="text-muted-foreground text-xs mb-1">Items</p><p className="font-semibold">{selectedOrder.items}</p></div>
                <div className="col-span-2"><p className="text-muted-foreground text-xs mb-1">Delivery Address</p><p className="font-semibold">{selectedOrder.address}</p></div>
                <div><p className="text-muted-foreground text-xs mb-1">Payment</p><p className="font-semibold">{selectedOrder.paymentMethod}</p></div>
                <div><p className="text-muted-foreground text-xs mb-1">Total</p><p className="font-bold text-lg text-accent">₹{selectedOrder.total.toLocaleString('en-IN')}</p></div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as OrderStatus[]).map(s => (
                    <button key={s} onClick={() => updateStatus(selectedOrder.id, s)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${selectedOrder.status === s ? `${statusConfig[s].bg} ${statusConfig[s].text} ring-2 ring-offset-1 ring-accent` : `${statusConfig[s].bg} ${statusConfig[s].text} opacity-60 hover:opacity-100`}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => { setMessageModal(selectedOrder); setSelectedOrder(null); }}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-bold text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Icon name="ChatBubbleLeftIcon" size={16} />
                  Message Customer
                </button>
                <a href={`https://wa.me/${selectedOrder.mobile.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-green-600 transition-colors">
                  <Icon name="ChatBubbleLeftRightIcon" size={16} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {messageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMessageModal(null)} />
          <div className="relative bg-card rounded-3xl w-full max-w-md shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg">Message {messageModal.customer}</h2>
              <button onClick={() => setMessageModal(null)} className="p-2 hover:bg-muted rounded-full">
                <Icon name="XMarkIcon" size={18} />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Re: Order {messageModal.id}</p>
            <div className="space-y-3">
              {/* Quick templates */}
              <div className="flex flex-wrap gap-2">
                {[
                  'Your order has been confirmed!',
                  'Your order has been shipped.',
                  'Your order is out for delivery.',
                  'Please confirm your delivery address.',
                ].map(t => (
                  <button key={t} onClick={() => setMessageText(t)}
                    className="text-[10px] bg-secondary border border-border px-2 py-1 rounded-lg hover:border-accent transition-colors text-muted-foreground hover:text-foreground">
                    {t.slice(0, 30)}...
                  </button>
                ))}
              </div>
              <textarea
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                placeholder="Type your message to the customer..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent resize-none"
              />
              <div className="flex gap-3">
                <button onClick={handleSendMessage}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${messageSent ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground'}`}>
                  {messageSent ? <><Icon name="CheckIcon" size={16} />Sent!</> : <><Icon name="PaperAirplaneIcon" size={16} />Send Message</>}
                </button>
                <a href={`https://wa.me/${messageModal.mobile.replace(/\D/g, '')}?text=${encodeURIComponent(messageText || 'Hello from Super Syno!')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-green-600 transition-colors">
                  <Icon name="ChatBubbleLeftRightIcon" size={16} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}