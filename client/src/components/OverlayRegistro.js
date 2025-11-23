import ReactDOM from "react-dom"

export function OverlayRegistro() {
    return ReactDOM.createPortal(
        <div className="overlay">
            <div className="cartel-enviado">
                <h1>¡Operación exitosa!</h1>
                <p>Registro realizado con éxito</p>
            </div>
        </div>,
        document.getElementById("root")
    )
}