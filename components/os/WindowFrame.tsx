'use client';

import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import Draggable from 'react-draggable';
import { useOSStore } from '@/store/osStore';
import { ReactNode, useRef, useState, useEffect } from 'react';

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
}

export default function WindowFrame({ id, title, children }: WindowProps) {
  const { closeWindow, minimizeWindow, toggleMaximize, focusWindow, activeWindowId, windows } = useOSStore();
  const nodeRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Cek layar HP
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const currentWindow = windows.find((w) => w.id === id);
  const isActive = activeWindowId === id;
  const isMinimized = currentWindow?.isMinimized;
  const isMaximized = currentWindow?.isMaximized; 

  if (isMinimized) return null;

  // Logika Style
  const responsiveClasses = isMaximized
    ? 'fixed top-0 left-0 w-full h-[calc(100vh-48px)] rounded-none' 
    : 'fixed inset-0 bottom-12 z-50 md:absolute md:top-10 md:left-10 md:w-[800px] md:h-[550px] md:bottom-auto md:z-0';

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-header"
      onStart={() => focusWindow(id)}
      bounds="parent"
      disabled={isMaximized || isMobile}
    >
      <div
        ref={nodeRef}
        onClick={() => focusWindow(id)}
        className={`
          flex flex-col shadow-2xl overflow-hidden border transition-all duration-200 pointer-events-auto
          bg-slate-900/95 text-white
          ${responsiveClasses}
          ${isActive ? 'z-50 border-slate-500 shadow-slate-900/50' : 'z-40 border-slate-700 opacity-90 shadow-none'}
        `}
      >
        {/* HEADER */}
        <div 
            className="window-header h-12 md:h-10 bg-slate-800 flex items-center justify-between px-4 md:px-3 border-b border-slate-700 select-none shrink-0"
            style={{ cursor: (isMaximized || isMobile) ? 'default' : 'grab' }}
            onDoubleClick={() => !isMobile && toggleMaximize(id)}
        >
          <div className="flex items-center gap-3 md:gap-2">
             <div className="w-3 h-3 rounded-full bg-slate-600 md:block hidden"></div>
             <span className="text-sm md:text-xs font-bold text-slate-200 tracking-wide truncate max-w-[150px]">{title}</span>
          </div>

          <div className="flex items-center gap-4 md:gap-2">
            {/* Tombol Minimize/Maximize (Hidden di HP) */}
            <button 
                onClick={(e) => {e.stopPropagation(); minimizeWindow(id)}} 
                className="hidden md:block p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
            >
                <Minus size={14}/>
            </button>
            <button 
                onClick={(e) => {e.stopPropagation(); toggleMaximize(id)}} 
                className="hidden md:block p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
            >
                {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            
            {/* Tombol Close */}
            <button 
              onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
              className="p-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-full transition-colors md:rounded md:p-1 md:bg-transparent"
            >
              <X size={18} className="md:w-3.5 md:h-3.5" />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-0 overflow-auto text-slate-300 relative custom-scrollbar overscroll-none">
          {children}
        </div>
      </div>
    </Draggable>
  );
}