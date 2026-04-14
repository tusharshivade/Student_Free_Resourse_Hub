import { useState, useEffect } from 'react';
import { Search, User, GraduationCap, Moon, Sun, Bell, Menu, X, Mail, Calendar, Code } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const getPlaceholder = () => {
    if (location.pathname === '/roadmap') return 'Search roadmaps...';
    if (location.pathname === '/dashboard') return 'Search resources...';
    return 'Search...';
  };

  const displayName = currentUser ? currentUser.name : "";
  const displayEmail = currentUser ? currentUser.email : "";
  const displayRole = currentUser ? `${currentUser.accountType || 'Student'} Account` : "";
  const joinDate = currentUser ? new Date(currentUser.joinDate).toLocaleDateString() : "";

  useEffect(() => {
    // Check initial layout theme
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-md p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      <div className="flex items-center gap-2">
        <GraduationCap className="text-indigo-700 dark:text-indigo-400" size={28} />
        <Link to="/" className="text-lg sm:text-2xl font-bold text-indigo-700 dark:text-indigo-400 line-clamp-1">Student Resource Hub</Link>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className={`relative py-1 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors ${isActive('/') ? 'text-indigo-700 dark:text-indigo-400' : ''}`}>
          Home
          {isActive('/') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>}
        </Link>
        <Link to="/dashboard" className={`relative py-1 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors ${isActive('/dashboard') ? 'text-indigo-700 dark:text-indigo-400' : ''}`}>
          Resources
          {isActive('/dashboard') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>}
        </Link>
        <Link to="/roadmap" className={`relative py-1 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors ${isActive('/roadmap') ? 'text-indigo-700 dark:text-indigo-400' : ''}`}>
          Roadmap
          {isActive('/roadmap') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>}
        </Link>
        <Link to="/about" className={`relative py-1 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors ${isActive('/about') ? 'text-indigo-700 dark:text-indigo-400' : ''}`}>
          About Us
          {isActive('/about') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>}
        </Link>
        <Link to="/contact" className={`relative py-1 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors ${isActive('/contact') ? 'text-indigo-700 dark:text-indigo-400' : ''}`}>
          Contact Us
          {isActive('/contact') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>}
        </Link>
        <Link to="/chat" className={`px-4 py-1.5 rounded-full font-bold transition-all flex items-center gap-1 shadow-sm ${isActive('/chat') ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800'}`}>
          <span>AICHAT</span><span className="text-sm">✨</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" size={20} />
          <input
            type="text"
            placeholder={getPlaceholder()}
            value={searchTerm || ''}
            onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white transition-colors duration-300"
          />
        </div>

        <button
          onClick={toggleDarkMode}
          className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        <button className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative" aria-label="Notifications">
          <Bell size={24} />
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-800"></span>
        </button>

        {currentUser ? (
          <div className="flex items-center gap-3 relative cursor-pointer" onClick={() => setIsProfileCardOpen(!isProfileCardOpen)}>
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800 transition-transform hover:scale-105" title={currentUser.name}>
                {currentUser.name.charAt(0).toUpperCase()}
              </div>

              {/* Profile Card Dropdown */}
              {isProfileCardOpen && (
                <div className="absolute top-12 right-0 w-[320px] sm:w-[350px] bg-white dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700/50 overflow-hidden z-50 transform origin-top-right transition-all animate-in fade-in slide-in-from-top-4 duration-300">
                  {/* Card Header Background */}
                  <div className="h-24 bg-gradient-to-br from-[#21d2bd] via-[#1db8a5] to-[#9d7cf6] relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 dark:bg-black/10 mix-blend-overlay"></div>
                    <div className="absolute top-0 right-0 p-3">
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold border border-white/30 shadow-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                        ONLINE
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="px-6 pb-6 relative text-left">
                    <div className="flex justify-between items-end -mt-10 mb-4">
                      <div className="relative group">
                        <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full p-1.5 shadow-xl relative z-10 transition-transform duration-300 group-hover:scale-105">
                          <div className="w-full h-full bg-gradient-to-tr from-[#21d2bd]/20 to-[#9d7cf6]/20 dark:from-[#21d2bd]/30 dark:to-[#9d7cf6]/30 rounded-full flex items-center justify-center overflow-hidden">
                            <User className="text-[#1db8a5] dark:text-[#21d2bd]" size={36} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Link to="/profile" className="mb-1 p-2 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-600 dark:text-slate-300 transition-colors shadow-sm" title="Settings/Profile">
                          <Code size={18} />
                        </Link>
                        <button onClick={(e) => { e.stopPropagation(); logout(); setIsProfileCardOpen(false); }} className="mb-1 p-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl text-red-500 transition-colors shadow-sm" title="Sign Out">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">{displayName}</h2>
                      <p className="text-[#1db8a5] dark:text-[#21d2bd] font-semibold text-xs mt-0.5 mb-2 capitalize">{displayRole}</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-2 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-500 dark:text-indigo-400">
                          <Mail size={14} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold leading-none mb-0.5">Email</p>
                          <p className="text-sm text-slate-900 dark:text-white font-semibold truncate w-full leading-none" title={displayEmail}>{displayEmail}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-fuchsia-50 dark:bg-fuchsia-900/30 rounded-lg text-fuchsia-500 dark:text-fuchsia-400">
                          <Calendar size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold leading-none mb-0.5">Joined</p>
                          <p className="text-sm text-slate-900 dark:text-white font-semibold leading-none">{joinDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        ) : (
          <Link to="/login">
            <User className="text-gray-600 dark:text-gray-300 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" size={24} />
          </Link>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 shadow-xl flex flex-col z-50">
          <div className="flex flex-col p-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative sm:hidden mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" size={20} />
              <input
                type="text"
                placeholder={getPlaceholder()}
                value={searchTerm || ''}
                onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white transition-colors"
              />
            </div>

            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 font-bold py-3 px-4 border-l-4 transition-all duration-300 ${isActive('/') ? 'text-indigo-700 dark:text-indigo-400 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-inner' : 'text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>Home</Link>
            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 font-bold py-3 px-4 border-l-4 transition-all duration-300 ${isActive('/dashboard') ? 'text-indigo-700 dark:text-indigo-400 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-inner' : 'text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>Resources</Link>
            <Link to="/roadmap" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 font-bold py-3 px-4 border-l-4 transition-all duration-300 ${isActive('/roadmap') ? 'text-indigo-700 dark:text-indigo-400 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-inner' : 'text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>Roadmap</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 font-bold py-3 px-4 border-l-4 transition-all duration-300 ${isActive('/about') ? 'text-indigo-700 dark:text-indigo-400 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-inner' : 'text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>About Us</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 font-bold py-3 px-4 border-l-4 transition-all duration-300 ${isActive('/contact') ? 'text-indigo-700 dark:text-indigo-400 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-inner' : 'text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>Contact Us</Link>
            
            {currentUser ? (
              <>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 font-bold py-3 px-4 border-l-4 transition-all duration-300 ${isActive('/profile') ? 'text-indigo-700 dark:text-indigo-400 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-inner' : 'text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>
                   Profile ({currentUser.name})
                </Link>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-left text-red-600 dark:text-red-400 font-bold py-3 px-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 border-l-4 border-transparent flex items-center gap-3">
                  Logout
                </button>
              </>
            ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 font-bold py-3 px-4 border-l-4 transition-all duration-300 ${isActive('/login') ? 'text-indigo-700 dark:text-indigo-400 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-inner' : 'text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>Sign In</Link>
            )}

            <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)} className={`w-max mx-4 px-6 py-2.5 rounded-full font-bold transition-all duration-300 flex items-center gap-2 shadow-lg mt-2 ${isActive('/chat') ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800'}`}>
              <span>AICHAT</span><span>✨</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;