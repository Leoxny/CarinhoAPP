import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState({})

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const updatedItems = {
                ...prevItems,
                [product.id]: {
                    ...product,
                    quantidade: (prevItems[product.id]?.quantidade || 0) + 1,
                },
            };
            return updatedItems;
        });
    };

    const removeFromCart = (product) => {
        setCartItems((prevItems) => {
            const updatedItems = {
                ...prevItems,
                [product.id]: {
                    ...product,
                    quantidade: Math.max((prevItems[product.id]?.quantidade || 0) - 1, 0),
                },
            };
            return updatedItems;
        });
    };

    const getTotalItems = () => {
        const totalItems = Object.values(cartItems).reduce(
            (total, item) => total + (item.quantidade || 0),
            0
        );
        return totalItems;
    };


    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                getTotalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

