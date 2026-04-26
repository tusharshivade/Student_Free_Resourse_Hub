import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const RequestReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) return setError('Email is required');

    try {
      setLoading(true);
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send reset link');
      
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-orange-600 to-red-700 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>
        <div className="relative z-10 p-12 flex flex-col justify-between w-full h-full text-white">
          <Link to="/" className="inline-flex items-center gap-2">
            <GraduationCap size={36} />
            <span className="text-3xl font-bold tracking-tight">EduHub</span>
          </Link>
          <div className="max-w-lg">
            <h1 className="text-5xl font-extrabold mb-6">Lost your password?</h1>
            <p className="text-orange-50 text-lg">No worries! It happens to the best of us. Just enter your email and we'll send you a secure link to get back in.</p>
          </div>
          <div className="text-sm opacity-70">© {new Date().getFullYear()} EduHub</div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Enter the email associated with your account</p>

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {message ? (
            <div className="text-center">
              <div className="mb-6 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 px-4 py-6 rounded-xl flex flex-col items-center gap-4">
                <CheckCircle2 size={48} />
                <p className="font-medium">{message}</p>
              </div>
              <Link to="/login" className="text-[#F13E93] font-semibold hover:underline">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F13E93]"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 bg-[#F13E93] text-white rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
                {!loading && <ArrowRight size={18} />}
              </button>
              <div className="text-center">
                <Link to="/login" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#F13E93]">Return to Sign in</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestReset;
