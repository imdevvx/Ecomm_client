import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSpecificOrder, cancelOrder } from '../services/orderService';
import Totals from '../components/Totals';
import ProductItem from '../components/ProductItem';

import { useToast } from '../context/ToastContext';

const OrderDetails = () => {
    const { showToast } = useToast();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCancelling, setIsCancelling] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const fetchSpecificOrder = async () => {
            try {
                const data = await getSpecificOrder(id);
                setOrder(data.order);
            } catch (error) {
                const message = error.response?.data?.message || 'Something went wrong'
                showToast(message, 'error')
            } finally {
                setLoading(false);
            }
        };
        fetchSpecificOrder();
    }, [id]);

    const handleCancelOrder = async () => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;

        setIsCancelling(true);
        try {
            const data = await cancelOrder(order._id);
            setOrder(data.order);
            showToast(data.message);
        } catch (error) {
            const message = error.response?.data?.message || 'Something went wrong'
            showToast(message, 'error')
        } finally {
            setIsCancelling(false);
        }
    };

    if (loading) {
        return (
            <div className='flex h-96 items-center justify-center'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black'></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-12 text-center">
                <p className="text-gray-500">Order not found.</p>
                <Link to="/orders" className="mt-4 inline-block text-sm font-medium text-black underline">Back to Orders</Link>
            </div>
        );
    }

    const isCancelled = order.status?.toLowerCase() === 'cancelled';

    return (
        <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>

            {/* Header Meta Info */}
            <div className='border-b border-gray-200 pb-6 mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                    <Link to="/orders" className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-black transition-colors block mb-2">
                        &larr; Back to History
                    </Link>
                    <h1 className='text-2xl font-light tracking-tight text-gray-900 sm:text-3xl'>
                        Order <span className="font-mono text-base bg-gray-100 px-2 py-1 rounded text-gray-700">#{order._id}</span>
                    </h1>
                </div>

                {/* Global Badging Context */}
                <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider border ${isCancelled ? 'bg-red-50 text-red-700 border-red-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                        Status: {order.status}
                    </span>
                </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 items-start">

                {/* Left Side: Items Catalog List */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                        <h2 className="text-base font-medium text-gray-900 mb-4 pb-2 border-b border-gray-50">Items Ordered</h2>
                        <ProductItem items={order.items} editable={false} />
                    </div>

                    {/* Delivery Address Block */}
                    {order.address && (
                        <div className='bg-white border border-gray-100 rounded-xl p-6 shadow-sm'>
                            <h2 className="text-base font-medium text-gray-900 mb-4 pb-2 border-b border-gray-50">Delivery Address</h2>
                            <div className='space-y-1 text-sm text-gray-600'>
                                <p className='font-semibold text-gray-900 text-base'>{order.address.fullName}</p>
                                <p><span className="text-gray-400">Mobile:</span> {order.address.phone}</p>
                                <p className='pt-1 text-gray-700'>{order.address.addressLine}</p>
                                <p className='text-gray-700'>
                                    {order.address.city}, {order.address.state} &ndash; <strong className="text-gray-900 font-medium">{order.address.pincode}</strong>
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side: Order Totals & Metadata Breakdown Summary */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
                        <Totals
                            name='Invoice Summary'
                            items={order.items}
                            totalQuantity={order.totalQuantity}
                            totalPrice={order.totalAmount}
                        />

                        {/* Meta Transaction Metadata Details */}
                        <div className="mt-6 border-t border-gray-200 pt-4 space-y-2.5 text-xs font-medium uppercase tracking-wider text-gray-500">
                            <div className="flex justify-between">
                                <span>Method:</span>
                                <span className="text-gray-900 font-semibold">{order.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Payment:</span>
                                <span className={`font-semibold ${order.paymentStatus?.toLowerCase() === 'paid' ? 'text-green-600' : 'text-amber-600'}`}>
                                    {order.paymentStatus}
                                </span>
                            </div>
                        </div>

                        {/* Order Cancellation CTA Trigger */}
                        <div className="mt-8 pt-4 border-t border-gray-200">
                            <button
                                onClick={handleCancelOrder}
                                disabled={isCancelled || isCancelling}
                                className={`w-full py-3.5 text-center text-sm font-medium uppercase tracking-wider text-white transition-all duration-150 rounded-md shadow-sm ${isCancelled
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                    : 'bg-red-600 hover:bg-red-700 active:scale-[0.99] cursor-pointer'
                                    }`}
                            >
                                {isCancelled ? 'Order Cancelled' : isCancelling ? 'Processing...' : 'Cancel Order'}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderDetails;