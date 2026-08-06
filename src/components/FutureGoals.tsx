"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CpuIcon, RocketIcon, LayersIcon, CompassIcon } from '@/components/ui/Icons';

interface GoalItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  status: string;
}

const futureGoals: GoalItem[] = [
  {
    id: "1",
    title: "Become an AI Software Engineer",
    category: "Career Milestone",
    description: "Combine AI/ML model deployment with scalable full-stack web architecture to build production-grade intelligent software.",
    icon: CpuIcon,
    status: "Active Pursuit",
  },
  {
    id: "2",
    title: "Build Impactful Technical Products",
    category: "Product Vision",
    description: "Continue architecting real-world tools like CareerOS and Activity Point Manager that streamline workflows for students and developers.",
    icon: RocketIcon,
    status: "Ongoing",
  },
  {
    id: "3",
    title: "Master System Design & Backend",
    category: "Technical Growth",
    description: "Deepen expertise in FastAPI, PostgreSQL, Docker containerization, microservices, and high-concurrency backend design.",
    icon: LayersIcon,
    status: "In Progress",
  },
  {
    id: "4",
    title: "Contribute to Open Source Repositories",
    category: "Community",
    description: "Collaborate on developer tooling, React/Next.js UI components, and open AI libraries to give back to the tech ecosystem.",
    icon: CompassIcon,
    status: "Planned",
  },
];

export default function FutureGoals() {
  return (
    <section id="future-goals" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="mb-14 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
          {"WHERE I'M HEADING"}
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight mb-4">
          FUTURE GOALS & ASPIRATIONS
        </h2>
        <p className="text-zinc-400 text-base">
          Inspiring yet realistic milestones I am actively working toward as a student software engineer.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {futureGoals.map((goal, idx) => {
          const IconComp = goal.icon;
          return (
            <motion.div
              key={goal.id}
              className="glass-panel-glow p-6 md:p-8 rounded-3xl relative group hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                    {goal.category}
                  </span>
                  <span className="text-xs font-mono text-cyan-300 font-bold uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    {goal.status}
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-3">
                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-indigo-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <IconComp size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                      {goal.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {goal.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
