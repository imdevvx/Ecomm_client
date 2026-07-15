import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ 
    items, 
    onIncrease, 
    onDecrease, 
    editable = false,
    updatingItemId = null // 1. Catch the loading prop from the parent
}) => {
    return (
        <div className="divide-y divide-gray-100 border-b border-gray-100">
            {items.map((item, idx) => {
                // 2. Generate the key for this unique combination
                const currentItemKey = `${item.product._id}_${item.size}`;
                const isCurrentLoading = updatingItemId === currentItemKey;

                return (
                    <div 
                        key={idx} 
                        className={`flex gap-4 py-6 sm:gap-6 first:pt-0 last:pb-0 transition-opacity duration-200 ${
                            isCurrentLoading ? 'opacity-60' : ''
                        }`}
                    >
                        
                        {/* Product Image */}
                        <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 border border-gray-100 sm:h-36 sm:w-36">
                            <Link to={`/product/${item.product._id}`}>
                                <img 
                                    className="h-full w-full object-cover object-center" 
                                    src={item.product.images?.[0]} 
                                    alt={item.product.name} 
                                />
                            </Link>
                        </div>

                        {/* Product Details Wrapper */}
                        <div className="flex flex-1 flex-col justify-between sm:flex-row">
                            <div className="space-y-1 pr-4">
                                {/* Title & Description */}
                                <h3 className="text-base font-medium text-gray-900 sm:text-lg">{item.product.brand?.toUpperCase()}</h3>
                                <p className="hidden text-xs text-gray-400 sm:block max-w-md line-clamp-2">
                                    {item.product.name}
                                </p>
                                
                                {/* Selected Meta Specs */}
                                <div className="pt-1 flex gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <span>Size: <strong className="text-gray-900">{item.size}</strong></span>
                                    {!editable && (
                                        <span>Qty: <strong className="text-gray-900">{item.quantity}</strong></span>
                                    )}
                                </div>
                            </div>

                            {/* Interactive UI Action / Price Area */}
                            <div className="mt-4 flex items-center justify-between gap-4 sm:mt-0 sm:flex-col sm:items-end sm:justify-start sm:space-y-4">
                                
                                {/* Custom Action Control Counter */}
                                {editable ? (
                                    <div className="flex items-center border border-gray-200 rounded-md shadow-sm h-9 bg-white">
                                        <button
                                            type="button"
                                            onClick={() => onDecrease(item)}
                                            disabled={isCurrentLoading} // 3. Disable minus button during API request
                                            className="px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors font-medium h-full flex items-center disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:opacity-40"
                                        >
                                            &minus;
                                        </button>

                                        {/* 4. Display a tiny spinner instead of the number when updating */}
                                        <span className="px-2 text-sm font-semibold text-gray-900 min-w-[1.75rem] text-center select-none flex items-center justify-center">
                                            {isCurrentLoading ? (
                                                <svg className="animate-spin h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                            ) : (
                                                item.quantity
                                            )}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => onIncrease(item)}
                                            disabled={isCurrentLoading} // 5. Disable plus button during API request
                                            className="px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors font-medium h-full flex items-center disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:opacity-40"
                                        >
                                            &#43;
                                        </button>
                                    </div>
                                ) : (
                                    <div className="hidden sm:block" />
                                )}

                                {/* Total Line Item Price */}
                                <p className="text-base font-medium text-gray-900">
                                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>

                    </div>
                );
            })}
        </div>
    );
};

export default ProductItem;