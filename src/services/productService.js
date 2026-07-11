import api from './api.js';

export const getProducts = async (params = {}) => {
    const res = await api.get(`/product`, {
        params
    });
    return res.data.products;
}

export const getSpecificProduct = async (id) => {
    const res = await api.get(`/product/${id}`)
    return res.data.product;
}