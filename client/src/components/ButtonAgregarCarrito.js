import '../css/App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function ButtonAgregarCarrito({producto}) {
    const {addItemToCart} = useContext(CartContext)
    return(
        <>
            <button className="btn-cart" onClick={() => addItemToCart(producto)}><FontAwesomeIcon icon={faCartShopping}/></button>
        </>
    )
}

export default ButtonAgregarCarrito