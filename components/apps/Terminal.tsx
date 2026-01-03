'use client';

import { useState, useRef, useEffect } from 'react';
import { useOSStore } from '@/store/osStore';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'info', content: 'Welcome to PortfolioOS v1.0.0' },
    { type: 'info', content: 'Type "help" to see available commands.' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { openWindow } = useOSStore();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => inputRef.current?.focus();

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'command', content: `guest@portfolio:~$ ${input}` }];

      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'success', content: 'Available commands:' });
          newHistory.push({ type: 'info', content: '- about     : Who am I?' });
          newHistory.push({ type: 'info', content: '- projects  : See my works' });
          newHistory.push({ type: 'info', content: '- clear     : Clear terminal' });
          break;
        case 'about':
          newHistory.push({ type: 'info', content: 'IT Staff based in Batam. Passionate about Web Dev, Robotics, and Cybersec.' });
          break;
        case 'projects':
          newHistory.push({ type: 'success', content: 'Opening Projects Window...' });
          setTimeout(() => openWindow('projects', 'Projects', null), 500); 
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        default:
          newHistory.push({ type: 'error', content: `Command not found: ${cmd}` });
      }
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="h-full w-full bg-black text-green-500 font-mono text-sm p-2 overflow-y-auto" onClick={focusInput}>
      {history.map((line, i) => (
        <div key={i} className={`mb-1 ${line.type === 'error' ? 'text-red-500' : line.type === 'command' ? 'text-white' : 'text-green-400'}`}>
          {line.content}
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-blue-400 mr-2">guest@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent border-none outline-none text-white flex-1"
          autoFocus
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}