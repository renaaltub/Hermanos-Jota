const sweet = require('sweetalert2');

export const mostrarAlertaLogin = () => {
    return(
        sweet.fire({
            title: "¡Debes iniciar sesión para confirmar la compra!",
            html: "Serás redirigido a la página de Login, luego vuelve y completa la compra",
            timer: 3000,
            timerProgressBar: true,
            customClass: {
                popup: 'contenedor-modal',
                title: 'titulo-modal',
                htmlContainer: 'texto-modal',
                timerProgressBar: 'barra-progreso-modal',
                loader: 'loader-modal'
            },
            didOpen: () => {
                sweet.showLoading();
            },
        })
    )
}