import { useEffect, useState } from 'react';
import {AuthContext} from './AuthContext';
import {jwtDecode} from 'jwt-decode'

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token){
            try{
                const decodedUser = jwtDecode(token);
                setCurrentUser(decodedUser);
                setAuthToken(token);
            } catch (error) {
                console.error('No se pudo obtener el token: ', error);
                localStorage.removeItem('authToken');
                setAuthToken(null);
            }
        }

        setLoading(false);
    }, [])

    const login = (token) => {
        localStorage.setItem('authToken', token);
        const decodedUser = jwtDecode(token);
        setCurrentUser(decodedUser);
        setAuthToken(token);
    }

    const logout = () => {
        localStorage.removeItem('authToken');
        setCurrentUser(null);
        setAuthToken(null);
    }

    const isLoggedIn = !!currentUser;

    const value = {currentUser, authToken, isLoggedIn, loading, login, logout}

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}