import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";

import { verifyPassResetOtp, resetPass } from '../../../services/authService';
import { useToast } from '../../../context/ToastContext';


const ResetPassword = () => {

  const { showToast } = useToast();

  const navigate = useNavigate();
  const email = localStorage.getItem('email')

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isResettingPass, setIsResettingPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPass = async (e) => {
    e.preventDefault(); // Prevents layout routing reloads
    try {
      setIsResettingPass(true);
      const data1 = await verifyPassResetOtp(email, otp);
      const data2 = await resetPass(email, otp, newPassword);

      localStorage.removeItem('email');

      showToast(`${data1.message} & ${data2.message}`, 'success');
      navigate('/login');
    }
    catch (error) {
      const message = error.response?.data?.msg || 'Something went wrong';
      showToast(message, "error");
    }
    finally {
      setIsResettingPass(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:px-6 lg:px-8">
      {/* Editorial Title Header Block */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light tracking-tight text-gray-900">Reset Password</h1>
        <p className="mt-2 text-sm text-gray-500">
          Enter the security code sent to <span className="font-medium text-gray-900">{email}</span> along with your new password credentials.
        </p>
      </div>

      {/* Card Content Wrapper */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleResetPass} className="space-y-5">

          {/* OTP Input Field */}
          <div>
            <label htmlFor="otp" className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2 text-center">
              Verification Security Code
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

          {/* New Password Input Field */}
          {/* New Password Input Field */}
          <div>
            <label
              htmlFor="new-password"
              className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2"
            >
              Create New Password
            </label>

            <div className="relative">
              <input
                id="new-password"
                type={showPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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

            <p className="mt-2 text-xs text-gray-500">
              Use at least 8 characters with letters and numbers.
            </p>
          </div>

          {/* Core Submitting Control Trigger Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isResettingPass || otp.length !== 6 || !newPassword}
              className={`w-full py-3.5 text-center text-sm font-medium uppercase tracking-wider text-white shadow-sm transition-all duration-150 active:scale-[0.99] rounded-md ${isResettingPass || otp.length !== 6 || !newPassword
                ? 'bg-gray-300 cursor-not-allowed shadow-none'
                : 'bg-black hover:bg-neutral-800 cursor-pointer'
                }`}
            >
              {isResettingPass ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  Updating Password...
                </span>
              ) : (
                'Update Password'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;