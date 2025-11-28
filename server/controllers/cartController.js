const Cart = require('../models/Cart');
const asyncHandler = require('express-async-handler');

const syncCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const localItems = req.body.items || [];

    let cart = await Cart.findOne({usuario: userId});

    if (!cart) {
        cart = new Cart({
            usuario: userId,
            items: localItems
        });
    } else {
        localItems.forEach(localItem => {
            const existingItemIndex = cart.items.findIndex(
                dbItem => dbItem.productoId.toString() === localItem.productoId
            );

            if (existingItemIndex > -1){
                cart.items[existingItemIndex].quantity += localItem.quantity;
            } else {
                cart.items.push(localItem);
            }
        });
    }

    cart.updatedAt = Date.now();
    const savedCart = await cart.save();
    res.status(200).json(savedCart);
});

const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({usuario: req.user.id});
    res.status(200).json(cart ? cart.items : []);
})

const updateCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const {items} = req.body;

    let cart = await Cart.findOne({usuario: userId});

    if (!cart) {
        cart = new Cart({usuario: userId, items});
    } else {
        cart.items = items;
    }

    cart.updatedAt = Date.now();
    const savedCart = await cart.save();
    res.status(200).json(savedCart);
});

module.exports = {syncCart, getCart, updateCart}