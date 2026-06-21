import React, { useState } from 'react';
import gsap from 'gsap';

// Core UI Layout Components
import Navbar from './components/Navbar';
import Window from './components/Window';
import BootScreen from './components/BootScreen';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import DesktopWidgets from './components/DesktopWidgets'; // <-- Import the Widgets Layer

// Individual Modular Application Contents
import FinderApp from './components/apps/FinderApp';
import SafariApp from './components/apps/SafariApp';
import TerminalApp from './components/apps/TerminalApp';
import PhotosApp from './components/apps/PhotosApp';
import ResumeApp from './components/apps/ResumeApp';
import ContactApp from './components/apps/ContactApp';

import { useOSStore } from './store/useOSStore';
import AboutApp from './components/apps/AboutApp';
import QuickTimePlayerApp from './components/apps/QuickTimePlayerApp';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const { windows, openWindow, focusWindow } = useOSStore();

  const handleLaunchApp = (id) => {
    const isAppOpen = windows[id].isOpen;
    if (!isAppOpen) {
      openWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const handleBootComplete = () => {
    setIsBooting(false);
    
    // Smoothly reveal desktop contents
    gsap.fromTo('#desktop-content', {
      opacity: 0,
      scale: 1.05
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out'
    });
  };

  return (
    <div className="relative w-dvw h-dvh overflow-hidden select-none bg-black">
      {/* A. System Boot Loader Loading Screen */}
      {isBooting && <BootScreen onComplete={handleBootComplete} />}

      {/* B. Main Translucent Desktop Canvas */}
      <div 
        id="desktop-content" 
        style={{ backgroundImage: 'url("/images/wallpaper.png")' }}
        className="relative w-full h-full bg-cover bg-no-repeat bg-center opacity-0"
      >
        <Navbar />

        {/* Workspace Canvas Boundaries */}
        <div id="workspace" className="relative w-full h-[calc(100vh-40px)] p-6">
          
          {/* Grid of File Shortcuts */}
          <Desktop onLaunchApp={handleLaunchApp} />

          {/* Desktop Widgets Layer (behind windows, clickable) */}
          <DesktopWidgets />

          {/* Draggable Windows Orchestration */}
          <Window id="finder">
            <FinderApp />
          </Window>

          <Window id="safari">
            <SafariApp />
          </Window>

          <Window id="terminal">
            <TerminalApp />
          </Window>

          <Window id="photos">
            <PhotosApp />
          </Window>

          <Window id="resume">
            <ResumeApp />
          </Window>

          <Window id="about">
            <AboutApp />
          </Window>

          <Window id="contact">
            <ContactApp />
          </Window>

          <Window id="quicktime">
          <QuickTimePlayerApp />
        </Window>
        </div>

        {/* 3D Glass Dock Menu */}
        <Dock onLaunchApp={handleLaunchApp} />
      </div>
    </div>
  );
}