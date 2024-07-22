'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { NavLink } from './NavLink';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { MenuOverlay } from './MenuOverlay';

const navLinks = [
  {
    title: 'About',
    path: '#about',
  },
  {
    title: 'Projects',
    path: '#projects',
  },
  {
    title: 'Contact',
    path: '#contact',
  },
];

export const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed w-full border-b mx-auto border border-[#33353F] top-0 left-0 right-0 z-20 bg-[#121212] bg-opacity-100">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-5 py-5">
        <Link href={'/'} className="text-2xl md:text-5xl text-white font-semibold">
          Salam
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2  rounded text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-7 w-7" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2  rounded text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-7 w-7" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} onClick={() => setNavbarOpen(false)} /> : null}
    </nav>
  );
};
