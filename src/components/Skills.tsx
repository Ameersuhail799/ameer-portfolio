"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CodeIcon, CpuIcon, LayersIcon, RocketIcon } from '@/components/ui/Icons';

interface SkillGroup {
  category: string;
  items: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent?: string;
}

const skillGroups: SkillGroup[] = [
  {
    category: "Programming",
    items: ["Python", "JavaScript", "C"],
    icon: CodeIcon,
    accent: "from-indigo-500 to-purple-500",
  },
  {
    category: "Frontend",
    items: ["HTML5", "CSS3", "React", "Tailwind CSS"],
    icon: CodeIcon,
    accent: "from-cyan-500 to-indigo-500",
  },
  {
    category: "AI / ML",
    items: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    icon: CpuIcon,
    accent: "from-purple-500 to-pink-500",
  },
  {
    category: "Tools & Environment",
    items: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Figma"],
    icon: LayersIcon,
    accent: "from-emerald-500 to-cyan-500",
  },
];

const learningItems = ["Next.js", "FastAPI", "PostgreSQL", "Docker"];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
          {"TECH STACK & CAPABILITIES"}
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight mb-4">
          SKILLS & TECHNOLOGIES
        </h2>
        <p className="text-zinc-400 max-w-xl text-base">
          Programming languages, AI/ML libraries, web frameworks, and software development tools I work with.
        </p>
      </div>

      {/* Main 4 Skill Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {skillGroups.map((group, idx) => {
          const IconComp = group.icon;
          return (
            <motion.div
              key={group.category}
              className="glass-panel-glow p-6 rounded-3xl relative group transition-all duration-300 flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
            >
              {/* Top Accent Gradient Line */}
              <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${group.accent} opacity-70 group-hover:opacity-100 transition-opacity duration-500`} />

              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <h3 className="text-base font-display font-bold uppercase text-white group-hover:text-indigo-300 transition-colors">
                    {group.category}
                  </h3>
                  <div className="p-2 rounded-xl bg-white/[0.04] text-indigo-400 group-hover:text-white transition-colors">
                    <IconComp size={20} />
                  </div>
                </div>

                <ul className="space-y-3">
                  {group.items.map((skill) => (
                    <li key={skill} className="flex items-center text-zinc-200 text-sm font-medium hover:text-white transition-colors">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 mr-3 shadow-[0_0_8px_#6366f1]" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Currently Learning Banner */}
      <motion.div
        className="glass-panel p-6 rounded-3xl border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <RocketIcon size={24} />
          </div>
          <div>
            <h3 className="text-lg font-display font-extrabold uppercase text-white tracking-wide">
              CURRENTLY LEARNING & EXPANDING
            </h3>
            <p className="text-xs font-mono text-cyan-300">
              Active Focus Areas & Next-Gen Technologies
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {learningItems.map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
