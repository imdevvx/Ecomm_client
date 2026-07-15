import React, { useEffect, useState, useRef } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getSpecificProduct } from '../../services/productService';

import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import RelatedProducts from '../RelatedProducts';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';

import { useToast } from '../../context/ToastContext';

const ProductDetails = () => {
    const { showToast } = useToast();

    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const { addItemToCart } = useCart();

    const [product, setProduct] = useState({});
    const [selectedImageIdx, setSelectedImageIdx] = useState(0);

    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const [isAdding, setIsAdding] = useState(false)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // or "auto"
        });
    }, [params.id]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getSpecificProduct(params.id);
                setProduct(data);
            }
            catch (error) {
                const message = error.response?.data?.message || 'Something went wrong'
                showToast(message, 'error')
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchProduct();
    }, [params.id]);


    if (isLoading) {
        return (
            <div className='flex h-96 items-center justify-center'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black'></div>
            </div>
        );
    }

    const handleAddItemToCart = async () => {

        setIsAdding(true);
        if (!product.isActive) return;

        if (!token) {
            navigate('/login', {
                state: {
                    from: location.pathname,
                    message: 'Please log it to add this item to cart.'
                }
            })
            return
        }

        try {
            const data = await addItemToCart(params.id, selectedSize, quantity);
            showToast('Item added to cart', 'success') // data.message = 'Cart updated successfully
        }
        catch (error) {
            const message = error.response?.data?.message || 'Something went wrong';
            showToast(message, 'error')
        }
        finally{
            setIsAdding(false)
        }

    }

    return (
        <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>

                <ProductGallery
                    images={product.images}
                    selectedImageIdx={selectedImageIdx}
                    setSelectedImageIdx={setSelectedImageIdx}
                />

                <ProductInfo
                    product={product}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    handleAddItemToCart={handleAddItemToCart}
                    isAdding={isAdding}
                />
            </div>
            <RelatedProducts product={product} grid={4} />
        </div>
    )
}

export default ProductDetails;