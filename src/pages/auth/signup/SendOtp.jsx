import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { sendOtp } from '../../../services/authService';
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useToast } from '../../../context/ToastContext';

const SendOtp = () => {

  const { showToast } = useToast();

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault(); // Prevents page refresh on form submit
    try {
      setIsSendingOtp(true);
      const data = await sendOtp(email, password);

      localStorage.setItem('email', email);
      localStorage.setItem('password', password);

      showToast(data.message,'success');

      navigate('/signup/verify', {
        state: location.state
      });
    } 
    catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      showToast(message, 'error');
    } 
    finally {
      setIsSendingOtp(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:px-6 lg:px-8">
      {/* Editorial Title Block */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light tracking-tight text-gray-900">Create Account</h1>
        <p className="mt-2 text-sm text-gray-500">Enter your credentials to receive a verification security code.</p>
      </div>

      {/* Form Container Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSendOtp} className="space-y-5">

          {/* Email Address Input */}
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

          {/* Password Input */}
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2"
            >
              Create Password
            </label>

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
                onClick={() => setShowPassword((prev) => !prev)}
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

          {/* Spam Warning Callout */}
          <div className="flex items-start gap-2.5 rounded-md bg-amber-50/60 border border-amber-100 p-3 text-xs text-amber-800">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-600" />
            <p className="leading-normal">
              <strong>Note:</strong> Since we are currently using a temporary domain, the verification code might land in your <strong>Spam or Junk folder</strong>. Please check there if it doesn't arrive shortly.
            </p>
          </div>

          {/* CTA Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSendingOtp}
              className={`w-full py-3.5 text-center text-sm font-medium uppercase tracking-wider text-white shadow-sm transition-all duration-150 active:scale-[0.99] rounded-md ${isSendingOtp ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-neutral-800 cursor-pointer'
                }`}
            >
              {isSendingOtp ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  Sending Code...
                </span>
              ) : (
                'Send OTP'
              )}
            </button>
          </div>
        </form>

        {/* Bottom Redirection Navigation */}
        <div className="mt-6 border-t border-gray-100 pt-5 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              to="/login"
              state={location.state}
              className="font-semibold text-gray-900 underline underline-offset-4 hover:text-neutral-700 transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SendOtp;