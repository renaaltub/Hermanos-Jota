import React, { useState } from "react"
import {validacionCampos, alertas, enviarFormulario} from "./funcionesContacto"
import { OverlayForm } from "./OverlayForm"
import { OverlayCargando } from "./OverlayLoading"

function ContactoFormulario() {

    // --ESTADOS -- //
    //Estado de los datos del form
    const [datos, setDatos] = useState({
        nombre: "",
        email: "",
        mensaje: ""
    })

    //Estado que almacenará los errores de validación de los campos
    const [errores, setErrores] = useState({
        nombre: "",
        email: "",
        mensaje: ""
    })

    //Estado que controla si el usuario trató de enviar el formulario o no (usado para validación dinámica de campos)
    const [intento, setIntento] = useState(false)

    //Estado que establece si el form fue enviado correctamente
    const [envioExitoso, setExitoso] = useState(false)

    //Estado de carga entre que se envía el formulario y se confirma la operación exitosa
    const [loading, setLoading] = useState(false)


    // -- FUNCIÓN ACTUALIZACIÓN DE DATOS -- //
    //Se define la función encargada de actualizar en tiempo real los campos con lo que el usuario escribe y los mensajes de error
    const actualizarDatos = (d) => {
        const {name, value} = d.target

        const datosNuevos = { ...datos, [name]: value }
        setDatos(datosNuevos)

        if (intento) {
            const validaciones = validacionCampos(datosNuevos)
            const mensajes = alertas(validaciones)
            setErrores(mensajes)
        }     
    }

    // -- DEVOLUCIÓN DE FORMULARIO -- //
    return (
        <form id="contacto-form" onSubmit={(evento) => enviarFormulario({evento, datos, setDatos, setErrores, setIntento, setExitoso, setLoading})} noValidate>
            <div>
                <label htmlFor="nombre" className="contacto-label">Nombre</label><br></br>
                <input 
                    id="nombre"
                    type="text"                 
                    name="nombre" 
                    className="contacto-input" 
                    value={datos.nombre}
                    onChange={actualizarDatos}
                    required
                />
                {errores.nombre && <p className="error-validacion">{errores.nombre}</p>}
            </div>

            <div>
                <label htmlFor="email" className="contacto-label">E-mail</label><br></br>
                <input 
                    id="email" 
                    type="email"                 
                    name="email" 
                    className="contacto-input" 
                    value={datos.email}
                    onChange={actualizarDatos}
                    required 
                />
                {errores.email && <p className="error-validacion">{errores.email}</p>}
            </div>

            <div>
                <label htmlFor="mensaje-form" className="contacto-label">Mensaje</label><br></br>
                <textarea 
                    id="mensaje-form" 
                    name="mensaje" 
                    rows="6" 
                    value={datos.mensaje}
                    onChange={actualizarDatos}
                    required
                />
                {errores.mensaje && <p className="error-validacion">{errores.mensaje}</p>}
            </div>

            <div>
                <button id="contacto-button" type="submit">Enviar mensaje</button>
            </div>
            {loading && <OverlayCargando />}
            {envioExitoso && <OverlayForm />}
        </form>
    )
}

export default ContactoFormulario