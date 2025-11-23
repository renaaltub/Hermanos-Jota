import RegistroFormulario from "../components/RegistroFormulario"

const Registro = () => {
    return (
        <main id="registro-main">
            <article id='registro-card'>
                <section className="admin-title">
                    <h1>Formulario de registro</h1>
                    <div></div>
                </section>
                <section className="admin-bienvenida">
                    <h2>¡Bienvenido/a nuevo/a cliente!</h2>
                    <p>¡Completá el siguiente formulario para empezar a ser parte de nuestro sitio!</p>
                </section>
                <section>
                    <RegistroFormulario />
                </section>
            </article>
        </main>
    )
}

export default Registro