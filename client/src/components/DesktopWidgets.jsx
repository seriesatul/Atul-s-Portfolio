import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useOSStore } from '../store/useOSStore';

export default function DesktopWidgets() {
  const [cpuUsage, setCpuUsage] = useState(24);
  const [time, setTime] = useState(new Date());
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Finalize Safari showcase apps', completed: false },
    { id: 2, text: 'Integrate Express contact API', completed: true },
    { id: 3, text: 'Secure App Store JWT validation', completed: false },
  ]);

  const widgetsOpen = useOSStore((state) => state.widgetsOpen);
  const widgetsRef = useRef(null);

  // Smooth slide-in transition to mimic macOS Widget Center
  useEffect(() => {
    if (widgetsOpen) {
      gsap.to(widgetsRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
      });
    } else {
      gsap.to(widgetsRef.current, {
        x: 350,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      });
    }
  }, [widgetsOpen]);

  // Keep the digital clock updating in real-time
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate dynamic CPU Activity Monitor fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage((prev) => {
        const fluctuation = Math.floor(Math.random() * 11) - 5; // -5% to +5%
        const next = prev + fluctuation;
        return next < 5 ? 5 : next > 85 ? 85 : next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Generate Real-time Monthly Calendar Grid parameters
  const currentDay = time.getDate();
  const monthName = time.toLocaleString('default', { month: 'short' }).toUpperCase();
  const dayName = time.toLocaleString('default', { weekday: 'short' });
  const year = time.getFullYear();

  const firstDayIndex = new Date(year, time.getMonth(), 1).getDay();
  const totalDays = new Date(year, time.getMonth() + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    calendarDays.push(d);
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Helper calculations for the clock formatting
  const rawHours = time.getHours();
  const isPM = rawHours >= 12;
  const hours12 = (rawHours % 12 || 12).toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  // Helper calculation for SVG Activity Monitor circle dashboard gauge
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (cpuUsage / 100) * circumference;

  return (
    <div 
      ref={widgetsRef}
      style={{
        transform: 'translateX(350px)', // Starts completely hidden off-screen
        opacity: 0,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
      className="widgets-container absolute right-6 top-1/2 -translate-y-1/2 w-[310px] max-h-[85vh] flex flex-col gap-6 overflow-y-auto no-scrollbar overflow-x-hidden select-none z-0 pointer-events-auto"
    >
      
      {/* Self-contained styling to load Plus Jakarta Sans and force-hide all browser scrollbars */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
        
        .widgets-container {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;  /* IE and Edge */
          scrollbar-width: none !important;  /* Firefox */
        }
      `}} />

      {/* ==========================================
          WIDGET 0: REAL-TIME GLASS TIME WIDGET
          ========================================== */}
      <div className="w-full rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-4 flex items-center justify-between shadow-lg text-white">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-300 tracking-wider">LOCAL TIME</span>
          
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold tracking-tight leading-none">
              {hours12}:{minutes}
            </span>
            <span className="text-sm font-bold text-gray-300">
              :{seconds}
            </span>
            <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 border border-teal-500/15 px-1.5 py-0.5 rounded ml-1.5">
              {isPM ? 'PM' : 'AM'}
            </span>
          </div>
          
          <span className="text-[9px] text-gray-400 font-semibold tracking-wide mt-2">
            INDIA STANDARD TIME (IST)
          </span>
        </div>

        <div className="size-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          {rawHours >= 6 && rawHours < 18 ? (
            <svg className="size-6 fill-amber-400" viewBox="0 0 24 24">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0-5c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1c0 .55.45 1 1 1zm0 16c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1s1-.45 1-1v-1c0-.55-.45-1-1-1zm10-9c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1s.45 1 1 1h1c.55 0 1-.45 1-1zM4 12c0 .55.45 1 1 1h1c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1zm14.07-6.07c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-.71.71c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0l.71-.71zm-12.02 12c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41l-.71-.71c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l.71.71zm12.02 0c-.39.39-.39 1.02 0 1.41l.71.71c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41l-.71-.71zm-12.02-12c-.39-.39-1.02-.39-1.41 0l-.71.71c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0l.71-.71z" />
            </svg>
          ) : (
            <svg className="size-6 fill-indigo-300" viewBox="0 0 24 24">
              <path d="M12.3 2a10 10 0 0 0-1.9 19.8 10 10 0 0 0 10.5-13.7 7.5 7.5 0 0 1-8.6-6.1z" />
            </svg>
          )}
        </div>
      </div>

      {/* ==========================================
          WIDGET 1: DYNAMIC MONTH CALENDAR
          ========================================== */}
      <div className="flex gap-4 w-full">
        <div className="w-1/2 aspect-square rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-4 flex flex-col items-center justify-between shadow-lg text-white">
          <span className="text-red-400 font-bold text-xs tracking-wider">{monthName}</span>
          <span className="text-4xl font-extrabold tracking-tighter leading-none">{currentDay}</span>
          <span className="text-gray-300 font-medium text-[11px]">{dayName}</span>
        </div>

        <div className="w-1/2 aspect-square rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-3 flex flex-col justify-between shadow-lg text-white">
          <div className="flex justify-between items-center text-[10px] text-gray-300 font-bold px-1">
            <span>{monthName} {year}</span>
          </div>
          
          <div className="grid grid-cols-7 gap-y-1 text-center text-[9px] font-medium text-gray-400">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <span key={i} className="text-gray-300/60 font-bold">{day}</span>
            ))}
            {calendarDays.map((day, idx) => (
              <span 
                key={idx} 
                className={`flex items-center justify-center rounded-full size-4 mx-auto ${
                  day === currentDay 
                    ? 'bg-white text-gray-950 font-extrabold shadow-sm' 
                    : day === null 
                    ? 'opacity-0' 
                    : 'text-white'
                }`}
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ==========================================
          WIDGET 2: TECH STACK ACTIVITY MONITOR
          ========================================== */}
      <div className="w-full rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-4 flex flex-col gap-3 shadow-lg text-white">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <span className="text-[11px] font-bold text-gray-200 tracking-wide">ACTIVITY MONITOR</span>
          <span className="text-[9px] font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/15">ONLINE</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="relative size-16 shrink-0 flex items-center justify-center">
            <svg className="size-full transform -rotate-90">
              <circle cx="32" cy="32" r={radius} className="stroke-white/10 fill-none" strokeWidth="4" />
              <circle 
                cx="32" 
                cy="32" 
                r={radius} 
                className="stroke-teal-400 fill-none transition-all duration-1000 ease-out" 
                strokeWidth="4" 
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
              <span className="text-[13px] font-extrabold">{cpuUsage}%</span>
              <span className="text-[7px] text-gray-300 font-semibold tracking-tighter mt-0.5">DEV CPU</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-1.5 text-[10px] text-gray-200 font-medium">
            <div className="flex justify-between">
              <span className="text-gray-300">React Core:</span>
              <span className="font-mono text-teal-300">4.2 GB (Active)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Node REST API:</span>
              <span className="font-mono text-teal-300">3.1 GB (Wired)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Zustand Cache:</span>
              <span className="font-mono text-teal-300">1.2 GB (Compressed)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          WIDGET 3: INTERACTIVE WALL STICKY NOTE
          ========================================== */}
      <div className="w-full rounded-2xl bg-yellow-400/10 backdrop-blur-xl border border-yellow-400/25 p-4 flex flex-col gap-3 shadow-lg text-yellow-100">
        <div className="flex justify-between items-center border-b border-yellow-400/20 pb-2">
          <span className="text-[11px] font-bold tracking-wide">STICKY NOTE: MILESTONES</span>
          <span className="text-[10px] font-bold opacity-60">🎯</span>
        </div>

        <ul className="flex flex-col gap-2.5 text-[11px] font-medium leading-normal">
          {tasks.map(({ id, text, completed }) => (
            <li 
              key={id}
              onClick={() => toggleTask(id)}
              className="flex items-start gap-2 cursor-pointer group active:opacity-80"
            >
              <button className={`size-3.5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                completed 
                  ? 'bg-yellow-500/40 border-yellow-400' 
                  : 'border-yellow-400/40 group-hover:border-yellow-400'
              }`}>
                {completed && <span className="text-[9px] font-extrabold">✓</span>}
              </button>
              <span className={`transition-all duration-300 select-none ${
                completed ? 'line-through opacity-50' : 'opacity-90'
              }`}>
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}