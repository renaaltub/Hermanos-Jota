const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware'); 
const userController = require('../controllers/userController'); 
 
// RUTA DE REGISTRO
router.post('/register', userController.registerUser);

// RUTA DE LOGIN
router.post('/login', userController.loginUser );

// RUTA PROTEGIDA: PERFIL DE USUARIO
router.get('/profile', authMiddleware, userController.getUserProfile);
 
module.exports = router;