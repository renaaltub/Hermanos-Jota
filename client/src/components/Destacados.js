import useSWR from 'swr';
import {Link} from 'react-router-dom';
import FeaturedProduct from "./FeaturedProduct";
import '../css/App.css';

const productosDestacados = (url) => {
    return fetch(url).then(async (res) => {
        if (!res.ok){
            throw new Error(await res.text());
        }
        return res.json()
    })
}

function Destacados({anadirFuncion}) {

    const {
        data: featuredProducts,
        error,
        isLoading
    } = useSWR('http://localhost:4000/api/productos?limit=3', productosDestacados);

    if (error) return <p className="mensajeswr">Hubo un problema al cargar los productos. Intenta de nuevo más tarde</p>;
    if (isLoading) return <p className="mensajeswr">Cargando...</p>;

    return(
        <>
            <section className="destacados">
                <section className="destacados-head">
                    <div className="destacados-title">
                        <h2>DESTACADOS</h2>
                        <p className="sub">Novedades y favoritos de la casa</p>
                    </div>
                    <div className="ver-coleccion">
                        <Link to="productos"><button className="btn-ver-coleccion">Ver Colección</button></Link>
                    </div>
                </section>
                <section className="destacados-productos">
                    {featuredProducts.map(product => (
                        <section key={product._id} className="destacados-producto">
                            <FeaturedProduct producto={product} anadirFuncion={anadirFuncion} />
                        </section>
                    ))}
                </section>
            </section>
        </>
    )
}

export default Destacados