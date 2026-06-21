import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useOSStore } from '../store/useOSStore';

export default function Dock({ onLaunchApp }) {
  const { windows } = useOSStore();
  const [bouncingAppId, setBouncingAppId] = useState(null);
  
  const dockRef = useRef(null);
  const dockItemRefs = useRef({});

  // Calculations for dynamic cursor proximity magnification
  const handleDockMouseMove = (e) => {
    if (!dockRef.current) return;
    const mouseX = e.clientX;
    const maxDistance = 150;
    const maxScale = 1.6;

    Object.keys(windows).forEach((id) => {
      const el = dockItemRefs.current[id];
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - itemCenterX);

      if (distance < maxDistance) {
        const factor = Math.cos((distance / maxDistance) * (Math.PI / 2));
        const scale = 1 + (maxScale - 1) * factor;
        gsap.to(el, { scale: scale, y: -((scale - 1) * 15), duration: 0.1, ease: 'power1.out' });
      } else {
        gsap.to(el, { scale: 1, y: 0, duration: 0.2, ease: 'power1.out' });
      }
    });
  };

  const handleDockMouseLeave = () => {
    Object.keys(windows).forEach((id) => {
      const el = dockItemRefs.current[id];
      if (el) {
        gsap.to(el, { scale: 1, y: 0, duration: 0.3, ease: 'power2.out' });
      }
    });
  };

  const handleIconClick = (id) => {
    setBouncingAppId(id);
    const el = dockItemRefs.current[id];
    
    if (el) {
      gsap.fromTo(el, 
        { y: 0 }, 
        { 
          y: -25, 
          duration: 0.35, 
          yoyo: true, 
          repeat: 3, 
          ease: 'power2.out',
          onComplete: () => {
            setBouncingAppId(null);
            gsap.to(el, { y: 0, duration: 0.1 });
          }
        }
      );
    }
    onLaunchApp(id);
  };

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[9999] select-none max-sm:hidden">
      <div 
        ref={dockRef}
        onMouseMove={handleDockMouseMove}
        onMouseLeave={handleDockMouseLeave}
        className="relative bg-white/15 backdrop-blur-3xl border border-white/25 rounded-2xl p-1.5 flex items-end gap-3"
        style={{
          boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 15px 35px rgba(0, 0, 0, 0.3)',
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Filters out both 'about' and 'quicktime' windows from rendering inside the Dock */}
        {Object.values(windows)
          .filter((app) => app.id !== 'about' && app.id !== 'quicktime')
          .map((app) => (
            <button
              key={app.id}
              ref={(el) => (dockItemRefs.current[app.id] = el)}
              onClick={() => handleIconClick(app.id)}
              className="relative flex flex-col items-center group cursor-pointer origin-bottom"
              style={{ willChange: 'transform' }}
            >
              {/* Glossy Tooltip App Label */}
              <span className="absolute -top-12 scale-0 group-hover:scale-100 transition-all duration-150 rounded-md bg-white/80 backdrop-blur-md border border-white/30 px-2.5 py-1 text-[11px] font-medium text-gray-800 shadow-md whitespace-nowrap pointer-events-none">
                {app.title}
              </span>
              
              <img
                src={app.icon}
                alt={app.title}
                className="size-12 3xl:size-20 object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] pointer-events-none select-none"
              />

              {/* macOS running application indicator dot */}
              {app.isOpen && (
                <div 
                  className={`absolute -bottom-1 size-1 rounded-full bg-white shadow shadow-white transition-opacity ${
                    bouncingAppId === app.id ? 'opacity-30' : 'opacity-100'
                  }`} 
                />
              )}
            </button>
          ))}
      </div>
    </div>
  );
}