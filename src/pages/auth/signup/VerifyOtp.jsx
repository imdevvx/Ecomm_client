import React, { useState } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';

import { verifyOtp } from '../../../services/authService';
import { useAuth } from '../../../hooks/useAuth';
import { useToast } from '../../../context/ToastContext';

const VerifyOtp = () => {

  const { showToast } = useToast();

  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');

  const handleVerifyOtp = async (e) => {
    e.preventDefault(); // Prevents layout routing reloads

    try {
      setIsVerifying(true);
      const data1 = await verifyOtp(email, otp);
      const data2 = await login(email, password);

      localStorage.removeItem('email');
      localStorage.removeItem('password');

      showToast(`${data1.message} & ${data2.message}`, 'success');

      navigate(location.state?.from || '/');
    } 
    catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      showToast(message, "error");
    } 
    finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:px-6 lg:px-8">
      {/* Editorial Title Block */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light tracking-tight text-gray-900">Security Verification</h1>
        <p className="mt-2 text-sm text-gray-500">
          We sent a 6-digit verification code to <span className="font-medium text-gray-900">{email}</span>
        </p>
      </div>

      {/* Input Verification Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleVerifyOtp} className="space-y-5">

          {/* OTP Code Entry Field */}
          <div>
            <label htmlFor="otp" className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2 text-center">
              Enter Verification Code
            </label>
            <input
              id="otp"
              type="text"
              pattern="\d*"
              maxLength={6}
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Restricts layout entries strictly to digits
              placeholder="000000"
              className="w-full tracking-[1em] text-center font-mono text-xl px-4 py-3 rounded-md border border-gray-200 placeholder-gray-300 focus:border-black focus:outline-none transition-colors"
            />
          </div>

          {/* Core Submitting Control Trigger */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isVerifying || otp.length !== 6}
              className={`w-full py-3.5 text-center text-sm font-medium uppercase tracking-wider text-white shadow-sm transition-all duration-150 active:scale-[0.99] rounded-md ${isVerifying || otp.length !== 6
                ? 'bg-gray-300 cursor-not-allowed shadow-none'
                : 'bg-black hover:bg-neutral-800 cursor-pointer'
                }`}
            >
              {isVerifying ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  Verifying...
                </span>
              ) : (
                'Verify'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;