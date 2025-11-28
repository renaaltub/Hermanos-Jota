// ---VALIDACIÓN Y ENVÍO DEL FORM (PRODUCTO NUEVO)---

// -- FUNCIÓN VALIDADORA DE CAMPOS -- //
export function validacionCampos({
    nombre, 
    descripcion, 
    descripcionDestacado, 
    precio,
    materiales, 
    medidas, 
    acabado, 
    peso, 
    capacidad
}) {
    //Se creaa la expresión regular para verificar que los campos con texto sean válidos
    const regexTexto = /^[\p{L}\p{N}\p{S}\s.,;:()'"°%×x\-–\/!?¿¡]+$/u               //texto en general con caracteres especiales
    const regexMedidas = /^\s*\d+(?:\s*[×xX]\s*\d+){1,2}\s+[^\d×xX\s]+.*$/u     // para que sea del tipo <numero> x <numero> x <numero> <texto>
    const regexPeso = /^\s*\d+(?:[.,]\d+)?\s+[^\d\s]+.*$/u                      // para que sea del tipo <numero> <texto>

    //Se crea el objeto validaciones que contendrá el resultado según el campo analizado
    const validaciones = {
        valNombre: nombre.trim().length > 0 && regexTexto.test(nombre.trim()),
        valDescripcion: descripcion.trim().length > 0 && regexTexto.test(descripcion.trim()),
        valDescripcionDestacado: descripcionDestacado.trim().length > 0 && regexTexto.test(descripcionDestacado.trim()),
        valPrecio: !isNaN(precio) && Number(precio) > 0,
        valMateriales: materiales.trim().length > 0 && regexTexto.test(materiales.trim()),
        valMedidas: medidas.trim().length > 0 && regexMedidas.test(medidas.trim()),
        valAcabado: acabado.trim().length > 0 && regexTexto.test(acabado.trim()),
        valPeso: peso.trim().length > 0 && regexPeso.test(peso.trim()),
        valCapacidad: capacidad.trim().length > 0 && regexTexto.test(capacidad.trim())
    }

    // Se devuelve el array para ser usado posteriormente
    return validaciones
}

// -- FUNCIÓN GENERADORA DE ALERTS -- //
export function alertas({
    valNombre,
    valDescripcion,
    valDescripcionDestacado,
    valPrecio,
    valMateriales,
    valMedidas,
    valAcabado,
    valPeso,
    valCapacidad
}) {

  // Se crea un objeto errores que devuelve el mensaje a mostrar en el DOM según la validez de los campos
  const errores = {
    nombre: valNombre ? "" : "Por favor ingrese un nombre válido",
    descripcion: valDescripcion ? "" : "Por favor ingrese una descripción válida",
    descripcionDestacado: valDescripcionDestacado ? "" : "Por favor ingrese una descripción destacada válida",
    precio: valPrecio ? "" : "Por favor ingrese un precio numérico mayor a 0",
    materiales: valMateriales ? "" : "Por favor ingrese materiales válidos",
    medidas: valMedidas ? "" : "Por favor ingrese medidas válidas (ej. '100 × 35 × 200 cm')",
    acabado: valAcabado ? "" : "Por favor ingrese un acabado válido",
    peso: valPeso ? "" : "Por favor ingrese un peso válido (debe incluir unidades)",
    capacidad: valCapacidad ? "" : "Por favor ingrese una capacidad válida"
  }

  return errores
}


// -- FUNCIÓN ENCARGADA DE ENVIAR EL FORMULARIO DE PRODUCTO AL BACKEND -- //
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

    const formData = new FormData()

    formData.append('nombre', datos.nombre);
    formData.append('descripcion', datos.descripcion);
    formData.append('descripcionDestacado', datos.descripcionDestacado);
    formData.append('precio', datos.precio);
    formData.append('imagen', datos.imagen);
    formData.append('materiales', datos.materiales);
    formData.append('medidas', datos.medidas);
    formData.append('acabado', datos.acabado);
    formData.append('peso', datos.peso);
    formData.append('capacidad', datos.capacidad);
    formData.append('enlace', datos.enlace);

    try {

        setLoading(true)

        const respuesta = await fetch(`http://localhost:4000/api/productos`, {
            method: "POST",
            body: formData
        })

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: estado ${respuesta.status}`)
        }

        const data = await respuesta.json()
        console.log("Producto enviado:", datos)
        console.log("Respuesta API:", data)

        // Éxito visual y reset del formulario
        setExitoso(true)
        
        setTimeout(() => {

            setExitoso(false)

            setDatos({
                nombre: "",
                descripcion: "",
                descripcionDestacado: "",
                precio: "",
                imagen: "http://localhost:4000/img/",
                materiales: "",
                medidas: "",
                acabado: "",
                peso: "",
                capacidad: ""
            })

            setErrores({
                nombre: "",
                descripcion: "",
                descripcionDestacado: "",
                precio: "",
                imagen: "",
                materiales: "",
                medidas: "",
                acabado: "",
                peso: "",
                capacidad: ""
            })

            setIntento(false)
            navigate('/productos')

        }, 1000)
        
    } catch (error) {
        console.error("Error al enviar el producto:", error)
        alert("Se produjo un error al enviar el producto. Intente nuevamente.")
    } finally {
        setLoading(false)
    }
}