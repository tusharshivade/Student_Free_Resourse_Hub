import React from 'react';
import { Target, BookOpen, Briefcase, Zap, CheckCircle2 } from 'lucide-react';

const AboutUs = () => {
  const benefits = [
    {
      title: 'Curated Learning Path',
      description: 'Navigate through hand-picked resources that cut out the noise and focus on what truly matters in modern software development.',
      icon: <BookOpen className="w-6 h-6 text-indigo-500" />
    },
    {
      title: 'Interview Ready',
      description: 'Access practice sets and real-world scenarios that prepare you for rigorous technical interviews and assignments.',
      icon: <Target className="w-6 h-6 text-indigo-500" />
    },
    {
      title: 'Career Acceleration',
      description: 'Bridge the gap between academic knowledge and industry expectations with practical tools and certification guides.',
      icon: <Briefcase className="w-6 h-6 text-indigo-500" />
    },
    {
      title: 'Enhanced Productivity',
      description: 'Discover AI tools and methodologies that professional developers use daily to multiply their output.',
      icon: <Zap className="w-6 h-6 text-indigo-500" />
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl tracking-tight">
            Empowering Your <span className="text-indigo-600 dark:text-indigo-400">Tech Journey</span>
          </h2>
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We built this platform to be the definitive resource hub for computer science students navigating the transition from classroom to workspace.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl overflow-hidden mb-16 border border-slate-100 dark:border-slate-700 transition-colors duration-300">
          <div className="p-8 sm:p-10">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Why this platform exists?
            </h3>
            <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-300">
              <p className="mb-4">
                As a student, the sheer volume of tutorials, tools, and technologies can be overwhelming. You often spend more time searching for the right resource than actually learning from it.
              </p>
              <p className="mb-4">
                <strong>Student Resource Hub</strong> is designed to solve this exact problem. It acts as your personalized compass, guiding you toward high-quality, relevant materials whether you aim to be a frontend wizard, a backend architect, or a data science pioneer.
              </p>
              <p>
                By categorizing essential knowledge into actionable tracks—from basic notes to complex practice sets—we ensure that every hour you invest yields tangible progress toward your career goals.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg mr-4">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">{benefit.title}</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-indigo-600 rounded-2xl p-8 sm:p-10 text-center text-white shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to accelerate your career?</h3>
          <p className="mb-8 text-indigo-100 text-lg">Join hundreds of students already ahead of the curve.</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-slate-50 transition-colors shadow-sm">
            Explore Resources Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
