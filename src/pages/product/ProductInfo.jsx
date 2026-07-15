import React from 'react'
import SizeSelector from './SizeSelector'

const ProductInfo = ({
    product,
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
    handleAddItemToCart,
    isAdding = false // 1. Added isAdding prop with a default fallback
}) => {
    const needsSize = product.sizes?.length > 0 && !selectedSize;
    const isSoldOut = !product.isActive;
    
    // The button should be disabled if it's sold out, needs a size, OR is currently adding to cart
    const isButtonDisabled = isSoldOut || needsSize || isAdding;

    return (
        <div className='flex flex-col justify-start pr-0 md:pr-8'>
            <span className='text-[13px] font-semibold tracking-[0.12em] text-gray-600 uppercase'>
                {product.brand?.toUpperCase()} Collection
            </span>
            <h1 className='mt-2 text-4xl font-semibold text-gray-900 sm:text-4xl'>{product.name}</h1>
            <p className='mt-3 text-xl font-semibold text-gray-900'>₹{product.price?.toLocaleString('en-IN')}</p>

            <div className='h-px bg-gray-100 w-full my-6' />

            <div className='space-y-2'>
                <h3 className='text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400'>Description</h3>
                <p className='text-base leading-relaxed text-gray-600'>{product.description}</p>
            </div>

            <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
            />

            {/* Quantity Selector */}
            <div className='mt-8'>
                <h3 className='text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400'>Quantity</h3>
                <div className={`mt-3 inline-flex items-center bg-gray-100 rounded-lg p-1 w-max transition-opacity ${isAdding ? 'opacity-50' : ''}`}>
                    <button
                        type='button'
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        disabled={isAdding} // 2. Disable minus button during API call
                        className='w-9 h-9 flex items-center justify-center rounded-md text-gray-600 hover:bg-white hover:shadow-sm font-medium transition-all disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none'
                    >
                        −
                    </button>
                    <span className='w-10 text-center text-sm font-semibold text-gray-900'>
                        {quantity}
                    </span>
                    <button
                        type='button'
                        onClick={() => setQuantity(prev => prev + 1)}
                        disabled={isAdding} // 3. Disable plus button during API call
                        className='w-9 h-9 flex items-center justify-center rounded-md text-gray-600 hover:bg-white hover:shadow-sm font-medium transition-all disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none'
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Add to Cart CTA */}
            <div className='mt-8'>
                <button
                    type='button'
                    onClick={handleAddItemToCart}
                    disabled={isButtonDisabled} // 4. Updated disabled logic
                    className={`w-full py-4 text-center text-sm font-semibold uppercase tracking-wider text-white rounded-lg transition-all duration-150 active:scale-[0.99] shadow-sm flex items-center justify-center gap-2 ${
                        isButtonDisabled
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-gray-900 hover:bg-gray-800 cursor-pointer'
                    }`}
                >
                    {/* 5. Dynamic text and simple loading spinner */}
                    {isAdding && (
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                    )}
                    {isSoldOut ? 'Sold Out' : needsSize ? 'Select a size' : isAdding ? 'Adding to cart...' : 'Add to cart'}
                </button>
            </div>

            {/* Delivery & Returns */}
            <div className='mt-6 space-y-3 rounded-lg bg-gray-50 p-4'>
                <div className='flex items-center gap-3 text-sm text-gray-600'>
                    <span className='text-gray-400'>⟳</span>
                    Free returns within 15 days
                </div>
                <div className='flex items-center gap-3 text-sm text-gray-600'>
                    <span className='text-gray-400'>⚑</span>
                    Standard delivery in 2-3 business days
                </div>
            </div>

        </div>
    )
}

export default ProductInfo