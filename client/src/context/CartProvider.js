import {useContext, useEffect, useState} from 'react';
import { CartContext } from './CartContext';
import { AuthContext } from './AuthContext'

const LOCAL_STORAGE_KEY = "shoppingCartItems"

export const CartProvider = ({children}) => {
    const {isLoggedIn, authToken} = useContext(AuthContext);

    const [inicializado, setInicializado] = useState(false);

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
        const controlarSesionCart = async () => {
            if (isLoggedIn && authToken){
                try{
                    const localItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
                    let endpoint = 'http://localhost:4000/api/cart';
                    let method = 'GET';
                    let body = null;

                    if (localItems.length > 0){
                        endpoint = 'http://localhost:4000/api/cart/sync';
                        method = 'POST';
                        body = JSON.stringify({
                            items: localItems.map(item => ({
                                productoId: item._id,
                                nombre: item.nombre,
                                precio: item.precio,
                                descripcionDestacado: item.descripcionDestacado,
                                quantity: item.quantity,
                                imagen: item.imagen
                            }))
                        })
                    }

                    const response = await fetch(endpoint, {
                        method: method,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authToken}`
                        },
                        body: body
                    });

                    if (response.ok){
                        const data = await response.json();
                        const serverItems = Array.isArray(data) ? data : (data.items || []);

                        const mappedItems = serverItems.map(item => ({
                            ...item, _id: item.productoId
                        }));

                        setCartItems(mappedItems);

                        localStorage.removeItem(LOCAL_STORAGE_KEY);
                        setInicializado(true);
                    }
                } catch (error) {
                    console.error('Error inicializando carrito: ', error);
                }
            } else if (!isLoggedIn && inicializado) {
                setCartItems([]);
                setInicializado(false);
                localStorage.removeItem(LOCAL_STORAGE_KEY);
            }
        };

        controlarSesionCart();
    }, [isLoggedIn, authToken])

    useEffect(() => {
        if (isLoggedIn && !inicializado) return;

        if (isLoggedIn && authToken) {
            const guardarEnDB = async () => {
                try {
                    await fetch('http://localhost:4000/api/cart', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authToken}`
                        },
                        body: JSON.stringify({
                            items: cartItems.map(item => ({
                                productoId: item._id,
                                nombre: item.nombre,
                                precio: item.precio,
                                descripcionDestacado: item.descripcionDestacado,
                                quantity: item.quantity,
                                imagen: item.imagen
                            }))
                        })
                    });
                } catch (error) {
                    console.error('Error guardando los cambios en la DB: ', error);
                }
            };

            guardarEnDB();
        } else if (!isLoggedIn) {
            try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
            } catch (error) {
                console.error(error);
            }
        }
    }, [cartItems, isLoggedIn, authToken, inicializado]);

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