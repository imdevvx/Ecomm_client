import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

import ProductCard from "../components/ProductCard";
import SkeletonLoader from "../components/loader/SkeletonLoader";

const RelatedProducts = ({ product, grid }) => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (!product?._id) return;

        const fetchRelatedProducts = async () => {
            try {

                const data = await getProducts({
                    color: product.color,
                    limit: 4
                });

                // Remove current product
                const filtered = data.filter(
                    (item) => item._id !== product._id
                );

                setProducts(filtered);

            } catch (error) {
                const message = error.response?.data?.message || 'Something went wrong'
                showToast(message, 'error')
            } finally {
                setIsLoading(false);
            }
        };

        fetchRelatedProducts();

    }, [product]);

    if (isLoading) {
        return (
            <section className="mt-24">
                <div className="mb-8">
                    <span className="text-[11px] font-semibold tracking-[0.12em] text-gray-400 uppercase">
                        Complete The Look
                    </span>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
                        You may also like
                    </h2>
                </div>
                <SkeletonLoader />
            </section>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="mt-24">

            <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                    <span className="text-[11px] font-semibold tracking-[0.12em] text-gray-400 uppercase">
                        Complete The Look
                    </span>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
                        You may also like
                    </h2>
                    <p className="mt-1.5 text-sm text-gray-500">
                        Similar products you might be interested in.
                    </p>
                </div>
            </div>

            <div className="h-px bg-gray-100 w-full mb-8" />

            <ProductCard products={products} grid={grid} />

        </section>
    );
};

export default RelatedProducts;