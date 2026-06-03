import React from 'react'
import { navbarLinks, navIcons } from '../constants/navbar.constants'
import dayjs from 'dayjs';

const Navbar = () => {
  return (
    <nav className="flex items-center bg-white/50 backdrop-blur-3xl p-2 px-5 select-none gap-6">
      
      {/* 1. Left Side: Brand Logo and Title */}
      <div className="flex items-center gap-3">
        <img src="/images/logo.svg" alt="logo" className="w-4 h-4" />
        <p className="font-bold text-sm">Atul's Portfolio</p>
      </div>

      {/* 2. Left-Middle Side: Navigation Links (mr-auto pushes icons to the right) */}
      <ul className="flex items-center gap-5 max-sm:hidden mr-auto">
        {navbarLinks.map(({ id, name }) => (
          <li key={id}>
            <p className="text-sm cursor-pointer hover:underline transition-all">
              {name}
            </p>
          </li>
        ))}
      </ul>

      {/* 3. Right Side: Status Icons (ml-auto ensures they stay on the right side) */}
      <div className="flex items-center gap-5 max-sm:hidden ml-auto">
        <ul className="flex items-center gap-5">
          {navIcons.map(({ id, img }) => (
            <li key={id} className="icon">
              <img src={img} alt={`Icon ${id}`} className="w-5 h-5 object-contain" />
            </li>
          ))}
        </ul>

       <time className="text-sm font-medium text-black flex items-center gap-3">
        <span>{dayjs().format("ddd MMM D")}</span>
        <span>{dayjs().format("h:mm A")}</span>
        </time>
      </div>

    </nav>
  );
};

export default Navbar;