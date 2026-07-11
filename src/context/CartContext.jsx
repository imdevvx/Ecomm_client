import { Children, createContext, useEffect, useState } from "react";

import { getCart, addToCart, updateCart, removeCartItem, clearCart, cartTotal } from "../services/cartService";

import { useAuth } from "../hooks/useAuth";

export const CartContext = createContext();

const CartProvider = ({ children }) => {

    const { token } = useAuth();

    const [cartItems, setCartItems] = useState([]);
    const [cartTotals, setCartTotals] = useState({
        totalQuantity: 0,
        totalPrice: 0
    });

    const refreshCart = async () => {
        await fetchCart();
        await fetchCartTotal();
    }

    /*
    This specific useEffect hook acts as an automatic synchronized trigger 
    that fetches the logged-in user's shopping cart items as soon as they log into our application
    */
    useEffect(() => {
        if (token) {
            refreshCart();
        } 
        else {
            setCartItems([]);
            setCartTotals({ totalQuantity: 0, totalPrice: 0 });
        }
    }, [token])

    const fetchCart = async () => {
        try {
            const data = await getCart();
            setCartItems(data.cart.items)
        } catch (error) {
            throw error
        }
    }

    const addItemToCart = async (productId, size, quantity) => {
        const data = await addToCart(productId, size, quantity);
        await refreshCart();
        return data;
    }

    const updateCartItem = async (productId, size, quantity) => {
        const data = await updateCart(productId, size, quantity)
        await refreshCart();
        return data;
    }

    const removeItemFromCart = async (productId, size) => {
        const data = await removeCartItem(productId, size);
        await refreshCart();
        return data
    }

    const clearUserCart = async () => {
        const data = await clearCart();
        await refreshCart();
        return data
    }

    const fetchCartTotal = async () => {
        const data = await cartTotal();
        setCartTotals(data)
        return data;
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            cartTotals,

            fetchCart,
            addItemToCart,
            updateCartItem,
            removeItemFromCart,
            clearUserCart,
            fetchCartTotal,

            refreshCart
        }}>
            {children}
        </CartContext.Provider>
    )

}

export default CartProvider;