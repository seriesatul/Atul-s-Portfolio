import React from 'react';
import { useOSStore } from '../../store/useOSStore';

export default function AboutApp() {
  const { openWindow } = useOSStore();

  return (
    <div 
      className="flex flex-col items-center justify-between h-full bg-[#f6f6f6] p-6 text-center select-none"
      style={{ fontFamily: '"Plus Jakarta Sans", -apple-system, sans-serif' }}
    >
      <div className="flex flex-col items-center w-full">
        {/* Centered Profile Image */}
        <div className="relative size-24 rounded-full overflow-hidden border border-gray-300 shadow-md mb-4 bg-gray-200">
          <img 
            src="/images/adrian.jpg" // Links to your photo asset
            alt="Atul Singh Chauhan" 
            className="size-full object-cover"
          />
        </div>

        {/* Name and Summary */}
        <h2 className="text-sm font-extrabold text-gray-800 tracking-tight">Atul Singh Chauhan</h2>
        <p className="text-[10px] font-bold text-gray-400 tracking-wide uppercase mt-0.5">SDE & Full-Stack AI Engineer</p>

        {/* macOS Style Specifications Table */}
        <div className="w-full max-w-[280px] mt-4 space-y-2 text-[11px] text-left border-t border-gray-200/60 pt-4">
          <div className="flex justify-between">
            <span className="text-gray-400 font-semibold w-24">Education</span>
            <span className="text-gray-700 flex-1 font-medium leading-tight">B.Tech CSE, AKTU (Expected 2026)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 font-semibold w-24">Experience</span>
            <span className="text-gray-700 flex-1 font-medium leading-tight">SDE Intern @ Alphabetum Technology</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 font-semibold w-24">Core Engine</span>
            <span className="text-gray-700 flex-1 font-medium leading-tight">React.js, Node.js, AI Integrations</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 font-semibold w-24">Serial Number</span>
            <span className="text-gray-700 flex-1 font-mono text-[10px] leading-tight">ATUL-SDE-AI-2026</span>
          </div>
        </div>
      </div>

      {/* Dynamic Glassmorphic Skill Badges container on the bottom */}
      <div className="w-full flex flex-col items-center gap-3 pt-3 border-t border-gray-200/60 shrink-0">
        
        {/* Skills Icons row */}
        <div className="flex items-center gap-2.5 bg-white/40 backdrop-blur-md border border-white/40 p-2 px-3 rounded-full shadow-sm">
          {/* React */}
          <span className="text-xs filter grayscale opacity-75 hover:opacity-100 transition-opacity" title="React">⚛️</span>
          {/* Python */}
          <span className="text-xs filter grayscale opacity-75 hover:opacity-100 transition-opacity" title="Python">🐍</span>
          {/* Node */}
          <span className="text-xs filter grayscale opacity-75 hover:opacity-100 transition-opacity" title="Node.js">💚</span>
          {/* SQL/DB */}
          <span className="text-xs filter grayscale opacity-75 hover:opacity-100 transition-opacity" title="Databases">💾</span>
          {/* Docker */}
          <span className="text-xs filter grayscale opacity-75 hover:opacity-100 transition-opacity" title="Docker">🐳</span>
        </div>

        <button 
          onClick={() => openWindow('terminal')}
          className="px-3 py-1 text-[10px] font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 cursor-pointer"
        >
          System Report...
        </button>
      </div>

    </div>
  );
}