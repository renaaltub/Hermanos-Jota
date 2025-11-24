import {useEffect, useState} from 'react';
import { CartContext } from './CartContext';

const LOCAL_STORAGE_KEY = "shoppingCartItems"

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(() => {
        try{
            const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
            return storedItems ? JSON.parse(storedItems) : [];
        } catch (error) {
            console.error('error');
            return [];
        }
    });

    useEffect(() => {
        try{
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems))
        } catch (error) {
            console.error(error)
        }
    }, [cartItems])

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

    const decreaseItemToCart = (productToDecrease) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === productToDecrease._id);

            if (!existingItem){
                return prevItems;
            }

            if (existingItem.quantity === 1){
                return prevItems.filter(item => item._id !== productToDecrease._id)
            } else {
                return prevItems.map(item =>
                    item._id === productToDecrease._id ?
                    {...item, quantity: item.quantity - 1} :
                    item
                )
            }
        })
    }

    const removeItemToCart = (productToRemove) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === productToRemove._id);
            
            if (!existingItem){
                return prevItems;
            } else{
                return prevItems.filter(item => item._id !== productToRemove._id)
            }
        })
    }

    const clearCart = () => {
        setCartItems([])
    }

    return (
        <CartContext.Provider value={{cartItems, addItemToCart, decreaseItemToCart, removeItemToCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}