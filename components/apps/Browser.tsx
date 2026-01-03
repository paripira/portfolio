'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Search, Globe, Lock } from 'lucide-react';

export default function Browser() {
  const [url, setUrl] = useState('https://portfolio-os.local/home');
  const [loading, setLoading] = useState(false);

  // Daftar Bookmark / Shortcut
  const bookmarks = [
    { name: 'GitHub Profile', url: 'https://github.com//paripira', icon: 'https://github.com/favicon.ico' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/fakhri-aprianza', icon: 'https://linkedin.com/favicon.ico' },
    { name: 'Instagram', url: 'https://instagram.com/anza.fkhri', icon: 'https://instagram.com/favicon.ico' },
    { name: 'My Resume (PDF)', url: '/resume.pdf', icon: '📄' },
  ];

  const handleNavigate = (link: string) => {
    setLoading(true);
    setUrl(link);
    // Simulasi loading sebentar
    setTimeout(() => {
      setLoading(false);
      // Karena iframe sering diblokir, kita buka tab baru untuk link eksternal
      window.open(link, '_blank'); 
      setUrl('https://portfolio-os.local/home'); // Reset url ke home
    }, 1500);
  };

  return (
    <div className="h-full w-full bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* 1. Browser Toolbar (Address Bar) */}
      <div className="h-10 bg-slate-200 border-b border-slate-300 flex items-center px-2 gap-2">
        <div className="flex gap-1 text-slate-500">
          <ArrowLeft size={16} className="cursor-not-allowed opacity-50" />
          <ArrowRight size={16} className="cursor-not-allowed opacity-50" />
          <RotateCw size={16} className={`cursor-pointer hover:text-slate-800 ${loading ? 'animate-spin' : ''}`} />
        </div>

        {/* URL Input */}
        <div className="flex-1 bg-white border border-slate-300 rounded-full h-7 flex items-center px-3 text-xs gap-2 shadow-sm">
          <Lock size={10} className="text-green-600" />
          <span className="text-green-600 font-medium">Secure</span>
          <span className="text-slate-400">|</span>
          <input 
            type="text" 
            value={url} 
            readOnly 
            className="flex-1 outline-none text-slate-600 bg-transparent truncate"
          />
        </div>

        <div className="text-slate-500">
          <Globe size={16} />
        </div>
      </div>

      {/* 2. Content Area (New Tab Page) */}
      <div className="flex-1 bg-white relative overflow-hidden flex flex-col items-center justify-center p-10">
        
        {loading ? (
          <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-slate-500 font-mono text-sm">Establishing Secure Connection...</p>
             <p className="text-xs text-slate-400">Opening external gateway...</p>
          </div>
        ) : (
          <>
            {/* Logo Google-style */}
            <div className="mb-10 text-center">
               <h1 className="text-6xl font-bold text-slate-800 mb-2 tracking-tighter">
                 <span className="text-blue-500">A</span>
                 <span className="text-red-500">n</span>
                 <span className="text-yellow-500">z</span>
                 <span className="text-blue-500">a</span>
                 <span className="text-red-500">OS</span>
               </h1>
               <div className="w-full max-w-md mx-auto relative mt-6">
                 <input 
                   type="text" 
                   placeholder="Search the web or type a URL" 
                   className="w-full py-3 px-10 rounded-full border border-slate-300 shadow-md focus:shadow-lg outline-none transition-shadow"
                 />
                 <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
               </div>
            </div>

            {/* Bookmarks Grid */}
            <div className="grid grid-cols-4 gap-6">
              {bookmarks.map((bm, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleNavigate(bm.url)}
                  className="flex flex-col items-center gap-2 group p-4 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-2xl group-hover:bg-white group-hover:shadow-md transition-all">
                    {bm.icon.includes('http') ? (
                      <img src={bm.icon} alt={bm.name} className="w-6 h-6" onError={(e) => (e.currentTarget.src = 'https://www.google.com/favicon.ico')} />
                    ) : (
                      <span>{bm.icon}</span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-slate-700">{bm.name}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}