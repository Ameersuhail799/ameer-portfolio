"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from '@/data/projects';

export default function ProjectShowcaseSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="showcase" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      <div id="works" className="scroll-mt-24" />
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
            {"FEATURED PRODUCTS & APPLICATIONS"}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
            PROJECT SHOWCASE
          </h2>
        </div>
        <p className="text-zinc-400 text-sm md:text-base max-w-md mt-4 md:mt-0 leading-relaxed font-normal">
          A spacious showcase of flagship web applications, AI models, and high-performance engineering builds.
        </p>
      </div>

      {/* Spacious 2x2 Project Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            className="glass-panel-glow rounded-3xl p-6 md:p-8 flex flex-col relative group cursor-pointer border border-white/10 hover:border-indigo-500/50 transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.12 }}
            whileHover={{ y: -8 }}
            onClick={() => setActiveProject(project)}
          >
            {/* Top Glass Browser Mockup Frame with Real Screenshot / Image Preview */}
            <div className="w-full aspect-[16/10] rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden mb-8 flex flex-col relative group-hover:border-indigo-500/40 transition-colors shadow-2xl">
              {/* Browser Header Bar */}
              <div className="w-full h-9 bg-zinc-900/90 border-b border-white/10 px-4 flex items-center justify-between z-20">
                {/* 3 Control Dots */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                {/* Mock URL Bar */}
                <div className="px-4 py-1 rounded-md bg-black/60 border border-white/10 text-[10px] font-mono text-zinc-400 font-medium tracking-wider truncate max-w-[200px]">
                  https://{project.title.toLowerCase().replace(/\s+/g, '')}.app
                </div>
                <div className="text-[10px] font-mono text-indigo-400 font-bold">
                  LIVE APP
                </div>
              </div>

              {/* Real Project Screenshot OR Dynamic Gradient Canvas */}
              {project.imageUrl ? (
                <div className="relative w-full flex-1 overflow-hidden group">
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} Interface Screenshot`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-indigo-500/40 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest shadow-lg">
                      REAL INTERFACE PREVIEW
                    </span>
                  </div>
                </div>
              ) : (
                <div className={`w-full flex-1 bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700`}>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest">
                      FLAGSHIP {project.id}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white text-base">
                      ⚡
                    </div>
                  </div>

                  {/* Center Title Graphic */}
                  <div className="z-10 my-auto text-left py-4">
                    <span className="text-[11px] font-mono text-indigo-300 font-bold uppercase tracking-widest block mb-1">
                      {project.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-white tracking-wide">
                      {project.title}
                    </h3>
                  </div>

                  {/* Decorative Subtle Corner Accents */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                </div>
              )}
            </div>

            {/* Content Info */}
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest">
                  {project.subtitle}
                </span>
              </div>

              <h3 className="text-2xl font-display font-extrabold uppercase text-white mb-3 group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              {/* Feature Highlights Checklist */}
              {project.features && project.features.length > 0 && (
                <div className="space-y-2 mb-6 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  {project.features.map((feat) => (
                    <div key={feat} className="flex items-center text-xs font-medium text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 shadow-[0_0_8px_#06b6d4]" />
                      {feat}
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {(project.tags || project.technologies).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold text-zinc-300 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full group-hover:border-indigo-500/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                <button
                  type="button"
                  className="text-xs font-display font-bold uppercase tracking-widest text-indigo-400 group-hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>Inspect Details & Photo</span>
                  <span className="text-sm">&rarr;</span>
                </button>

                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 rounded-xl bg-indigo-600/30 border border-indigo-500/50 text-white text-xs font-bold uppercase tracking-wider hover:bg-indigo-600 transition-colors"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Modal for Detailed Inspection */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 glass-panel p-6 sm:p-10 shadow-2xl text-left cursor-default my-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-zinc-900 border border-white/20 text-white font-bold flex items-center justify-center hover:bg-indigo-600 transition-colors z-30"
                onClick={() => setActiveProject(null)}
              >
                ✕
              </button>

              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest block mb-2">
                {activeProject.subtitle}
              </span>

              <h3 className="text-3xl font-display font-black uppercase text-white mb-4">
                {activeProject.title}
              </h3>

              {/* Modal Real Screenshot Section */}
              {activeProject.imageUrl && (
                <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-indigo-500/30 mb-6 shadow-2xl relative group">
                  <img
                    src={activeProject.imageUrl}
                    alt={`${activeProject.title} Interface Screenshot`}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                    REAL APPLICATION DASHBOARD INTERFACE
                  </div>
                </div>
              )}

              <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 font-normal">
                {activeProject.longDescription || activeProject.description}
              </p>

              {activeProject.features && activeProject.features.length > 0 && (
                <div className="mb-6 bg-white/[0.02] p-5 rounded-2xl border border-white/10">
                  <h4 className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider mb-3">
                    KEY TECHNICAL FEATURES & ARCHITECTURE:
                  </h4>
                  <ul className="space-y-2">
                    {activeProject.features.map((f) => (
                      <li key={f} className="text-xs sm:text-sm text-zinc-300 flex items-center gap-2.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-8">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  TECH STACK & LIBRARIES:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(activeProject.tags || activeProject.technologies || []).map((t) => (
                    <span key={t} className="px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-300 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-display font-bold uppercase tracking-wider shadow-lg hover:shadow-indigo-500/50 transition-all"
                  >
                    Open Live App ↗
                  </a>
                )}
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl border border-white/20 bg-zinc-900 text-zinc-300 text-xs font-display font-bold uppercase tracking-wider hover:text-white hover:border-indigo-500/50 transition-all"
                  >
                    View Source Code
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
