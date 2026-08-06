"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface TimelineStep {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: string;
  highlight?: boolean;
}

const timelineSteps: TimelineStep[] = [
  {
    year: "2024",
    title: "Started B.Tech IT at KTU",
    subtitle: "Computer Science & Engineering Foundations",
    description: "Enrolled in APJ Abdul Kalam Technological University (KTU). Mastered programming fundamentals in C, logic building, and algorithms.",
    tags: ["C Programming", "Logic Building", "Data Structures"],
    icon: "🎓",
  },
  {
    year: "2024",
    title: "Learned Web Foundations & Built First Apps",
    subtitle: "HTML5, CSS3 & Core JavaScript",
    description: "Dove into web technologies. Built interactive DOM projects, responsive UI layouts, and student utility scripts.",
    tags: ["HTML5", "CSS3", "JavaScript", "DOM Manipulation"],
    icon: "💻",
  },
  {
    year: "2025",
    title: "Stepped into React & Modern Frontend",
    subtitle: "Component Architecture & State Management",
    description: "Expanded frontend skill set with React 18, Tailwind CSS, component modularity, and modern JavaScript ES6+.",
    tags: ["React 18", "Tailwind CSS", "Git & GitHub", "UI/UX"],
    icon: "⚛️",
  },
  {
    year: "2025",
    title: "Machine Learning & Data Exploration",
    subtitle: "Python, Pandas & Scikit-learn",
    description: "Explored Artificial Intelligence and Data Science. Built a House Price Prediction ML model using regression algorithms.",
    tags: ["Python", "Pandas", "Scikit-learn", "Jupyter"],
    icon: "📊",
  },
  {
    year: "2025",
    title: "AI & Machine Learning Internship",
    subtitle: "Pluto Academy",
    description: "Selected as AI & Machine Learning Intern at Pluto Academy. Trained models on real-world datasets and performed exploratory data analysis.",
    tags: ["Pluto Academy", "ML Model Training", "Data Pipelines"],
    icon: "💼",
    highlight: true,
  },
  {
    year: "2026",
    title: "Architected CareerOS & KTU Tools",
    subtitle: "AI Career Platform & Activity Point Manager",
    description: "Built CareerOS (AI resume & interview prep suite) and Activity Point Manager (KTU point verification platform for 100 activity credits).",
    tags: ["CareerOS", "Activity Point Manager", "AI LLMs", "Node.js"],
    icon: "⭐",
    highlight: true,
  },
  {
    year: "2026",
    title: "Hackathons & Open Source Growth",
    subtitle: "Developer Sprints & Collaborative Coding",
    description: "Actively participating in college hackathons, building student productivity tools like BunkBuddy, and contributing to open-source.",
    tags: ["Hackathons", "Open Source", "BunkBuddy", "Next.js"],
    icon: "🚀",
  },
  {
    year: "2028 Target",
    title: "Aspiring AI & Software Engineer",
    subtitle: "Building Impactful Technical Products",
    description: "Working toward graduating as a top-tier B.Tech IT Engineer, ready to contribute to innovative software teams worldwide.",
    tags: ["AI Software Engineer", "Full Stack Dev", "System Design"],
    icon: "🎯",
  },
];

export default function JourneyTimeline() {
  return (
    <section id="journey" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
          {"MY EVOLUTION & ROADMAP"}
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight mb-4">
          JOURNEY TIMELINE
        </h2>
        <p className="text-zinc-400 text-base">
          From writing my first line of C code to building AI career tools and interning in Machine Learning.
        </p>
      </div>

      {/* Vertical Animated Timeline Grid */}
      <div className="relative max-w-4xl mx-auto">
        {/* Central Glowing Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-400 opacity-30 pointer-events-none" />

        <div className="space-y-12">
          {timelineSteps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={step.title}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                {/* Center Node Icon */}
                <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 w-10 h-10 rounded-full bg-[#07070a] border-2 border-indigo-500 flex items-center justify-center text-lg z-20 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                  {step.icon}
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  <div
                    className={`glass-panel p-6 rounded-3xl border ${
                      step.highlight ? 'border-indigo-500/50 glass-panel-glow' : 'border-white/10'
                    } hover:border-indigo-500/40 transition-colors`}
                  >
                    <div className={`flex items-center gap-2 mb-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                      <span className="px-3 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono text-xs font-bold uppercase">
                        {step.year}
                      </span>
                    </div>

                    <h3 className="text-lg font-display font-extrabold text-white uppercase tracking-wide mb-0.5">
                      {step.title}
                    </h3>
                    <span className="text-xs font-mono text-cyan-300 font-semibold block mb-3">
                      {step.subtitle}
                    </span>

                    <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                      {step.description}
                    </p>

                    <div className={`flex flex-wrap gap-1.5 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                      {step.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-zinc-300 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
