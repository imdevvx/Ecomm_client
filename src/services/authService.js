import api from './api.js';

export const sendOtp = async (email, password) => {
    const res = await api.post('/auth/sendotp', {
        email,
        password
    });
    return res.data;
}

export const verifyOtp = async (email, otp) => {
    const res = await api.post('/auth/verifyotp', {
        email,
        otp
    });
    return res.data;
}

export const loginUser = async (email, password) => {
    const res = await api.post('/auth/login', {
        email,
        password
    });
    return res.data;
}

export const sendPassResetOtp = async (email) => {
    const res = await api.post('/auth/forgot-password', {
        email
    });
    return res.data;
}

export const verifyPassResetOtp = async (email, otp) => {
    const res = await api.post('/auth/forgot-password/verify', {
        email,
        otp
    });
    return res.data;
}

export const resetPass = async (email, otp, newPassword) => {
    const res = await api.post('/auth/forgot-password/reset', {
        email,
        otp, 
        newPassword
    });
    return res.data;
}

