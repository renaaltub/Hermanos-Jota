import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../css/App.css';

const Profile = () => {
    const { currentUser, logout, authToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        if (activeTab === 'orders' && authToken) {
            setLoadingOrders(true);
            console.log("Fetching orders with token:", authToken);
            fetch('https://hermanos-jota-ei35.onrender.com/api/pedidos/mis-pedidos', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
            .then(res => {
                console.log("Fetch response status:", res.status);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log("Orders data received:", data);
                setOrders(data);
                setLoadingOrders(false);
            })
            .catch(err => {
                console.error("Error fetching orders:", err);
                setLoadingOrders(false);
            });
        }
    }, [activeTab, authToken]);

    if (!currentUser) {
        return (
            <div className="profile-section">
                <div className="profile-card">
                    <p>No has iniciado sesión.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-section">
            <div className="profile-card">
                <div className="profile-tabs">
                    <button 
                        className={`profile-tab ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Mi Perfil
                    </button>
                    <button 
                        className={`profile-tab ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Mis Pedidos
                    </button>
                </div>

                {activeTab === 'profile' ? (
                    <>
                        <div className="profile-header">
                            <div className="profile-avatar">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <h1>Mi Perfil</h1>
                        </div>
                        
                        <div className="profile-details">
                            <div className="profile-info-item">
                                <span className="profile-label">Nombre de usuario</span>
                                <p className="profile-value">{currentUser.username}</p>
                            </div>
                            <div className="profile-info-item">
                                <span className="profile-label">Email</span>
                                <p className="profile-value">{currentUser.email}</p>
                            </div>
                        </div>
                        
                        <div className="profile-actions">
                                
                                {/* 1. Botón de Cerrar Sesión */}
                                <button 
                                    onClick={handleLogout} 
                                    className="btn-logout"
                                    style={{ marginTop: 0 }} 
                                >
                                    Cerrar Sesión
                                </button>

                                {/* 2. Botón de Admin (Solo si es admin) */}
                                {currentUser?.role === 'admin' && (
                                    <Link to="/admin">
                                        <button className="btn-admin">
                                            Panel Admin
                                        </button>
                                    </Link>
                                )}
                                
                            </div>
                        
                        
                    </>
                ) : (
                    <div className="orders-container">
                        <h2>Historial de Pedidos</h2>
                        {loadingOrders ? (
                            <p>Cargando pedidos...</p>
                        ) : orders.length > 0 ? (
                            <div className="orders-list">
                                {orders.map(order => (
                                    <div key={order._id} className="order-card">
                                        <div className="order-header">
                                            <span className="order-id">Pedido #{order._id.slice(-6)}</span>
                                            <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="order-body">
                                            <p>Total: ${order.total}</p>
                                            <p>Artículos: {order.articulos.length}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-orders">
                                <FontAwesomeIcon icon={faBoxOpen} size="3x" />
                                <p>Aún no has realizado pedidos.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
