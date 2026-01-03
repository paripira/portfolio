'use client';

import { useOSStore } from '@/store/osStore';
import WindowFrame from './WindowFrame';
import Terminal from '@/components/apps/Terminal';
import Projects from '@/components/apps/Projects';
import AboutMe from '@/components/apps/AboutMe';
import Contact from '@/components/apps/Contact';
import TechStack from '@/components/apps/TechStack';
import Browser from '@/components/apps/Browser';

export default function WindowManager() {
  const { windows } = useOSStore();

  const renderWindowContent = (id: string) => {
    switch (id) {
      case 'terminal':
        return <Terminal />;
      case 'projects':
        return <Projects />;
      case 'about':           // <--- 2. Tambahkan case ini
        return <AboutMe />;
      default:
        return (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
             <h2 className="text-2xl font-bold text-blue-400">Under Construction</h2>
             <p className="text-sm text-slate-500">App ID: {id}</p>
          </div>
        );
     case 'contact':
        return <Contact />;
     case 'skills':
        return <TechStack />;
     case 'browser':
        return <Browser />;
    }
  };

  // ... sisa kode return di bawah biarkan sama
  return (
    <>
      {windows.map((win) => (
        <WindowFrame key={win.id} id={win.id} title={win.title}>
          {renderWindowContent(win.id)}
        </WindowFrame>
      ))}
    </>
  );
}