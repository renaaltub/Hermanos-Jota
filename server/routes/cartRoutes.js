const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/sync', cartController.syncCart);

router.get('/', cartController.getCart);

router.put('/', cartController.updateCart);

module.exports = router