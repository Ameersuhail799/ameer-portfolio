"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  GmailLogo,
  LinkedinLogo,
  GithubLogo,
  WhatsappLogo,
  InstagramLogo,
  DocumentIcon,
  MapPinIcon,
} from '@/components/ui/Icons';

interface ContactRowItem {
  id: string;
  name: string;
  actionTitle: string;
  value: string;
  meta: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  gradientHover: string;
}

const contactRows: ContactRowItem[] = [
  {
    id: "gmail",
    name: "Email Me",
    actionTitle: "Direct Inbox",
    value: "ameersuhail81570@gmail.com",
    meta: "Usually replies within 24 hours",
    href: "mailto:ameersuhail81570@gmail.com",
    icon: GmailLogo,
    gradientHover: "hover:border-indigo-500/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]",
  },
  {
    id: "linkedin",
    name: "Let's Connect",
    actionTitle: "LinkedIn Network",
    value: "linkedin.com/in/Ameersuhail799",
    meta: "Professional networking & opportunities",
    href: "https://www.linkedin.com/in/Ameersuhail799",
    icon: LinkedinLogo,
    gradientHover: "hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]",
  },
  {
    id: "github",
    name: "Explore My Code",
    actionTitle: "GitHub Repositories",
    value: "github.com/ameersuhail799",
    meta: "Projects & Open Source Activity",
    href: "https://github.com/ameersuhail799",
    icon: GithubLogo,
    gradientHover: "hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]",
  },
  {
    id: "whatsapp",
    name: "Chat With Me",
    actionTitle: "Instant Messaging",
    value: "+91 7994329457",
    meta: "Quick conversations & inquiries",
    href: "https://wa.me/917994329457",
    icon: WhatsappLogo,
    gradientHover: "hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]",
  },
  {
    id: "instagram",
    name: "Follow My Journey",
    actionTitle: "Social Updates",
    value: "@_ame._r._",
    meta: "Behind the scenes & tech updates",
    href: "https://instagram.com/_ame._r._",
    icon: InstagramLogo,
    gradientHover: "hover:border-pink-500/50 hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]",
  },
  {
    id: "resume",
    name: "View Resume",
    actionTitle: "Curriculum Vitae",
    value: "Ameer_Suhail_Resume.pdf",
    meta: "Latest verified PDF version",
    href: "/resume.pdf",
    icon: DocumentIcon,
    gradientHover: "hover:border-indigo-400/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-4 md:px-8 max-w-5xl mx-auto relative z-10 text-center">
      {/* Background Lighting Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 rounded-full blur-[150px]" />
      </div>

      {/* Top Eyebrow */}
      <motion.div
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-6 shadow-lg relative z-10"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        {"LET'S TALK"}
      </motion.div>

      {/* Main Closing Heading */}
      <motion.h2
        className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase text-white tracking-tight leading-[1.05] max-w-3xl mx-auto mb-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        LET&apos;S BUILD SOMETHING <br className="hidden sm:inline" />
        <span className="text-gradient-electric">MEANINGFUL TOGETHER.</span>
      </motion.h2>

      {/* Short Story Description */}
      <motion.p
        className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed font-normal mb-10 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Whether it&apos;s a software engineering internship, AI project collaboration, hackathon, or simply discussing ideas... I&apos;d love to hear from you.
      </motion.p>

      {/* Primary CTA Button */}
      <motion.div
        className="mb-14 relative z-10"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.a
          href="mailto:ameersuhail81570@gmail.com"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-display font-bold text-xs uppercase tracking-widest shadow-[0_0_35px_rgba(99,102,241,0.45)] hover:shadow-[0_0_50px_rgba(139,92,246,0.65)] transition-all duration-300"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>START A CONVERSATION</span>
          <span className="text-sm">&rarr;</span>
        </motion.a>
      </motion.div>

      {/* Clean Profile Identity Bar */}
      <motion.div
        className="max-w-2xl mx-auto glass-panel p-4 px-6 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4 mb-14 text-left relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <img
            src="/gallery/ameerpic~2.jpeg"
            alt="Ameer Suhail"
            className="w-11 h-11 rounded-full object-cover border border-indigo-500/40 shadow-md"
          />
          <div>
            <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
              AMEER SUHAIL
            </h3>
            <span className="text-[11px] font-mono text-zinc-400">
              AI/ML • Full Stack Development
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Open to Opportunities
          </span>
          <span className="text-zinc-400 flex items-center gap-1">
            <MapPinIcon size={14} className="text-emerald-400" /> India
          </span>
        </div>
      </motion.div>

      {/* ELEGANT HORIZONTAL INTERACTIVE CONTACT ROWS */}
      <div className="space-y-3.5 max-w-4xl mx-auto text-left relative z-10 mb-20">
        {contactRows.map((row, idx) => {
          const IconComponent = row.icon;
          return (
            <motion.a
              key={row.id}
              href={row.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 ${row.gradientHover} transition-all duration-300 flex items-center justify-between group cursor-pointer`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              whileHover={{ x: 4, scale: 1.01 }}
            >
              {/* Left Side: SVG Logo & Info */}
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-indigo-500/40 group-hover:scale-110 transition-all duration-300 shrink-0">
                  <IconComponent size={20} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm sm:text-base font-display font-extrabold uppercase text-white group-hover:text-indigo-300 transition-colors tracking-tight truncate">
                      {row.name}
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
                      • {row.actionTitle}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-indigo-400 font-semibold truncate">
                    {row.value}
                  </p>
                </div>
              </div>

              {/* Right Side: Meta Info & Sliding Arrow */}
              <div className="flex items-center gap-4 shrink-0 pl-2">
                <span className="text-xs font-mono text-zinc-400 hidden md:inline-block">
                  {row.meta}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-indigo-500/50 group-hover:translate-x-1.5 transition-all">
                  &rarr;
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Closing Quote Banner */}
      <motion.div
        className="mb-16 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-mono text-indigo-300 uppercase tracking-widest font-semibold mb-3">
          &quot;Thanks for visiting. Hope we build something amazing together.&quot;
        </p>
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto" />
      </motion.div>

      {/* MINIMAL ELEGANT FOOTER */}
      <footer className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 relative z-10">
        <div>
          <span className="block text-zinc-300 font-bold uppercase tracking-wider mb-0.5">
            Designed & Developed by Ameer Suhail
          </span>
          <span className="text-[10px] text-zinc-400">
            Made with React • TypeScript • Tailwind CSS • Framer Motion
          </span>
        </div>

        <div className="text-right text-[11px] uppercase tracking-widest text-zinc-400">
          Copyright © {new Date().getFullYear()} Ameer Suhail. All Rights Reserved.
        </div>
      </footer>
    </section>
  );
}
