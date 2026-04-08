import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import heroImage from '../assets/hero_student_tech.png';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#cbfdf3] dark:bg-slate-900 pt-20 overflow-hidden relative flex flex-col justify-between transition-colors duration-300">
        
        {/* Main Hero Section */}
        <main className="flex-grow flex items-center relative z-10 px-4 sm:px-8 lg:px-16 py-12 lg:py-0">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-left space-y-8 max-w-2xl">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#111] dark:text-white leading-tight tracking-tight">
                Master Your <br className="hidden sm:block" />
                Tech Career.
              </h1>
              <p className="text-xl sm:text-2xl text-slate-700 dark:text-slate-300 font-medium">
                Access curated, high-value free resources covering AI, web development, DevOps, and more.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <Link 
                  to="/dashboard" 
                  className="w-full sm:w-auto px-8 py-4 bg-[#21d2bd] hover:bg-[#1db8a5] dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold rounded-lg text-lg transition-transform transform hover:-translate-y-1 shadow-lg text-center"
                >
                  Browse Resources
                </Link>
                <Link 
                  to="/about" 
                  className="w-full sm:w-auto px-6 py-4 border-b-2 border-[#111] dark:border-white text-[#111] dark:text-white font-bold text-lg hover:opacity-70 transition-opacity text-center flex items-center justify-center gap-2"
                >
                  Learn more
                </Link>
              </div>
            </div>

            {/* Right Content - Abstract Imagery */}
            <div className="relative flex justify-center lg:justify-end items-center h-[500px] lg:h-[650px] w-full">
              {/* Decorative Abstract Shapes */}
              <div className="absolute top-10 right-10 w-24 h-24 bg-[#21d2bd] rounded-full hidden md:block animate-pulse"></div>
              <div className="absolute top-1/3 left-0 w-8 h-8 bg-[#ff6b35] rounded-full hidden md:block"></div>
              <div className="absolute bottom-20 left-10 w-20 h-20 bg-[#ff99d4] rounded-full hidden lg:block opacity-90"></div>
              <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-[#9d7cf6] rounded-full hidden md:block opacity-90 mix-blend-multiply flex items-center justify-center">
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#21d2bd] rounded-full z-20 flex items-center justify-center shadow-lg group">
                   <div className="w-6 h-4 bg-white rounded-md mx-auto relative before:absolute before:border-[4px] before:border-transparent before:border-t-white before:bottom-[-6px] before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0"></div>
                </div>
              </div>

              {/* Central Image */}
              <div className="relative z-10 w-full max-w-[400px] lg:max-w-[500px]">
                 <img 
                   src={heroImage} 
                   alt="Modern student interacting with tech" 
                   className="w-full h-auto drop-shadow-2xl rounded-tr-[100px] rounded-bl-[100px] object-cover"
                 />
              </div>
            </div>

          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Home;
