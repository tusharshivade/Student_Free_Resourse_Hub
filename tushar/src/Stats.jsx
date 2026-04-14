import React, { useState, useEffect, useRef } from 'react';
import { Users, BookOpen, Star, Map, Code, Users2 } from 'lucide-react';

const CountUp = ({ end, duration = 2000, suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeOut = progress * (2 - progress);
      
      const current = easeOut * end;
      setCount(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={elementRef}>
      {count.toLocaleString(undefined, { 
        minimumFractionDigits: decimals, 
        maximumFractionDigits: decimals 
      })}
      {suffix}
    </span>
  );
};

const StatCard = ({ icon: Icon, value, label, suffix, decimals, index }) => (
  <div 
    className="group relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/30 p-8 rounded-3xl shadow-2xl hover:shadow-[#21d2bd]/20 transition-all duration-500 hover:-translate-y-3"
    style={{ 
      animation: 'fadeInUp 0.6s ease-out forwards',
      animationDelay: `${index * 150}ms`,
      opacity: 0,
      transform: 'translateY(20px)'
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#21d2bd]/5 to-[#9d7cf6]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="relative z-10 flex flex-col items-center text-center space-y-5">
      <div className="p-4 bg-gradient-to-br from-[#21d2bd]/10 to-[#9d7cf6]/10 rounded-2xl group-hover:bg-[#21d2bd] group-hover:rotate-12 transition-all duration-500 shadow-inner">
        <Icon className="w-10 h-10 text-[#11a391] dark:text-[#21d2bd] group-hover:text-white transition-colors duration-500" />
      </div>
      
      <div className="space-y-2">
        <div className="text-5xl font-extrabold text-[#111] dark:text-white tracking-tighter flex items-center justify-center">
          <CountUp end={value} suffix={suffix} decimals={decimals} />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 group-hover:text-[#21d2bd] transition-colors duration-500">
          {label}
        </p>
      </div>
    </div>

    {/* Decorative corner element */}
    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-[#21d2bd] to-[#9d7cf6] rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
  </div>
);

const StatsSection = () => {
  const stats = [
    { icon: Users, value: 150000, suffix: "+", decimals: 0, label: "Active Learners" },
    { icon: BookOpen, value: 15200, suffix: "+", decimals: 0, label: "MASTER COURSES" },
    { icon: Star, value: 4.9, suffix: "/5", decimals: 1, label: "AVERAGE RATING" },
    { icon: Map, value: 1250, suffix: "+", decimals: 0, label: "FREE ROADMAPS" },
    { icon: Code, value: 2400, suffix: "+", decimals: 0, label: "PROJECT IDEAS" },
    { icon: Users2, value: 10000, suffix: "+", decimals: 0, label: "DISCORD MEMBERS" },
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#21d2bd]/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#9d7cf6]/5 rounded-full blur-3xl -z-10"></div>
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-sm font-bold text-[#21d2bd] uppercase tracking-[0.3em]">Our Impact</h2>
          <p className="text-4xl md:text-5xl font-black text-[#111] dark:text-white">Empowering the next generation of devs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
