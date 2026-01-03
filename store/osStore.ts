import { create } from 'zustand';

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean; // <--- Properti Baru
  content: any;
}

interface OSState {
  windows: WindowState[];
  activeWindowId: string | null;
  
  openWindow: (id: string, title: string, content: any) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void; // <--- Action Baru
  focusWindow: (id: string) => void;
}

export const useOSStore = create<OSState>((set) => ({
  windows: [],
  activeWindowId: null,

  openWindow: (id, title, content) => set((state) => {
    const existing = state.windows.find((w) => w.id === id);
    if (existing) {
      return {
        activeWindowId: id,
        windows: state.windows.map((w) => 
          w.id === id ? { ...w, isMinimized: false, isOpen: true } : w
        ),
      };
    }
    return {
      activeWindowId: id,
      windows: [...state.windows, { 
        id, 
        title, 
        isOpen: true, 
        isMinimized: false, 
        isMaximized: false, // Default tidak full screen
        content 
      }],
    };
  }),

  closeWindow: (id) => set((state) => ({
    windows: state.windows.filter((w) => w.id !== id),
    activeWindowId: null,
  })),

  minimizeWindow: (id) => set((state) => ({
    windows: state.windows.map((w) => 
      w.id === id ? { ...w, isMinimized: true } : w
    ),
    activeWindowId: null,
  })),

  // Logika Maximize/Restore
  toggleMaximize: (id) => set((state) => ({
    windows: state.windows.map((w) => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ),
    activeWindowId: id, // Tetap fokus ke window ini
  })),

  focusWindow: (id) => set({ activeWindowId: id }),
}));