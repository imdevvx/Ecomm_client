import api from './api.js';

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const updateAddress = async (
    fullName,
    phone,
    addressLine,
    city,
    state,
    pincode) => {
    const res = await api.put('/address', {
        fullName,
        phone,
        addressLine,
        city,
        state,
        pincode
    })
    return res.data;
}

export const getAddress = async () => {
    const res = await api.get('/address');
    return res.data;
}