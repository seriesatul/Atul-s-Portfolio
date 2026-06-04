import React, { useState } from 'react';

export default function ResumeApp() {
  const [showSidebar, setShowSidebar] = useState(true);
  
  // Path updated to use Atul_Resume.pdf
  const pdfPath = '/files/Atul_Resume.pdf';

  return (
    <div 
      className="flex flex-col h-full bg-white select-none overflow-hidden relative text-gray-800 no-scrollbar"
      style={{
        fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Self-contained font loader and scrollbar-hiding overrides */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
        
        /* Force-hide scrollbars on the container, wrapper divs, and the embedded PDF iframe */
        .no-scrollbar::-webkit-scrollbar, 
        iframe::-webkit-scrollbar {
          display: none !important;
        }
        
        .no-scrollbar, 
        iframe {
          -ms-overflow-style: none !important;  /* IE and Edge */
          scrollbar-width: none !important;  /* Firefox */
        }
      `}} />

      {/* 1. macOS Preview.app Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#f6f6f6] border-b border-gray-200/60 shrink-0 text-gray-600">
        <div className="flex items-center gap-4">
          
          {/* Sidebar Toggle Button */}
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className={`p-1 rounded-md transition-colors cursor-pointer ${showSidebar ? 'bg-gray-200 text-gray-800' : 'hover:bg-gray-200/50'}`}
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>

          {/* Page Counter Indicator */}
          <span className="text-xs font-semibold text-gray-500 select-none">
            1 of 1
          </span>
        </div>

        {/* Center: Formatting & Document Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom Out */}
          <button className="p-1 rounded hover:bg-gray-200/50 text-gray-400 cursor-not-allowed">
            <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>

          {/* Zoom In */}
          <button className="p-1 rounded hover:bg-gray-200/50 text-gray-400 cursor-not-allowed">
            <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>

          {/* Divider */}
          <span className="h-4 w-px bg-gray-200 mx-1" />

          {/* Rotate Left Icon */}
          <button className="p-1 rounded hover:bg-gray-200/50 text-gray-400 cursor-not-allowed">
            <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>
        </div>

        {/* Right Action: Download File (PDF direct anchor link) */}
        <a 
          href={pdfPath} 
          download="Atul_Resume.pdf"
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-gray-700 hover:text-gray-950 hover:bg-gray-200/60 rounded-md border border-gray-300 transition-all cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Save
        </a>
      </div>

      {/* 2. Main Window Layout (Sidebar Thumbnails + Central Viewport) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Frosted Sidebar Thumbnail Explorer */}
        {showSidebar && (
          <div className="w-32 bg-[#f6f6f6]/95 border-r border-gray-200/50 p-3 flex flex-col items-center shrink-0 no-scrollbar">
            <div className="w-full">
              <h4 className="text-[10px] font-bold text-gray-400 tracking-wider mb-3 px-1">PAGES</h4>
              
              {/* Thumbnail Card Page 1 */}
              <div className="w-24 aspect-[3/4] bg-white border-2 border-blue-500 rounded-md shadow-md p-1.5 flex flex-col justify-between cursor-default">
                {/* Simulated lines on the preview thumbnail */}
                <div className="space-y-1">
                  <div className="h-1.5 w-1/2 bg-gray-300 rounded" />
                  <div className="h-1 w-3/4 bg-gray-200 rounded" />
                  <div className="h-1 w-5/6 bg-gray-100 rounded" />
                </div>
                <span className="text-[8px] font-bold text-gray-400 self-center">Page 1</span>
              </div>
            </div>
          </div>
        )}

        {/* Right Side: High-Definition native PDF Viewport */}
        {/* Adjusted padding from p-4 to p-2 for maximum vertical document scale */}
        <div className="flex-1 bg-gray-200/40 p-2 overflow-hidden relative no-scrollbar">
          <iframe 
            src={`${pdfPath}#toolbar=0&navpanes=0`} // Disables standard browser PDF chrome for a clean macOS look
            title="Resume Viewer"
            className="w-full h-full border-none rounded-md shadow-lg bg-white no-scrollbar"
            scrolling="no"
          />
        </div>

      </div>
    </div>
  );
}