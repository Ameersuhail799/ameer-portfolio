"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AwardIcon, TrophyIcon, CpuIcon, ZapIcon } from '@/components/ui/Icons';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  description: string;
  badgeColor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const certificates: Certificate[] = [
  {
    id: "1",
    title: "NASSCOM Professional Certifications",
    issuer: "NASSCOM FutureSkills Prime",
    date: "2025 - 2026",
    category: "AI & Software Engineering",
    description: "Industry-recognized certification covering core software development, emerging AI tech, and digital fluency.",
    badgeColor: "border-indigo-500/40 text-indigo-300 bg-indigo-500/10",
    icon: AwardIcon,
  },
  {
    id: "2",
    title: "IBM Technical Certificates",
    issuer: "IBM SkillsBuild",
    date: "2025",
    category: "AI & Machine Learning",
    description: "Practical training in Artificial Intelligence fundamentals, data science methodologies, and enterprise tech workflows.",
    badgeColor: "border-cyan-500/40 text-cyan-300 bg-cyan-500/10",
    icon: TrophyIcon,
  },
  {
    id: "3",
    title: "AI Frameworks for Developers",
    issuer: "Professional AI Learning",
    date: "2025",
    category: "Machine Learning & Neural Nets",
    description: "Specialized training on implementing machine learning frameworks, data preprocessing, and model evaluation.",
    badgeColor: "border-purple-500/40 text-purple-300 bg-purple-500/10",
    icon: CpuIcon,
  },
  {
    id: "4",
    title: "LearnTube Skill Certifications",
    issuer: "LearnTube by CareerNinja",
    date: "2025",
    category: "Full Stack & Web Tech",
    description: "Hands-on certificates validating web development, modern frontend tools, and programming fundamentals.",
    badgeColor: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
    icon: ZapIcon,
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
          {"CREDENTIALS & ACADEMIC CERTIFICATIONS"}
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight mb-4">
          CERTIFICATES & QUALIFICATIONS
        </h2>
        <p className="text-zinc-400 max-w-xl text-base">
          Verified certifications and technical training completed to continuously sharpen engineering and AI capabilities.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert, idx) => {
          const IconComp = cert.icon;
          return (
            <motion.div
              key={cert.id}
              className="glass-panel-glow p-6 md:p-8 rounded-3xl relative group hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
            >
              {/* Top Bar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider ${cert.badgeColor}`}>
                    {cert.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">{cert.date}</span>
                </div>

                <div className="flex items-start gap-4 mb-3">
                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-indigo-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <IconComp size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <span className="text-xs font-mono text-cyan-300 font-semibold uppercase tracking-wider">
                      {cert.issuer}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                  {cert.description}
                </p>
              </div>

              {/* Bottom Verified Pill */}
              <div className="pt-4 border-t border-white/10 mt-6 flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified Certificate
                </span>
                <span className="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                  Official Credential &rarr;
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
