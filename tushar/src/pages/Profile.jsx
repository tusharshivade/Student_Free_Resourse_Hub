import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, LogOut, BookOpen, Clock, CheckCircle2 } from 'lucide-react';

const Profile = () => {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const joinDate = new Date(currentUser.joinDate).toLocaleDateString();

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 transition-colors duration-300 pt-[72px]">
      
      {/* Left Pane - Dashboard Introduction (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-indigo-900 via-purple-900 to-[#F13E93] overflow-hidden">
        {/* Abstract Background Design */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F13E93] rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 p-12 flex flex-col justify-center w-full h-full max-w-xl mx-auto">
          <div className="mb-8">
             <div className="inline-flex items-center gap-2 p-2 px-4 bg-white/10 backdrop-blur-md rounded-full text-white font-medium text-sm border border-white/20">
               ✨ Your Workspace
             </div>
          </div>
          
          <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
            Your Personal <br/> Dashboard.
          </h1>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Manage your account settings, view your saved educational resources, and track your recent activity all in one centralized hub.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white/90">
              <CheckCircle2 size={24} className="text-[#F13E93]" />
              <span className="font-medium text-lg">Access saved premium resources</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <CheckCircle2 size={24} className="text-[#F13E93]" />
              <span className="font-medium text-lg">Track your learning progress</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <CheckCircle2 size={24} className="text-[#F13E93]" />
              <span className="font-medium text-lg">Manage account details</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Profile Cards container */}
      <div className="w-full lg:w-1/2 flex items-start justify-center p-4 sm:p-8 relative h-[calc(100vh-72px)] overflow-y-auto hide-scrollbar">
        
        <div className="w-full max-w-lg space-y-8 pb-12 mt-4 lg:mt-8">
          
          {/* Profile Header Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">
            <div className="h-28 bg-gradient-to-r from-[#F13E93] to-purple-600"></div>
            <div className="px-8 pb-8 relative">
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end -mt-10 sm:-mt-12 mb-6">
                <div className="flex items-center flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg">
                    <div className="w-full h-full bg-[#F13E93]/10 dark:bg-[#F13E93]/20 rounded-full flex items-center justify-center">
                      <User size={40} className="text-[#F13E93]" />
                    </div>
                  </div>
                  <div className="text-center sm:text-left mt-2 sm:mt-0 pt-2 sm:pt-12">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{currentUser.name}</h1>
                    <p className="text-[#F13E93] font-semibold text-sm capitalize mt-1 border border-[#F13E93]/30 bg-[#F13E93]/5 px-2 py-0.5 rounded-full inline-block">
                      {currentUser.accountType || 'Student'} Account
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-slate-500 dark:text-slate-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Email Address</p>
                    <p className="text-sm text-gray-900 dark:text-white font-semibold truncate max-w-[150px]" title={currentUser.email}>{currentUser.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-slate-500 dark:text-slate-400">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Member Since</p>
                    <p className="text-sm text-gray-900 dark:text-white font-semibold">{joinDate}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold rounded-xl transition-colors border border-red-100 dark:border-red-900/30"
              >
                <LogOut size={18} />
                Sign Out Securely
              </button>
            </div>
          </div>

          {/* Saved Resources */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-6 transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen size={20} className="text-[#F13E93]" />
                Saved Resources
              </h2>
            </div>
            <div className="p-6 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-xl text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">You haven't saved any resources yet.<br/> Start exploring!</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-6 transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Clock size={20} className="text-[#F13E93]" />
                Recent Activity
              </h2>
            </div>
            <div className="p-6 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-xl text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">No recent continuous activity recorded.</p>
            </div>
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default Profile;
