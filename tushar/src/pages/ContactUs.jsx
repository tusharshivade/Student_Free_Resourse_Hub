import React from 'react';
import { Mail, MessageSquare, Send, User, MapPin, Phone, Linkedin, Twitter, Github } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row transition-colors duration-300 border border-slate-100 dark:border-slate-700">
        
        {/* Left Side - Contact Info */}
        <div className="lg:w-2/5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Get in Touch</h2>
            <p className="text-indigo-100 mb-10 text-lg">
              We'd love to hear from you. Our friendly team is always here to chat.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4 group">
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                  <Mail className="w-6 h-6 text-indigo-100" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Chat to us</h4>
                  <p className="text-indigo-200 text-sm mt-1">Our friendly team is here to help.</p>
                  <p className="mt-2 font-medium text-white hover:text-indigo-200 cursor-pointer transition-colors">hello@studentresource.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                  <MapPin className="w-6 h-6 text-indigo-100" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Office</h4>
                  <p className="text-indigo-200 text-sm mt-1">Come say hello at our office HQ.</p>
                  <p className="mt-2 font-medium text-white">100 Smith Street, Pune, MH</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                  <Phone className="w-6 h-6 text-indigo-100" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Phone</h4>
                  <p className="text-indigo-200 text-sm mt-1">Mon-Fri from 8am to 5pm.</p>
                  <p className="mt-2 font-medium text-white hover:text-indigo-200 cursor-pointer transition-colors">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mt-16 flex space-x-4">
            <a href="#" className="p-2.5 bg-white/10 rounded-lg hover:bg-white/20 hover:-translate-y-1 transform transition-all duration-300">
              <Twitter className="w-5 h-5 text-white" />
            </a>
            <a href="#" className="p-2.5 bg-white/10 rounded-lg hover:bg-white/20 hover:-translate-y-1 transform transition-all duration-300">
              <Linkedin className="w-5 h-5 text-white" />
            </a>
            <a href="#" className="p-2.5 bg-white/10 rounded-lg hover:bg-white/20 hover:-translate-y-1 transform transition-all duration-300">
              <Github className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
        
        {/* Right Side - Form */}
        <div className="lg:w-3/5 p-10 lg:p-14 dark:text-slate-200 bg-white dark:bg-slate-800 relative">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 tracking-tight">Send us a Message</h3>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first_name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  First name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    id="first_name"
                    className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white transition-all bg-slate-50 shadow-sm outline-none hover:border-slate-300 dark:hover:border-slate-500"
                    placeholder="First name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="last_name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Last name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    id="last_name"
                    className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white transition-all bg-slate-50 shadow-sm outline-none hover:border-slate-300 dark:hover:border-slate-500"
                    placeholder="Last name"
                  />
                </div>
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
              className="mt-6 w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all active:scale-[0.98] hover:shadow-xl"
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
