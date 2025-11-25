const Swal = require('sweetalert2');

export const mostrarVaciarCarrito = () => {
    return (
        Swal.fire({
            title: "¿Seguro que quieres vaciar el carrito?",
            text: "¡Esta acción es irreversible!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Vaciar de todas formas",
            customClass: {
                popup: "contenedor-modal",
                title: 'titulo-modal',
                htmlContainer: 'texto-modal',
                cancelButton: 'cancel-button-modal',
                confirmButton: 'confirm-button-modal'
            }
        })
    )
}

export const mostrarExitoVaciar = () => {
    return Swal.fire({
        title: "¡Operación exitosa!",
        text: "Tu carrito ha sido vaciado",
        icon: "success",
        timer: "1500",
        showConfirmButton: false,
        customClass: {
            popup: 'contenedor-modal',
            title: 'titulo-modal',
            htmlContainer: 'texto-modal'
        }
    })
}