"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  ZapIcon,
  CodeIcon,
  SparklesIcon,
  GraduationCapIcon,
  UserIcon,
  CpuIcon,
  BriefcaseIcon,
  TrophyIcon,
  TerminalIcon,
  RocketIcon,
} from '@/components/ui/Icons';

const whyWorkWithMe = [
  {
    title: "Fast Learner",
    desc: "Rapidly adapt to new frameworks, libraries, and tools to solve immediate technical challenges.",
    icon: ZapIcon,
  },
  {
    title: "Problem Solver",
    desc: "Enjoy breaking complex requirements into clean, practical code structures.",
    icon: CodeIcon,
  },
  {
    title: "Strong Design Sense",
    desc: "Care deeply about UI/UX aesthetics, glassmorphic polish, smooth motion, and responsive layouts.",
    icon: SparklesIcon,
  },
  {
    title: "Continuous Learner",
    desc: "Consistently sharpening skills through personal projects, hackathons, and certifications.",
    icon: GraduationCapIcon,
  },
  {
    title: "Team Player",
    desc: "Collaborative mindset with clear communication and eagerness to learn from senior engineers.",
    icon: UserIcon,
  },
  {
    title: "AI Enthusiast",
    desc: "Genuinely excited about applying AI & Machine Learning to build real-world student and enterprise tools.",
    icon: CpuIcon,
  },
];

const lookingForList = [
  { title: "Software Engineering Internships", badge: "Primary Focus", icon: BriefcaseIcon },
  { title: "Full Stack Development Roles", badge: "Web Apps", icon: CodeIcon },
  { title: "AI & Machine Learning Projects", badge: "AI / ML", icon: CpuIcon },
  { title: "Hackathons & Coding Competitions", badge: "Collaborative", icon: TrophyIcon },
  { title: "Open Source Contributions", badge: "Community", icon: TerminalIcon },
  { title: "Mentorship & Engineering Guidance", badge: "Growth", icon: RocketIcon },
];

export default function ValueProposition() {
  return (
    <section id="why-me" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Why Work With Me? */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
            {"RECRUITER VALUE PROPOSITION"}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight mb-4">
            WHY WORK WITH ME?
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mb-8">
            An ambitious 3rd-year B.Tech IT student who brings energy, design precision, and rapid learning ability to software teams.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyWorkWithMe.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-indigo-500/40 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 text-indigo-400">
                      <IconComp size={20} />
                    </div>
                    <h3 className="text-base font-display font-bold text-white uppercase">{item.title}</h3>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: What I'm Looking For */}
        <motion.div
          className="lg:col-span-5 glass-panel-glow p-6 md:p-8 rounded-3xl border border-cyan-500/30"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div>
              <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-wider">
                WHAT I&apos;M LOOKING FOR
              </h3>
              <span className="text-xs font-mono text-cyan-300">OPPORTUNITIES & GOALS</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold uppercase">
              Target
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {lookingForList.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/5 hover:border-cyan-500/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/[0.04] text-cyan-400">
                      <IconComp size={18} />
                    </div>
                    <span className="text-xs font-bold text-zinc-200">{item.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded font-semibold uppercase">
                    {item.badge}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
