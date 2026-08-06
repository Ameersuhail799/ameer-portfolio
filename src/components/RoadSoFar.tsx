"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCapIcon,
  CodeIcon,
  TerminalIcon,
  BarChartIcon,
  BriefcaseIcon,
  RocketIcon,
  TrophyIcon,
  TargetIcon,
} from '@/components/ui/Icons';

interface GitCommitMilestone {
  id: string;
  hash: string;
  branch: 'main' | 'feat/ai-ml' | 'feat/apps' | 'release/vision';
  branchColor: string;
  theme: string;
  year: string;
  title: string;
  story: string;
  tags: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  highlight?: boolean;
}

const gitMilestones: GitCommitMilestone[] = [
  {
    id: "1",
    hash: "c0m1t-2024a",
    branch: "main",
    branchColor: "#38bdf8", // Cyan
    theme: "Curiosity",
    year: "2024",
    title: "Logic & CS Foundations",
    story: "My journey started at APJ Abdul Kalam Technological University (KTU). I discovered a passion for solving algorithmic logic puzzles and understanding computer engineering fundamentals in C.",
    tags: ["C Language", "Logic Building", "KTU"],
    icon: GraduationCapIcon,
  },
  {
    id: "2",
    hash: "c0m1t-2024b",
    branch: "main",
    branchColor: "#38bdf8",
    theme: "Foundations",
    year: "2024",
    title: "Crafting for the Web",
    story: "The browser became my primary canvas. I learned to turn static ideas into interactive web tools, mastering HTML5, CSS3, and core JavaScript DOM manipulation.",
    tags: ["HTML5", "CSS3", "JavaScript ES6+"],
    icon: CodeIcon,
  },
  {
    id: "3",
    hash: "c0m1t-2025a",
    branch: "main",
    branchColor: "#38bdf8",
    theme: "Modern Engineering",
    year: "2025",
    title: "React & Scalable Systems",
    story: "Stepped into modern frontend architecture with React 18 and Tailwind CSS. Focused on component modularity, state management, and professional Git collaboration workflows.",
    tags: ["React 18", "Tailwind CSS", "Git"],
    icon: TerminalIcon,
  },
  {
    id: "4",
    hash: "feat-2025b",
    branch: "feat/ai-ml",
    branchColor: "#c084fc", // Purple
    theme: "AI & Data Science",
    year: "2025",
    title: "Machine Learning Models",
    story: "Dove into Artificial Intelligence in Python. Built a House Price Prediction ML model using Scikit-learn regression pipelines, Pandas data cleaning, and correlation heatmaps.",
    tags: ["Python", "Scikit-learn", "Pandas"],
    icon: BarChartIcon,
  },
  {
    id: "5",
    hash: "feat-2025c",
    branch: "feat/ai-ml",
    branchColor: "#c084fc",
    theme: "Real-World Experience",
    year: "2025",
    title: "AI/ML Internship @ Pluto Academy",
    story: "Selected for an AI & Machine Learning internship at Pluto Academy. Preprocessed real-world datasets, trained ML models, and explored production AI concepts.",
    tags: ["Pluto Academy", "AI/ML Internship"],
    icon: BriefcaseIcon,
    highlight: true,
  },
  {
    id: "6",
    hash: "feat-2026a",
    branch: "feat/apps",
    branchColor: "#818cf8", // Indigo
    theme: "Flagship Products",
    year: "2026",
    title: "Architecting CareerOS & KTU Tools",
    story: "Architected CareerOS — an AI student placement platform with ATS resume scoring and interview prep — alongside Activity Point Manager for KTU students and faculty admins.",
    tags: ["CareerOS", "KTU Credit Manager", "Next.js"],
    icon: RocketIcon,
    highlight: true,
  },
  {
    id: "7",
    hash: "feat-2026b",
    branch: "feat/apps",
    branchColor: "#818cf8",
    theme: "Open Source Growth",
    year: "2026",
    title: "Hackathons & Community Tools",
    story: "Participated in college hackathons, engineered student productivity software like BunkBuddy, and actively contributed to developer open-source repositories.",
    tags: ["Hackathons", "BunkBuddy App", "Open Source"],
    icon: TrophyIcon,
  },
  {
    id: "8",
    hash: "release-v2028",
    branch: "release/vision",
    branchColor: "#34d399", // Emerald
    theme: "Future Vision",
    year: "2028 TARGET",
    title: "Aspiring AI & Software Engineer",
    story: "Continuously growing into a top-tier B.Tech IT engineer who seamlessly blends Artificial Intelligence with scalable full-stack software architecture to solve complex global challenges.",
    tags: ["AI Software Engineer", "Full Stack Dev"],
    icon: TargetIcon,
    highlight: true,
  },
];

export default function RoadSoFar() {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [expandedCommit, setExpandedCommit] = useState<string | null>("6");

  const filteredMilestones = gitMilestones.filter(
    (item) => selectedBranch === 'all' || item.branch === selectedBranch
  );

  return (
    <section id="journey" className="py-20 px-4 md:px-8 max-w-6xl mx-auto relative z-10">
      {/* Ambient Lighting Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[450px] h-[450px] bg-cyan-600/15 rounded-full blur-[140px]" />
      </div>

      {/* Section Header */}
      <div className="mb-12 text-center max-w-xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
          {"GIT COMMIT TIMELINE"}
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight mb-3">
          JOURNEY LOG
        </h2>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-normal">
          Interactive developer commit tree. Click any commit node to inspect changes & milestones.
        </p>

        {/* Branch Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {[
            { id: 'all', label: 'All Branches', color: '#ffffff' },
            { id: 'main', label: 'main', color: '#38bdf8' },
            { id: 'feat/ai-ml', label: 'feat/ai-ml', color: '#c084fc' },
            { id: 'feat/apps', label: 'feat/apps', color: '#818cf8' },
            { id: 'release/vision', label: 'release/vision', color: '#34d399' },
          ].map((branch) => (
            <button
              key={branch.id}
              onClick={() => setSelectedBranch(branch.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-300 flex items-center gap-2 border ${
                selectedBranch === branch.id
                  ? 'bg-zinc-800 text-white border-white/30 shadow-lg scale-105'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: branch.color }}
              />
              {branch.label}
            </button>
          ))}
        </div>
      </div>

      {/* Git Commit Tree Container */}
      <div className="relative max-w-4xl mx-auto z-10">
        {/* Main Git Trunk Vertical Rail Line */}
        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-cyan-400 via-indigo-500 to-emerald-400 rounded-full opacity-40 pointer-events-none" />

        {/* Commit Nodes List */}
        <div className="space-y-6">
          {filteredMilestones.map((item, idx) => {
            const IconComp = item.icon;
            const isExpanded = expandedCommit === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                className="relative"
              >
                {/* Commit Line Row */}
                <div
                  onClick={() => setExpandedCommit(isExpanded ? null : item.id)}
                  className={`cursor-pointer group flex items-center justify-between p-4 md:p-5 rounded-2xl border transition-all duration-300 ${
                    isExpanded
                      ? 'bg-indigo-950/80 border-indigo-500/60 shadow-[0_15px_35px_rgba(99,102,241,0.25)]'
                      : 'bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/90'
                  }`}
                >
                  {/* Left Metadata Info */}
                  <div className="flex items-center gap-3 md:gap-4">
                    <div
                      className="w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-white transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${item.branchColor}20`,
                        borderColor: item.branchColor,
                        color: item.branchColor,
                        boxShadow: isExpanded ? `0 0 16px ${item.branchColor}60` : 'none',
                      }}
                    >
                      <IconComp size={18} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded border uppercase"
                          style={{
                            backgroundColor: `${item.branchColor}15`,
                            borderColor: `${item.branchColor}40`,
                            color: item.branchColor,
                          }}
                        >
                          git: {item.branch}
                        </span>
                        <span className="text-xs font-mono font-bold text-zinc-400">
                          {item.hash}
                        </span>
                        <span className="text-xs font-mono font-bold text-cyan-300">
                          • {item.year}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-display font-extrabold text-white uppercase tracking-tight group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right Status Badge */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-indigo-400 font-medium hidden sm:inline-block">
                      {isExpanded ? 'Collapse [-]' : 'Inspect [+]'}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                      <span className="text-xs font-mono font-bold">{isExpanded ? '−' : '+'}</span>
                    </div>
                  </div>
                </div>

                {/* Expanded Commit Details Terminal Panel */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="glass-panel p-6 rounded-2xl border border-indigo-500/40 bg-[#090a14]/95 shadow-2xl relative">
                        {/* Terminal Header Bar */}
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono text-zinc-400">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            <span className="ml-2 text-zinc-300 font-semibold">
                              commit_details.log — @ameersuhail799
                            </span>
                          </div>
                          <span className="text-cyan-400 font-bold">{item.theme}</span>
                        </div>

                        {/* Narrative Story */}
                        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 font-normal">
                          {item.story}
                        </p>

                        {/* Changed Features / Tags */}
                        <div className="pt-3 border-t border-white/10 space-y-2">
                          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest block font-semibold">
                            COMMITTED MODULES & STACK:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/25 text-xs font-mono text-indigo-300 font-semibold"
                              >
                                + {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
