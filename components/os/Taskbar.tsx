'use client';

import { useState, useEffect, useRef } from 'react'; // <--- Tambah useRef
import { format } from 'date-fns';
import { Monitor, Menu, Wifi, Battery } from 'lucide-react';
import { useOSStore } from '@/store/osStore';
import StartMenu from './StartMenu'; // <--- 1. Import StartMenu

export default function Taskbar() {
  const [time, setTime] = useState(new Date());
  const [isStartOpen, setIsStartOpen] = useState(false); // <--- 2. State untuk Menu
  const { windows, activeWindowId, focusWindow, minimizeWindow } = useOSStore();
  
  // Ref untuk mendeteksi klik di luar (agar menu tertutup kalau klik sembarang tempat)
  const taskbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Event listener untuk klik luar
    const handleClickOutside = (event: MouseEvent) => {
      if (taskbarRef.current && !taskbarRef.current.contains(event.target as Node)) {
        setIsStartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearInterval(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={taskbarRef} className="fixed bottom-0 left-0 w-full h-12 bg-slate-900/90 backdrop-blur-md border-t border-slate-700 flex items-center justify-between px-4 z-[100] shadow-2xl">
      
      <StartMenu isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} />

      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar w-full md:w-auto">
        {/* Tombol Start: Text hidden di mobile, cuma icon Menu */}
        <button 
          onClick={() => setIsStartOpen(!isStartOpen)}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-md text-white font-bold transition-all shrink-0
            ${isStartOpen ? 'bg-blue-600' : 'bg-blue-600/20 hover:bg-blue-600/40'}
          `}
        >
          <Menu size={20} />
          <span className="hidden md:inline">Start</span> {/* Teks Start hilang di HP */}
        </button>

        {/* List Window (Tab aktif) */}
        <div className="flex gap-2 border-l border-slate-600 pl-4 h-8 items-center overflow-x-auto no-scrollbar w-full md:w-auto">
            {windows.map((win) => (
                <button
                    key={win.id}
                    onClick={() => win.id === activeWindowId ? minimizeWindow(win.id) : focusWindow(win.id)}
                    className={`
                        px-3 py-1 rounded text-xs text-white flex items-center gap-2 transition-all border border-transparent shrink-0
                        ${activeWindowId === win.id 
                            ? 'bg-slate-700 border-b-blue-400' 
                            : 'hover:bg-slate-800'
                        }
                    `}
                >
                    <span className="truncate max-w-[80px] md:max-w-none">{win.title}</span>
                </button>
            ))}
        </div>
      </div>

      {/* Info Kanan (Jam, Wifi, Batre) -> SEMBUNYIKAN TOTAL DI HP */}
      <div className="hidden md:flex items-center gap-4 text-white text-sm">
        <div className="flex gap-3 text-slate-400">
            <Wifi size={16} />
            <Battery size={16} />
        </div>
        <div className="h-8 w-[1px] bg-slate-700 mx-1"></div>
        <div className="flex flex-col items-end leading-tight">
          <span className="font-medium">{format(time, 'HH:mm')}</span>
          <span className="text-[10px] text-slate-300">{format(time, 'dd MMM yyyy')}</span>
        </div>
      </div>
    </div>
  );
}