import "../css/App.css";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import {AuthContext} from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ItemCart from "../components/ItemCart";
import { Link, useNavigate } from "react-router-dom";
import {mostrarAlertaLogin} from "../components/ModalCompraLogin";
import { mostrarVaciarCarrito, mostrarExitoVaciar } from "../components/ModalVaciarCarrito";
import { mostrarIngresarContrasena, mostrarConfirmarCompra } from "../components/ModalConfirmarCompra";
import ProductosRelacionados from "../components/ProductosRelacionados";

function Carrito(){
    const {cartItems, clearCart, removeItemToCart} = useContext(CartContext);
    const {authToken, isLoggedIn, currentUser} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [])

    const cartTotal = cartItems.reduce((total, item) => {
        const price = item.precio || 0;
        const quantity = item.quantity || 0;

        return total += (price * quantity)
    }, 0)

    const handleCheckout = async () => {
        if (!isLoggedIn || !authToken){
            await mostrarAlertaLogin()
            navigate('/login');
            return
        }
    
        const emailUsuario = currentUser?.email;

        if (!emailUsuario){
            throw new Error('No se pudo identificar el email del usuario');
        }

        const confirmResult = await mostrarIngresarContrasena(emailUsuario);
        if (!confirmResult.isConfirmed){
            return
        }

        const orderData = {
            total: cartTotal,
            articulos: cartItems.map(item => ({
                productoId: item._id,
                nombre: item.nombre,
                cantidad: item.quantity,
                precioUnitario: item.precio,
                subtotal: item.precio * item.quantity
            }))
        }
    
        try{
            const response = await fetch('http://localhost:4000/api/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(orderData)
            });
    
            if (!response.ok) {
                throw new Error('No se pudo realizar el pedido')
            }
    
            const data = await response.json();
            await mostrarConfirmarCompra();
            clearCart();
            console.log(`Pedido creado exitosamente. ID: ${data.id}`);
        } catch (error){
            console.error('Ocurrió un error en el servidor: ', error);
        }
    };

    const handleClearCart = async () => {
        const result = await mostrarVaciarCarrito();
        if (result.isConfirmed){
            clearCart();
            mostrarExitoVaciar();
        }
    }

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
                        <p className="textoSecundarioVoid">Sigue mirando los productos que tenemos para ofrecerte, ¡tu hogar te lo agradecerá!</p>
                        <Link to="/productos"><button className="voidCartButton">Ver Productos</button></Link>
                    </section> 
                    :
                    <section className="noVoidCart">
                        <div className="buttonsNoVoidCart">
                            <button className="clearCart" onClick={() => handleClearCart()}>Vaciar Carrito</button>
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
                                <button onClick={handleCheckout} className="buyButton">Finalizar Compra</button>
                            </section>
                        </section>
                    </section>
                }
            </>
            <ProductosRelacionados titulo={"Te podría interesar"}/>
        </main>
    )
}

export default Carrito