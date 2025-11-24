import "../css/App.css";
import ButtonAgregarCarrito from "./ButtonAgregarCarrito";
import { Link } from 'react-router-dom';


export default function ProductCard({ producto }) {
  return (
    <div className="card">
      <div className="card-img">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>
      <div className="card-info">
        <h3>{producto.nombre}</h3>
        <p>${producto.precio}</p>
        <div className="botones-producto">
          <Link to={`/productos/${producto._id}`}> 
            Ver detalle
          </Link>
          <ButtonAgregarCarrito producto={producto}/>
        </div>
      </div>
    </div>
  );
}
