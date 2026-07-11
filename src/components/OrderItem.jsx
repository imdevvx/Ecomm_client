import React from 'react';
import { Link } from 'react-router-dom';

const OrderItem = ({ orders = [] }) => {
    
    // Dynamic background/text styling colors based on order statuses
    const getStatusStyles = (status) => {
        const lower = status?.toLowerCase() || '';
        if (lower.includes('deliver')) return 'bg-green-50 text-green-700 border-green-100';
        if (lower.includes('cancel')) return 'bg-red-50 text-red-700 border-red-100';
        if (lower.includes('ship') || lower.includes('transit')) return 'bg-blue-50 text-blue-700 border-blue-100';
        return 'bg-amber-50 text-amber-700 border-amber-100'; // Default / Pending
    };

    return (
        <div className="space-y-4">
            {orders.map((order) => {
                const firstItem = order.items?.[0];
                if (!firstItem) return null;

                return (
                    <Link 
                        to={`/orders/${order._id}`}
                        key={order._id}
                        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border border-gray-100 rounded-xl p-5 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
                    >
                        {/* Left Section: Image and Order Meta Info */}
                        <div className="flex gap-4 items-center">
                            
                            {/* Stacked Image Container */}
                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
                                <img
                                    src={firstItem.product?.images?.[0]}
                                    alt={firstItem.product?.name || "Product view"}
                                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                />

                                {order.items.length > 1 && (
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center text-white text-xs font-semibold">
                                        +{order.items.length - 1} more
                                    </div>
                                )}
                            </div>

                            {/* Text Summary Info */}
                            <div className="space-y-1">
                                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-black transition-colors">
                                    Order #{order._id.slice(-8).toUpperCase()} {/* Clean user friendly ID view */}
                                </h3>
                                <p className="text-xs text-gray-400">
                                    Placed on {" "}
                                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                                <p className="text-xs font-medium text-gray-500 sm:hidden">
                                    Total Amount: <span className="text-gray-900">₹{order.totalAmount?.toLocaleString('en-IN')}</span>
                                </p>
                            </div>
                        </div>

                        {/* Right Section: Badges & Price Ledger */}
                        <div className="flex items-center justify-between border-t border-gray-50 pt-3 sm:pt-0 sm:border-0 sm:flex-col sm:items-end sm:gap-2.5">
                            
                            {/* Dynamic Order Status Token Badge */}
                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${getStatusStyles(order.status)}`}>
                                {order.status}
                            </span>

                            {/* Financial Details Stack */}
                            <div className="flex items-center gap-3 text-xs sm:text-sm">
                                <span className="inline-flex items-center rounded bg-gray-50 px-2 py-0.5 font-medium text-gray-500 uppercase tracking-tight text-[11px] border border-gray-100">
                                    {order.paymentMethod}
                                </span>

                                <span className="hidden sm:inline-block font-semibold text-gray-900 text-base">
                                    ₹{order.totalAmount?.toLocaleString('en-IN')}
                                </span>
                            </div>

                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default OrderItem;