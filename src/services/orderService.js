import api from './api.js';

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const placeOrder = async (address) => {
    const res = await api.post('/order', address)
    return res.data;
}

export const getOrders = async () => {
    const res = await api.get('/order')
    return res.data;
}

export const getSpecificOrder = async (id) => {
    const res = await api.get(`/order/${id}`)
    return res.data;
}

export const cancelOrder = async (id) => {
    const res = await api.post(`/order/${id}/cancel`)
    return res.data;
}