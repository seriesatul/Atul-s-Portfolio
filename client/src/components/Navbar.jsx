import React, { useState, useEffect, useRef } from 'react';
import { navbarLinks, navIcons } from '../constants/navbar.constants';
import { useOSStore } from '../store/useOSStore';
import dayjs from 'dayjs';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null); // null | 'apple' | 'portfolio' | 'contact'
  const navbarRef = useRef(null);

  // Retrieve state parameters using selectors
  const toggleWidgets = useOSStore((state) => state.toggleWidgets);
  const openWindow = useOSStore((state) => state.openWindow);

  // Sub-menu configurations mapped to your links dynamically
  const dropdownMenus = {
    apple: [
      { label: 'About This Developer', action: 'about', type: 'app' },
      { label: 'System Settings...', action: 'contact', type: 'app' },
    ],
    portfolio: [
      { label: 'Safari (Projects)', action: 'safari', type: 'app' },
      { label: 'Preview (Resume)', action: 'resume', type: 'app' },
      { label: 'Mail (Contact)', action: 'contact', type: 'app' },
    ],
    contact: [
      { label: 'Mail Client...', action: 'contact', type: 'app' },
      { label: 'divider_1', type: 'divider' },
      { label: 'GitHub Profile', action: 'https://github.com/seriesatul', type: 'link' },
      { label: 'LinkedIn Network', action: 'https://linkedin.com/in/Atul', type: 'link' },
    ]
  };

  // Direct label click mapping that triggers window launches instead of dropdown overlays
  const directActions = {
    about: () => openWindow('about'), // Opens the "About This Developer" window directly on click
  };

  // Utility status icon click actions map
  const iconActions = {
    toggle: () => toggleWidgets(),
    mode: () => toggleWidgets(),
    widgets: () => toggleWidgets(),
    4: () => toggleWidgets(),
    user: () => openWindow('about'),
    profile: () => openWindow('about'),
    search: () => openWindow('safari'),
    wifi: () => openWindow('contact'),
  };

  // Close active menus when clicking anywhere outside of the navbar
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleMenuClick = (id) => {
    const normId = id.toString().toLowerCase();
    if (directActions[normId]) {
      directActions[normId]();
      setActiveMenu(null);
    } else {
      setActiveMenu(activeMenu === normId ? null : normId);
    }
  };

  const handleIconClick = (id) => {
    const normId = id.toString().toLowerCase();
    const action = iconActions[normId];
    if (action) {
      action();
    }
  };

  return (
    <nav 
      ref={navbarRef}
      className="flex items-center bg-white/50 backdrop-blur-3xl p-2 px-5 select-none gap-6 h-10 border-b border-white/10 z-[99999]"
      style={{ fontFamily: '"Plus Jakarta Sans", -apple-system, sans-serif' }}
    >
      
      {/* 1. Left Side: Brand Logo and Title */}
      <div className="flex items-center gap-3 relative">
        <button 
          onClick={() => handleMenuClick('apple')}
          className="hover:bg-black/5 p-1 rounded cursor-pointer transition-colors shrink-0"
        >
          {/* Pixel-Perfect Corporate Apple Logo Path */}
          <svg className="w-3.5 h-4 fill-black" viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
          </svg>
        </button>

        {/* Apple Logo Dropdown Menu */}
        {activeMenu === 'apple' && (
          <div className="absolute top-8 left-0 w-44 bg-white/80 backdrop-blur-2xl border border-gray-200/50 shadow-lg rounded-lg py-1 text-xs text-gray-800 z-[999999]">
            {dropdownMenus.apple.map((item, idx) => (
              <button 
                key={idx}
                onClick={() => { openWindow(item.action); setActiveMenu(null); }} 
                className="w-full text-left px-4 py-1.5 hover:bg-[#007aff] hover:text-white font-semibold cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        <p className="font-bold text-sm text-gray-900 select-none">Atul's Portfolio</p>
      </div>

      {/* 2. Left-Middle Side: Dynamic Navigation Links */}
      <ul className="flex items-center gap-5 max-sm:hidden mr-auto relative text-xs font-semibold text-gray-700">
        {navbarLinks.map(({ id, name }) => {
          const normId = id.toString().toLowerCase();
          const hasDropdown = !!dropdownMenus[normId];
          const isOpen = activeMenu === normId;

          return (
            <li key={id} className="relative">
              <p 
                onClick={() => handleMenuClick(id)}
                className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                  isOpen ? 'bg-black/5 text-gray-950 font-bold' : 'hover:bg-black/5'
                }`}
              >
                {name}
              </p>

              {/* Renders dropdowns dynamically only if active and present in configuration mapping */}
              {isOpen && hasDropdown && (
                <div className="absolute top-8 left-0 w-48 bg-white/80 backdrop-blur-2xl border border-gray-200/50 shadow-lg rounded-lg py-1 text-xs text-gray-800 z-[999999]">
                  {dropdownMenus[normId].map((subItem, index) => {
                    if (subItem.type === 'divider') {
                      return <div key={index} className="h-px bg-gray-200/50 my-1" />;
                    }

                    if (subItem.type === 'app') {
                      return (
                        <button
                          key={index}
                          onClick={() => { openWindow(subItem.action); setActiveMenu(null); }}
                          className="w-full text-left px-4 py-1.5 hover:bg-[#007aff] hover:text-white cursor-pointer font-medium"
                        >
                          {subItem.label}
                        </button>
                      );
                    }

                    return (
                      <a
                        key={index}
                        href={subItem.action}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-left px-4 py-1.5 hover:bg-[#007aff] hover:text-white cursor-pointer font-medium"
                      >
                        {subItem.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* 3. Right Side: Status Icons (Utility controls & Real-time clock) */}
      <div className="flex items-center gap-5 max-sm:hidden ml-auto">
        <ul className="flex items-center gap-5">
          {navIcons.map(({ id, img }) => (
            <li key={id} className="icon" onClick={() => handleIconClick(id)}>
              <img src={img} alt={`Icon ${id}`} className="w-5 h-5 object-contain" />
            </li>
          ))}
        </ul>

        {/* Clicking the Date/Time toggles the widgets panel (Official macOS behavior) */}
        <time 
          onClick={toggleWidgets}
          className="text-sm font-medium text-black flex items-center gap-3 cursor-pointer hover:bg-black/5 px-2.5 py-1 rounded transition-colors"
        >
          <span>{dayjs().format("ddd MMM D")}</span>
          <span>{dayjs().format("h:mm A")}</span>
        </time>
      </div>

    </nav>
  );
};

export default Navbar;