// --- VALIDACIÓN Y ENVÍO DEL FORM (LOGIN) ---

export async function enviarFormulario({
    evento,
    datos,
    setDatos,
    setErrores,
    setExitoso,
    setLoading,
    navigate,
    login
}) {
    // Evita la recarga automática de la página para evaluar
    evento.preventDefault()

    // Se valida que los campos no estén vacíos
    const errores = {
        email: datos.email.trim() ? "" : "Ingrese un email",
        password: datos.password.trim() ? "" : "Ingrese una contraseña"
    }

    setErrores(errores)

    if (errores.email || errores.password) return

    // Se intenta enviar el formulario al backend y asignar un tokem
    try {
        setLoading(true)

        const respuesta = await fetch("http://localhost:4000/api/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        })

        const data = await respuesta.json()

        // Se manejan los errores devueltos por el backend
        if (!respuesta.ok) {
            // Credenciales incorrectas
            if (data.message === "Credenciales inválidas") {
                setErrores({
                    email: "Email o contraseña incorrectos",
                    password: "Email o contraseña incorrectos"
                })
                return
            }

            // Errores internos
            alert("Error interno. Por favor intentá nuevamente más tarde.")
            return
        }

        // Asignación del token una vez que el login fue exitoso
        console.log("Login exitoso. Token:", data.token)

        // Guardado del token en localStorage
        if (login) login(data.token)

        // Éxito visual y reset del formulario
        setLoading(false)
        setExitoso(true)

        setTimeout(() => {
            setExitoso(false)
            setDatos({ email: "", password: "" })
            setErrores({ email: "", password: "" })
            navigate("/perfil")
        }, 1500)

    } catch (error) {
        console.error("Error de red:", error)
        alert("No se pudo conectar con el servidor. Intentá nuevamente.")
    }
}