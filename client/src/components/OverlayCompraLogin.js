import ReactDOM from "react-dom"

export default function OverlayLogin() {
    return ReactDOM.createPortal(
        <div className="overlay">
            <div className="cartel-enviado">
                <h1>¡No estás autenticado!</h1>
                <p>Necesitas iniciar sesión para realizar una compra. Serás enviado al formulario de login</p>
            </div>
        </div>,
        document.getElementById("root")
    )
}