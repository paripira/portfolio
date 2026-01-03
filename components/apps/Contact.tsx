'use client';

import { useState } from 'react';
import { Mail, Send, Loader2, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Panggil API Backend yang baru kita buat
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Reset form
        // Kembalikan ke idle setelah 3 detik
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center p-6 overflow-y-auto">
      
      <div className="max-w-md w-full bg-slate-900/80 border border-slate-700 rounded-xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
        
        {/* Dekorasi Header */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-400 to-blue-500"></div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Mail className="text-blue-400" /> Contact Me
          </h2>
          <p className="text-slate-400 text-sm mt-1">Send a direct transmission to my database.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Input Nama */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
              <User size={12} /> Name
            </label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              placeholder="Your Name"
            />
          </div>

          {/* Input Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
              <Mail size={12} /> Email
            </label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              placeholder="name@company.com"
            />
          </div>

          {/* Input Pesan */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
              <MessageSquare size={12} /> Message
            </label>
            <textarea 
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
              placeholder="Type your encrypted message here..."
            />
          </div>

          {/* Tombol Kirim */}
          <button 
            type="submit" 
            disabled={status === 'sending' || status === 'success'}
            className={`
              w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg
              ${status === 'sending' ? 'bg-slate-700 text-slate-400 cursor-wait' : 
                status === 'success' ? 'bg-green-600 text-white' :
                status === 'error' ? 'bg-red-600 text-white' :
                'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-500/20 active:scale-95'
              }
            `}
          >
            {status === 'sending' ? (
              <> <Loader2 className="animate-spin" size={18} /> Transmitting... </>
            ) : status === 'success' ? (
              <> <CheckCircle size={18} /> Message Sent! </>
            ) : status === 'error' ? (
              <> <AlertCircle size={18} /> Failed. Try Again. </>
            ) : (
              <> <Send size={18} /> Send Message </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}