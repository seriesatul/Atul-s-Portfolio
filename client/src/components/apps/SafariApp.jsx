import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

// Mock Portfolio Projects Data (utilizing your physical graphic assets)
const projects = [
  {
    id: 'macos_portfolio',
    title: 'macOS Interactive Portfolio',
    url: 'https://atul.dev/projects/macos-portfolio',
    image: '/images/project-1.png',
    year: '2026',
    description: 'A fully interactive, state-driven macOS desktop portfolio simulation built with React, GSAP, and Zustand. Features include a dynamic draggable window manager, fully functional custom bash shell, desktop widget engines, and a responsive glassmorphic dock.',
    tags: ['React', 'Zustand', 'GSAP', 'Tailwind CSS'],
    github: 'https://github.com/seriesatul/Atul-s-Portfolio',
    live: 'https://atul.dev'
  },
  {
    id: 'devspace_chat',
    title: 'DevSpace Chat',
    url: 'https://devspace.chat',
    image: '/images/project-2.png',
    year: '2025',
    description: 'A real-time socket-based communication platform engineered for programmers. Features secure authenticated rooms, code-snippet syntax highlighting inside message containers, markdown rendering, and persistent storage of active channel logs.',
    tags: ['Node.js', 'Express', 'Socket.io', 'MongoDB', 'React'],
    github: 'https://github.com/seriesatul',
    live: 'https://github.com/seriesatul'
  },
  {
    id: 'taskgrid_kanban',
    title: 'TaskGrid Kanban',
    url: 'https://taskgrid.app',
    image: '/images/project-3.png',
    year: '2025',
    description: 'A highly responsive project management and task boards interface. Utilizes complex drag-and-drop animations, multiple workspace columns, customizable labels, real-time analytics graphs of milestones, and offline syncing.',
    tags: ['React', 'Redux Toolkit', 'Tailwind CSS', 'PostgreSQL'],
    github: 'https://github.com/seriesatul',
    live: 'https://github.com/seriesatul'
  }
];

export default function SafariApp() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [history, setHistory] = useState([0]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const viewPaneRef = useRef(null);

  const activeProject = projects[selectedIdx];

  // 1. GSAP smooth fade & slide transitions when selected project changes
  useEffect(() => {
    if (viewPaneRef.current) {
      gsap.fromTo(
        viewPaneRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [selectedIdx]);

  const selectProject = (index) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(index);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setSelectedIdx(index);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setSelectedIdx(history[prevIndex]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setSelectedIdx(history[nextIndex]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white select-none">
      
      {/* 1. Safari Browser Header / Address Bar Toolbar */}
      <div className="flex items-center gap-4 px-4 py-3 bg-gray-100 border-b border-gray-200 shrink-0">
        
        {/* Navigation Arrows */}
        <div className="flex gap-1">
          <button 
            onClick={handleBack}
            disabled={historyIndex === 0}
            className="p-1.5 rounded hover:bg-gray-250 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
          >
            <svg className="w-4 h-4 fill-gray-600" viewBox="0 0 24 24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
            </svg>
          </button>
          <button 
            onClick={handleForward}
            disabled={historyIndex === history.length - 1}
            className="p-1.5 rounded hover:bg-gray-250 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
          >
            <svg className="w-4 h-4 fill-gray-600" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
        </div>

        {/* Pill Shaped Secure URL Address Bar */}
        <div className="flex-1 max-w-xl mx-auto flex items-center justify-center gap-1.5 px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs text-gray-500 shadow-sm">
          {/* Secure Lock Icon */}
          <svg className="w-3 h-3 fill-emerald-500" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
          <span className="truncate tracking-wide font-medium text-gray-600">{activeProject.url}</span>
        </div>

        {/* Empty placeholder block to balance the right toolbar width */}
        <div className="w-14" />
      </div>

      {/* 2. Main Layout (Sidebar Project Selector + Viewport Showcase) */}
      <div className="flex flex-1 overflow-hidden h-full">
        
        {/* Left Side: Frosted Project Index Sidebar */}
        <div className="w-56 bg-gray-50/90 border-r border-gray-200/50 p-3 flex flex-col gap-4">
          <div>
            <h4 className="text-[10px] font-bold text-gray-400 tracking-wider mb-2 px-2">PROJECTS</h4>
            <ul className="flex flex-col gap-0.5 text-xs text-gray-700 font-medium">
              {projects.map((project, idx) => (
                <li key={project.id}>
                  <button
                    onClick={() => selectProject(idx)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedIdx === idx 
                        ? 'bg-blue-100 text-blue-700 font-semibold shadow-sm' 
                        : 'hover:bg-gray-200/40'
                    }`}
                  >
                    <span className="text-sm font-bold opacity-60">🌐</span>
                    <span className="truncate">{project.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Active Project Viewport Pane */}
        <div className="flex-1 p-8 overflow-y-auto bg-white select-text">
          <div ref={viewPaneRef} className="max-w-2xl mx-auto space-y-6">
            
            {/* Project Image Frame (Simulated browser window mockup) */}
            <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-md group">
              {/* Image Toolbar Header dots */}
              <div className="absolute top-3 left-4 flex gap-1.5 z-10">
                <span className="size-2 rounded-full bg-gray-300" />
                <span className="size-2 rounded-full bg-gray-300" />
                <span className="size-2 rounded-full bg-gray-300" />
              </div>
              <img 
                src={activeProject.image} 
                alt={activeProject.title} 
                className="w-full aspect-video object-cover group-hover:scale-101 transition-transform duration-500"
              />
            </div>

            {/* Project Specifications */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-gray-100 pb-2">
                <h2 className="text-xl font-extrabold text-gray-800">{activeProject.title}</h2>
                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                  YEAR {activeProject.year}
                </span>
              </div>

              {/* Technologies Badges */}
              <div className="flex flex-wrap gap-1.5">
                {activeProject.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="text-[10px] font-bold text-teal-600 bg-teal-500/10 border border-teal-500/15 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description Writeup */}
              <p className="text-xs leading-relaxed text-gray-600">
                {activeProject.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <a 
                  href={activeProject.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                  </svg>
                  Visit Live Site
                </a>
                <a 
                  href={activeProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-gray-700" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                  View Source Code
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}