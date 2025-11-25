const Swal = require('sweetalert2');

export const mostrarIngresarContrasena = (emailUsuario) => {
    return Swal.fire({
        title: "Ingresa tu contraseña para confirmar la compra",
        input: "password",
        inputAttributes: {
            autocapitalize: "off",
            placeholder: 'Ingresa tu contraseña'
        },
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: "Confirmar compra",
        showLoaderOnConfirm: true,
        customClass: {
            popup: 'contenedor-modal',
            title: 'titulo-modal',
            htmlContainer: 'texto-modal',
            input: 'input-modal',
            cancelButton: 'cancel-button-modal',
            confirmButton: 'conButton-modalCompra'
        },
        preConfirm: async (passwordIngresada) => {
            try {
                const response = await fetch('http://localhost:4000/api/usuarios/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        email: emailUsuario,
                        password: passwordIngresada
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Contraseña incorrecta")
                }

                return true;

            } catch (error) {
                Swal.showValidationMessage(`
                    Error: ${error.message}
                `);
            }
        }, allowOutsideClick: () => !Swal.isLoading()
    })
}

export const mostrarConfirmarCompra = () => {
    return(
        Swal.fire({
            title: "¡Compra realizada!",
            text: "Tu pedido ha sido registrado exitosamente. Te contactaremos via e-mail para coordinar la entrega y el pago",
            icon: "success",
            confirmButtonText: 'Listo',
            customClass: {
                popup: 'contenedor-modal',
                title: 'titulo-modal',
                htmlContainer: 'texto-modal'
            }
        })
    )
}