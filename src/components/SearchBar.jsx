import React, { useState } from 'react'
import ProductCard from './ProductCard';

const SearchBar = ({ search, setSearch }) => {

    return (
        <>
            <div className="w-full md:w-96">
                <div className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>

                    <input
                        type="text"
                        placeholder="Search products..."
                        onChange={(e) => { setSearch(e.target.value) }}
                        className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 text-sm focus:border-black focus:outline-none transition"
                    />
                </div>
            </div>

            {/* <ProductCard products={filter} /> */}
        </>
    )
}

export default SearchBar
