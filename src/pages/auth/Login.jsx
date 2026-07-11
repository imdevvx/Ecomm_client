import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';

const Login = () => {

  const { showToast } = useToast();

  const navigate = useNavigate();
  const location = useLocation();

  const { login, token } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from || '/';
  const message = location.state?.message;

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true })
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page reload on form submit

    try {
      setIsLoading(true);
      const data = await login(email, password);
      showToast(data.message, 'success')
    }
    catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      showToast(message, 'error')
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:px-6 lg:px-8">
      {/* Decorative Title Block */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light tracking-tight text-gray-900">BRAND LOGIN</h1>
        <p className="mb-6 rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 my-2">
          {message || "Please sign in with email and password."}
        </p>
      </div>

      {/* Login Card Panel */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email Input Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
            />
          </div>

          {/* Password Input Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Password
              </label>

              <Link
                to="/forgot-password"
                state={location.state}
                className="text-xs font-medium text-gray-400 hover:text-black transition-colors"
              >
                Forgot?
              </Link>
            </div>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
              />

              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Action Control Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 text-center text-sm font-medium uppercase tracking-wider text-white shadow-sm transition-all duration-150 active:scale-[0.99] rounded-md ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-neutral-800 cursor-pointer'
                }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        {/* Bottom Context Router Link Redirection */}
        <div className="mt-6 border-t border-gray-100 pt-5 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link
              to="/signup"
              state={location.state}
              className="font-semibold text-gray-900 underline underline-offset-4 hover:text-neutral-700 transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;