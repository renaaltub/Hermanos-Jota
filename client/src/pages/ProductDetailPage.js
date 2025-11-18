import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import ProductosRelacionados from '../components/ProductosRelacionados';

// Esta página actúa como un "contenedor" para el detalle
export default function ProductDetailPage({ anadirFuncion }) {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 1. Obtiene el parámetro ":id" de la URL
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      setError(null);
      try {
        // 2. Llama a tu API con el ID numérico
        const response = await fetch(`http://localhost:4000/api/productos/${id}`);
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        const data = await response.json();
        setProducto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [id]); // 3. Se ejecuta de nuevo si el ID en la URL cambia

  // 4. Maneja los estados de carga y error
  if (loading) return <main className="main-productos"><p className="mensajeswr">Cargando...</p></main>;
  if (error) return <main className="main-productos"><p className="mensajeswr" style={{ color: "red" }}>Error: {error}</p></main>;
  if (!producto) return <main className="main-productos"><p className="mensajeswr">Producto no encontrado.</p></main>;

  // 5. Renderiza el detalle y los relacionados
  return (
    <main className="main-productos">
      <section className="catalogo">
        <ProductDetail
          producto={producto}
          anadirFuncion={anadirFuncion}
          // Pasa la función de navegación para el botón "Volver"
          onVolver={() => navigate(-1)} 
        />
        <ProductosRelacionados
          producto={producto}
          anadirFuncion={anadirFuncion}
        />
      </section>
    </main>
  );
}