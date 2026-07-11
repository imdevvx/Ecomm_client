import React from 'react'

const SizeSelector = ({ sizes, selectedSize, setSelectedSize }) => {
    return (
        <>
            {sizes && sizes.length > 0 && (
                <div className='mt-8'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-sm font-medium text-gray-900'>Select Size</h3>
                    </div>
                    <div className='mt-3 flex flex-wrap gap-3'>
                        {sizes.map((size) => (
                            <button
                                key={size}
                                type='button'
                                onClick={() => { setSelectedSize(size) }}
                                className={`flex h-12 w-16 items-center justify-center border text-sm font-medium transition-all duration-150 active:scale-95 cursor-pointer ${selectedSize === size
                                    ? 'border-black bg-black text-white'
                                    : 'border-gray-200 bg-white text-gray-900 hover:border-gray-400'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default SizeSelector
