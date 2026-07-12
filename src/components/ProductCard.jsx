import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ products, grid = 3 }) => {
    return (
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-12`}>
            {products.map((product) => {

                const isSoldOut = !product.isActive; // if product.isActive = true; then isSoldOut = false

                return (
                    <Link
                        key={product._id}
                        to={`/product/${product._id}`}
                        className="group flex flex-col text-center"
                    >
                        {/* Image Wrapper */}
                        <div className="relative overflow-hidden aspect-4/5 bg-[#f5f5f5]">
                            {/* Sold Out Badge */}
                            {isSoldOut && (
                                <div className="absolute top-2 left-2 z-10 bg-black/80 backdrop-blur-[2px] text-white text-[10px] font-semibold tracking-widest px-2.5 py-1 uppercase rounded-sm select-none">
                                    Sold Out
                                </div>
                            )}
                            {/* Product Image */}
                            <img
                                src={product.images[0]}
                                className="absolute inset-0 w-full h-full object-cover"
                                alt={product.name}
                                loading="lazy"
                            />

                            {/* Optional: Second Image Hover Swap if your data has it */}
                            {product.images[1] && (
                                <img
                                    src={product.images[1]}
                                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    alt={product.name}
                                />
                            )}

                            {/* Exact "QUICK VIEW" Hover Overlay from image_c0de7c.jpg */}
                            <div className="absolute bottom-0 left-0 right-0 bg-white/70 backdrop-blur-[1px] py-2.5 text-center translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 ease-out">
                                <span className="text-[13px] font-semibold tracking-wider text-gray-800 uppercase">
                                    QUICK VIEW
                                </span>
                            </div>
                        </div>

                        {/* Product Details Area */}
                        <div className="mt-3 flex flex-col items-center px-1">
                            {/* Brand Name */}
                            <span className="text-sm font-semibold text-gray-900 tracking-wide capitalize">
                                {product.brand || "Brand"}
                            </span>


                            {/* Product Title / Description */}
                            <h3 className="text-[13px] text-gray-800 mt-1 line-clamp-2 h-9 leading-tight max-w-[90%]">
                                {product.name}
                            </h3>

                            {/* Original Price */}
                            <p className="text-sm font-semibold text-gray-800 mt-1">
                                ₹{product.price?.toLocaleString('en-IN')}
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default ProductCard;