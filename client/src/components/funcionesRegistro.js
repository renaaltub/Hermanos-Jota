// ---VALIDACIÓN Y ENVÍO DEL FORM (REGISTRO)---

// -- FUNCIÓN VALIDADORA DE CAMPOS -- //
export function validacionCampos({
    username,
    email,
    password
}) {
    //Se creaa la expresión regular para verificar que los campos con texto sean válidos
    const regexUsername = /^[a-zA-Z0-9_-]{3,20}$/                       // permite letras, números, guiones medios, guiones bajos y entre 3 y 20 caracteres
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const regexPassword = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/        // contraseña de al menos 8 caracteres, una mayúscula y un caracter especial

    //Se crea el objeto validaciones que contendrá el resultado según el campo analizado
    const validaciones = {
        valUsername: regexUsername.test(username.trim()),
        valEmail:regexEmail.test(email.trim()),
        valPassword: regexPassword.test(password.trim())
    }

    // Se devuelve el array para ser usado posteriormente
    return validaciones
}

// -- FUNCIÓN GENERADORA DE ALERTS -- //
export function alertas({
    valUsername,
    valEmail,
    valPassword
}) {

  // Se crea un objeto errores que devuelve el mensaje a mostrar en el DOM según la validez de los campos
  const errores = {
    username: valUsername ? "" : "Por favor ingrese un nombre de usuario válido",
    email: valEmail ? "" : "Por favor ingrese una dirección de email válida",
    password: valPassword ? "" : "Por favor ingrese una contraseña válida"
  }

  return errores
}


// -- FUNCIÓN ENCARGADA DE ENVIAR EL FORMULARIO DE REGISTRO AL BACKEND -- //
export async function enviarFormulario({
    evento,
    datos,
    setDatos,
    setErrores,
    setIntento,
    setExitoso,
    setLoading,
    navigate
}) {
    // Evita el la recarga automática de la página para evaluar
    evento.preventDefault()

    // Marca que el usuario intentó enviar el formulario
    setIntento(true)

    // Validaciones y mensajes de error
    const validaciones = validacionCampos(datos)
    const mensajes = alertas(validaciones)
    setErrores(mensajes)

    // Verifica que todos los campos sean válidos
    const datosValidos = Object.values(validaciones).every(v => v)
    if (!datosValidos) return

    try {
        setLoading(true)

        const respuesta = await fetch(`http://localhost:4000/api/usuarios/register`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        })

        if (!respuesta.ok) {
            const data = await respuesta.json();

            if (respuesta.status === 409 && data.message === "El email o nombre de usuario ya está en uso.") {                
                setErrores(prev => ({
                    ...prev,
                    username: "El email o nombre de usuario ya está en uso.",
                    email: "El email o nombre de usuario ya está en uso."
                }));
                return
            }

            throw new Error(`Error HTTP: estado ${respuesta.status}`)
        }

        const data = await respuesta.json()
        console.log("Usuario registrado:", datos)
        console.log("Respuesta API:", data)

        // Éxito visual y reset del formulario
        setExitoso(true)
        
        setTimeout(() => {

            setExitoso(false)

            setDatos({
                username: "",
                role: "cliente",
                email: "",
                password: ""
            })

            setErrores({
                username: "",
                email: "",
                password: ""
            })

            setIntento(false)
            navigate('/login')

        }, 1000)
        
    } catch (error) {
        console.error("Error al registrar el usuario:", error)
        alert("Se produjo un error durante el registro. Intente nuevamente.")
    } finally {
        setLoading(false)
    }
}