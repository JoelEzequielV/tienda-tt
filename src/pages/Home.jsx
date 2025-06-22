import React, { useState, useContext } from 'react';
import Header from '../components/estaticos/Header';
import Footer from '../components/estaticos/Footer';
import ProductList from '../components/ProductList';



const Home = ({ cart, productos, cargando, agregarCarrito, borrarProducto }) => {
  
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;

  //obtener categorías
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const categorias = ['Todas', ...new Set(productos.map(p => p.category))];
  

  //filtro por categoría
const productosFiltrados = productos.filter(p => {
  const coincideCategoria = categoriaSeleccionada === 'Todas' || p.category === categoriaSeleccionada;
  const coincideBusqueda = p.title.toLowerCase().includes(busqueda.toLowerCase());
  return coincideCategoria && coincideBusqueda;
});

//paginación sobre los productos filtrados
const indiceUltimoProducto = paginaActual * productosPorPagina;
const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);


  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
  };

  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} />
      <main className='container-fluid text-center'>
        <h1>Bienvenidos a e-TechX</h1>
        <div style={{padding: '0.5em 2em 0.5em 2em'}}>
          <div className="alert alert-light borderEt">
            <p>Una web de hardware es una plataforma en línea dedicada a la venta, análisis o información de componentes físicos de computadoras...</p>
          </div>
        </div>

        {
          cargando
            ? 
            <div className="text-center mt-5">
            <div className="spinner-border text-dark" role="status"></div>
            <p className="mt-2">Cargando productos...</p>
            </div>
            : <>
                <div className="row mb-4" style={{rowGap: '1rem'}}>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar producto..."
                      value={busqueda}
                      onChange={(e) => {
                        setBusqueda(e.target.value);
                        setPaginaActual(1);
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      value={categoriaSeleccionada}
                      onChange={(e) => {
                        setCategoriaSeleccionada(e.target.value);
                        setPaginaActual(1);
                      }}
                    >
                      {categorias.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <ProductList agregarCarrito={agregarCarrito} productos={productosActuales} />
                <nav>
                  <ul className="pagination justify-content-center mt-4">
                    <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => cambiarPagina(paginaActual - 1)}>Anterior</button>
                    </li>
                    {
                      Array.from({ length: totalPaginas }, (_, i) => (
                        <li key={i} className={`page-item ${paginaActual === i + 1 ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => cambiarPagina(i + 1)}>{i + 1}</button>
                        </li>
                      ))
                    }
                    <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => cambiarPagina(paginaActual + 1)}>Siguiente</button>
                    </li>
                  </ul>
                </nav>
              </>
        }

      </main>
      <Footer />
    </>
  );
};

export default Home;
