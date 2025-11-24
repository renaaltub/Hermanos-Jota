import '../css/App.css';
import ButtonAgregarCarrito from "./ButtonAgregarCarrito";
import {Link} from 'react-router-dom'

function FeaturedProduct({producto}){
    return (
        <>
            <div className="destacados-img">
                <img src={producto.imagen} alt={producto.alt}/>
            </div>
            <section className="destacados-description">
                <h4>{producto.nombre}</h4>
                <div className="destacados-separacion"></div>
                <p>{producto.descripcionDestacado}</p>
                <div className="destacados-botones-card">
                    <Link to={`/productos/${producto._id}`} className="ver-detalle-indexCards">
                        Ver detalle
                    </Link>
                    <ButtonAgregarCarrito producto={producto}/>
                </div>
            </section>
        </>
    )
}

export default FeaturedProduct