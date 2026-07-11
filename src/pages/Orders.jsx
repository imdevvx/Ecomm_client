import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../services/orderService';
import OrderItem from '../components/OrderItem';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrders();
        setOrders(data.orders || []);
      } catch (error) {
        const message = error.response?.data?.message || 'Something went wrong'
        showToast(message, 'error')
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md mb-8" />
        <div className="space-y-6">
          <div className="h-44 w-full bg-gray-50 border border-gray-100 rounded-xl animate-pulse" />
          <div className="h-44 w-full bg-gray-50 border border-gray-100 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  // Graceful state fallback for customer accounts with 0 completed orders
  if (!orders || orders.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 text-gray-400 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <h2 className="text-2xl font-light tracking-tight text-gray-900">No orders found</h2>
        <p className="mt-2 text-base text-gray-500">You haven't placed any purchases through this profile ledger yet.</p>
        <div className="mt-8">
          <Link
            to="/"
            state={{
              scrollToProducts: true
            }}
            className="inline-flex items-center justify-center bg-black px-6 py-3 text-sm font-medium uppercase tracking-wider text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Editorial Header Section */}
      <div className="border-b border-gray-200 pb-6 mb-10">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">Order History</h1>
        <p className="mt-2 text-sm text-gray-500">
          Track fulfillment progress or review invoices for your records.
        </p>
      </div>

      {/* Orders Dynamic Map Interface List */}
      <div className="space-y-8">
        <OrderItem orders={orders} />
      </div>
    </div>
  );
};

export default Orders;