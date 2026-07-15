import React, { useState } from 'react'; // 1. Imported useState
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useAddress } from '../../hooks/useAddress';
import { useToast } from '../../context/ToastContext';

const Profile = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { address } = useAddress();
  const { logout, user } = useAuth();

  // 2. Added logout loading state
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const hasAddress =
    address?.fullName &&
    address?.phone &&
    address?.addressLine &&
    address?.city &&
    address?.state &&
    address?.pincode;

  const handleLogout = () => {
    setIsLoggingOut(true); // 3. Set loading state to true instantly
    showToast('Logged out', 'info');
    
    navigate('/', { replace: true });

    setTimeout(() => {
      logout();
      // No need to reset state to false since the layout unmounts upon auth cleanup
    }, 150); // Small buffer to ensure toast + router transition feels fluid
  };

  const handleNavigate = () => {
    navigate("/address", {
      state: {
        from: "/profile",
      },
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

      {/* Dashboard Editorial Header */}
      <div className="border-b border-gray-200 pb-6 mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">Account Settings</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your credentials, order routes, and preferences.</p>
        </div>

        {/* 4. Enhanced UX Sign Out Button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`sm:order-last self-start sm:self-center px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all flex items-center gap-2 border ${
            isLoggingOut
              ? 'text-gray-400 bg-gray-50 border-gray-100 cursor-not-allowed'
              : 'text-red-500 hover:bg-red-50 border-transparent hover:border-red-100 cursor-pointer active:scale-95'
          }`}
        >
          {isLoggingOut && (
            <svg className="animate-spin h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-start">

        {/* Left Aspect Profile Identity Block */}
        <div className="md:col-span-1 rounded-xl border border-gray-100 bg-gray-50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-medium uppercase">
              {user?.email?.slice(0, 2) || 'U'}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">User ID Profile</h2>
              <p className="text-xs text-gray-400">Verified Customer</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <span className="block text-[10px] font-medium uppercase tracking-widest text-gray-400">Email Address</span>
            <span className="text-sm font-medium text-gray-700 break-all">{user?.email}</span>
          </div>

          <Link
            to="/orders"
            className="mt-6 flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-xs font-medium uppercase tracking-wider text-gray-700 hover:border-gray-400 transition-colors shadow-sm"
          >
            <span>View Order History</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Right Aspect Address Meta Control panel */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <h3 className="text-base font-medium text-gray-900 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Default Delivery Address
              </h3>

              {hasAddress && (
                <button
                  onClick={handleNavigate}
                  className="text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-black transition-colors"
                >
                  Edit address
                </button>
              )}
            </div>

            {hasAddress ? (
              <div className="space-y-1 text-sm text-gray-600">
                <p className="font-semibold text-gray-900 text-base">{address.fullName}</p>
                <p><span className="text-gray-400">Mobile:</span> {address.phone}</p>
                <p className="pt-1 text-gray-700">{address.addressLine}</p>
                <p className="text-gray-700">
                  {address.city}, {address.state} &ndash; <strong className="text-gray-900 font-medium">{address.pincode}</strong>
                </p>
              </div>
            ) : (
              <div className="py-4 text-center sm:text-left">
                <p className="text-sm text-gray-500">No primary shipping location configuration loaded into this ledger yet.</p>
                <button
                  onClick={handleNavigate}
                  className="mt-4 inline-flex items-center justify-center bg-black px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95 rounded-md cursor-pointer"
                >
                  Setup Shipping Address
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;