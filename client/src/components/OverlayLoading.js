import React from "react"
import ReactDOM from "react-dom"

export function OverlayCargando() {
    return ReactDOM.createPortal(
        <div className="overlay">
            <div className="cartel-cargando">
                <div className="spinner"></div>
                <p>Cargando...</p>
            </div>
        </div>,
        document.getElementById("root")
    )
}