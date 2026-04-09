import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email) return setError('Email is required');
    if (!password) return setError('Password is required');

    try {
      setLoading(true);
      await login(email, password);
      // Redirect to home upon successful login
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      
      {/* Left Pane - Branding/Illustration (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-[#21d2bd] to-[#1db8a5] overflow-hidden">
        {/* Abstract Background Design */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F13E93] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
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
              Welcome back to <br/> your workspace.
            </h1>
            <p className="text-emerald-50 text-lg mb-8 leading-relaxed">
              Sign in to continue exploring top-tier resources, connect with AI tutors, and track your educational roadmap seamlessly.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-50">
                <CheckCircle2 size={24} className="text-[#F13E93]" />
                <span className="font-medium text-lg">Your progress automatically synced</span>
              </div>
            </div>
          </div>
          
          <div className="text-emerald-100/80 text-sm">
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
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Please sign in to your account</p>

            {error && (
              <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-[#F13E93] hover:opacity-80">
                    Forgot password?
                  </a>
                </div>
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
                {loading ? 'Signing In...' : 'Sign In'}
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-[#F13E93] hover:opacity-80 transition-colors">
                Sign up now
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

export default Login;
