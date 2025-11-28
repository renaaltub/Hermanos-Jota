import RegistroFormulario from "../components/RegistroFormulario"
import { Link } from "react-router-dom"

const Registro = () => {
    return (
        <main id="registro-main">
            <article id='registro-card'>
                <section className="registro-title">
                    <h1>Registro</h1>
                    <div></div>
                </section>
                <section className="registro-bienvenida">
                    <h2>¡Bienvenido/a nuevo/a cliente!</h2>
                    <p>¡Completá el siguiente formulario para empezar a ser parte de nuestro sitio!</p>
                    <p>¿Ya tenés una cuenta?</p>
                    <Link to="/login">Iniciá sesión</Link>
                </section>
                <section>
                    <RegistroFormulario />
                </section>
            </article>
        </main>
    )
}

export default Registro