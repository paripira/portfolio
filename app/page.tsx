'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Desktop from '@/components/os/Desktop';
import Taskbar from '@/components/os/Taskbar';
import WindowManager from '@/components/os/WindowManager';
import BootScreen from '@/components/os/BootScreen';

export default function Home() {
  // Default: Belum login (false), supaya Boot Screen muncul dulu
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Bisa tambahkan sound effect disini nanti
    setIsLoggedIn(true);
  };

  return (
    <main className="h-screen w-screen relative overflow-hidden flex flex-col text-slate-100 selection:bg-blue-500/30">
      
      {/* 1. LAYER BACKGROUND (Gambar Sirkuit) */}
      <div className="absolute inset-0 z-[-1] bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070')] bg-cover bg-center opacity-80"></div>

      {/* 2. LOGIKA PERPINDAHAN (Boot Screen -> Desktop) */}
      <AnimatePresence mode="wait">
        
        {/* KONDISI A: BELUM LOGIN -> TAMPILKAN BOOT SCREEN */}
        {!isLoggedIn ? (
          <motion.div
            key="boot-screen"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }} // Animasi keluar
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-50"
          >
            {/* Panggil komponen BootScreen */}
            <BootScreen onLogin={handleLogin} />
          </motion.div>
        ) : (
          
          /* KONDISI B: SUDAH LOGIN -> TAMPILKAN DESKTOP OS */
          <motion.div
            key="desktop-os"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }} // Animasi masuk
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full w-full relative flex flex-col"
          >
             {/* Desktop Icons */}
             <div className="flex-1 relative z-0">
               <Desktop />
             </div>

             {/* Window Manager (Jendela Aplikasi) */}
             <div className="absolute top-0 left-0 w-full h-[calc(100vh-48px)] z-10 pointer-events-none">
                <WindowManager />
             </div>

             {/* Taskbar (Bar Bawah) */}
             <motion.div 
               initial={{ y: 100 }} 
               animate={{ y: 0 }} 
               transition={{ delay: 1, duration: 0.5 }}
               className="relative z-50"
             >
               <Taskbar />
             </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}