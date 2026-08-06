"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
            {"PORTFOLIO & WORK"}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
            FEATURED PROJECTS
          </h2>
        </div>
        <p className="text-zinc-400 text-sm md:text-base max-w-md mt-4 md:mt-0 leading-relaxed font-normal">
          A showcase of student productivity platforms, AI models, and full-stack web applications.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            className="glass-panel-glow rounded-3xl overflow-hidden flex flex-col group border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
          >
            {/* Visual Header / Banner */}
            <div className={`h-48 bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-between relative overflow-hidden`}>
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/80 bg-black/40 border border-white/10 px-2.5 py-1 rounded-md">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/20 border border-indigo-500/40 px-2.5 py-1 rounded-md">
                    Featured
                  </span>
                )}
              </div>

              <span className="text-xs uppercase font-mono text-indigo-300 font-bold tracking-wider z-10">
                {project.title} DEMO
              </span>

              {/* Decorative Corner Accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-indigo-500/50" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-indigo-500/50" />
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-display font-extrabold uppercase text-white mb-2 group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold text-zinc-300 bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-full group-hover:border-indigo-500/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 text-xs font-display font-bold uppercase tracking-widest mt-auto">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-indigo-400 transition-colors flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Live Demo</span>
                    <span>&rarr;</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
