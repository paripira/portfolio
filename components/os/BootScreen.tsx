'use client';

import { useState, useEffect } from 'react';
import { Lock, ArrowRight } from 'lucide-react'; // Hapus 'Power' dari import karena diganti logo gambar

interface BootScreenProps {
  onLogin: () => void;
}

export default function BootScreen({ onLogin }: BootScreenProps) {
  const [bootStep, setBootStep] = useState(0); // 0: Booting text, 1: Login Form
  const [logs, setLogs] = useState<string[]>([]);
  const [password, setPassword] = useState('');

  // Efek Teks Matrix (Booting)
  useEffect(() => {
    const bootSequence = [
      'INITIALIZING KERNEL...',
      'LOADING MODULES: [CPU] [MEM] [GPU]...',
      'CHECKING SECURITY PROTOCOLS... OK',
      'ESTABLISHING CONNECTION... OK',
      'MOUNTING FILESYSTEM /ROOT...',
      'STARTING GRAPHICAL INTERFACE...',
      'WELCOME, ADMINISTRATOR.'
    ];

    let delay = 0;
    bootSequence.forEach((text, index) => {
      delay += Math.random() * 300 + 200;
      setTimeout(() => {
        setLogs((prev) => [...prev, text]);
        if (index === bootSequence.length - 1) {
          setTimeout(() => setBootStep(1), 800); // Pindah ke Login Form
        }
      }, delay);
    });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  // TAMPILAN 1: TEXT BOOTING (Layar Hitam)
  if (bootStep === 0) {
    return (
      <div className="fixed inset-0 bg-black text-green-500 font-mono p-10 z-[100] flex flex-col justify-end">
        {logs.map((log, i) => (
          <div key={i} className="mb-1">{`> ${log}`}</div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
    );
  }

  // TAMPILAN 2: LOGIN FORM (Tengah Layar)
  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[100]">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070')] bg-cover opacity-30 blur-sm"></div>

      <div className="z-10 bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-slate-700 shadow-2xl flex flex-col items-center w-11/12 max-w-sm">
        
        {/* === LOGO IMAGE (PENGGANTI TOMBOL POWER) === */}
        <div className="w-28 h-28 rounded-full bg-slate-800 border-4 border-slate-600 flex items-center justify-center mb-6 shadow-xl relative overflow-hidden p-5 group transition-all hover:scale-105 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
           {/* Glow Effect di belakang logo */}
           <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl"></div>
           
           {/* Logo Gambar */}
           <img 
             src="/logo.png" 
             alt="System Logo" 
             className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]"
           />
        </div>

        <h2 className="text-white text-2xl font-bold mb-1 tracking-wide">AnzaDev</h2>
        <p className="text-slate-400 text-xs mb-8 uppercase tracking-[0.2em]">Secure Login Area</p>

        <form onSubmit={handleLogin} className="w-full">
            <div className="relative mb-4">
                <Lock size={16} className="absolute left-3 top-3 text-slate-500" />
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password...(Any)"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
            </div>
            <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 group"
            >
                Login System 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </form>
      </div>
    </div>
  );
}