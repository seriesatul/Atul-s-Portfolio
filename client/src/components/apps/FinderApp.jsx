import React, { useState } from 'react';
import { useOSStore } from '../../store/useOSStore';

// Mock File System Tree
const fileSystem = {
  applications: [
    { id: 'safari_app', name: 'Safari.app', icon: '/images/safari.png', targetApp: 'safari', type: 'app' },
    { id: 'terminal_app', name: 'Terminal.app', icon: '/images/terminal.png', targetApp: 'terminal', type: 'app' },
    { id: 'photos_app', name: 'Photos.app', icon: '/images/photos.png', targetApp: 'photos', type: 'app' },
    { id: 'contact_app', name: 'Mail.app', icon: '/images/contact.png', targetApp: 'contact', type: 'app' },
  ],
  documents: [
    { id: 'resume_pdf', name: 'Resume.pdf', icon: '/images/pdf.png', targetApp: 'resume', type: 'pdf' },
    { id: 'about_txt', name: 'about_me.txt', icon: '/images/txt.png', targetApp: 'terminal', type: 'txt' },
  ],
  desktop: [
    { id: 'projects_folder', name: 'Projects', icon: '/images/folder.png', targetDir: 'projects', type: 'directory' },
    { id: 'resume_shortcut', name: 'Resume.pdf', icon: '/images/pdf.png', targetApp: 'resume', type: 'pdf' },
    { id: 'terminal_shortcut', name: 'Terminal', icon: '/images/terminal.png', targetApp: 'terminal', type: 'app' },
  ],
  projects: [
    { id: 'portfolio_proj', name: 'macOS Portfolio.app', icon: '/images/safari.png', targetApp: 'safari', type: 'project' },
    { id: 'chat_proj', name: 'DevSpace Chat.app', icon: '/images/safari.png', targetApp: 'safari', type: 'project' },
    { id: 'task_proj', name: 'TaskGrid Kanban.app', icon: '/images/safari.png', targetApp: 'safari', type: 'project' },
  ]
};

export default function FinderApp() {
  const { openWindow } = useOSStore();
  const [currentDir, setCurrentDir] = useState('desktop');
  const [dirHistory, setDirHistory] = useState(['desktop']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Handles recursive directory navigation histories
  const navigateToDir = (dirKey) => {
    const newHistory = dirHistory.slice(0, historyIndex + 1);
    newHistory.push(dirKey);
    setDirHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentDir(dirKey);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setCurrentDir(dirHistory[prevIndex]);
    }
  };

  const handleForward = () => {
    if (historyIndex < dirHistory.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setCurrentDir(dirHistory[nextIndex]);
    }
  };

  const handleItemClick = (item) => {
    if (item.type === 'directory') {
      navigateToDir(item.targetDir);
    } else if (item.targetApp) {
      // Connects Finder clicks directly to Zustand's global app launcher
      openWindow(item.targetApp);
    }
  };

  // Filter files in the grid based on search bar queries
  const activeFiles = fileSystem[currentDir] || [];
  const filteredFiles = activeFiles.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white select-none">
      
      {/* 1. Finder Header / Navigation Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200 shrink-0">
        
        {/* Navigation Arrow buttons */}
        <div className="flex gap-1">
          <button 
            onClick={handleBack}
            disabled={historyIndex === 0}
            className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
          >
            <svg className="w-4 h-4 fill-gray-600" viewBox="0 0 24 24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
            </svg>
          </button>
          <button 
            onClick={handleForward}
            disabled={historyIndex === dirHistory.length - 1}
            className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
          >
            <svg className="w-4 h-4 fill-gray-600" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
          
          {/* Breadcrumb Path name */}
          <span className="ml-3 text-xs font-semibold text-gray-500 self-center capitalize">
            Macintosh HD › {currentDir}
          </span>
        </div>

        {/* Dynamic Search filter bar */}
        <div className="relative w-40">
          <input 
            type="text" 
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-7 pr-3 py-1 bg-gray-100 text-xs border border-gray-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 p-0"
          />
          <svg className="absolute left-2.5 top-1.5 w-3.5 h-3.5 fill-gray-400" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
      </div>

      {/* 2. Main Window Panel (Sidebar + File Grid) */}
      <div className="flex flex-1 overflow-hidden h-full">
        
        {/* Left Side: Frosted Finder Sidebar */}
        <div className="w-44 bg-gray-50/80 border-r border-gray-200/50 p-3 flex flex-col gap-4 select-none">
          <div>
            <h4 className="text-[10px] font-bold text-gray-400 tracking-wider mb-1.5 px-2">FAVORITES</h4>
            <ul className="flex flex-col gap-0.5 text-xs text-gray-700 font-medium">
              {[
                { label: 'Desktop', icon: '/images/folder.png', key: 'desktop' },
                { label: 'Documents', icon: '/images/folder.png', key: 'documents' },
                { label: 'Applications', icon: '/images/folder.png', key: 'applications' },
                { label: 'Projects', icon: '/images/folder.png', key: 'projects' },
              ].map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => navigateToDir(item.key)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                      currentDir === item.key 
                        ? 'bg-blue-100 text-blue-700 font-semibold' 
                        : 'hover:bg-gray-200/50'
                    }`}
                  >
                    <img src={item.icon} alt={item.label} className="w-4 h-4 object-contain" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Active Files grid view */}
        <div className="flex-1 p-5 overflow-y-auto bg-white">
          {filteredFiles.length > 0 ? (
            <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
              {filteredFiles.map((file) => (
                <button
                  key={file.id}
                  onClick={() => handleItemClick(file)}
                  className="group flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors w-24 mx-auto"
                >
                  <img 
                    src={file.icon} 
                    alt={file.name} 
                    className="size-11 object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-200" 
                  />
                  <span className="text-[11px] text-gray-800 font-medium text-center leading-tight truncate w-full">
                    {file.name}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-xs text-gray-400">
              No Items Found
            </div>
          )}
        </div>

      </div>
    </div>
  );
}