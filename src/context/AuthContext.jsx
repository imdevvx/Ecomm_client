import React, { createContext, useState } from 'react';
import { loginUser } from '../services/authService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    }
    );

    const [token, setToken] = useState(
        localStorage.getItem('token') || null
    );

    const login = async (email, password) => {
        const data = await loginUser(email, password);

        setToken(data.token);
        setUser(data.user);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        return data;
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{
            token,
            user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

/*
useState is a in-memory state
it Survives navigate bw routes but not page refreshes and closing the browser
*/