const mensajes = []

const getMensajes = (req, res) => {
    res.json(mensajes)
}

const createMensaje =  (req, res, next) => {

    try {
        const {nombre, email, mensaje} = req.body

        //Se valida que se hayan ingresado todos los campos
        if (!nombre || !email || !mensaje) {
            return res.status(400).json({ error: "Todos los campos son obligatorios."})
        }

        //Se valida que el nombre sea válido usando la misma expresión regular que el front
        const regexNombre = /^[\p{L}\s]+$/u
        if (!regexNombre.test(nombre)) {
            return res.status(400).json({ error: "Formato de nombre inválido."})
        }
        
        //Se valida que el mail sea válido con la misma expresión regular que el front
        const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regexMail.test(email)) {
            return res.status(400).json({ error: "Formato de email inválido."})
        }

        const nuevoMensaje = {nombre, email, mensaje}
        mensajes.push(nuevoMensaje)
        console.log('Mensaje recibido:', nuevoMensaje)
        
        res.status(201).json(
            {
                mensaje: "Mensaje recibido",
                texto: nuevoMensaje
            }
        )
    } catch(error) {
        next(error)
    }
}

module.exports = {
    getMensajes,
    createMensaje
}