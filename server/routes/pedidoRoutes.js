const express = require('express');
const routes = express.Router();
const pedidoController = require('../controllers/pedidoController');

routes.get('/', pedidoController.getAllOrders);
routes.get('/:id', pedidoController.getOrderById);
routes.post('/', pedidoController.createOrder);

module.exports = routes