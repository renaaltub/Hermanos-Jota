import '../css/App.css';
import BurgerMenu from './BurgerMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

function Navbar(){
    const {cartItems} = useContext(CartContext);
    
    
    const { isLoggedIn, logout, currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const contador = cartItems.reduce((total, item) => total + item.quantity, 0)

    const [menuVisible, setVisibilidad] = useState(false);
    const getNavLinkClass = ({ isActive }) => isActive ? 'nav-link in-page' : 'nav-link';

    const handleLogout = () => {
        logout(); 
        setVisibilidad(false);
        navigate('/'); 
    };

    return (
        <header>
            <Link to="/" className='logo' onClick={() => {setVisibilidad(false)}}>
                <img src='http://localhost:4000/img/logoinvertido.svg' alt="Logo"/>
                <p className='nombre-marca'>Hermanos JOTA</p>
            </Link>

            <BurgerMenu visibilidad={menuVisible} cambiarVisibilidad={setVisibilidad}/>

            <nav className={menuVisible ? 'nav visible' : 'nav'}>
                <ul className='links-nav'>        
                    <NavLink to="/" className={getNavLinkClass} onClick={() => {setVisibilidad(false)}}>
                        Inicio
                    </NavLink>
                    
                    <NavLink to="/productos" className={getNavLinkClass} onClick={() => {setVisibilidad(false)}}>
                        Productos
                    </NavLink>

                    <NavLink to="/contacto" className={getNavLinkClass} onClick={() => {setVisibilidad(false)}}>
                        Contacto
                    </NavLink>

                    <li className='li-botones'>
                       
                        {isLoggedIn ? (
                            <>
                                <Link to="/profile" className='nav-link' onClick={() => setVisibilidad(false)} style={{fontSize: '1rem', color: 'var(--alabastro)'}}>
                                    Hola, {currentUser?.username}
                                </Link>
                                <button onClick={handleLogout} className='nav-mi-perfil'>Cerrar Sesión</button>
                            </>
                        ) : (
                            <Link to="/login"><button onClick={() => {setVisibilidad(false)}} className='nav-mi-perfil'>Iniciar Sesión</button></Link>
                        )}
                        
                        <div className='nav-mi-carrito-container'>
                            <Link to="/carrito"><button onClick={() => {setVisibilidad(false)}} className='nav-mi-carrito'>Mi carrito</button></Link>
                            <div className={contador > 0 ? 'numero-carrito' : ''}>
                                <p>{contador > 0 ? contador : null}</p>
                            </div>
                        </div>
                    </li>
                </ul>
                
                <section className='icons-nav'>
                    
                    {isLoggedIn ? (
                        <>
                            
                            <Link to="/profile" className='nav-link-icon' title="Mi Perfil"><FontAwesomeIcon icon={faUser}/></Link>
                            
                            <button onClick={handleLogout} className='nav-link-icon' style={{background:'none', border:'none', cursor:'pointer'}} title="Cerrar Sesión">
                                <FontAwesomeIcon icon={faRightFromBracket}/>
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className='nav-link-icon' title="Iniciar Sesión"><FontAwesomeIcon icon={faUser}/></Link>
                    )}

                    <NavLink to='/carrito' className='nav-link-icon nav-cart'>
                        <FontAwesomeIcon icon={faCartShopping}/>
                        <div className={contador > 0 ? 'numero-carrito' : ''}>
                            <p>{contador > 0 ? contador : null}</p>
                        </div>
                    </NavLink>

                </section>
            </nav>
        </header>
    )
}

export default Navbar