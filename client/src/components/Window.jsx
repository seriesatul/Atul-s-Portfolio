import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useOSStore } from '../store/useOSStore';

gsap.registerPlugin(Draggable);

export default function Window({ id, children }) {
  const windowRef = useRef(null);
  const headerRef = useRef(null);
  
  const windowState = useOSStore((state) => state.windows[id]);
  const activeWindowId = useOSStore((state) => state.activeWindowId);
  
  const { closeWindow, minimizeWindow, toggleMaximize, focusWindow, updateWindowPosition } = useOSStore();
  
  // Initialize drag instances when window opens or is resized
  useEffect(() => {
    if (windowState?.isOpen && !windowState?.isMinimized && !windowState?.isMaximized && windowRef.current && headerRef.current) {
      
      // Safe boundary lookup to prevent mounting/hot-reload race conditions
      const dragBounds = document.getElementById('workspace') || 'body';

      const dragInstance = Draggable.create(windowRef.current, {
        trigger: headerRef.current,
        type: 'x,y',
        bounds: dragBounds,
        onDragEnd: function () {
          // 1. Retrieve the latest coordinates directly from the store (avoids stale hook closures)
          const currentWindow = useOSStore.getState().windows[id];
          
          if (currentWindow) {
            // 2. Compute absolute coordinates by adding the GSAP drag offset to the baseline state
            const newX = currentWindow.x + this.x;
            const newY = currentWindow.y + this.y;
            
            // 3. Write absolute coordinates to state
            updateWindowPosition(id, newX, newY);
            
            // 4. Immediately clear GSAP's transform offset to prevent double-shifting layout jumps
            gsap.set(windowRef.current, { x: 0, y: 0 });
          }
        }
      });

      return () => {
        if (dragInstance[0]) dragInstance[0].kill();
      };
    }
  }, [windowState?.isOpen, windowState?.isMinimized, windowState?.isMaximized, id, updateWindowPosition]);

  if (!windowState || !windowState.isOpen || windowState.isMinimized) return null;

  const { title, zIndex, x, y, width, height, isMaximized } = windowState;

  return (
    <div
      ref={windowRef}
      onMouseDown={() => focusWindow(id)}
      style={{
        zIndex: zIndex,
        left: isMaximized ? 0 : `${x}px`,
        top: isMaximized ? '40px' : `${y}px`, // offsets for navbar menu bar
        width: isMaximized ? '100vw' : `${width}px`,
        height: isMaximized ? 'calc(100vh - 40px)' : `${height}px`,
        position: 'absolute',
      }}
      className={`flex flex-col bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 ease-out ${
        activeWindowId === id ? 'ring-1 ring-blue-500/20 shadow-blue-500/10' : 'opacity-95'
      }`}
    >
      {/* Window Title Bar */}
      <div
        ref={headerRef}
        className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 select-none cursor-grab active:cursor-grabbing text-sm text-gray-500"
      >
        {/* Circle Controls */}
        <div className="flex gap-2 w-20">
          <button
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            className="size-3.5 rounded-full bg-[#ff6157] border border-red-600/10 cursor-pointer flex items-center justify-center text-[8px] font-bold text-transparent hover:text-red-900"
          >
            ×
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
            className="size-3.5 rounded-full bg-[#ffc030] border border-yellow-600/10 cursor-pointer flex items-center justify-center text-[8px] font-bold text-transparent hover:text-yellow-900"
          >
            -
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }}
            className="size-3.5 rounded-full bg-[#2acb42] border border-green-600/10 cursor-pointer flex items-center justify-center text-[7px] font-bold text-transparent hover:text-green-900"
          >
            ⤢
          </button>
        </div>

        {/* Header Title */}
        <div className="font-semibold text-gray-700 text-center truncate flex-1">
          {title}
        </div>

        {/* Empty spacing block */}
        <div className="w-20" />
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-auto bg-white">
        {children}
      </div>
    </div>
  );
}