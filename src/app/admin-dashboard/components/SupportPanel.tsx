'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
type TicketPriority = 'high' | 'medium' | 'low';

interface SupportTicket {
  id: string;
  customer: string;
  mobile: string;
  subject: string;
  message: string;
  status: TicketStatus;
  priority: TicketPriority;
  date: string;
  category: string;
  replies: { from: 'customer' | 'admin'; text: string; time: string }[];
}

const tickets: SupportTicket[] = [
  {
    id: 'T001', customer: 'Priya Sharma', mobile: '+91 98765 43210',
    subject: 'Order not delivered after 7 days', category: 'Delivery',
    message: 'I placed my order SS2026001 on 23rd April but it still shows as shipped. Please help.',
    status: 'open', priority: 'high', date: '30 Apr 2026',
    replies: [
      { from: 'customer', text: 'I placed my order SS2026001 on 23rd April but it still shows as shipped. Please help.', time: '10:30 AM' },
    ],
  },
  {
    id: 'T002', customer: 'Rahul Verma', mobile: '+91 77654 32100',
    subject: 'Wrong size delivered', category: 'Product Issue',
    message: 'I ordered size L but received size M for the Super Syno Classic Kurta. Need exchange.',
    status: 'in_progress', priority: 'high', date: '29 Apr 2026',
    replies: [
      { from: 'customer', text: 'I ordered size L but received size M. Need exchange.', time: '9:15 AM' },
      { from: 'admin', text: 'We apologize for the inconvenience. We have initiated an exchange request. Our team will pick up the wrong item within 2 business days.', time: '11:30 AM' },
    ],
  },
  {
    id: 'T003', customer: 'Ananya Singh', mobile: '+91 66543 21000',
    subject: 'Refund not received', category: 'Payment',
    message: 'My return was approved on 25th April but I have not received the refund yet.',
    status: 'in_progress', priority: 'medium', date: '29 Apr 2026',
    replies: [
      { from: 'customer', text: 'My return was approved on 25th April but I have not received the refund yet.', time: '2:00 PM' },
    ],
  },
  {
    id: 'T004', customer: 'Deepak Joshi', mobile: '+91 55432 10900',
    subject: 'Coupon code not working', category: 'Payment',
    message: 'The coupon code SYNO10 is not applying at checkout.',
    status: 'resolved', priority: 'low', date: '28 Apr 2026',
    replies: [
      { from: 'customer', text: 'The coupon code SYNO10 is not applying at checkout.', time: '3:45 PM' },
      { from: 'admin', text: 'The coupon has been manually applied to your order. Please try again and it should work now!', time: '4:30 PM' },
    ],
  },
];

const statusStyle: Record<TicketStatus, string> = {
  open: 'bg-red-100 text-red-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-600',
};

const priorityStyle: Record<TicketPriority, string> = {
  high: 'bg-red-50 text-red-600',
  medium: 'bg-yellow-50 text-yellow-600',
  low: 'bg-green-50 text-green-600',
};

export default function SupportPanel() {
  const [ticketsList, setTicketsList] = useState<SupportTicket[]>(tickets);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);

  const handleReply = () => {
    if (!replyText.trim() || !selectedTicket) return;
    const newReply = { from: 'admin' as const, text: replyText, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) };
    const updated = ticketsList.map(t =>
      t.id === selectedTicket.id
        ? { ...t, replies: [...t.replies, newReply], status: 'in_progress' as TicketStatus }
        : t
    );
    setTicketsList(updated);
    setSelectedTicket(prev => prev ? { ...prev, replies: [...prev.replies, newReply], status: 'in_progress' } : null);
    setReplyText('');
    setReplySent(true);
    setTimeout(() => setReplySent(false), 2000);
  };

  const updateTicketStatus = (id: string, status: TicketStatus) => {
    setTicketsList(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    if (selectedTicket?.id === id) setSelectedTicket(prev => prev ? { ...prev, status } : null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Open Tickets', value: ticketsList.filter(t => t.status === 'open').length, icon: 'ExclamationCircleIcon', color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'In Progress', value: ticketsList.filter(t => t.status === 'in_progress').length, icon: 'ClockIcon', color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Resolved', value: ticketsList.filter(t => t.status === 'resolved').length, icon: 'CheckCircleIcon', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'High Priority', value: ticketsList.filter(t => t.priority === 'high').length, icon: 'BoltIcon', color: 'text-orange-600', bg: 'bg-orange-50' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {ticketsList.map(ticket => (
          <div key={ticket.id}
            className={`bg-card rounded-2xl p-5 border transition-all cursor-pointer hover:shadow-md ${selectedTicket?.id === ticket.id ? 'border-accent' : 'border-border'}`}
            onClick={() => setSelectedTicket(ticket)}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-accent">{ticket.id}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${priorityStyle[ticket.priority]}`}>{ticket.priority}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${statusStyle[ticket.status]}`}>
                {ticket.status.replace('_', ' ')}
              </span>
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1">{ticket.subject}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{ticket.message}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Icon name="UserIcon" size={11} />
                <span>{ticket.customer}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Icon name="ChatBubbleLeftIcon" size={11} />
                  {ticket.replies.length}
                </span>
                <span>{ticket.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Detail / Reply Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedTicket(null)} />
          <div className="relative bg-card rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-accent">{selectedTicket.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${statusStyle[selectedTicket.status]}`}>
                    {selectedTicket.status.replace('_', ' ')}
                  </span>
                </div>
                <h2 className="font-display font-bold text-base">{selectedTicket.subject}</h2>
                <p className="text-xs text-muted-foreground">{selectedTicket.customer} · {selectedTicket.mobile}</p>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="p-2 hover:bg-muted rounded-full">
                <Icon name="XMarkIcon" size={18} />
              </button>
            </div>

            {/* Conversation */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {selectedTicket.replies.map((reply, i) => (
                <div key={i} className={`flex ${reply.from === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${reply.from === 'admin' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-secondary text-foreground rounded-bl-sm'}`}>
                    <p className="leading-relaxed">{reply.text}</p>
                    <p className={`text-[10px] mt-1 ${reply.from === 'admin' ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>{reply.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Status update */}
            <div className="px-5 pb-3 flex gap-2 flex-wrap">
              {(['open', 'in_progress', 'resolved', 'closed'] as TicketStatus[]).map(s => (
                <button key={s} onClick={() => updateTicketStatus(selectedTicket.id, s)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${selectedTicket.status === s ? `${statusStyle[s]} ring-1 ring-offset-1 ring-accent` : `${statusStyle[s]} opacity-60 hover:opacity-100`}`}>
                  {s.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Reply input */}
            <div className="p-5 border-t border-border">
              <div className="flex gap-3">
                <textarea
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  rows={2}
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:border-accent resize-none"
                />
                <div className="flex flex-col gap-2">
                  <button onClick={handleReply}
                    className={`p-3 rounded-xl transition-all ${replySent ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground'}`}>
                    {replySent ? <Icon name="CheckIcon" size={18} /> : <Icon name="PaperAirplaneIcon" size={18} />}
                  </button>
                  <a href={`https://wa.me/${selectedTicket.mobile.replace(/\D/g, '')}?text=${encodeURIComponent(replyText)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center">
                    <Icon name="ChatBubbleLeftRightIcon" size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}