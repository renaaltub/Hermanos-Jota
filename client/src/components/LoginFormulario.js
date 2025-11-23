import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { enviarFormulario } from "./funcionesLogin"
import { OverlayLogin } from "./OverlayLogin"

function LoginFormulario() {

    const navigate = useNavigate()

    // --ESTADOS -- //
    //Estado de los datos del form
    const [datos, setDatos] = useState({
        email: "",
        password: ""
    })

    //Estado que almacenará los errores de validación de los campos
    const [errores, setErrores] = useState({
        email: "",
        password: ""
    })

    //Estado que establece si el form fue enviado correctamente
    const [envioExitoso, setExitoso] = useState(false)


    // -- FUNCIÓN ACTUALIZACIÓN DE DATOS -- //
    //Se define la función encargada de actualizar en tiempo real los campos con lo que el usuario escribe y los mensajes de error
    const actualizarDatos = (d) => {
        const {name, value} = d.target

        const datosNuevos = { ...datos, [name]: value }
        setDatos(datosNuevos)
    }

    // -- DEVOLUCIÓN DE FORMULARIO -- //
    return (
        <form id="registro-form" onSubmit={(evento) => enviarFormulario({evento, datos, setDatos, setErrores, setExitoso, navigate})} noValidate>
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
                {errores.password && <p className="error-validacion">{errores.password}</p>}
            </div>

            <div>
                <button id="registro-button" type="submit">Iniciar sesión</button>
            </div>
            {envioExitoso && <OverlayLogin />}
        </form>
    )
}

export default LoginFormulario