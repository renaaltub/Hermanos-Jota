const asyncHandler = require('express-async-handler')
const Pedido = require('../models/Order');

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Pedido.find({}).populate('usuario', 'username email');
    res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Pedido.findById(req.params.id).populate('usuario', 'username email');
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Orden no encontrada');
    }
})

const createOrder = asyncHandler(async (req, res) => {
    const usuarioId = req.user.id;

    const {articulos, total} = req.body;

    if (!articulos || articulos.length === 0 || !total) {
        res.status(400)
        throw new Error("Comprueba que estén todos los datos necesarios")
    }

    const order = new Pedido({usuario: usuarioId, total, articulos});
    const nuevoPedido = await order.save();
    res.status(201).json({
        mensaje: 'Pedido creado exitosamente',
        pedidoId: nuevoPedido._id
    });
})

const getOrdersByUser = asyncHandler(async (req, res) => {
    console.log("Fetching orders for user:", req.user.id);
    const orders = await Pedido.find({ usuario: req.user.id }).sort({ createdAt: -1 });
    console.log("Orders found:", orders);
    res.json(orders);
})

module.exports = {
    getAllOrders, getOrderById, createOrder, getOrdersByUser
}