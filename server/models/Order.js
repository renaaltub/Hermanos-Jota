const {Schema, model} = require('mongoose')

const itemSchema = new Schema({
    productoId: {type: Schema.Types.ObjectId, required: true},
    nombre: {type: String, required: true},
    cantidad: {type: Number, required: true, min: 1},
    precioUnitario: {type: Number, required: true},
    subtotal: {type: Number, required: true}
}, {_id: false})

const pedidoSchema = new Schema({
    usuario: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    total: {type: Number, required: true},
    articulos: {type: [itemSchema], required: true},
    createdAt: {type: Date, default: Date.now}
})

const Pedido = model('Pedido', pedidoSchema)

module.exports = Pedido