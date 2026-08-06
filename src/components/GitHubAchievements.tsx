"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GithubLogo, RocketIcon, BarChartIcon, CpuIcon, TargetIcon } from '@/components/ui/Icons';

const languages = [
  { name: 'Python', percent: 45, color: 'bg-yellow-400' },
  { name: 'JavaScript / React', percent: 35, color: 'bg-indigo-400' },
  { name: 'C Language', percent: 12, color: 'bg-cyan-400' },
  { name: 'HTML / CSS', percent: 8, color: 'bg-purple-400' },
];

const milestones = [
  {
    title: 'CareerOS Platform',
    desc: 'AI-driven career development and ATS resume optimization engine.',
    icon: RocketIcon,
    tag: 'Flagship Build',
  },
  {
    title: 'Activity Point Manager',
    desc: 'Web application streamlining 100 KTU credit points management for students & admins.',
    icon: BarChartIcon,
    tag: 'Student App',
  },
  {
    title: 'House Price Prediction Model',
    desc: 'Machine learning model trained with Scikit-learn regression algorithms.',
    icon: CpuIcon,
    tag: 'ML Project',
  },
  {
    title: 'BunkBuddy Attendance App',
    desc: 'Smart attendance tracking app with safe bunk calculation algorithm.',
    icon: TargetIcon,
    tag: 'Productivity',
  },
];

export default function GitHubAchievements() {
  return (
    <section id="achievements" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="mb-14 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
          {"OPEN SOURCE & CODE ACTIVITY"}
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight mb-4">
          GITHUB & ACHIEVEMENTS
        </h2>
        <p className="text-zinc-400 text-base">
          Transparent metrics of my software development consistency, language distribution, and open-source contributions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Simulated GitHub Activity Card */}
        <motion.div
          className="lg:col-span-7 glass-panel-glow p-6 md:p-8 rounded-3xl border border-indigo-500/30"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white">
                <GithubLogo size={24} />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white uppercase">GITHUB ANALYTICS</h3>
                <a
                  href="https://github.com/ameersuhail799"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-indigo-400 hover:underline"
                >
                  @ameersuhail799
                </a>
              </div>
            </div>
            <a
              href="https://github.com/ameersuhail799"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-indigo-500/50 transition-colors"
            >
              Follow ↗
            </a>
          </div>

          {/* Key Metric Pills */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-black/30 p-3 rounded-2xl border border-white/5 text-center">
              <span className="block text-xl font-display font-black text-white">500+</span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Commits</span>
            </div>
            <div className="bg-black/30 p-3 rounded-2xl border border-white/5 text-center">
              <span className="block text-xl font-display font-black text-indigo-400">10+</span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Repositories</span>
            </div>
            <div className="bg-black/30 p-3 rounded-2xl border border-white/5 text-center">
              <span className="block text-xl font-display font-black text-cyan-400">2026</span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Active Year</span>
            </div>
          </div>

          {/* Top Languages Breakdown */}
          <div className="mb-6">
            <span className="text-xs font-mono text-zinc-400 uppercase block mb-3 font-semibold">
              Top Languages Used
            </span>
            <div className="space-y-2.5">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-200">{lang.name}</span>
                    <span className="text-zinc-400">{lang.percent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                    <div
                      className={`h-full ${lang.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${lang.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contribution Heatmap Preview */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-zinc-400 uppercase">Contribution Graph</span>
              <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active Contributor
              </span>
            </div>
            <div className="grid grid-cols-12 gap-1 p-3 rounded-xl bg-black/40 border border-white/5">
              {Array.from({ length: 48 }).map((_, i) => {
                const opacity = (i % 5 === 0) ? 'bg-indigo-500' : (i % 3 === 0) ? 'bg-indigo-700/60' : (i % 2 === 0) ? 'bg-indigo-900/40' : 'bg-zinc-800/30';
                return (
                  <div
                    key={i}
                    className={`h-3 rounded-sm ${opacity} hover:scale-125 transition-transform`}
                    title={`Day ${i + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Code Achievements & Highlights */}
        <motion.div
          className="lg:col-span-5 space-y-4"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-2 mb-2">
            <h3 className="text-lg font-display font-bold text-white uppercase tracking-wide">
              KEY PROJECT HIGHLIGHTS
            </h3>
            <span className="text-xs font-mono text-indigo-400">PRACTICAL BUILDS & TOOLS</span>
          </div>

          {milestones.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className="glass-panel p-4.5 rounded-2xl border border-white/10 hover:border-indigo-500/40 transition-colors flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-indigo-400">
                  <IconComponent size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-white uppercase font-display">{item.title}</h4>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-[9px] font-mono text-indigo-300 font-bold uppercase">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
