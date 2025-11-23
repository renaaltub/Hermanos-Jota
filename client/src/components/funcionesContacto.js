// ---VALIDACIÓN Y ENVÍO DEL FORM (CONTACTO)---

// Función validadora de campos
export function validacionCampos({nombre, email, mensaje}) {
    //Se crean las expresiones regulares para verificar nombre y mail válidos
    const regexNombre = /^[\p{L}\s]+$/u
    const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    //Se crea el objeto validaciones que contendrá el resultado según el campo analizado
    const validaciones = {
        valNombre: nombre.trim().length > 0 && regexNombre.test(nombre.trim()),
        valEmail: email.length > 0 && regexMail.test(email),
        valMensaje: mensaje.trim().length > 0
    }

    // Se devuelve el array para ser usado posteriormente
    return validaciones
}

// Función generadora de alerts
export function alertas({valNombre, valEmail, valMensaje}) {
    
    //Se crea un objeto errores que devuelve el mensaje a mostrar en el DOM según la validez de los campos
    const errores = {
        nombre: valNombre ? "" : "Por favor ingrese un nombre válido",
        email: valEmail ? "" : "Por favor ingrese un email válido",
        mensaje: valMensaje ? "" : "Por favor ingrese un mensaje"
    }

    return errores
}

//Se define la función encargada de enviar el formulario a la API del backend
export async function enviarFormulario({evento, datos, setDatos, setErrores, setIntento, setExitoso}) {
    //Se previene que la página se refresque al darse el submit (por click o enter) y que se pueda verificar
    evento.preventDefault()

    //Se establece que el usuario intentó enviar el formulario
    setIntento(true)

    //Se validan los campos y generan y setean los errores correspondientes
    const validaciones = validacionCampos(datos)
    const mensajes = alertas(validaciones)
    setErrores(mensajes)

    //Se verifica que todos los valores ingresados en los campos sean válidos antes de enviar el formulario
    const datosValidos = Object.values(validaciones).every(v => v)
    if (!datosValidos) {return}
    
    try {
        const respuesta = await fetch(`http://localhost:4000/api/contacto`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(datos)
        })

        if(!respuesta.ok) {
            throw new Error(`Error HTTP: el estado es ${respuesta.status}`)
        }

        const data = await respuesta.json()
        console.log("Datos enviados:", datos)
        console.log("Respuesta API:", data)
        setExitoso(true)
        setTimeout(() => {
            setExitoso(false)
            setDatos({nombre: "", email: "", mensaje: ""})
            setErrores({nombre: "", email: "", mensaje: ""})
            setIntento(false)
        }, 3000)


    } catch (error) {
        console.error("Error:", error)
        alert("Se produjo un error al enviar el formulario.")
    }    
}