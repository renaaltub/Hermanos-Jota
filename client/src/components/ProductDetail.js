import "../css/App.css";
import React, {useContext, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; 
import { alertaAgregarCarrito } from "./ModalAgregarCarrito";

export default function ProductDetail({ producto, onVolver }) {
  const {addItemToCart} = useContext(CartContext);
  const { AuthToken, isLoggedIn, currentUser } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [])

  if (!producto) {
    return <div className="error">Error: No se encontró el producto.</div>;
  }

  const handleDelete = async () => {
    // 2. Confirmation dialog (window.confirm())
    if (window.confirm(`¿Estás seguro de que deseas eliminar el producto: ${producto.nombre}?`)) {
      try {
        // 3. Send DELETE request to /api/productos/:id
        const response = await fetch(`http://localhost:4000/api/productos/${producto._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AuthToken}` //
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
          throw new Error(`Error al eliminar el producto: ${response.status} - ${errorData.message || 'Error del servidor'}`);
        }

        // 4. Redirect user back to the catalog (or unselect product in parent view)
        alert(`Producto ${producto.nombre} eliminado exitosamente.`);
        
        // Use onVolver(true) to signal the parent component to refresh the product list
        onVolver(true); 
        
      } catch (error) {
        console.error('Error al intentar eliminar el producto:', error);
        alert(`Fallo al eliminar el producto: ${error.message}`);
      }
    }
  };
  
  return (
    <>
      <section className="producto">
        <button onClick={onVolver} className="btn-regresar-movil"><FontAwesomeIcon icon={faArrowLeft}/> Regresar</button>
        <img src={producto.imagen} alt={producto.nombre} className="producto-img"/>
        <div className="producto-info">
          <button onClick={onVolver} className="btn-regresar"><FontAwesomeIcon icon={faArrowLeft}/> Regresar</button>
          <h2 className="detalle-h2">{producto.nombre}</h2>
          <p className="detalleProducto-body">{producto.descripcion}</p>
          <p className="precio-prod">${producto.precio}</p>
          <button className="btn-carrito-detalle" onClick={() => {addItemToCart(producto); alertaAgregarCarrito()}}>Agregar al carrito</button>
          {/* Botón de eliminar */}
          {isLoggedIn && currentUser?.role === 'admin' && (
            <button 
                className="btn-eliminar"
                onClick={handleDelete}
            >
                Eliminar Producto (Admin)
            </button>
          )}  
        </div>
          {/* Mostrar sostenibilidad si existe (soporta 'sostentabilidad' o 'sostenibilidad') */}

        <section className="detalles">
          <details>
            <summary className="detalle-summary">Detalles del producto</summary>
            <ul className="detalles-lista">
              <li><strong>Acabado:</strong> {producto.acabado}<br/></li>
              <li><strong>Materiales:</strong> {producto.materiales}<br/></li>
              <li>{producto.almacenamiento && <><strong>Almacenamiento:</strong> {producto.almacenamiento}<br/></>}</li>
              <li>{producto.caracteristicas && <><strong>Características:</strong> {producto.caracteristicas}<br/></>}</li>
              <li>{producto.colchon && <><strong>Colchón:</strong> {producto.colchon}<br/></>}</li>
              <li>{producto.capacidad && <><strong>Capacidad:</strong> {producto.capacidad}<br/></>}</li>
              <li>{producto.extension && <><strong>Extensión:</strong> {producto.extension}<br/></>}</li>
              <li>{producto.peso && <><strong>Peso:</strong> {producto.peso}<br/></>}</li>
              <li>{producto.cargamax && <><strong>Carga máxima:</strong> {producto.cargamax}<br/></>}</li>
              <li>{producto.tapizado && <><strong>Tapizado:</strong> {producto.tapizado}<br/></>}</li>
              <li>{producto.relleno && <><strong>Relleno:</strong> {producto.relleno}<br/></>}</li>
              <li>{producto.confort && <><strong>Confort:</strong> {producto.confort}<br/></>}</li>
              <li>{producto.sostenibilidad && <><strong>Sostenibilidad:</strong> {producto.sostenibilidad}<br/></>}</li>
              <li>{producto.apilables && <><strong>Apilables:</strong> {producto.apilables}<br/></>}</li>
              <li>{producto.cables && <><strong>Cables:</strong> {producto.cables}<br/></>}</li>
              <li>{producto.regulacion && <><strong>Regulación:</strong> {producto.regulacion}<br/></>}</li>
              <li>{producto.certificacion && <><strong>Certificación:</strong> {producto.certificacion}<br/></>}</li>
            </ul>
          </details>
        </section>
        <section className="sustentabilidad">
          <details>
            <summary className="detalle-summary">Compromiso Sustentable</summary>
            <p>Cada pieza está elaborada con madera certificada FSC y procesos que reducen la huella de carbono, para un futuro más verde.</p>
          </details>
        </section>
      </section>
  
    </>
  );  
}

