import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faXmark} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function ItemCart({producto}){
    const {addItemToCart, decreaseItemToCart, removeItemToCart} = useContext(CartContext)

    return (
        <>
            <section className='itemProduct'>
                <div className="itemCartImg">
                    <img src={producto.imagen} alt={producto.alt}/>
                </div>
                <section className="itemCartData">
                    <section>
                        <h2>{producto.nombre}</h2>
                        <p className='precioItem'>${producto.quantity * producto.precio}</p>
                        <p>{producto.quantity} {producto.quantity === 1 ? "unidad" : "unidades"}</p>
                    </section>
                        <p>{producto.descripcionDestacado}</p>
                </section>
            </section>
            <section className="itemButtons">
                <button onClick={() => addItemToCart(producto)} className='incrementButton'><FontAwesomeIcon icon={faAngleUp}/></button>
                <button onClick={() => decreaseItemToCart(producto)} className='decreaseButton'><FontAwesomeIcon icon={faAngleDown}/></button>
            </section>
            <button onClick={() => removeItemToCart(producto)} className='quitarProducto'><FontAwesomeIcon icon={faXmark}/></button>
        </>
    )
}