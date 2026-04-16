import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, User, ArrowRight, AlertCircle, Briefcase, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('student'); // 'student' or 'educator'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) return setError('Name is required');
    if (!email) return setError('Email is required');
    if (!validateEmail(email)) return setError('Invalid email address');
    if (!password) return setError('Password is required');
    if (password.length < 6) return setError('Password must be at least 6 characters');

    try {
      setError('');
      setLoading(true);
      await signup(name, email, password, accountType);
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      
      {/* Left Pane - Branding/Illustration (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-orange-600 to-red-700 overflow-hidden">
        {/* Abstract Background Design */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 p-12 flex flex-col justify-between w-full h-full">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 group cursor-pointer w-max">
              <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl">
                <GraduationCap className="text-white" size={36} />
              </div>
              <span className="text-3xl font-bold text-white tracking-tight">EduHub</span>
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col justify-center max-w-lg mt-12">
            <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
              Start your <br/> learning journey today.
            </h1>
            <p className="text-orange-50 text-lg mb-8 leading-relaxed">
              Join thousands of students and educators exploring the most comprehensive digital resource hub available online.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-orange-50">
                <CheckCircle2 size={24} className="text-white" />
                <span className="font-medium text-lg">Curated premium resources</span>
              </div>
              <div className="flex items-center gap-3 text-orange-50">
                <CheckCircle2 size={24} className="text-white" />
                <span className="font-medium text-lg">Personalized student dashboards</span>
              </div>
              <div className="flex items-center gap-3 text-orange-50">
                <CheckCircle2 size={24} className="text-white" />
                <span className="font-medium text-lg">Interactive AI study tools</span>
              </div>
            </div>
          </div>
          
          <div className="text-orange-200/60 text-sm">
            © {new Date().getFullYear()} Student Resource Hub. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Pane - Small Card Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative">
        {/* Mobile-only header piece since left panel is hidden */}
        <div className="absolute top-8 left-8 lg:hidden">
          <Link to="/" className="inline-flex items-center gap-2">
            <GraduationCap className="text-[#F13E93] dark:text-[#F13E93]" size={32} />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">EduHub</span>
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden relative z-10 transition-colors duration-300 mt-12 lg:mt-0">
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Create an Account</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Join the Student Resource Hub today</p>

            {error && (
              <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Account Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Account Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => setAccountType('student')}
                    className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${
                      accountType === 'student' 
                        ? 'border-[#F13E93] bg-[#F13E93]/10 dark:bg-[#F13E93]/20 dark:border-[#F13E93]' 
                        : 'border-gray-200 dark:border-slate-700 hover:border-[#F13E93]/50 dark:hover:border-[#F13E93]/50 bg-white dark:bg-slate-800'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${accountType === 'student' ? 'bg-[#F13E93]/20 dark:bg-[#F13E93]/30 text-[#F13E93] dark:text-[#F13E93]' : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400'}`}>
                      <User size={24} />
                    </div>
                    <span className={`font-semibold text-sm ${accountType === 'student' ? 'text-[#F13E93]' : 'text-gray-600 dark:text-gray-400'}`}>Student</span>
                  </div>

                  <div 
                    onClick={() => setAccountType('educator')}
                    className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${
                      accountType === 'educator' 
                        ? 'border-[#F13E93] bg-[#F13E93]/10 dark:bg-[#F13E93]/20 dark:border-[#F13E93]' 
                        : 'border-gray-200 dark:border-slate-700 hover:border-[#F13E93]/50 dark:hover:border-[#F13E93]/50 bg-white dark:bg-slate-800'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${accountType === 'educator' ? 'bg-[#F13E93]/20 dark:bg-[#F13E93]/30 text-[#F13E93] dark:text-[#F13E93]' : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400'}`}>
                      <Briefcase size={24} />
                    </div>
                    <span className={`font-semibold text-sm ${accountType === 'educator' ? 'text-[#F13E93]' : 'text-gray-600 dark:text-gray-400'}`}>Educator</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F13E93] focus:border-[#F13E93] bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors duration-200"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F13E93] focus:border-[#F13E93] bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors duration-200"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F13E93] focus:border-[#F13E93] bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors duration-200"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-[#F13E93] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F13E93] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[#F13E93] hover:opacity-80 transition-colors">
                Sign in
              </Link>
            </div>
          </div>
          
          {/* Bottom accent bar */}
          <div className="h-2 w-full bg-gradient-to-r from-[#F13E93] to-purple-500"></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
