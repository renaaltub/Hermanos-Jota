import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faXmark} from '@fortawesome/free-solid-svg-icons';
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
                        <div>
                            <p>Unidades:</p>
                            <button onClick={() => decreaseItemToCart(producto)} className='decreaseButton'><FontAwesomeIcon icon={faAngleLeft}/></button>
                            <p className='productQuantity'>{producto.quantity}</p>
                            <button onClick={() => addItemToCart(producto)} className='incrementButton'><FontAwesomeIcon icon={faAngleRight}/></button>
                        </div>
                    </section>
                        <p>{producto.descripcionDestacado}</p>
                </section>
            </section>
            <button onClick={() => removeItemToCart(producto)} className='quitarProducto'><FontAwesomeIcon icon={faXmark}/></button>
        </>
    )
}