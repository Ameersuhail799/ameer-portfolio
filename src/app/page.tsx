import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectShowcaseSection from '@/components/ProjectShowcaseSection';
import About from '@/components/About';
import RoadSoFar from '@/components/RoadSoFar';
import Skills from '@/components/Skills';
import Certificates from '@/components/Certificates';
import GitHubAchievements from '@/components/GitHubAchievements';
import ValueProposition from '@/components/ValueProposition';
import FutureGoals from '@/components/FutureGoals';
import Contact from '@/components/Contact';
import IntroScreen from '@/components/IntroScreen';
import ScrollProgressBar from '@/components/ScrollProgressBar';

const KineticGrid = dynamic(() => import('@/components/KineticGrid'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#07070a] text-white selection:bg-indigo-600/40 selection:text-white overflow-x-hidden">
      {/* Top Fixed Ambient Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Full-Screen Splash Intro Overlay */}
      <IntroScreen />

      {/* Kinetic Grid Interactive Background Layer with Dense Fine Mesh Spacing */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <KineticGrid
          background="transparent"
          dotColor="#ffffff"
          lineColor="#818cf8"
          trailColor="#c084fc"
          spacing={22}
          radius={280}
          strength={5}
          trail={true}
        />
      </div>

      {/* Subtle Ambient Radial Gradient Background Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-transparent to-[#07070a]/70 z-0" />

      {/* Main Content Recruiter Storytelling Flow */}
      <div className="relative z-10">
        <Navbar />

        {/* 1. Hero (Who am I?) */}
        <Hero />

        {/* 2. About & Education & Experience */}
        <About />

        {/* 3. Featured Projects (What can I build?) */}
        <ProjectShowcaseSection />

        {/* 4. Skills & Currently Learning */}
        <Skills />

        {/* 5. Industry Certificates */}
        <Certificates />

        {/* 6. GitHub Activity & Repository Stats */}
        <GitHubAchievements />

        {/* 7. THE ROAD SO FAR (Git Commit Timeline Journey) */}
        <RoadSoFar />

        {/* 8. Why Work With Me? & What I'm Looking For */}
        <ValueProposition />

        {/* 9. Future Goals & Aspirations */}
        <FutureGoals />

        {/* 10. Contact & Recruiter CTAs */}
        <Contact />
      </div>
    </main>
  );
}
