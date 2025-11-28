import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import { validacionCampos, alertas, enviarFormulario } from "./funcionesRegistro"
import { OverlayRegistro } from "./OverlayRegistro"
import { OverlayCargando } from "./OverlayLoading"

function RegistroFormulario() {

    const navigate = useNavigate()

    // --ESTADOS -- //
    //Estado de los datos del form
    const [datos, setDatos] = useState({
        username: "",
        role: "cliente",
        email: "",
        password: ""
    })

    //Estado que almacenará los errores de validación de los campos
    const [errores, setErrores] = useState({
        username: "",
        email: "",
        password: ""
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
        <form id="registro-form" onSubmit={(evento) => enviarFormulario({evento, datos, setDatos, setErrores, setIntento, setExitoso, setLoading, navigate})} noValidate>
            <div>
                <label htmlFor="username" className="registro-label">Nombre de usuario</label><br></br>
                <input 
                    id="username"
                    type="text"                 
                    name="username" 
                    className="registro-input" 
                    value={datos.username}
                    onChange={actualizarDatos}
                    required
                />
                <p>El nombre de usuario debe tener entre 3 y 20 caracteres. Puede contener números, guiones bajos y guiones medios.</p>
                {errores.username && <p className="error-validacion">{errores.username}</p>}
            </div>

            <div>
                <label htmlFor="email" className="registro-label">Dirección de correo electrónico</label><br></br>
                <input 
                    id="email"
                    type="text"                 
                    name="email" 
                    className="registro-input" 
                    value={datos.email}
                    onChange={actualizarDatos}
                    required
                />
                {errores.email && <p className="error-validacion">{errores.email}</p>}
            </div>

            <div>
                <label htmlFor="password" className="registro-label">Contraseña</label><br></br>
                <input 
                    id="password"
                    type="password"                 
                    name="password" 
                    className="registro-input" 
                    value={datos.password}
                    onChange={actualizarDatos}
                    required
                />
                <p>La contraseña debe tener mínimo 8 caracteres, una letra mayúscula y un caracter especial (ej.: -, _, %, $, &, *, etc.)</p>
                {errores.password && <p className="error-validacion">{errores.password}</p>}
            </div>

            <div>
                <button id="registro-button" type="submit">Registrarse</button>
            </div>
            {loading && <OverlayCargando />}
            {envioExitoso && <OverlayRegistro />}
        </form>
    )
}

export default RegistroFormulario