import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RutaAdmin = () => {
    const { isLoggedIn, loading, currentUser } = useContext(AuthContext);

    if (loading) return <p>Cargando...</p>;

    // 1. Si no está logueado, al login
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // 2. Si está logueado PERO NO es admin, al inicio (o a una página de "Acceso Denegado")
    if (currentUser?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    // 3. Si es admin, adelante
    return <Outlet />;
};

export default RutaAdmin;