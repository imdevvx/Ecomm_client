import React from 'react';

const Totals = ({ name = 'Order Summary', items = [], totalQuantity, totalPrice }) => {
    // Arbitrary platform calculations (change/add if needed)
    // const shippingCost = totalPrice > 1000 ? 0 : 99; 

    return (
        <div className="space-y-6">
            {/* Component Title */}
            <h2 className="text-lg font-medium text-gray-900 tracking-tight border-b border-gray-100 pb-3">
                {name}
            </h2>

            {/* Line Items Breakdown */}
            <div className="max-h-60 overflow-y-auto divide-y divide-gray-100 pr-1" style={{ scrollbarWidth: 'thin' }}>
                {items.map((item) => (
                    <div
                        key={`${item.product._id}-${item.size}`}
                        className="flex items-center justify-between py-3 text-sm first:pt-0 last:pb-0"
                    >
                        <div className="flex flex-col pr-4">
                            <span className="font-medium text-gray-800 line-clamp-1">
                               {item.product.brand.toUpperCase()} 
                            </span>
                            <span className="font-medium text-gray-800 line-clamp-1">
                               {item.product.name}
                            </span>
                            <span className="text-xs text-gray-400 mt-0.5">
                                Size: {item.size} &middot; Qty: {item.quantity}
                            </span>
                        </div>
                        <span className="font-medium text-gray-900 flex-shrink-0">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                    </div>
                ))}
            </div>

            {/* Financial Ledger Subtotals */}
            <div className="space-y-2 border-t border-gray-200 pt-4 text-sm">
                <div className="flex justify-between text-gray-500">
                    <span>Total Items</span>
                    <span className="font-medium text-gray-900">{totalQuantity}</span>
                </div>
                
                <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">
                        {/* {shippingCost === 0 ? (
                            <span className="text-green-600 uppercase text-xs font-semibold tracking-wider">Free</span>
                        ) : (
                            `₹${shippingCost}`
                        )} */}
                            <span className="text-green-600 uppercase text-xs font-semibold tracking-wider">Free</span>

                    </span>
                </div>

                {/* Final Absolute Invoice Total */}
                <div className="flex justify-between items-baseline border-t border-gray-200 pt-4 mt-2">
                    <span className="text-base font-semibold text-gray-900">Order Total</span>
                    <span className="text-xl font-bold text-gray-900">
                        ₹{(totalPrice).toLocaleString('en-IN')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Totals;