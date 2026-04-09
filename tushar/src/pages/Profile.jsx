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
      
      {/* Left Pane - Simple Card (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-8 bg-slate-50 dark:bg-slate-900">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 p-10 text-center transition-transform hover:-translate-y-2 duration-300">
          <div className="w-20 h-20 bg-[#21d2bd]/10 dark:bg-[#21d2bd]/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <BookOpen size={36} className="text-[#1db8a5] dark:text-[#21d2bd]" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Quick Links</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Manage your account, track resources, and configure your learning preferences from your personal dashboard.
          </p>
          <div className="flex flex-col gap-3">
             <button className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
               <Calendar size={18} /> View Schedule
             </button>
             <button className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
               <Clock size={18} /> Recent Activity
             </button>
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
