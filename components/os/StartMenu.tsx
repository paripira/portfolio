'use client';

import { User, FolderGit2, Terminal, Globe, Mail, Power, Cpu } from 'lucide-react';
import { useOSStore } from '@/store/osStore';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StartMenu({ isOpen, onClose }: StartMenuProps) {
  const { openWindow } = useOSStore();

  if (!isOpen) return null;

  // Daftar aplikasi di Start Menu
  const apps = [
    { id: 'about', title: 'About Me', icon: User, color: 'bg-blue-500' },
    { id: 'projects', title: 'Projects', icon: FolderGit2, color: 'bg-yellow-500' },
    { id: 'skills', title: 'Tech Stack', icon: Cpu, color: 'bg-purple-500' }, // Nanti kita buat
    { id: 'terminal', title: 'Terminal', icon: Terminal, color: 'bg-green-500' },
    { id: 'browser', title: 'Browser', icon: Globe, color: 'bg-cyan-500' },
    { id: 'contact', title: 'Contact', icon: Mail, color: 'bg-red-500' }, // Nanti kita buat
  ];

  const handleAppClick = (id: string, title: string) => {
    openWindow(id, title, null);
    onClose(); // Tutup menu setelah klik
  };

  return (
    <div className="absolute bottom-14 left-2 w-80 bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-in slide-in-from-bottom-5 duration-200">
      
      {/* Bagian Atas: Pinned Apps */}
      <div className="p-4">
        <h3 className="text-xs font-bold text-slate-400 mb-3 px-2">Pinned Apps</h3>
        <div className="grid grid-cols-4 gap-2">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => handleAppClick(app.id, app.title)}
              className="flex flex-col items-center justify-center gap-2 p-2 rounded hover:bg-white/10 transition-colors group"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg ${app.color}`}>
                <app.icon size={20} />
              </div>
              <span className="text-[10px] text-slate-300 font-medium truncate w-full text-center group-hover:text-white">
                {app.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bagian Bawah: User Profile & Power */}
      <div className="bg-slate-800/50 p-4 border-t border-slate-700 flex items-center justify-between">
        
        {/* User Mini Profile */}
        <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg cursor-pointer transition-colors flex-1">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            GU
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">Guest User</span>
            <span className="text-[10px] text-slate-400">Administrator</span>
          </div>
        </div>

        {/* Power Button (Hanya visual/Reload) */}
        <button 
            onClick={() => window.location.reload()} 
            className="p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
            title="Restart System"
        >
          <Power size={18} />
        </button>
      </div>
    </div>
  );
}