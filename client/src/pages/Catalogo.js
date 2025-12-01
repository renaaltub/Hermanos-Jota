import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import "../css/App.css";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [refreshToggle, setRefreshToggle] = useState(false); // forzar actualizacion desp de eliminar

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://hermanos-jota-ei35.onrender.com/api/productos");
        if (!response.ok) throw new Error("Error al cargar productos");
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, [setProductos, refreshToggle]);


  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [])

  return (
    <main className="main-productos">
      <section className="catalogo">
        <h2 className="catalogo-h2">Catálogo de Productos</h2>
        <p>Explora nuestra selección de muebles para tu hogar y oficina.</p>
        <SearchBar onBuscar={setBusqueda}/>

        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      
    
          <ProductList productos={productosFiltrados}/>
      </section>
    </main>
  );
}
