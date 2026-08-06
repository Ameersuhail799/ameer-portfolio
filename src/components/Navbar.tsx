"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'showcase', 'skills', 'certificates', 'achievements', 'journey', 'why-me', 'future-goals', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#showcase' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'GitHub', href: '#achievements' },
    { name: 'Journey', href: '#journey' },
    { name: 'Why Me', href: '#why-me' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-300 pointer-events-none ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Mark */}
        <motion.a
          href="#"
          className="pointer-events-auto flex items-center gap-3 glass-panel px-4 py-2 rounded-full border border-white/10 hover:border-indigo-500/50 transition-all shadow-lg group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <div className="w-full h-full bg-[#07070a] rounded-full flex items-center justify-center text-white font-display font-extrabold text-xs">
              AS
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-display font-extrabold text-white tracking-wider group-hover:text-indigo-400 transition-colors">
              AMEER SUHAIL
            </span>
            <span className="text-[9px] font-medium text-zinc-400 uppercase tracking-widest font-mono">
              B.TECH IT • KTU
            </span>
          </div>
        </motion.a>

        {/* Center Pill Nav Links */}
        <nav className="hidden lg:flex pointer-events-auto items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10 shadow-xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 rounded-full z-[-1] shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <motion.a
          href="#contact"
          className="pointer-events-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-display font-bold text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(139,92,246,0.6)] transition-all duration-300 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{"LET'S TALK"}</span>
        </motion.a>
      </div>
    </header>
  );
}
