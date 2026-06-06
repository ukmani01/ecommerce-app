import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PERKS = [
  'Exclusive member deals & early access',
  'Free delivery on your first order',
  'Easy returns & exchanges',
  'Personalized style recommendations',
];

const Register = () => {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) return;
    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);
    if (result.success) navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-white">

      <style>{`
        @keyframes auth-fade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .auth-field:focus {
          outline: none;
          border-color: #a3a3a3;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
        }
      `}</style>

      {/* ── LEFT PANEL ──────────────────────────────────────── */}
      <div className="
        hidden lg:flex lg:w-[46%] xl:w-1/2
        relative flex-col justify-between
        bg-neutral-950 overflow-hidden
        p-12 xl:p-16
      ">

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.03)_0%,_transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />

        {/* Brand */}
        <div style={{ animation: 'auth-fade 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}>
          <span className="font-display text-2xl italic text-white tracking-tight">Drape</span>
        </div>

        {/* Value proposition */}
        <div
          className="max-w-sm"
          style={{ animation: 'auth-fade 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}
        >
          <div className="w-6 h-px bg-neutral-600 mb-8" />
          <h2 className="font-display text-2xl xl:text-3xl italic leading-snug text-neutral-200 mb-8">
            Join the Drape community
          </h2>
          <ul className="space-y-4">
            {PERKS.map((perk, i) => (
              <li
                key={perk}
                className="flex items-center gap-3"
                style={{ animation: `auth-fade 0.5s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.07}s both` }}
              >
                <span className="w-1 h-1 rounded-full bg-neutral-500 flex-shrink-0" />
                <span className="text-sm text-neutral-400 leading-snug">{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div
          className="text-xs text-neutral-700 tracking-wide"
          style={{ animation: 'auth-fade 0.5s cubic-bezier(0.16,1,0.3,1) 0.65s both' }}
        >
          © 2025 Drape. All rights reserved.
        </div>

      </div>

      {/* ── RIGHT PANEL ─────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-neutral-50">

        <div
          className="w-full max-w-sm"
          style={{ animation: 'auth-fade 0.55s cubic-bezier(0.16,1,0.3,1) 0.15s both' }}
        >

          {/* Mobile brand */}
          <div className="lg:hidden mb-10">
            <Link to="/" className="font-display text-2xl text-neutral-900 italic">Drape</Link>
          </div>

          {/* Page heading */}
          <div className="mb-8">
            <h1 className="text-xl font-semibold text-neutral-900 tracking-tight mb-1">
              Create account
            </h1>
            <p className="text-sm text-neutral-400">
              Start your style journey today.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-[0_1px_8px_rgba(0,0,0,0.06)] p-6 sm:p-8">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-[0.14em] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    strokeWidth={1.8}
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ravi Kumar"
                    required
                    className="
                      auth-field w-full pl-9 pr-4 py-2.5
                      text-sm text-neutral-900 placeholder-neutral-300
                      bg-neutral-50 border border-neutral-200 rounded-lg
                      transition-all duration-200
                    "
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-[0.14em] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    strokeWidth={1.8}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="
                      auth-field w-full pl-9 pr-4 py-2.5
                      text-sm text-neutral-900 placeholder-neutral-300
                      bg-neutral-50 border border-neutral-200 rounded-lg
                      transition-all duration-200
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-[0.14em] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    strokeWidth={1.8}
                  />
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    required
                    minLength={6}
                    className="
                      auth-field w-full pl-9 pr-10 py-2.5
                      text-sm text-neutral-900 placeholder-neutral-300
                      bg-neutral-50 border border-neutral-200 rounded-lg
                      transition-all duration-200
                    "
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="
                      absolute right-3.5 top-1/2 -translate-y-1/2
                      text-neutral-400 hover:text-neutral-600
                      transition-colors duration-200
                    "
                  >
                    {showPwd ? <EyeOff size={14} strokeWidth={1.8} /> : <Eye size={14} strokeWidth={1.8} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full py-2.5 mt-1 rounded-lg
                  bg-neutral-900 text-white
                  text-sm font-medium tracking-wide
                  transition-all duration-300
                  hover:bg-black hover:-translate-y-px
                  hover:shadow-[0_4px_16px_rgba(0,0,0,0.18)]
                  active:translate-y-0 active:shadow-none
                  disabled:opacity-50 disabled:cursor-not-allowed
                  disabled:hover:translate-y-0 disabled:hover:shadow-none
                "
              >
                {loading
                  ? <span className="flex items-center justify-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Creating account
                    </span>
                  : 'Create Account'
                }
              </button>

            </form>

          </div>

          {/* Sign in link */}
          <p className="text-center text-sm text-neutral-400 mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-neutral-700 font-medium hover:text-neutral-900 transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Register;