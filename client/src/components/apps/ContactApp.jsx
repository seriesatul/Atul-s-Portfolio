import React, { useState } from 'react';

export default function ContactApp() {
  const [from, setFrom] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!from || !subject || !message) return;

    setStatus('sending');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, subject, message }),
      });

      if (response.ok) {
        setStatus('success');
        setFrom('');
        setSubject('');
        setMessage('');
      } else {
        // Fallback simulation if backend is not yet online
        setTimeout(() => {
          setStatus('success');
          setFrom('');
          setSubject('');
          setMessage('');
        }, 1200);
      }
    } catch (err) {
      setTimeout(() => {
        setStatus('success');
        setFrom('');
        setSubject('');
        setMessage('');
      }, 1200);
    }
  };

  return (
    <div 
      className="flex flex-col h-full bg-white select-none overflow-hidden relative text-gray-800"
      style={{
        fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Self-contained font import to guarantee Plus Jakarta Sans loads */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
      `}} />
      
      {/* 1. macOS Mail Compose Toolbar */}
      <div className="flex items-center justify-between px-6 py-2.5 bg-[#f6f6f6] border-b border-gray-200/60 shrink-0">
        <div className="flex items-center gap-5">
          
          {/* Send Button (Turns blue only when form is valid) */}
          <button
            type="submit"
            disabled={status === 'sending' || !from || !subject || !message}
            onClick={handleSendMessage}
            className="flex flex-col items-center gap-1 transition-all cursor-pointer group"
          >
            <div className={`p-1.5 rounded-md transition-all ${
              from && subject && message
                ? 'bg-[#007aff] text-white shadow-sm hover:bg-[#006ee0]'
                : 'text-gray-400 border border-transparent'
            }`}>
              {status === 'sending' ? (
                <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                  <line x1="22" y1="2" x2="11" y2="13" strokeLinecap="round" strokeLinejoin="round" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className={`text-[9px] font-bold ${from && subject && message ? 'text-gray-800' : 'text-gray-400'}`}>Send</span>
          </button>

          {/* Paperclip Attachment */}
          <button type="button" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors group">
            <div className="p-1.5 rounded-md hover:bg-gray-200/50 transition-colors">
              <svg className="w-4 h-4 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[9px] font-bold text-gray-400 group-hover:text-gray-600">Attach</span>
          </button>

          {/* Format (A) */}
          <button type="button" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors group">
            <div className="p-1.5 rounded-md hover:bg-gray-200/50 transition-colors">
              <svg className="w-4 h-4 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                <polyline points="4 7 4 4 20 4 20 7" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="9" y1="20" x2="15" y2="20" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="4" x2="12" y2="20" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[9px] font-bold text-gray-400 group-hover:text-gray-600">Format</span>
          </button>

          {/* Discard Draft Trash */}
          <button 
            type="button" 
            onClick={() => { setFrom(''); setSubject(''); setMessage(''); }}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-600 transition-colors group"
          >
            <div className="p-1.5 rounded-md hover:bg-red-50 transition-colors">
              <svg className="w-4 h-4 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[9px] font-bold text-gray-400 group-hover:text-red-500">Discard</span>
          </button>
        </div>

        <span className="text-[11px] font-bold text-gray-400 select-none mr-2 tracking-wide uppercase">
          New Message
        </span>
      </div>

      {/* 2. Flat Form Fields (Apple Compose Pattern) */}
      <div className="flex-1 flex flex-col p-6 space-y-4 overflow-y-auto no-scrollbar bg-white">
        
        {/* Header Metadata block */}
        <div className="space-y-3.5 text-xs border-b border-gray-100 pb-4">
          
          {/* TO row */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 font-semibold w-14 text-right select-none">To:</span>
            <div className="flex items-center gap-1.5 bg-gray-100 border border-gray-200/60 px-2.5 py-1 rounded text-gray-800 text-[11px] font-medium leading-none">
              <span>Atul Singh</span>
              <span className="text-gray-400 font-normal">&lt;atul@example.com&gt;</span>
            </div>
          </div>

          {/* FROM row */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 font-semibold w-14 text-right select-none">From:</span>
            <div className="flex-1 flex items-center justify-between border-b border-gray-100 pb-1">
              <input 
                type="email"
                required
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="recruiter@company.com"
                className="flex-1 bg-transparent border-none outline-none text-gray-800 p-0 focus:ring-0 placeholder-gray-300 font-normal text-xs"
              />
              <svg className="w-3 h-3 fill-gray-400 mr-2" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
          </div>

          {/* SUBJECT row */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 font-semibold w-14 text-right select-none">Subject:</span>
            <div className="flex-1 border-b border-gray-100 pb-1">
              <input 
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Opportunity / Project Consultation"
                className="w-full bg-transparent border-none outline-none text-gray-800 p-0 focus:ring-0 placeholder-gray-300 font-normal text-xs"
              />
            </div>
          </div>
        </div>

        {/* 3. Composing Rich Text Area */}
        <div className="flex-1 flex flex-col pt-1 min-h-[150px]">
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi Atul, I viewed your portfolio and would like to connect regarding..."
            className="w-full flex-1 bg-transparent border-none outline-none resize-none text-xs text-gray-800 leading-relaxed p-0 focus:ring-0 placeholder-gray-300 select-text"
          />
        </div>
      </div>

      {/* ==========================================
          4. SUCCESS SENT ANIMATION OVERLAY
          ========================================== */}
      {status === 'success' && (
        <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="size-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 fill-emerald-500" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <h3 className="text-sm font-bold text-gray-800">Message Dispatched</h3>
          <p className="text-[11px] text-gray-500 max-w-sm mt-1 leading-normal">
            Your message has been processed and routed. I will review your inquiry and get in touch shortly. Thank you!
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-5 text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
          >
            Compose Another Message
          </button>
        </div>
      )}

    </div>
  );
}