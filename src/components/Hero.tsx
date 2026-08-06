"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Ambient Radial Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Main Headline & Actions */}
        <motion.div
          className="lg:col-span-7 space-y-8 text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Availability Status Badge */}
          <motion.div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-xs font-mono text-zinc-300 font-medium tracking-wide">
              AVAILABLE FOR NEW OPPORTUNITIES
            </span>
          </motion.div>

          {/* Main Title & Role */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight uppercase leading-[1.05]">
              AMEER <span className="text-gradient-electric">SUHAIL</span>
            </h1>
            <p className="text-xl sm:text-2xl font-mono text-zinc-400 font-medium tracking-tight">
              Full Stack Developer & AI/ML Enthusiast
            </p>
          </div>

          {/* Bio Description */}
          <p className="text-base sm:text-lg font-sans text-zinc-400 max-w-2xl leading-relaxed font-normal">
            3rd Year B.Tech Information Technology student at APJ Abdul Kalam Technological University (KTU).
            Building high-performance web applications, intelligent AI models, and real-time software systems that solve complex real-world challenges.
          </p>

          {/* Key Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['Next.js 14', 'React', 'TypeScript', 'Python', 'PyTorch', 'Node.js', 'Tailwind CSS'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Call-to-Action Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.a
              href="#showcase"
              className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_10px_30px_rgba(99,102,241,0.3)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.5)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              VIEW MY WORK
            </motion.a>

            <motion.a
              href="#contact"
              className="px-8 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-sm font-bold uppercase tracking-wider transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              CONTACT ME
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Column: Editorial Photo Presentation */}
        <motion.div
          className="lg:col-span-5 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border border-indigo-500/20 shadow-[0_20px_50px_rgba(99,102,241,0.15)] group hover:border-indigo-500/40 transition-all duration-500">
            <img
              src="/gallery/ameerpic~2.jpeg"
              alt="Ameer Suhail"
              className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 filter brightness-95 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-transparent to-transparent opacity-80 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
