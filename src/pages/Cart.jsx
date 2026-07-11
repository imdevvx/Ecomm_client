import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import ProductItem from '../components/ProductItem';
import Totals from '../components/Totals';

import { useToast } from '../context/ToastContext';

const Cart = () => {

  const { showToast } = useToast();

  const navigate = useNavigate();

  const {
    cartItems,
    updateCartItem,
    removeItemFromCart,
    cartTotals,
    clearUserCart
  } = useCart();

  const showError = (error) => {
    showToast(
      error.response?.data?.message || "Something went wrong",
      "error"
    );
  };

  const handleDecItem = async (item) => {
    if (item.quantity === 1) {
      try {
        await removeItemFromCart(item.product._id, item.size);
      }
      catch (error) {
        showError(error)
      }
      return;
    }

    try {
      await updateCartItem(
        item.product._id,
        item.size,
        item.quantity - 1
      );
    }
    catch (error) {
      showError(error)
    }

  };

  const handleIncItem = async (item) => {
    try {
      await updateCartItem(
        item.product._id,
        item.size,
        item.quantity + 1
      );
    }
    catch (error) {
      showError(error)
    }

  };

  const handleClearCart = async () => {
    try {
      const data = await clearUserCart();
      showToast(data.message, 'info');
    }
    catch (error) {
      showError(error)
    }
  };

  // State fallback for empty cart
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gray-50 text-gray-400 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="text-2xl font-light tracking-tight text-gray-900 sm:text-3xl">Your cart is empty</h1>
        <p className="mt-3 text-base text-gray-500">Looks like you haven't added anything to your cart yet.</p>
        <div className="mt-8">
          <Link
            to="/"
            state={
              { scrollToProducts: true }
            }
            className="inline-flex items-center justify-center bg-black px-6 py-3 text-sm font-medium uppercase tracking-wider text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      {/* Header section with Clear Cart action */}
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">Your Cart</h1>
        <button
          onClick={handleClearCart}
          className="text-xs font-medium uppercase tracking-wider text-red-500 hover:text-red-700 transition-colors cursor-pointer"
        >
          Clear entire cart
        </button>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 items-start">

        {/* Left Column: Cart Items (Takes up 7 spaces on desktop) */}
        <div className="lg:col-span-7 space-y-4">
          <ProductItem
            items={cartItems}
            editable={true}
            onIncrease={handleIncItem}
            onDecrease={handleDecItem}
          />
        </div>

        {/* Right Column: Checkout Summary (Sticky Sidebar - Takes up 5 spaces) */}
        <div className="lg:col-span-5 lg:sticky lg:top-8 rounded-xl border border-gray-100 bg-gray-50 p-6 sm:p-8">

          <Totals
            name="Order Summary"
            items={cartItems}
            totalQuantity={cartTotals.totalQuantity}
            totalPrice={cartTotals.totalPrice}
          />

          {/* Checkout CTA */}
          <div className="mt-8">
            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-4 bg-black hover:bg-neutral-800 text-white text-center text-sm font-medium uppercase tracking-wider transition-all duration-150 active:scale-[0.99] cursor-pointer shadow-md rounded-md"
            >
              Proceed to Checkout
            </button>
          </div>

          {/* Secure transaction notice */}
          <p className="mt-4 text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 012 2H3a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure Checkout • Easy Returns
          </p>

        </div>

      </div>
    </div>
  );
};

export default Cart;