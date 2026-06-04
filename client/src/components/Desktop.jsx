import React from 'react';
import { useOSStore } from '../store/useOSStore';

export default function Desktop({ onLaunchApp }) {
  const { desktopFiles } = useOSStore();

  return (
    <div className="flex flex-col gap-5 items-start w-fit">
      {desktopFiles.map(({ id, name, icon, targetApp }) => (
        <button
          key={id}
          onClick={() => onLaunchApp(targetApp)} // Changed from onDoubleClick to onClick for instant launch
          className="group flex flex-col items-center gap-1 cursor-pointer p-1.5 rounded-lg hover:bg-white/10 active:bg-white/20 w-20 transition-colors"
        >
          <img 
            src={icon} 
            alt={name} 
            className="size-12 object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-200" 
          />
          <p className="text-[11px] text-white font-medium text-center leading-tight truncate w-full text-shadow">
            {name}
          </p>
        </button>
      ))}
    </div>
  );
}