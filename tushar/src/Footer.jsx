import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  Heart, 
  Send, 
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Globe,
  Users
} from 'lucide-react';

const TwitterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const FooterColumn = ({ title, links }) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
      {title}
    </h3>
    <ul className="flex flex-col gap-2.5">
      {links.map((link, index) => (
        <li key={index}>
          <Link 
            to={link.href} 
            className="text-[0.925rem] text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 flex items-center gap-2 group"
          >
            {link.label}
            {link.external && <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialButton = ({ href, icon: Icon, label }) => (
  <a 
    href={href} 
    aria-label={label}
    className="p-2.5 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-orange-600 dark:hover:bg-orange-500 rounded-xl transition-all duration-300 shadow-sm hover:shadow-orange-500/20"
  >
    <Icon className="w-5 h-5" />
  </a>
);

const Footer = ({ hasSidebar = false }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${hasSidebar ? 'md:ml-64' : ''} bg-[#F8FAFC] dark:bg-slate-950 border-t border-gray-200 dark:border-slate-900 mt-auto relative overflow-hidden`}>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Newsletter & Brand */}
        <div className="py-12 border-b border-gray-200 dark:border-slate-900 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-orange-600 rounded-xl shadow-lg shadow-orange-600/20">
                <GraduationCap className="text-white w-7 h-7" />
              </div>
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                Student<span className="text-orange-600">Resource</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Empowering students with the best curated resources, career roadmaps, and AI-powered learning tools to excel in their professional journey.
            </p>
            <div className="flex items-center gap-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-orange-500" />
                10k+ Students
              </span>
              <span className="w-1 h-1 bg-gray-300 dark:bg-slate-700 rounded-full"></span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-orange-500" />
                Global Community
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Stay ahead of the curve</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Weekly updates on new resources, job openings, and tech trends.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-sm text-gray-900 dark:text-white"
                />
              </div>
              <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-600/20 flex items-center gap-2 whitespace-nowrap">
                Subscribe <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-12">
          <FooterColumn 
            title="Platform"
            links={[
              { label: 'Learning Roadmap', href: '/roadmap' },
              { label: 'Virtual Labs', href: '/labs' },
              { label: 'Job Board', href: '/jobs' },
              { label: 'Mock Interviews', href: '/interviews' },
            ]}
          />
          <FooterColumn 
            title="Resources"
            links={[
              { label: 'Open Source', href: '/opensource' },
              { label: 'AI Tutor', href: '/chat' },
              { label: 'Aptitude Arena', href: '/aptitude' },
              { label: 'Documentation', href: '#' },
            ]}
          />
          <FooterColumn 
            title="Support"
            links={[
              { label: 'Help Center', href: '#' },
              { label: 'Contact Us', href: '/contact' },
              { label: 'About Us', href: '/about' },
              { label: 'Community', href: '#' },
            ]}
          />
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                Connect With Us
              </h3>
              <div className="flex flex-wrap gap-2">
                <SocialButton href="#" icon={TwitterIcon} label="Twitter" />
                <SocialButton href="#" icon={LinkedinIcon} label="LinkedIn" />
                <SocialButton href="#" icon={GithubIcon} label="GitHub" />
                <SocialButton href="mailto:contact@studentresource.com" icon={Mail} label="Email" />
              </div>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-100 dark:border-orange-900/30">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-orange-900 dark:text-orange-200 mb-1">Live Support</p>
                  <p className="text-[0.75rem] text-orange-800/80 dark:text-orange-300/80 leading-snug">
                    Need help? Our team is available Mon-Fri, 9am-6pm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Legal & Copyright */}
        <div className="py-8 border-t border-gray-200 dark:border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-[0.85rem] text-gray-600 dark:text-gray-400 font-medium">
              &copy; {currentYear} Student Resource Hub. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[0.8rem] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              <Link to="#" className="hover:text-orange-600 transition-colors">Privacy Policy</Link>
              <span className="w-1 h-1 bg-gray-300 dark:bg-slate-700 rounded-full"></span>
              <Link to="#" className="hover:text-orange-600 transition-colors">Terms of Service</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <p className="flex items-center gap-1.5 text-[0.85rem] font-semibold text-gray-600 dark:text-gray-400">
              Built with <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" /> for the future
            </p>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-900/30 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Site
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
