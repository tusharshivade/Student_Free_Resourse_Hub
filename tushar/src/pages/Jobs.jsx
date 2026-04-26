import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Briefcase, Filter, 
  CheckCircle2, AlertCircle, Building2, 
  TrendingUp, Users, RefreshCw, Sparkles,
  Clock, MapPinned
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Jobs = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('Pune');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchJobs = async (location = locationFilter) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs${location ? `?location=${location}` : ''}`);
      const data = await res.json();
      if (data.jobs) {
        setJobs(data.jobs);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/jobs/refresh', { method: 'POST' });
      const data = await res.json();
      if (data.message) {
        await fetchJobs();
      }
    } catch (err) {
      console.error('Error refreshing jobs:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const userSkills = currentUser?.skills ? (typeof currentUser.skills === 'string' ? JSON.parse(currentUser.skills) : currentUser.skills) : [];

  const calculateMatch = (jobSkills) => {
    if (!userSkills.length) return 0;
    const skillsArray = Array.isArray(jobSkills) ? jobSkills : [];
    const matches = skillsArray.filter(skill => 
      userSkills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
    );
    return Math.round((matches.length / skillsArray.length) * 100);
  };

  const filteredJobs = jobs.filter(job => 
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     job.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'All' || job.category === selectedCategory)
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Briefcase className="w-8 h-8 text-emerald-500" />
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full flex items-center gap-1.5 border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered Daily Updates
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
              Real-time Jobs in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600">Pune</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Fresh opportunities updated daily from top tech hubs across Pune. Our AI engine curates the latest roles matching your profile.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex flex-col items-end">
              {lastUpdated && (
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1 mb-1">
                  <Clock className="w-3 h-3" /> Last sync: {lastUpdated}
                </span>
              )}
              <button 
                onClick={handleRefresh}
                disabled={refreshing}
                className={`flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-white font-bold rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50 ${refreshing ? 'cursor-not-allowed' : ''}`}
              >
                <RefreshCw className={`w-5 h-5 text-emerald-500 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing Feed...' : 'Refresh Live Feed'}
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="relative col-span-1 md:col-span-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by role or company..."
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <MapPinned className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Location..."
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white transition-all"
              value={locationFilter}
              onChange={(e) => {
                setLocationFilter(e.target.value);
                fetchJobs(e.target.value);
              }}
            />
          </div>
          <select 
            className="px-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white transition-all appearance-none cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="AI & Data Science">AI & Data Science</option>
            <option value="DevOps">DevOps</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="UI/UX Design">UI/UX Design</option>
          </select>
        </div>

        {/* Job List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="mt-6 text-slate-500 dark:text-slate-400 font-medium">Fetching real-time opportunities...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map(job => {
              const matchPercentage = calculateMatch(job.skills);
              return (
                <div key={job.id} className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 p-8 flex flex-col md:flex-row gap-8 hover:shadow-2xl transition-all group relative overflow-hidden">
                  {/* Skill Match Indicator */}
                  <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-[1.5rem] text-xs font-bold flex items-center gap-1.5 ${
                    matchPercentage >= 70 ? 'bg-emerald-500 text-white' :
                    matchPercentage >= 40 ? 'bg-orange-500 text-white' :
                    'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {matchPercentage >= 70 ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {matchPercentage}% Skill Match
                  </div>

                  {/* Company Logo Simulation */}
                  <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-inner border border-slate-100 dark:border-slate-700">
                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-emerald-600">
                      {job.company.charAt(0)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                          <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-emerald-500" /> {job.company}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-rose-500" /> {job.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xl font-black text-slate-900 dark:text-white">{job.salary}</span>
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed line-clamp-2">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      {job.skills.map(skill => {
                        const isMatch = userSkills.some(us => us.toLowerCase() === skill.toLowerCase());
                        return (
                          <span key={skill} className={`px-4 py-1.5 text-[11px] font-bold rounded-xl border transition-all ${
                            isMatch 
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                              : 'bg-slate-50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-700'
                          }`}>
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-center md:w-40 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-700 pt-6 md:pt-0 md:pl-8">
                    <button className="w-full px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl hover:bg-emerald-500 dark:hover:bg-emerald-500 dark:hover:text-white transition-all shadow-xl hover:shadow-emerald-500/25 active:scale-95">
                      Apply Now
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
              <Search className="w-16 h-16 text-slate-200 dark:text-slate-700 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-slate-800 dark:text-white">No real-time jobs found</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto font-medium">
                Try clicking "Refresh Live Feed" to pull the latest Pune opportunities or adjust your search keywords.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
