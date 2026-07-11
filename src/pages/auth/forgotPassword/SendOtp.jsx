import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { sendPassResetOtp } from '../../../services/authService';
import { useToast } from '../../../context/ToastContext';
import { AlertCircle } from 'lucide-react';

const ForgotPassword = () => {

  const { showToast } = useToast();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault(); // Prevents layout routing reloads on form submission
    try {
      setIsSendingOtp(true);
      const data = await sendPassResetOtp(email);

      localStorage.setItem('email', email);

      showToast(data.message, 'success');

      navigate('/forgot-password/reset');
    } 
    catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      showToast(message, "error");
    } 
    finally {
      setIsSendingOtp(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:px-6 lg:px-8">
      {/* Back to Login Anchor */}
      <Link
        to="/login"
        className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-black transition-colors inline-block mb-6"
      >
        &larr; Back to Sign In
      </Link>

      {/* Editorial Title Header Block */}
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight text-gray-900">Recover Password</h1>
        <p className="mt-2 text-sm text-gray-500">
          Enter your registered email address below and we'll send you an recovery code.
        </p>
      </div>

      {/* Form Card Frame Wrapper */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSendOtp} className="space-y-5">

          {/* Target Email Input Field */}
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

          {/* Spam Warning Callout */}
          <div className="flex items-start gap-2.5 rounded-md bg-amber-50/60 border border-amber-100 p-3 text-xs text-amber-800">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-600" />
            <p className="leading-normal">
              <strong>Note:</strong> Since we are currently using a temporary domain, the recovery code might land in your <strong>Spam or Junk folder</strong>. Please check there if it doesn't arrive shortly.
            </p>
          </div>

          {/* Submitting Control Trigger Button */}
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
                'Send Recovery OTP'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;