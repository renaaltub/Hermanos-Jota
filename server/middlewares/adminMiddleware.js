const verifyAdmin = (req, res, next) => {
    // req.user ya se completo en authMiddleware
    if (req.user && req.user.role === 'admin') {
        next(); // Es admin esta autorizado
    } else {
        res.status(403).json({ message: 'Acceso denegado: Se requieren permisos de administrador.' });
    }
};

module.exports = verifyAdmin;