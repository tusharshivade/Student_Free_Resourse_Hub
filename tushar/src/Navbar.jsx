import { useState, useEffect } from 'react';
import { Search, User, GraduationCap, Moon, Sun, Bell, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

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
        <Link to="/" className="text-lg sm:text-2xl font-bold text-indigo-700 dark:text-indigo-400 line-clamp-1">Student Sesource Hub</Link>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">Home</Link>
        <Link to="/dashboard" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">Resources</Link>
        <Link to="/roadmap" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">Roadmap</Link>
        <Link to="/about" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">About Us</Link>
        <Link to="/contact" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">Contact Us</Link>
        <Link to="/chat" className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 font-semibold hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors flex items-center gap-1 shadow-sm">
          <span>AICHAT</span><span className="text-sm">✨</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" size={20} />
          <input
            type="text"
            placeholder="Search resources..."
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
          <div className="flex items-center gap-3 relative group cursor-pointer">
            <Link to="/profile" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800" title={currentUser.name}>
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            </Link>
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
                placeholder="Search resources..."
                value={searchTerm || ''}
                onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white transition-colors"
              />
            </div>

            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2 border-b border-gray-100 dark:border-slate-700">Home</Link>
            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2 border-b border-gray-100 dark:border-slate-700">Resources</Link>
            <Link to="/roadmap" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2 border-b border-gray-100 dark:border-slate-700">Roadmap</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2 border-b border-gray-100 dark:border-slate-700">About Us</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2 border-b border-gray-100 dark:border-slate-700">Contact Us</Link>
            
            {currentUser ? (
              <>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2 border-b border-gray-100 dark:border-slate-700 flex items-center gap-2">
                   Profile ({currentUser.name})
                </Link>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-left text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 font-medium py-2 border-b border-gray-100 dark:border-slate-700">
                  Logout
                </button>
              </>
            ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2 border-b border-gray-100 dark:border-slate-700">Sign In</Link>
            )}

            <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)} className="w-max px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 font-semibold hover:bg-indigo-200 dark:hover:bg-indigo-800 flex items-center gap-2 shadow-sm mt-2">
              <span>AICHAT</span><span>✨</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;