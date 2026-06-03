import { create } from 'zustand';

export const useOSStore = create((set) => ({
  // Define default configurations for all portfolio applications
  windows: {
    finder: { id: 'finder', title: 'Finder', icon: '/images/finder.png', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, x: 80, y: 80, width: 750, height: 480 },
    safari: { id: 'safari', title: 'Safari', icon: '/images/safari.png', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, x: 140, y: 120, width: 850, height: 550 },
    terminal: { id: 'terminal', title: 'Terminal', icon: '/images/terminal.png', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, x: 200, y: 160, width: 620, height: 400 },
    photos: { id: 'photos', title: 'Photos', icon: '/images/photos.png', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, x: 240, y: 200, width: 700, height: 460 },
    resume: { id: 'resume', title: 'Resume.pdf', icon: '/images/pdf.png', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, x: 100, y: 60, width: 600, height: 750 },
    contact: { id: 'contact', title: 'Contact', icon: '/images/contact.png', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, x: 300, y: 100, width: 550, height: 450 },
  },
  
  // Grid layout for files on the desktop
  desktopFiles: [
    { id: 'finder_folder', name: 'Projects', icon: '/images/folder.png', targetApp: 'finder' },
    { id: 'resume_file', name: 'Resume.pdf', icon: '/images/pdf.png', targetApp: 'resume' },
    { id: 'terminal_sh', name: 'Terminal', icon: '/images/terminal.png', targetApp: 'terminal' },
  ],

  activeWindowId: null,
  maxZIndex: 10,

  // Open window & elevate layer index
  openWindow: (id) => set((state) => {
    const nextZIndex = state.maxZIndex + 1;
    return {
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: true, isMinimized: false, zIndex: nextZIndex }
      },
      maxZIndex: nextZIndex,
      activeWindowId: id
    };
  }),

  // Toggle Minimize
  minimizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMinimized: true }
    },
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
  })),

  // Toggle Maximize
  toggleMaximize: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized }
    }
  })),

  // Close Window
  closeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isOpen: false }
    },
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
  })),

  // Bring focused window to front
  focusWindow: (id) => set((state) => {
    if (state.activeWindowId === id) return {};
    const nextZIndex = state.maxZIndex + 1;
    return {
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], zIndex: nextZIndex, isMinimized: false }
      },
      maxZIndex: nextZIndex,
      activeWindowId: id
    };
  }),

  // Update position coordinates after dynamic drags
  updateWindowPosition: (id, x, y) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], x, y }
    }
  })),
}));