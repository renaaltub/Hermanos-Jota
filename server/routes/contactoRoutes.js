const express = require('express')
const routes = express.Router()
const contactoController = require('../controllers/contactoController')

// GET /api/contacto
routes.get('/', contactoController.getMensajes )

// POST /api/contacto
routes.post('/', contactoController.createMensaje )

module.exports = routes