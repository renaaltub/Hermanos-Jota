import "../css/App.css";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ItemCart from "../components/ItemCart";
import { Link } from "react-router-dom";

function Carrito(){
    const {cartItems, clearCart, removeItemToCart} = useContext(CartContext);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [])

    const cartTotal = cartItems.reduce((total, item) => {
        const price = item.precio || 0;
        const quantity = item.quantity || 0;

        return total += (price * quantity)
    }, 0)

    return(
        <main className="mainCarrito">
            <div>
                <h1>Tu Carrito</h1>
                <div></div>
            </div>
            <>
                {cartItems.length === 0 ?
                    <section className="voidCart">
                        <p className="textoVoid">¡Tu carrito está vacío!</p>
                        <p>Sigue mirando los productos que tenemos para ofrecerte, ¡tu hogar te lo agradecerá!</p>
                        <Link to="/productos"><button>Ver Productos</button></Link>
                    </section> 
                    :
                    <section>
                        <div>
                            <button className="clearCart" onClick={() => clearCart()}>Vaciar Carrito</button>
                            <Link to="/productos"><button className="continueBuy">Seguir Comprando</button></Link>
                        </div>
                        <section className="cart">
                            <section className="itemsCart">
                                {cartItems.map(item => (
                                    <section key={item.id} className="itemCartCard">
                                        <ItemCart producto={item}/>
                                    </section>
                                ))}
                            </section>
                            <section className="cartResume">
                                <div>
                                    <h2>Ticket de Compra</h2>
                                    <div></div>
                                    <p className="totalResume">Total: ${cartTotal}</p>
                                </div>
                                <p>¡Realiza tu compra ahora y decora tu hogar con la mejor calidad!</p>
                                <h3>Tu compra:</h3>
                                <ul>
                                    {cartItems.map(item => (
                                        <li key={item.id}>
                                            <p>{item.nombre} x{item.quantity}</p>
                                            <button onClick={() => removeItemToCart(item)} ><FontAwesomeIcon icon={faXmark}/></button>
                                        </li>
                                    ))}
                                </ul>
                                <button className="buyButton">Finalizar Compra</button>
                            </section>
                        </section>
                    </section>
                }
            </>
        </main>
    )
}

export default Carrito