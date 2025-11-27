const express = require('express')
const routes = express.Router()
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const productoController = require('../controllers/productoController')

require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = multer.memoryStorage();
const upload = multer({storage: storage})

// GET /api/productos
routes.get('/', productoController.getProducts)

// GET /api/productos/:id
routes.get("/:id", productoController.getProductById) 

// POST /api/productos
routes.post("/",upload.single('imagen'), productoController.createProduct )

// PUT /api/productos/:id
routes.put("/:id", productoController.updateProduct )

// DELETE /api/productos/:id
routes.delete("/:id", productoController.deleteProduct )



module.exports = routes