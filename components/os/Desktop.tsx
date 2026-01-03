'use client';

import { User, FolderGit2, Terminal, Globe, Mail, Cpu } from 'lucide-react';
import { useOSStore } from '@/store/osStore';
import { useEffect, useState } from 'react';

export default function Desktop() {
  const { openWindow } = useOSStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const apps = [
    { id: 'projects', title: 'Projects', icon: FolderGit2, ip: '192.168.1.10' },
    { id: 'skills', title: 'Tech Stack', icon: Cpu, ip: '192.168.1.11' },
    { id: 'terminal', title: 'Terminal', icon: Terminal, ip: '192.168.1.12' },
    { id: 'browser', title: 'Browser', icon: Globe, ip: '192.168.1.13' },
    { id: 'contact', title: 'Contact', icon: Mail, ip: '192.168.1.14' },
  ];

  // === CONFIGURASI DINAMIS (RESPONSIF) ===
  // Kalau HP (Mobile), kita kecilkan ukurannya biar muat
  const containerSize = isMobile ? 340 : 600; // Ukuran kotak area (HP: 340px, Desktop: 600px)
  const radius = isMobile ? 105 : 220;        // Panjang kabel (HP: 105px, Desktop: 220px)
  const iconSize = isMobile ? 'w-12 h-12' : 'w-16 h-16'; // Ukuran kotak icon
  const coreSize = isMobile ? 'w-20 h-20' : 'w-24 h-24'; // Ukuran switch tengah
  const fontSize = isMobile ? 'text-[8px]' : 'text-xs';  // Ukuran font judul
  const ipSize = isMobile ? 'text-[7px]' : 'text-[9px]'; // Ukuran font IP

  const center = containerSize / 2;

  // Hitung koordinat
  const positionedApps = apps.map((app, index) => {
    const angle = (index * (360 / apps.length)) - 90;
    const radian = angle * (Math.PI / 180);
    const x = center + Math.cos(radian) * radius;
    const y = center + Math.sin(radian) * radius;
    return { ...app, x, y };
  });

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-auto flex items-center justify-center overflow-hidden">
      
      {/* Container Utama */}
      <div className="relative shrink-0" style={{ width: containerSize, height: containerSize }}>

        {/* LAYER 1: KABEL (SVG) */}
        <svg className="absolute inset-0 w-full h-full z-0 overflow-visible">
          {positionedApps.map((app, i) => (
            <g key={i}>
              <line 
                x1={center} 
                y1={center} 
                x2={app.x} 
                y2={app.y} 
                stroke="#334155" 
                strokeWidth={isMobile ? "2" : "4"} // Kabel lebih tipis di HP
              />
              {/* Link Lights */}
              <circle cx={center + (app.x - center) * 0.15} cy={center + (app.y - center) * 0.15} r={isMobile ? "3" : "4"} fill="#22c55e" className="animate-pulse"/>
              <circle cx={center + (app.x - center) * 0.85} cy={center + (app.y - center) * 0.85} r={isMobile ? "3" : "4"} fill="#22c55e" />
            </g>
          ))}
        </svg>

        {/* LAYER 2: CORE SWITCH (AnzaDev Logo) */}
          <div 
            className="absolute z-20 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
            style={{ left: center, top: center }}
          >
            <button
              onClick={() => openWindow('about', 'About Me', null)}
              className="group relative flex flex-col items-center justify-center transition-all hover:scale-110 active:scale-95"
            >
              {/* Ganti Icon User dengan Logo Custom */}
              <div className={`${coreSize} bg-slate-900 border-2 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)] rounded-lg flex items-center justify-center relative overflow-hidden`}>
                
                {/* Background Grid Hiasan */}
                <div className="absolute inset-0 opacity-20" 
                      style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '8px 8px' }}>
                </div>

                {/* LOGO TEXT "AD" (AnzaDev) */}
                <div className="flex flex-col items-center justify-center z-10">
                    <span className={`font-black text-white ${isMobile ? 'text-2xl' : 'text-3xl'} tracking-tighter flex items-center`}>
                      <span className="text-blue-500">A</span>
                      <span className="text-slate-200">D</span>
                    </span>
                </div>

                {/* Lampu Indikator */}
                <div className="absolute top-2 right-2 w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></div>
              </div>

              <span className={`mt-2 px-2 py-0.5 bg-slate-900/80 border border-blue-500/30 rounded text-blue-300 font-bold ${fontSize} tracking-wider whitespace-nowrap`}>
                AnzaDev
              </span>
            </button>
          </div>

        {/* LAYER 3: END DEVICES (Apps Lain) */}
        {positionedApps.map((app) => (
          <div 
            key={app.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: app.x, top: app.y }}
          >
            <button
                onClick={() => openWindow(app.id, app.title, null)}
                className="flex flex-col items-center gap-1 group hover:scale-110 transition-transform duration-200"
            >
                <div className={`${iconSize} bg-slate-800 border border-slate-500 shadow-xl rounded-md flex items-center justify-center group-hover:border-green-400 group-hover:shadow-[0_0_15px_rgba(74,222,128,0.4)] transition-all`}>
                    <app.icon size={isMobile ? 20 : 28} className="text-slate-300 group-hover:text-green-400" />
                </div>
                
                <div className="flex flex-col items-center">
                    <span className={`${fontSize} font-mono font-bold text-slate-400 bg-black/60 px-1.5 py-0.5 rounded border border-slate-700 mb-0.5 whitespace-nowrap`}>
                        {app.title}
                    </span>
                    <span className={`${ipSize} text-slate-500 font-mono bg-black/40 px-1 rounded`}>
                        {app.ip}
                    </span>
                </div>
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}