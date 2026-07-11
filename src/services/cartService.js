import api from './api.js'
// import { useAuth } from '../hooks/useAuth.js';

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


export const getCart = async () => {
    const res = await api.get('/cart');
    return res.data;
}

export const addToCart = async (productId, size, quantity) => {
    const res = await api.post('/cart/add', {
        productId,
        size,
        quantity
    });
    return res.data;
}

export const updateCart = async (productId, size, quantity) => {
    const res = await api.put('/cart/update', {
        productId,
        size,
        quantity
    })
    return res.data;
}

export const clearCart = async () => {
    const res = await api.delete('/cart/clear')
    return res.data;
}

// id from params, size and token from frontend
export const removeCartItem = async (productId, size) => {
    const res = await api.delete(`/cart/remove/${productId}`, {
        data: {
            size
        }
    })
    return res.data;
}

export const cartTotal = async () => {
    const res = await api.get('/cart/total')
    return res.data;
}
