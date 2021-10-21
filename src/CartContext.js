import React, { useState, createContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);

    const addProductToCart = (id, qty) => {
        //console.log(cartProducts);

        if(cartProducts.find(x => x.id === id) !== undefined){
            cartProducts.find(x => x.id === id).quantity = cartProducts.find(x => x.id === id).quantity + qty;
        } else {
            setCartProducts([...cartProducts, {'id': id, 'quantity': qty}]);
        }
    }

    const removeItem = (id) => {
        setCartProducts(cartProducts.filter(x => x.id != id));
    }

    const clearCart = () => {
        cartProducts = [];
    }

    return (
		<CartContext.Provider value={[cartProducts, addProductToCart, removeItem, clearCart]}>
			{children}
		</CartContext.Provider>
	);
}