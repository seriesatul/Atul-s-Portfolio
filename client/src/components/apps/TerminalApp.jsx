import React, { useState, useRef, useEffect } from 'react';
import { useOSStore } from '../../store/useOSStore';

export default function TerminalApp() {
  const [input, setInput] = useState('');
  const { openWindow } = useOSStore();
  const [history, setHistory] = useState([
    { type: 'output', text: 'Last login: ' + new Date().toDateString() + ' on ttys000' },
    { type: 'output', text: 'Type "help" to view portfolio console instructions.' },
  ]);
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scrolls console to the bottom on new outputs
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Autofocus input when clicking anywhere inside the terminal window
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    
    if (!trimmedInput) return;

    // Add input command line directly to execution logs
    const newHistory = [...history, { type: 'input', text: `Atuls-MacBook-Pro:~ atul$ ${input}` }];

    // Parse commands and separate parameters
    const args = trimmedInput.split(' ');
    const command = args[0].toLowerCase();

    switch (command) {
      case 'help':
        newHistory.push({
          type: 'help',
          text: `Atul's Portfolio Console v5.0.0-release\nType any of the following interactive queries:\n\n  about        - View background bio & goals\n  skills       - Print development tech stack parameters\n  experience   - Display professional career history\n  education    - Display academic history\n  projects     - List engineering projects & descriptions\n  socials      - Print clickable social profile links\n  open [app]   - Launch desktop app (safari, finder, photos, resume, contact)\n  neofetch     - Display simulated system specs and profile summary\n  clear        - Flush terminal history lines`
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'about':
        newHistory.push({
          type: 'header',
          text: `[ABOUT ME]\n---------------------------------------------------------\nName:       Atul\nRole:       Full-Stack Developer & Software Engineer\nLocation:   India\nEducation:  B.Tech in Computer Science Engineering\nExperience: MERN Stack Development, Full-Stack Projects\nFocus:      Scalable Web Applications, System Design, APIs & AI Integration\n\nBio:\nI am a passionate software engineer who enjoys building scalable web\napplications and solving real-world problems through technology.\nMy expertise lies in the MERN stack, where I design robust backend\narchitectures and create intuitive frontend experiences.\n\nI am deeply interested in system design, high-performance APIs,\nartificial intelligence, and product engineering. Beyond coding,\nI continuously explore new technologies, participate in hackathons,\nand work on innovative projects that challenge my problem-solving skills.\n\nCurrent Goals:\n- Master Data Structures & Algorithms\n- Crack a Product-Based Software Engineering Role\n- Build AI-Powered Applications\n- Develop Production-Ready SaaS Products\n- Grow as a Full-Stack & System Design Engineer`

        });
        break;

      case 'skills':
        newHistory.push({
        type: 'header',
        text: `[TECHNICAL STACK]\n---------------------------------------------------------\n* LANGUAGES   :: JavaScript (ES6+), C++, HTML5, CSS3, SQL\n* FRONTEND    :: React.js, Vite, Tailwind CSS, Redux, Responsive UI Design\n* BACKEND     :: Node.js, Express.js, REST APIs, Authentication & Authorization\n* DATABASES   :: MongoDB, MySQL\n* TOOLS       :: Git, GitHub, Postman, VS Code, npm\n* AI & ML     :: Gemini API, AI Chatbots, Computer Vision, Object Detection\n* DEPLOYMENT  :: Vercel, Netlify, Render, Hostinger\n* CONCEPTS    :: Data Structures & Algorithms, OOP, DBMS, OS, System Design\n* SPECIALTY   :: MERN Stack Development, Full-Stack Applications, AI-Powered Products`

        });
        break;

      case 'experience':
        newHistory.push({
          type: 'header',
         text: `[WORK HISTORY]\n---------------------------------------------------------\n1. Full-Stack Developer Intern @ Alphabetum (2025 - Present)\n   - Developing scalable MERN stack applications with modern frontend and backend architectures.\n   - Building RESTful APIs, authentication systems, and responsive user interfaces.\n   - Collaborating on production-ready features while following industry development practices.\n\n2. Full-Stack Web Development Intern @ Intern Intelligence (2025)\n   - Developed and maintained full-stack web applications using JavaScript technologies.\n   - Implemented backend services, database integrations, and responsive frontend components.\n   - Worked on real-world projects focused on performance, usability, and clean code practices.\n\n3. Freelance & Personal Projects (2024 - Present)\n   - Built multiple MERN stack applications, AI-powered tools, and web platforms.\n   - Developed projects including AI chatbots, object detection systems, authentication platforms, and productivity tools.\n   - Focused on scalable architecture, API development, and modern user experiences.`

        });
        break;

      case 'education':
        newHistory.push({
          type: 'header',
         text: `[ACADEMICS]\n---------------------------------------------------------\n* Bachelor of Technology in Computer Science & Engineering\n  - Prayag Institute of Technology & Management (AKTU)\n  - Expected Graduation: May 2026\n  - Current CGPA: 8.0 / 10.0\n\n* Academic Focus Areas\n  - Data Structures & Algorithms\n  - Operating Systems\n  - Database Management Systems\n  - Computer Networks\n  - Software Engineering\n  - System Design Fundamentals\n\n* Learning Beyond the Classroom\n  - Full-Stack Web Development (MERN Stack)\n  - Artificial Intelligence & LLM Applications\n  - Retrieval-Augmented Generation (RAG)\n  - API Architecture & Scalable Backend Systems\n  - Competitive Programming & Problem Solving\n\n* Academic Highlights\n  - Solved 200+ LeetCode problems across Arrays, Trees, Graphs, and Dynamic Programming.\n  - Built production-grade SaaS applications and AI-powered platforms alongside academic coursework.\n  - Participated in hackathons and collaborative software projects focused on real-world problem solving.`

        });
        break;

      case 'projects':
        newHistory.push({
          type: 'header',
         text: `[PROJECT SHOWCASE]\n---------------------------------------------------------\nType "open project <name>" to explore project details.\n\n* ReeCommerce   :: AI-powered social commerce platform with real-time seller dashboards, live notifications, and role-based access control.\n* HireIQ        :: Recruitment intelligence platform using LLMs, LangChain, vector embeddings, and semantic candidate search.\n* MealMind      :: AI-powered nutrition and restaurant management SaaS with personalized meal planning and RAG integration.\n* BUJJI         :: Intelligent desktop assistant featuring voice interaction, AI capabilities, and automation workflows.\n* AI News Hub   :: Multi-source news aggregation platform comparing different perspectives on the same story.\n* YouTube Notes :: AI-based video and playlist summarization tool that generates structured notes from spoken content.`

        });
        break;

      case 'socials':
        newHistory.push({
        type: 'social',
        text: `[SOCIAL HANDLES]
        ---------------------------------------------------------
        * PORTFOLIO  :: https://atul-s-portfolio-navy.vercel.app/
        * LINKEDIN   :: https://www.linkedin.com/in/atul-singh-chauhan-a955b529b/
        * GITHUB     :: https://github.com/seriesatul
        * LEETCODE   :: https://leetcode.com/u/atulsingh04895/
        * EMAIL      :: atulsingh04895@gmail.com
        * PHONE      :: +91-9569838578`
        });
        break;

      case 'open':
        const targetApp = args[1]?.toLowerCase();
        if (!targetApp) {
          newHistory.push({ 
            type: 'error', 
            text: 'usage: open [app_name]\nAvailable options: safari, finder, photos, resume, contact' 
          });
        } else if (['safari', 'finder', 'photos', 'resume', 'contact'].includes(targetApp)) {
          openWindow(targetApp);
          newHistory.push({ 
            type: 'success', 
            text: `Launching desktop application '${targetApp}'...` 
          });
        } else {
          newHistory.push({ 
            type: 'error', 
            text: `open: '${targetApp}' is not a registered desktop application.` 
          });
        }
        break;

      case 'neofetch':
        newHistory.push({
          type: 'neofetch',
          text: `                     .hshyyyyyys:           Atul@MacBook-Pro\n                 .+yhhhhhhhhhhhhy           ----------------\n               .+hhhhhhhhhhhhhhhhy.         OS: macOS Interactive Portfolio\n              /hhhhhhhhhhhhhhhhhhh/         Host: React Portfolio Client v4\n             /hhhhhhhhhhhhhhhhhhhhh.        Kernel: WebKit Engine\n            .hhhhhhhhhhhhhhhhhhhhhh-        Uptime: ${Math.floor(performance.now() / 1000)}s\n            :hhhhhhhhhhhhhhhhhhhhhh.        Shell: custom-bash-js\n            .hhhhhhhhhhhhhhhhhhhhhh-        Resolution: ${window.innerWidth}x${window.innerHeight}\n             /hhhhhhhhhhhhhhhhhhhhh.        DE: Aqua (Glassmorphism)\n             .hhhhhhhhhhhhhhhhhhhh/         WM: GSAP WindowManager\n              .yhhhhhhhhhhhhhhhhh/          Terminal: Custom HTML5 Console\n                ./yhhhhhhhhhhhh/            CPU: Virtual Dev Engine\n                    .-:////:-.              Memory: 16GB Virtual Memory`
        });
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `bash: ${command}: command not found. Type "help" to view portfolio CLI utilities.`
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  // Helper function to color code command outputs professionally
  const getLineStyles = (type) => {
    switch (type) {
      case 'input':
        return 'text-white font-bold border-l-2 border-blue-500 pl-2 my-1';
      case 'header':
        return 'text-teal-400 font-semibold leading-relaxed';
      case 'help':
        return 'text-yellow-300 whitespace-pre-wrap leading-relaxed';
      case 'neofetch':
        return 'text-sky-300 font-medium whitespace-pre leading-relaxed';
      case 'error':
        return 'text-rose-400 font-medium';
      case 'success':
        return 'text-emerald-400 font-medium';
      default:
        return 'text-green-300 leading-relaxed';
    }
  };

  return (
    <div 
      onClick={handleContainerClick}
      className="flex flex-col h-full bg-[#1c1c1e]/95 text-green-400 font-mono p-4 text-xs select-text overflow-y-auto no-scrollbar"
      style={{
        scrollbarWidth: 'none',      // Firefox
        msOverflowStyle: 'none'      // Edge / IE
      }}
    >
      {/* Self-contained WebKit style sheet to completely hide Chrome/Safari/Vite scrollbars */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />

      {/* 1. Terminal Console History Logs */}
      <div className="flex-1 whitespace-pre-wrap space-y-3">
        {history.map((line, idx) => (
          <div key={idx} className={getLineStyles(line.type)}>
            {line.text}
            
            {/* Clickable links wrapper specifically for the socials command */}
            {line.type === 'social' && (
              <div className="mt-2 space-y-1.5 pl-4 text-sky-400">
                <p>
                GitHub:{" "}
                <a
                    href="https://github.com/seriesatul"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-cyan-400"
                >
                    github.com/seriesatul
                </a>
                </p>

                <p>
                LinkedIn:{" "}
                <a
                    href="https://www.linkedin.com/in/atul-singh-chauhan-a955b529b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-cyan-400"
                >
                    linkedin.com/in/atul-singh-chauhan-a955b529b
                </a>
                </p>

                <p>
                Portfolio:{" "}
                <a
                    href="https://atul-s-portfolio-navy.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-cyan-400"
                >
                    atul-s-portfolio-navy.vercel.app
                </a>
                </p>
              </div>
            )}
          </div>
        ))}
        {/* Dynamic scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* 2. Interactive prompt line */}
      <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 mt-4 pt-2.5 border-t border-white/5 shrink-0">
        <span className="text-white font-bold shrink-0">Atuls-MacBook-Pro:~ atul$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-gray-600 p-0 focus:ring-0"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}