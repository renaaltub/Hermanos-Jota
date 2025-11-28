const {Schema, model} = require('mongoose');

const cartItemSchema = new Schema({
    productoId: {type: Schema.Types.ObjectId, ref: 'Producto', required: true},
    nombre: {type: String, required: true},
    precio: {type: Number, required: true},
    descripcionDestacado: { type: String, required: true },
    quantity: {type: Number, required: true, min: 1},
    imagen: {type: String}
}, {_id: false});

const cartSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: {type: [cartItemSchema], default: []},
    updatedAt: {type: Date, default: Date.now}
});

const Cart = model('Cart', cartSchema);

module.exports = Cart