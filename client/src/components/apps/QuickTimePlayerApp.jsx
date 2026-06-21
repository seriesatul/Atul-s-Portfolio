import React, { useRef, useEffect } from 'react';
import { useOSStore } from '../../store/useOSStore';

export default function QuickTimePlayerApp() {
  const videoState = useOSStore((state) => state.windows.quicktime);
  const videoRef = useRef(null);

  useEffect(() => {
    // Reload and play video dynamically when the source changes
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Handle autoplay policies silently
      });
    }
  }, [videoState?.videoSrc]);

  if (!videoState || !videoState.videoSrc) {
    return (
      <div className="flex items-center justify-center h-full bg-[#121212] text-gray-400 text-xs">
        No Video Loaded
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black select-none overflow-hidden relative text-white">
      
      {/* 1. Real-time Video Canvas */}
      <div className="flex-1 relative flex items-center justify-center bg-black">
        <video 
          ref={videoRef}
          controls
          autoPlay
          className="w-full h-full object-contain"
        >
          <source src={videoState.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 2. Glassmorphic Meta Info Overlay */}
      <div className="absolute top-4 left-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/5 flex items-center justify-between text-xs pointer-events-none">
        <span className="font-semibold tracking-wide truncate max-w-[70%]">
          {videoState.videoTitle}
        </span>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          QuickTime Preview
        </span>
      </div>

    </div>
  );
}