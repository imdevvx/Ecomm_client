import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectRoute = ({ children }) => {

    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to='/login'
            state={{ from: location }}
            replace />
    }

    return children;
}

export default ProtectRoute;


// Cart, Order, Profile