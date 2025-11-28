import LoginFormulario from "../components/LoginFormulario"
import { Link } from "react-router-dom"

const Login = () => {
    return (
        <main id="login-main">
            <article id='login-card'>
                <section className="login-title">
                    <h1>Inicio de sesión</h1>
                    <div></div>
                </section>
                <section className="login-bienvenida">
                    <h2>¡Bienvenido/a!</h2>
                    <p>Ingresá tus credenciales para acceder a tu cuenta.</p>
                    <p>¿Todavía no tenés una cuenta? <Link to="/registro">Creala completando nuestro formulario de registro.</Link></p>
                </section>
                <section>
                    <LoginFormulario />
                </section>
            </article>
        </main>
    )
}

export default Login