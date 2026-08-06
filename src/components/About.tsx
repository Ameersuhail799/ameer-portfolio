"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCapIcon,
  CpuIcon,
  CodeIcon,
  MapPinIcon,
  RocketIcon,
  ZapIcon,
} from '@/components/ui/Icons';

const snapshotItems = [
  { icon: <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />, text: "Open to Opportunities", badge: true },
  { icon: <GraduationCapIcon size={18} className="text-indigo-400" />, text: "B.Tech IT Student @ KTU" },
  { icon: <CpuIcon size={18} className="text-purple-400" />, text: "Exploring AI & Machine Learning" },
  { icon: <CodeIcon size={18} className="text-cyan-400" />, text: "Building Full Stack Applications" },
  { icon: <MapPinIcon size={18} className="text-emerald-400" />, text: "India" },
  { icon: <RocketIcon size={18} className="text-indigo-400" />, text: "Currently Building Personal Projects" },
];

const focusChips = [
  "AI Applications",
  "Full Stack Development",
  "Automation",
  "Open Source",
  "Continuous Learning",
];

export default function About() {
  return (
    <section id="about" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Background Lighting Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[130px]" />
      </div>

      <div className="glass-panel-glow p-8 md:p-14 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10 border border-indigo-500/30">
        {/* Left Column: Personality, Mindset & Philosophy */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-4">
            {"WHO I AM"}
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight mb-6 leading-tight">
            MORE THAN <span className="text-gradient-electric">JUST CODE.</span>
          </h2>

          {/* Short Introduction */}
          <p className="text-zinc-200 text-base sm:text-lg font-medium leading-relaxed mb-4">
            I like to build software that solve real-world problems. I&apos;m constantly learning, experimenting, and turning ideas into products that people can actually use.
          </p>

          {/* Personal Paragraph (<100 words) */}
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8 font-normal">
            To me, programming is more than syntax — it&apos;s a medium for creation and problem-solving. My focus is on understanding user needs, crafting clean digital tools, and leveraging Artificial Intelligence to simplify daily workflows.
          </p>

          {/* Philosophy Block: What Drives Me */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 mb-8">
            <h3 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <ZapIcon size={16} className="text-indigo-400" /> WHAT DRIVES ME
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic font-normal">
              &ldquo;I enjoy solving problems through software. Every project I build is an opportunity to learn something new, improve my skills, and create solutions that have real value.&rdquo;
            </p>
          </div>

          {/* Current Focus Chips */}
          <div className="mb-8">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-3 font-semibold">
              Current Focus
            </span>
            <div className="flex flex-wrap gap-2">
              {focusChips.map((chip) => (
                <span
                  key={chip}
                  className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 font-medium hover:border-indigo-500/40 hover:text-white transition-colors"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Personal Quote */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-base sm:text-xl font-display font-bold uppercase text-white tracking-wide">
              &ldquo;ALWAYS LEARNING. ALWAYS BUILDING. ALWAYS IMPROVING.&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Right Column: Current Snapshot Panel & Clean Profile */}
        <motion.div
          className="lg:col-span-5 space-y-6"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Profile Identity Card */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center gap-4">
            <img
              src="/gallery/ameerpic~2.jpeg"
              alt="Ameer Suhail"
              className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500/40 shadow-md shrink-0"
            />
            <div>
              <h3 className="text-base font-display font-extrabold text-white uppercase tracking-wider">
                AMEER SUHAIL
              </h3>
              <span className="text-xs font-mono text-indigo-400 font-semibold uppercase">
                AI/ML • Full Stack Development
              </span>
            </div>
          </div>

          {/* Current Snapshot Panel */}
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-indigo-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">
                CURRENT SNAPSHOT
              </span>
              <span className="text-xs font-mono text-cyan-300 font-bold">2026</span>
            </div>

            <div className="space-y-3">
              {snapshotItems.map((item, idx) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-3 text-xs font-mono font-medium text-zinc-300 p-2.5 rounded-xl bg-black/30 border border-white/5"
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <span className="shrink-0 flex items-center justify-center">{item.icon}</span>
                  <span className={item.badge ? "text-emerald-400 font-bold" : ""}>
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
