import {useState} from 'react';
import { CartContext } from './CartContext';

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === productToAdd._id);

            if (existingItem) {
                return prevItems.map(item => 
                    item._id === productToAdd._id ?
                    {...item, quantity: item.quantity + 1}:
                    item
                );
            } else {
                return [...prevItems, {...productToAdd, quantity: 1}]
            };
        })
    }

    const clearCart = () => {
        setCartItems([])
    }

    return (
        <CartContext.Provider value={{cartItems, addItemToCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}