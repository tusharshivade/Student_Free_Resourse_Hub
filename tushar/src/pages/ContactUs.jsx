import React from 'react';
import { Mail, MessageSquare, Send, User, MapPin, Phone } from 'lucide-react';

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

const ContactUs = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row transition-colors duration-300 border border-slate-100 dark:border-slate-700">

        {/* Left Side - Contact Info */}
        <div className="lg:w-2/5 bg-[#8CC7C4] p-10 lg:p-12 text-slate-900 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-white opacity-20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Get in Touch</h2>
            <p className="text-slate-800 mb-10 text-lg font-medium">
              We'd love to hear from you. Our friendly team is always here to chat.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4 group">
                <div className="p-3 bg-white/40 rounded-xl group-hover:bg-white/60 transition-colors shadow-sm">
                  <Mail className="w-6 h-6 text-teal-900" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800">Chat to us</h4>
                  <p className="text-slate-700 text-sm mt-1 font-medium">Our friendly team is here to help.</p>
                  <p className="mt-2 font-bold text-slate-900 hover:text-teal-900 cursor-pointer transition-colors">tusharshivade122@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="p-3 bg-white/40 rounded-xl group-hover:bg-white/60 transition-colors shadow-sm">
                  <MapPin className="w-6 h-6 text-teal-900" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800">Office</h4>
                  <p className="text-slate-700 text-sm mt-1 font-medium">Come say hello at our office HQ.</p>
                  <p className="mt-2 font-bold text-slate-900">100 Smith Street, Pune, MH</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="p-3 bg-white/40 rounded-xl group-hover:bg-white/60 transition-colors shadow-sm">
                  <Phone className="w-6 h-6 text-teal-900" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800">Phone</h4>
                  <p className="text-slate-700 text-sm mt-1 font-medium">Mon-Fri from 8am to 5pm.</p>
                  <p className="mt-2 font-bold text-slate-900 hover:text-teal-900 cursor-pointer transition-colors">+91 8624998006</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-16 flex space-x-4">
            <a href="#" className="p-2.5 bg-white/40 rounded-lg hover:bg-white/60 shadow-sm hover:-translate-y-1 transform transition-all duration-300">
              <Twitter className="w-5 h-5 text-teal-900" />
            </a>
            <a href="#" className="p-2.5 bg-white/40 rounded-lg hover:bg-white/60 shadow-sm hover:-translate-y-1 transform transition-all duration-300">
              <Linkedin className="w-5 h-5 text-teal-900" />
            </a>
            <a href="#" className="p-2.5 bg-white/40 rounded-lg hover:bg-white/60 shadow-sm hover:-translate-y-1 transform transition-all duration-300">
              <Github className="w-5 h-5 text-teal-900" />
            </a>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-3/5 p-10 lg:p-14 dark:text-slate-200 bg-white dark:bg-slate-800 relative">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 tracking-tight">Send us a Message</h3>

          <form className="space-y-6">
            <div>
              <label htmlFor="fullname" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="text"
                  id="fullname"
                  className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white transition-all bg-slate-50 shadow-sm outline-none hover:border-slate-300 dark:hover:border-slate-500"
                  placeholder="Full Name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white transition-all bg-slate-50 shadow-sm outline-none hover:border-slate-300 dark:hover:border-slate-500"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Message
              </label>
              <div className="relative group">
                <div className="absolute top-4 left-4 pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <textarea
                  id="message"
                  rows={5}
                  className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white transition-all bg-slate-50 shadow-sm outline-none resize-none hover:border-slate-300 dark:hover:border-slate-500"
                  placeholder="Leave us a message..."
                />
              </div>
            </div>

            <div className="flex items-start mt-4">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  id="privacy"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 bg-slate-100 border-slate-300 rounded focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600"
                />
              </div>
              <label htmlFor="privacy" className="ml-3 text-sm text-slate-600 dark:text-slate-400">
                You agree to our friendly <a href="#" className="font-semibold underline text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">privacy policy</a>.
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-slate-900 bg-[#8CC7C4] hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8CC7C4] transform transition-all active:scale-[0.98] hover:shadow-xl"
            >
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
