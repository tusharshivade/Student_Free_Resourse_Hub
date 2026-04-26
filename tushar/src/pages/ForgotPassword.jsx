import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { GraduationCap, Lock, ArrowRight, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

const ForgotPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!token || !email) {
      setError('Invalid or missing reset token. Please request a new link from the forgot password page.');
    }
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token || !email) return setError('Invalid session. Please request a new link.');
    if (!password) return setError('New password is required');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (password !== confirmPassword) return setError('Passwords do not match');

    try {
      setLoading(true);
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, newPassword: password })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reset password');
      
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      
      {/* Left Pane - Branding/Illustration (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-orange-600 to-red-700 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 p-12 flex flex-col justify-between w-full h-full text-white">
          <Link to="/" className="inline-flex items-center gap-2 group cursor-pointer w-max">
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl">
              <GraduationCap size={36} />
            </div>
            <span className="text-3xl font-bold tracking-tight">EduHub</span>
          </Link>
          
          <div className="flex-1 flex flex-col justify-center max-w-lg mt-12">
             <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
             </div>
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Reset your <br/> password.
            </h1>
            <p className="text-orange-50 text-lg mb-8 leading-relaxed">
              Choose a strong, memorable password to protect your account and your learning progress.
            </p>
          </div>
          
          <div className="text-orange-100/80 text-sm">
            © {new Date().getFullYear()} EduHub
          </div>
        </div>
      </div>

      {/* Right Pane - Reset Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative">
        <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden relative z-10 transition-colors duration-300">
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">New Password</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Please enter your new credentials</p>

            {error && (
              <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 px-4 py-3 rounded-lg flex items-start gap-3">
                <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Password reset successfully! Redirecting to login...</span>
              </div>
            )}

            {!success && token && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F13E93] bg-transparent text-gray-900 dark:text-white transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="confirmPassword">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F13E93] bg-transparent text-gray-900 dark:text-white transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-[#F13E93] text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>
            )}

            {!token && !loading && (
              <div className="text-center py-4">
                <Link to="/forgot-password" size={18} className="inline-flex items-center gap-2 py-3 px-6 bg-slate-100 dark:bg-slate-700 rounded-xl font-bold text-slate-700 dark:text-white hover:bg-slate-200 transition-colors">
                   Request a new link
                </Link>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 text-center text-sm text-gray-600 dark:text-gray-400">
              <Link to="/login" className="font-semibold text-[#F13E93] hover:underline">
                Back to Sign in
              </Link>
            </div>
          </div>
          <div className="h-2 w-full bg-gradient-to-r from-[#F13E93] to-purple-500"></div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
