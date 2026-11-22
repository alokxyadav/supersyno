'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type ReturnStatus = 'requested' | 'approved' | 'picked_up' | 'refunded' | 'rejected';

interface ReturnRequest {
  id: string;
  orderId: string;
  customer: string;
  mobile: string;
  item: string;
  reason: string;
  amount: number;
  status: ReturnStatus;
  date: string;
  refundMethod: string;
}

const returns: ReturnRequest[] = [
  { id: 'R001', orderId: 'SS2026001', customer: 'Priya Sharma', mobile: '+91 98765 43210', item: 'Oversized Linen Kurta (M)', reason: 'Size too large', amount: 2499, status: 'requested', date: '30 Apr 2026', refundMethod: 'Original Payment' },
  { id: 'R002', orderId: 'SS2025089', customer: 'Meera Nair', mobile: '+91 91234 56789', item: 'Floral Anarkali Suit (L)', reason: 'Color different from image', amount: 1899, status: 'approved', date: '29 Apr 2026', refundMethod: 'Store Credit' },
  { id: 'R003', orderId: 'SS2025076', customer: 'Aditya Kumar', mobile: '+91 80123 45678', item: 'Super Syno Classic Shirt (M)', reason: 'Defective stitching', amount: 3499, status: 'picked_up', date: '27 Apr 2026', refundMethod: 'Original Payment' },
];

const statusConfig: Record<ReturnStatus, { label: string; bg: string; text: string }> = {
  requested: { label: 'Requested', bg: 'bg-yellow-100', text: 'text-yellow-800' },
  approved: { label: 'Approved', bg: 'bg-blue-100', text: 'text-blue-800' },
  picked_up: { label: 'Picked Up', bg: 'bg-purple-100', text: 'text-purple-800' },
  refunded: { label: 'Refunded', bg: 'bg-green-100', text: 'text-green-800' },
  rejected: { label: 'Rejected', bg: 'bg-red-100', text: 'text-red-800' },
};

export default function ReturnsPanel() {
  const [returnsList, setReturnsList] = useState<ReturnRequest[]>(returns);
  const [selected, setSelected] = useState<ReturnRequest | null>(null);

  const updateStatus = (id: string, status: ReturnStatus) => {
    setReturnsList(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Returns', value: returnsList.length, icon: 'ArrowPathIcon', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending Review', value: returnsList.filter(r => r.status === 'requested').length, icon: 'ClockIcon', color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Approved', value: returnsList.filter(r => r.status === 'approved').length, icon: 'CheckCircleIcon', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Refund Value', value: `₹${returnsList.filter(r => r.status !== 'rejected').reduce((s, r) => s + r.amount, 0).toLocaleString('en-IN')}`, icon: 'CurrencyRupeeIcon', color: 'text-red-600', bg: 'bg-red-50' },
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

      <div className="space-y-3">
        {returnsList.map(r => (
          <div key={r.id} className="bg-card rounded-2xl p-5 border border-border hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs font-bold text-accent">{r.id}</span>
                  <span className="text-xs text-muted-foreground">Order {r.orderId}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusConfig[r.status].bg} ${statusConfig[r.status].text}`}>
                    {statusConfig[r.status].label}
                  </span>
                </div>
                <p className="font-semibold text-foreground">{r.customer}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{r.item}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Icon name="ChatBubbleBottomCenterTextIcon" size={12} className="text-accent" />
                  <span>Reason: {r.reason}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-bold text-lg text-foreground">₹{r.amount.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-muted-foreground">{r.refundMethod}</p>
                </div>
                <button onClick={() => setSelected(r)}
                  className="p-2 hover:bg-muted rounded-xl transition-colors">
                  <Icon name="EyeIcon" size={18} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
          <div className="relative bg-card rounded-3xl w-full max-w-md shadow-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-lg">Return {selected.id}</h2>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-muted rounded-full">
                <Icon name="XMarkIcon" size={18} />
              </button>
            </div>
            <div className="space-y-3 text-sm mb-5">
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-muted-foreground text-xs mb-0.5">Customer</p><p className="font-semibold">{selected.customer}</p></div>
                <div><p className="text-muted-foreground text-xs mb-0.5">Mobile</p><p className="font-semibold">{selected.mobile}</p></div>
                <div className="col-span-2"><p className="text-muted-foreground text-xs mb-0.5">Item</p><p className="font-semibold">{selected.item}</p></div>
                <div className="col-span-2"><p className="text-muted-foreground text-xs mb-0.5">Reason</p><p className="font-semibold">{selected.reason}</p></div>
                <div><p className="text-muted-foreground text-xs mb-0.5">Amount</p><p className="font-bold text-accent">₹{selected.amount.toLocaleString('en-IN')}</p></div>
                <div><p className="text-muted-foreground text-xs mb-0.5">Refund Via</p><p className="font-semibold">{selected.refundMethod}</p></div>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {(['approved', 'picked_up', 'refunded', 'rejected'] as ReturnStatus[]).map(s => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${selected.status === s ? `${statusConfig[s].bg} ${statusConfig[s].text} ring-2 ring-offset-1 ring-accent` : `${statusConfig[s].bg} ${statusConfig[s].text} opacity-60 hover:opacity-100`}`}>
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}