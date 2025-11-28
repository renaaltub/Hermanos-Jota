import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RutaProtegida = () => {
    const { isLoggedIn, loading } = useContext(AuthContext);

    // Mientras se verifica el token (loading es true), mostrar un mensaje de carga
    if (loading) return <p>Cargando...</p>;

    // Si no está logueado, redirigir al login
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // Si está logueado, renderizar la ruta hija (Outlet)
    return <Outlet />;
};

export default RutaProtegida;