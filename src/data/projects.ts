export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI / ML' | 'Full Stack' | 'Web App' | 'Student Tool';
  description: string;
  longDescription: string;
  technologies: string[];
  features?: string[];
  tags?: string[];
  gradient: string;
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "stylespot-clothing-template",
    title: "StyleSpot — Clothing Store & CMS Template",
    subtitle: "Full-Stack Fashion E-Commerce & Supabase Admin CMS Ecosystem",
    category: "Full Stack",
    featured: true,
    gradient: "from-amber-950/70 via-rose-950/50 to-purple-950/60",
    imageUrl: "/images/dotme-preview.jpg",
    description: "A full-stack SSR clothing store storefront & CMS template featuring direct WhatsApp 1-click ordering, real-time Supabase inventory management, and click analytics.",
    longDescription: "Architected using TanStack Start (SSR), React 19, Tailwind CSS v4, and Supabase. Features a dynamic fashion product catalog with stock status badging, direct WhatsApp order generator with customization payload (size, color, price), role-protected admin dashboard with image uploads to Supabase Storage, real-time store settings editor, and Schema.org local SEO optimization.",
    technologies: ["TanStack Start", "React 19", "TypeScript", "Supabase", "Tailwind CSS v4", "Vercel"],
    tags: ["TanStack Start", "React 19", "TypeScript", "Supabase", "Tailwind CSS v4", "Vercel"],
    features: [
      "1-Click Conversational Commerce with Dynamic WhatsApp Order Payload",
      "Real-Time Supabase PostgreSQL Database & Row-Level Security (RLS)",
      "Role-Protected Admin CMS Dashboard for Product & Category CRUD",
      "Supabase Storage Integration for High-Res Catalog Image Uploads",
      "WhatsApp Enquiry Click Analytics & Popular Item Tracking",
      "Local SEO Optimization with JSON-LD ClothingStore Schema.org",
    ],
    metrics: [
      { label: "Architecture", value: "TanStack Start SSR" },
      { label: "Backend", value: "Supabase + RLS Auth" },
      { label: "Commerce Engine", value: "WhatsApp Direct Sync" },
    ],
    liveUrl: "https://dotme-style-spot-c0233a21.vercel.app/",
    githubUrl: "https://github.com/Ameersuhail799/dotme-style-spot-c0233a21.git",
  },
  {
    id: "careeros",
    title: "CareerOS",
    subtitle: "AI Student Placement Suite & ATS Resume Optimization Ecosystem",
    category: "AI / ML",
    featured: true,
    gradient: "from-indigo-900/60 via-purple-900/40 to-cyan-900/50",
    imageUrl: "/images/careeros-preview.png",
    description: "Full-stack career preparation platform for engineering students featuring 24/7 AI career coaching, ATS resume scoring, AI mock interviews, career roadmaps, and LinkedIn optimization.",
    longDescription: "CareerOS is a comprehensive AI platform built solo from scratch. It features a resilient dual-engine AI architecture (Anthropic Claude API + rule-based Mock Engine fallback), anonymous Supabase RLS security, structure-aware ATS parsing, interactive 5-template resume builder with PDF export, and instant Guest Mode access.",
    technologies: ["Next.js 14", "React 18", "TypeScript", "Supabase", "Claude AI API", "Tailwind CSS"],
    tags: ["Next.js 14", "React 18", "TypeScript", "Supabase", "Claude AI API", "Tailwind CSS"],
    features: [
      "AI Career Coach with 24/7 Context-Aware Assistance",
      "ATS Resume Checker with Match Scoring & Keyword Gap Analysis",
      "AI Interview Prep with STAR-Method Model Answers",
      "Interactive 5-Template Resume Builder with PDF Export",
      "Guest Login Mode backed by Supabase Anonymous Auth & RLS",
    ],
    metrics: [
      { label: "Live App", value: "Instant Guest Mode" },
      { label: "Architecture", value: "Next.js 14 + Supabase" },
      { label: "AI Engine", value: "Claude API + Mock Fallback" },
    ],
    liveUrl: "https://careeros-azure.vercel.app/",
    githubUrl: "https://github.com/Ameersuhail799/careeros.git",
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    subtitle: "Interactive Cyber-Luxury Developer Portfolio & Personal Brand",
    category: "Web App",
    featured: true,
    gradient: "from-indigo-950/80 via-purple-950/50 to-black",
    imageUrl: "/images/portfolio-preview.png",
    description: "A high-performance interactive developer portfolio featuring Kinetic Grid mouse physics, custom glassmorphism design system, automated UNFOLD intro engine, and interactive Git Commit timeline.",
    longDescription: "Architected solo from scratch using Next.js 14, React 18, TypeScript, and Tailwind CSS. Designed to deliver an immersive storytelling experience for recruiters while reflecting an authentic B.Tech IT engineer identity. Features custom HTML5 Canvas physics, dark mode glassmorphism, Framer Motion micro-interactions, responsive mobile viewports, and automated Vercel CI/CD deployment.",
    technologies: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    tags: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    features: [
      "Automated 3.2s UNFOLD 4-Scene Wireframe Intro Engine",
      "Interactive Developer Git Commit Tree Journey Timeline",
      "Real-Time Kinetic Mouse Mesh Canvas Physics Engine",
      "Custom Glassmorphism Design System & HSL Color Tokens",
      "Automated Vercel CI/CD Pipeline & GitHub Sync",
    ],
    metrics: [
      { label: "Performance", value: "100 Lighthouse" },
      { label: "Architecture", value: "Next.js 14 App Router" },
      { label: "Design System", value: "Cyber-Glassmorphism" },
    ],
    liveUrl: "https://ameer-portfolio.vercel.app/",
    githubUrl: "https://github.com/Ameersuhail799/ameer-portfolio.git",
  },
  {
    id: "activity-point-manager",
    title: "Activity Point Manager",
    subtitle: "KTU 100 Activity Points Credit Verification & Tracking Web App",
    category: "Full Stack",
    featured: true,
    gradient: "from-purple-900/60 via-indigo-900/40 to-cyan-950/60",
    description: "A centralized web platform for KTU students and faculty admins to record, categorize, and verify the mandatory 100 activity credit points.",
    longDescription: "Under APJ Abdul Kalam Technological University (KTU), every B.Tech student must earn 100 activity points across sports, cultural events, hackathons, and social initiatives. Activity Point Manager simplifies this process with certificate uploads, credit calculations, status tracking, and admin verification dashboards.",
    technologies: ["JavaScript ES6+", "React", "Node.js", "Express", "MongoDB"],
    tags: ["JavaScript ES6+", "React", "Node.js", "Express", "MongoDB"],
    features: [
      "Automated KTU 100 Activity Credit Calculation",
      "Student Certificate Upload & Category Tagging",
      "Faculty Admin Review & Verification Dashboard",
    ],
    metrics: [
      { label: "University Target", value: "KTU B.Tech" },
      { label: "Required Credits", value: "100 Points" },
      { label: "Core Benefit", value: "Automated Credit Calc" },
    ],
    liveUrl: "https://github.com/Ameersuhail799/ameer-portfolio.git",
    githubUrl: "https://github.com/Ameersuhail799/ameer-portfolio.git",
  },
  {
    id: "house-price-prediction",
    title: "House Price Prediction ML Model",
    subtitle: "Machine Learning Regression Valuation & Feature Analysis",
    category: "AI / ML",
    featured: true,
    gradient: "from-cyan-950/70 via-indigo-950/50 to-purple-950/60",
    description: "A predictive machine learning regression model trained to estimate property market values based on spatial, structural, and historical feature datasets.",
    longDescription: "Developed using Python's data science stack, this project applies exploratory data analysis (EDA), data cleaning, feature engineering, and multiple regression algorithms (Linear Regression, Random Forest) to predict residential property prices with mathematical precision.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    tags: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    features: [
      "Supervised ML Regression & Random Forest Training",
      "Exploratory Data Analysis & Correlation Heatmaps",
      "Automated Data Cleaning & Feature Scaling Pipeline",
    ],
    metrics: [
      { label: "Model Type", value: "Supervised ML" },
      { label: "Data Stack", value: "Pandas & Scikit-learn" },
      { label: "Analysis", value: "Correlation Heatmaps" },
    ],
    liveUrl: "https://github.com/Ameersuhail799/ameer-portfolio.git",
    githubUrl: "https://github.com/Ameersuhail799/ameer-portfolio.git",
  },
  {
    id: "bunkbuddy",
    title: "BunkBuddy Attendance App",
    subtitle: "Student Attendance Tracking & Safe Bunk Calculator Utility",
    category: "Student Tool",
    featured: false,
    gradient: "from-slate-900 via-indigo-950/60 to-purple-950/70",
    description: "A practical student attendance calculator that computes safe class bunks while maintaining target percentage requirements.",
    longDescription: "BunkBuddy helps college students monitor class attendance records per subject, calculating how many upcoming classes can be safely skipped or how many mandatory classes must be attended to meet minimum percentage criteria.",
    technologies: ["JavaScript ES6+", "HTML5 / CSS3", "Local Storage", "Tailwind CSS"],
    tags: ["JavaScript ES6+", "HTML5 / CSS3", "Local Storage", "Tailwind CSS"],
    features: [
      "Subject-wise Attendance & Bunk Margin Calculator",
      "75% Mandatory Credit Percentage Target Indicator",
      "Offline Browser Local Storage Persistence",
    ],
    metrics: [
      { label: "Target Criteria", value: "75% Minimum Attendance" },
      { label: "Utility", value: "Safe Bunk Calculator" },
      { label: "Storage", value: "Offline Local Storage" },
    ],
    liveUrl: "https://github.com/Ameersuhail799/ameer-portfolio.git",
    githubUrl: "https://github.com/Ameersuhail799/ameer-portfolio.git",
  },
];
