const Producto = require('../models/Product');
const streamifier = require('streamifier')
const cloudinary = require('cloudinary').v2

const getProducts =  async (req, res) => {
    const {limit} = req.query;
    let queryLimit = 0; // 0 significa sin límite

    if (limit) {
        // Intenta convertir el 'limit' a un entero.
        const parsedLimit = parseInt(limit);
        
        // Verifica que sea un número positivo válido
        if (!isNaN(parsedLimit) && parsedLimit > 0) {
            queryLimit = parsedLimit;
        }
    }
    try {
        let consultaMongoose = Producto.find({});
        if (queryLimit > 0) {
            consultaMongoose = consultaMongoose.limit(queryLimit);
        }

        const productosMostrados = await consultaMongoose.exec();
        res.json(productosMostrados);
        
    } catch (error) {
        next(error)
    }
}

const getProductById = async (req, res, next) => {
    try{
        const { id } = req.params
        const producto = await Producto.findOne({_id: id})

        if (!producto) {
            return res.status(404).json({ 
                mensaje: 'Producto no encontrado con ese ID'
            });
        }
        res.json(producto)
    } catch (error) {
        next(error)
    }
}


const createProduct = async (req, res, next) => {
    try{

        if (!req.file) {
            throw new Error('No se subió ningún archivo de imagen')
        }

        streamifier.createReadStream(req.file.buffer).pipe(
            cloudinary.uploader.upload_stream(
                {folder: "productos-MuebleriaJota"},
                async (error, result) => {
                    if (error) {
                        return next(error)
                    }

                    const urlImagen = result.secure_url

                    const nuevoProducto = new Producto({
                        ...req.body, imagen: urlImagen
                    })

                    const productoGuardado = await nuevoProducto.save()
                    res.status(201).json(productoGuardado)
                }
            )
        )
        
    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    try{
        const { id } = req.params
        const producto = await Producto.findOneAndUpdate({_id: id}, req.body, {new: true})

        if (!producto) {
            return res.status(404).json({ 
                mensaje: 'Producto no encontrado con ese ID'
            });
        }
        res.json(producto)
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try{
        const { id } = req.params
        
        const productoEliminado = await Producto.findOneAndDelete({_id: id})

        if (!productoEliminado) {
            return res.status(404).json({ 
                mensaje: 'Producto no encontrado con ese ID'
            });
        }
        res.json(productoEliminado)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}   