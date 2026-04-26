import React, { useState, useEffect } from 'react';
import { 
  Trophy, Flame, Target, BookOpen, 
  ChevronRight, Briefcase, Users, Star,
  TrendingUp, Award, Clock, ArrowUpRight,
  PieChart as PieChartIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    roadmapProgress: 0,
    completedLabs: 0,
    jobMatches: 0,
    points: 0,
    streak: 0
  });

  useEffect(() => {
    if (currentUser) {
      // Fetch Roadmap Progress
      fetch(`/api/roadmaps/${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
          // Calculate an overall percentage (simplified: average of steps found)
          const totalExpectedSteps = 50; // Reference number
          const progressPercentage = Math.min(Math.round((data.progress.length / totalExpectedSteps) * 100), 100);
          
          setStats(prev => ({
            ...prev,
            roadmapProgress: progressPercentage,
            points: currentUser.points || 0,
            streak: currentUser.streaks || 0
          }));
        });

      // Fetch Job Match Count
      fetch('/api/jobs?location=Pune')
        .then(res => res.json())
        .then(data => {
          if (data.jobs) {
            const userSkills = currentUser.skills ? (typeof currentUser.skills === 'string' ? JSON.parse(currentUser.skills) : currentUser.skills) : [];
            const matches = data.jobs.filter(job => {
              const jobSkills = job.skills || [];
              return jobSkills.some(skill => 
                userSkills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
              );
            });
            setStats(prev => ({ ...prev, jobMatches: matches.length }));
          }
        });
    }
  }, [currentUser]);

  const badges = [
    { id: 1, name: "Fast Learner", icon: Flame, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30" },
    { id: 2, name: "Code Ninja", icon: Target, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
    { id: 3, name: "Open Sourcerer", icon: Star, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600">{currentUser?.name}</span>! 👋
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium">
              You're making great progress. Keep up the momentum!
            </p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                <span className="font-bold text-slate-700 dark:text-slate-200">{stats.streak} Day Streak</span>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-slate-700 dark:text-slate-200">{stats.points} Points</span>
             </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500/10 blur-2xl rounded-full"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-xl text-orange-600 dark:text-orange-400">
                <TrendingUp size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/40 px-2 py-1 rounded-lg flex items-center gap-1">
                <ArrowUpRight size={14} /> +12%
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Roadmap Progress</h3>
            <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stats.roadmapProgress}%</p>
            <div className="mt-4 w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
               <div className="bg-orange-500 h-full w-[65%]"></div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                <BookOpen size={24} />
              </div>
            </div>
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Completed Labs</h3>
            <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stats.completedLabs}</p>
            <p className="text-xs text-slate-400 mt-2 font-medium">3 labs in progress</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                <Briefcase size={24} />
              </div>
            </div>
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Job Matches</h3>
            <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stats.jobMatches}</p>
            <Link to="/jobs" className="text-xs text-emerald-500 mt-2 font-bold flex items-center gap-1 hover:underline">
              View matches <ChevronRight size={14} />
            </Link>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-fuchsia-500/10 blur-2xl rounded-full"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-fuchsia-50 dark:bg-fuchsia-900/30 rounded-xl text-fuchsia-600 dark:text-fuchsia-400">
                <Users size={24} />
              </div>
            </div>
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mock Interviews</h3>
            <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">2</p>
            <p className="text-xs text-slate-400 mt-2 font-medium">Next: Tomorrow 10:00 AM</p>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-xl p-8 sm:p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock size={24} className="text-indigo-500" />
                  Recent Activity
                </h2>
                <button className="text-sm font-bold text-slate-400 hover:text-indigo-500 transition-colors">See all</button>
              </div>

              <div className="space-y-6">
                {[
                  { title: "Completed Weather App Lab", time: "2 hours ago", points: "+100", icon: BookOpen, color: "text-emerald-500" },
                  { title: "Passed 'React Context' Quiz", time: "Yesterday", points: "+50", icon: Award, color: "text-amber-500" },
                  { title: "Started DevOps Roadmap", time: "2 days ago", points: "+10", icon: Target, color: "text-indigo-500" }
                ].map((act, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 ${act.color}`}>
                        <act.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">{act.title}</h4>
                        <span className="text-xs text-slate-500">{act.time}</span>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-500">{act.points}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <Link to="/roadmap" className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl group overflow-hidden relative">
                  <Target size={80} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">Continue Roadmap</h3>
                  <p className="text-indigo-100 text-sm mb-6">You're 65% through "Modern Web Development".</p>
                  <span className="flex items-center gap-2 font-bold text-sm">Resume Learning <ChevronRight size={18} /></span>
               </Link>
               <Link to="/labs" className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 rounded-[2.5rem] text-white shadow-xl group overflow-hidden relative">
                  <Flame size={80} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">Next Build Lab</h3>
                  <p className="text-emerald-100 text-sm mb-6">Try: "Build a Real-time Chat with Socket.io".</p>
                  <span className="flex items-center gap-2 font-bold text-sm">Start Working <ChevronRight size={18} /></span>
               </Link>
            </div>
          </div>

          {/* Right Sidebar: Badges & Profile Summary */}
          <div className="space-y-8">
            
            {/* Badges */}
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-xl p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Award size={24} className="text-amber-500" />
                Your Badges
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {badges.map(badge => (
                  <div key={badge.id} className="p-4 rounded-3xl border border-slate-50 dark:border-slate-700 flex flex-col items-center gap-3 text-center group hover:border-amber-200 transition-all">
                    <div className={`p-3 rounded-2xl ${badge.bg} ${badge.color} group-hover:scale-110 transition-transform`}>
                      <badge.icon size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">{badge.name}</span>
                  </div>
                ))}
                <div className="p-4 rounded-3xl border-2 border-dashed border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center gap-2 text-center opacity-50">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                    ?
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-wider">Locked</span>
                </div>
              </div>
            </div>

            {/* Motivation Card */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
               <Star size={100} className="absolute -top-10 -left-10 text-white/5" />
               <div className="relative z-10">
                 <h3 className="text-lg font-bold mb-4 italic">"The only way to learn a new programming language is by writing programs in it."</h3>
                 <p className="text-slate-400 text-xs">— Dennis Ritchie</p>
                 <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <TrendingUp size={20} className="text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Target: 2000 Points</h4>
                      <p className="text-slate-500 text-[10px]">Reach this to unlock Premium Mentorship</p>
                    </div>
                 </div>
               </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
