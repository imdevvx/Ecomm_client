import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddress } from '../hooks/useAddress';
import { useCart } from '../hooks/useCart';
import { placeOrder } from '../services/orderService';
import Totals from '../components/Totals';

import { useToast } from '../context/ToastContext';

const Checkout = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const { address, loading } = useAddress();
  const { cartItems, cartTotals, clearUserCart } = useCart();

  const hasAddress =
    address?.fullName &&
    address?.phone &&
    address?.addressLine &&
    address?.city &&
    address?.state &&
    address?.pincode;

  if (loading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black'></div>
      </div>
    );
  }

  const handleNavigate = () => {
    navigate('/address', {
      state: {
        from: '/checkout',
      },
    });
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    setIsPlacingOrder(true);

    try {
      const data = await placeOrder(address);
      showToast(data.message, 'success');

      await clearUserCart();
      navigate('/orders');
    } 
    catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      showToast(message, 'error');
    } 
    finally {
      setIsPlacingOrder(false);
    }
  };

  // State fallback if no shipping info exists yet
  if (!hasAddress) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500 mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-light tracking-tight text-gray-900">Delivery Address Missing</h2>
        <p className="mt-2 text-sm text-gray-500">We need your shipping location details to securely route your items.</p>
        <div className="mt-6">
          <button
            onClick={handleNavigate}
            className="w-full inline-flex items-center justify-center bg-black px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-neutral-800 active:scale-95 shadow"
          >
            Add Shipping Address
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl border-b border-gray-200 pb-6">
        Checkout
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 items-start">

        {/* Left Side: Address Details Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <h2 className="text-base font-medium text-gray-900 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Shipping Address
              </h2>
              <button
                onClick={handleNavigate}
                className="text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-black transition-colors"
              >
                Edit info
              </button>
            </div>

            {/* Address Content Block */}
            <div className="space-y-1.5 text-sm text-gray-600">
              <p className="font-semibold text-gray-900 text-base">{address.fullName}</p>
              <p className="pt-0.5"><span className="text-gray-400">Mobile:</span> {address.phone}</p>
              <p className="pt-1 text-gray-700">{address.addressLine}</p>
              <p className="text-gray-700">
                {address.city}, {address.state} &ndash; <strong className="text-gray-900 font-medium">{address.pincode}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Sticky Checkout Sidebar */}
        <div className="lg:col-span-5 lg:sticky lg:top-8 rounded-xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
          <Totals
            name="Review Order Items"
            items={cartItems}
            totalQuantity={cartTotals.totalQuantity}
            totalPrice={cartTotals.totalPrice}
          />

          {/* COD Notice Box */}
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50/60 p-4">
            <div className="flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-amber-900">Cash on Delivery Only</h4>
                <p className="mt-1 text-xs leading-relaxed text-amber-800">
                  We are currently accepting **COD** orders only. Don't worry, you can easily pay via **UPI or online (Net Banking)** directly to the delivery executive when your package arrives!
                </p>
              </div>
            </div>
          </div>

          {/* Place Order Action */}
          <div className="mt-8">
            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder || cartItems.length === 0}
              className={`w-full py-4 text-center text-sm font-medium uppercase tracking-wider text-white transition-all duration-150 rounded-md shadow-md ${isPlacingOrder || cartItems.length === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-black hover:bg-neutral-800 active:scale-[0.99] cursor-pointer'
                }`}
            >
              {isPlacingOrder ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;