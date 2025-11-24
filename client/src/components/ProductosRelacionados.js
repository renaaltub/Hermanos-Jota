import React, { useEffect, useRef, useState } from 'react';
import useSWR from "swr";
import "../css/App.css";
import ProductCard from './ProductCard';

const ProdRelacionados = async (url) => {
  const res = await fetch(url);
  if (!res.ok){
    throw new Error('Ocurrió un error al cargar los productos')
  }
  return res.json();
}

// Muestra hasta 3 productos distintos al producto actual en una grilla
export default function ProductosRelacionados({ producto }) {
  const {
    data: productos,
    error,
    isLoading
  } = useSWR('http://localhost:4000/api/productos', ProdRelacionados);

  // We'll compute the shuffled selection once per page load and keep it.
  const [seleccionados, setSeleccionados] = useState([]);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return; // already initialized once for this page load
    if (isLoading || error || !Array.isArray(productos)) return;
    if (!producto) return;

    const relacionados = productos.filter(p => p && p._id !== producto._id);
    const shuffled = relacionados.sort(() => Math.random() - 0.5).slice(0, 3);
    setSeleccionados(shuffled);
    initializedRef.current = true;
  }, [isLoading, error, productos, producto]);

  if (!producto) return null;

  if (error) return <p className="mensajeswr">Ocurrió un error al cargar los productos</p>
  if (isLoading || !Array.isArray(productos)) return <p className="mensajeswr">Cargando...</p>

  if (!seleccionados || seleccionados.length === 0) return null;

  return (
    <section className="productos-relacionados">
      <h2 className="detalle-h2">Otras personas vieron</h2>
      <div className="relacionados-flex">
        {seleccionados.map(p => (
          <div key={p._id}>
            <ProductCard producto={p}/>
          </div>
        ))}
      </div>
    </section>
  );
}