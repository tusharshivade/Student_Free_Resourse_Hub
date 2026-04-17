import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, Beaker, Briefcase, Target, Users, 
  CheckCircle2, ArrowRight, LayoutDashboard, Map, Sparkles, TrendingUp 
} from 'lucide-react';

const Github = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const AboutUs = () => {
  const ecosystem = [
    {
      title: 'Gamified Dashboard',
      description: 'Track your real-time progress with points, daily streaks, and skill badges. Gamify your learning journey to stay obsessed with progress.',
      icon: <LayoutDashboard className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      tag: 'Motivation'
    },
    {
      title: 'Virtual Build-Along Labs',
      description: 'Hands-on learning by building real-world projects. Choose a lab, follow the interactive step-by-step checklists, and mark them as you code.',
      icon: <Beaker className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      tag: 'Practice'
    },
    {
      title: 'Intelligent Job Board',
      description: 'Find opportunities that match your specific skill set. Our matching algorithm compares your roadmap progress with real-world job requirements.',
      icon: <Briefcase className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      tag: 'Employment'
    },
    {
      title: 'Personalized Roadmaps',
      description: 'Structured, high-conversion learning paths from Beginner to Advanced. Hand-picked resources curated by industry professionals.',
      icon: <Map className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      tag: 'Guidance'
    },
    {
      title: 'Peer Mock Interviews',
      description: 'Practice makes perfect. Book mock interview sessions with peers of similar skill levels and get real-time feedback on your performance.',
      icon: <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      tag: 'Networking'
    },
    {
      title: 'Open Source Hub',
      description: 'Start your open-source journey with ease. We fetch beginner-friendly "Good First Issues" directly from GitHub to jumpstart your career.',
      icon: <Github className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      tag: 'Contribution'
    }
  ];

  const steps = [
    { number: '01', title: 'Choose Your Path', desc: 'Select a roadmap in Web Dev, AI, or DevOps that aligns with your dream career.' },
    { number: '02', title: 'Learn & Build', desc: 'Study curated resources and immediately apply knowledge in our interactive Virtual Labs.' },
    { number: '03', title: 'Get Matched', desc: 'Our system tracks your skills and automatically matches you with real jobs and internships.' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} /> The Platform for Next-Gen Engineers
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1.1] mb-8">
            Learn. Practice. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Get Hired in Tech.</span>
          </h1>
          
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The Student Resource Hub is a comprehensive ecosystem designed to take you from a curious beginner to a job-ready professional.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32 bg-white dark:bg-slate-800 rounded-[3rem] p-8 sm:p-16 shadow-2xl shadow-orange-500/5 border border-slate-100 dark:border-slate-700 transition-colors duration-300">
          <div>
            <h3 className="text-sm font-bold text-orange-500 uppercase tracking-[0.2em] mb-4">Our Narrative</h3>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              Why this platform exists?
            </h2>
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                As a student, the sheer volume of tutorials, tools, and technologies can be overwhelming. Most students spend more time searching for the right resource than actually learning from it.
              </p>
              <p>
                <strong>Student Resource Hub</strong> is designed to be your personalized compass. We bridge the gap between academic theory and industry reality by providing structured roadmaps, interactive practice environments, and a direct line to global tech opportunities.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                  <CheckCircle2 className="text-emerald-500" size={18} /> Verified Content
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                  <CheckCircle2 className="text-emerald-500" size={18} /> Zero Paywalls
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                  <CheckCircle2 className="text-emerald-500" size={18} /> Peer-to-Peer
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
             <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group">
                {/* Visual Representation of Platform Flow */}
                <div className="grid grid-cols-2 gap-4 p-8 relative z-10 w-full h-full">
                   <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg transform -rotate-3 hover:rotate-0 transition-transform flex flex-col justify-between">
                      <Map className="text-orange-500 w-8 h-8 mb-4 " />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Roadmaps</span>
                   </div>
                   <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg transform rotate-6 hover:rotate-0 transition-transform translate-y-8 flex flex-col justify-between">
                      <Beaker className="text-blue-500 w-8 h-8 mb-4" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Labs</span>
                   </div>
                   <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform flex flex-col justify-between">
                      <LayoutDashboard className="text-emerald-500 w-8 h-8 mb-4" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Stats</span>
                   </div>
                   <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg transform -rotate-6 hover:rotate-0 transition-transform translate-y-4 flex flex-col justify-between">
                      <Briefcase className="text-purple-500 w-8 h-8 mb-4" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Jobs</span>
                   </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-slate-900/40 pointer-events-none"></div>
             </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mb-32">
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">The Ecosystem</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Everything you need to grow from junior to senior, built into a single unified platform.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ecosystem.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-50 dark:bg-orange-900/30 px-3 py-1.5 rounded-full">
                    {feature.tag}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-32">
           <div className="bg-slate-900 dark:bg-orange-600/10 rounded-[4rem] p-8 sm:p-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-16 text-center tracking-tight">How it works?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-24 relative">
                   {/* Connection Line */}
                   <div className="hidden md:block absolute top-[2.5rem] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-orange-500/50 via-red-500/50 to-orange-500/50 dashed border border-dashed border-white/20"></div>
                   
                   {steps.map((step, idx) => (
                      <div key={idx} className="text-center group">
                         <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center mx-auto mb-8 text-2xl font-black text-orange-500 shadow-xl group-hover:scale-110 transition-transform relative z-10">
                            {step.number}
                         </div>
                         <h4 className="text-xl font-bold text-white mb-4 tracking-tight">{step.title}</h4>
                         <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                   ))}
                </div>
              </div>
           </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-[3rem] p-12 sm:p-20 text-center text-white shadow-[0_20px_50px_rgba(234,88,12,0.3)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl sm:text-5xl font-black mb-6 tracking-tight">Ready to accelerate <br className="hidden sm:block"/> your career?</h3>
            <p className="mb-10 text-orange-100 text-lg font-medium opacity-90 leading-relaxed">
              Join thousands of students who are building their future today. One roadmap at a time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-left">
              <Link to="/signup" className="w-full sm:w-auto px-10 py-5 bg-white text-orange-600 px-10 py-4 rounded-[1.5rem] font-black text-lg hover:bg-orange-50 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95">
                Join the Hub <ArrowRight size={20} />
              </Link>
              <Link to="/dashboard" className="w-full sm:w-auto px-10 py-5 bg-orange-700/30 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-[1.5rem] font-black text-lg hover:bg-orange-700/50 transition-all flex items-center justify-center gap-3">
                Watch Demo <Rocket size={20} className="text-orange-200" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
