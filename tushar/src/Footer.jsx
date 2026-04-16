import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Heart } from 'lucide-react';

const Twitter = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const Linkedin = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Github = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const SocialButton = ({ href, icon: Icon }) => (
  <a 
    href={href} 
    className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-slate-800 hover:shadow-lg rounded-lg transition-all duration-300 transform hover:-translate-y-1"
  >
    <Icon className="w-[1.125rem] h-[1.125rem]" />
  </a>
);

const Footer = ({ hasSidebar = false }) => {
  return (
    <footer className={`${hasSidebar ? 'md:ml-64' : ''} bg-[#EAEFEF] dark:bg-slate-900 mt-auto relative overflow-hidden shadow-inner`}>
      
      {/* Visual Accent Overlay */}
      <div className="absolute inset-0 bg-gray-900/5 dark:bg-white/5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900/10 dark:from-white/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-6 text-gray-900 dark:text-gray-100">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-200 dark:bg-slate-800 backdrop-blur-md rounded-xl shadow-inner border border-gray-300 dark:border-slate-700">
              <GraduationCap className="text-orange-600 dark:text-orange-400 w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow-sm">
              Student Resource
            </span>
          </div>
          
          {/* Inline Navigation Links */}
          <div className="flex items-center gap-6 text-[0.95rem] font-semibold text-gray-700 dark:text-gray-300 drop-shadow-sm">
            <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-600 dark:bg-orange-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/roadmap" className="hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              Roadmap
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-600 dark:bg-orange-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-600 dark:bg-orange-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-600 dark:bg-orange-400 transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* Socials & Contact */}
          <div className="flex items-center gap-1">
            <a 
              href="mailto:tusharshivade122@gmail.com" 
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-slate-800 hover:shadow-lg rounded-lg transition-all duration-300 transform hover:-translate-y-1 mr-1 flex items-center gap-2 tooltip"
            >
              <Mail className="w-[1.125rem] h-[1.125rem]" />
            </a>
            
            <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-1"></div>
            
            <SocialButton href="#" icon={Twitter} />
            <SocialButton href="#" icon={Linkedin} />
            <SocialButton href="#" icon={Github} />
          </div>
          
        </div>
        
        {/* Bottom Small Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between py-4 border-t border-gray-300 dark:border-slate-800 text-[0.8rem] text-gray-600 dark:text-gray-400">
           <p className="font-medium drop-shadow-sm">&copy; {new Date().getFullYear()} Student Resource Hub. All rights reserved.</p>
           <p className="flex items-center gap-1.5 mt-2 md:mt-0 font-medium">
             Built with <Heart className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400 fill-orange-500/50 dark:fill-orange-400/50 animate-pulse drop-shadow-sm" /> for students everywhere
           </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
