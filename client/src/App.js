import './css/App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PaginaInicio from './pages/PaginaInicio';
import Contacto from './pages/Contacto';
import Catalogo from './pages/Catalogo';
import {Routes, Route} from 'react-router-dom'
import CrearProducto from './pages/CrearProducto';
import AdminPanel from './pages/AdminPanel';
import ProductDetailPage from './pages/ProductDetailPage';
import Registro from './pages/Registro';
import Login from './pages/Login';


function App() {
  return (
    <>
      <Navbar/>
      
      <Routes>
          <Route path='/' element={<PaginaInicio/>} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/login' element={<Login />} />
          <Route path='/productos' element={<Catalogo/>} />
          <Route path='/productos/:id' element={<ProductDetailPage/>} />
          <Route path='/contacto' element={<Contacto/>} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/admin/crear-producto' element={<CrearProducto />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;