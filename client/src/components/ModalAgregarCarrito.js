import toast from 'react-hot-toast';

export const alertaAgregarCarrito = () => {
    toast.success('¡Producto agregado exitosamente!', {
        duration: 1500,
        position: 'top-right',

        style: {
            background: 'var(--verde-salvia)',
            color: '#131',
            border: '2px solid var(--alabastro)',
            fontWeight: 'bold',
            padding: '16px',
            height: '70px',
        },

        iconTheme: {
            primary: 'var(--alabastro)',
            secondary: '#131'
        }
    })
}