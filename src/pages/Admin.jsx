import React, { useContext,useState } from "react";
import { AdminContext } from "../context/AdminContext";
import FormularioAddProducto from "../components/FormularioAddProducto";
import FormularioEditProducto from '../components/FormularioEditProducto';
import FormularioDeleteProd from "../components/FormularioDeleteProd";
import Footer from '../components/estaticos/Footer';
import '../App.css'

//user en localStorange
const user = JSON.parse(localStorage.getItem('user'));
const nombre = user?.email || 'Admin';

const Admin = () => {
  const {
    productos,
    loading,
    productoEditar,
    setProductoEditar,
    productoDelete,
    setProductoDelete,
    open,
    setOpen,
    agregarProducto,
    handleGuardarCambios,
    handleDelete
  } = useContext(AdminContext);

  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  //Filtro
  const productosFiltrados = productos.filter((producto) =>
    producto.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  //Paginacion
  const indexUltimo = paginaActual * productosPorPagina;
  const indexPrimero = indexUltimo - productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indexPrimero, indexUltimo);

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  return (
    <>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-white" role="status"></div>
          <p className="mt-2">Cargando...</p>
        </div>
      ) : (
        <>
          <nav className="bg-dark d-flex justify-content-between align-items-center p-2">
            <ul className="nav">
              <li className="nav-item">
                
              <button className="btn btn-outline-danger" onClick={() => {
                localStorage.removeItem('user');
                window.location.href = '/login';
              }}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>

              </li>
              <li className="nav-item ms-3">
                <a href="/admin" className="nav-link text-white active">Admin</a>
              </li>
              <li className="nav-item ms-3">
                <a href="/" className="nav-link text-white">Home</a>
              </li>
            </ul>
            <button className="btn btn-outline-primary" onClick={() => setOpen(true)}>
              Agregar producto nuevo
            </button>
          </nav>

          <h1 className="mb-4 text-center">Panel Administrativo</h1>
          <h2 className="text-center mb-4">Hola, {nombre}</h2>

          <div className="container">

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar productos..."
                  value={busqueda}
                  onChange={(e) => {
                    setBusqueda(e.target.value);
                    setPaginaActual(1);
                  }}
                />
              </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 m-2">
            {productosPaginados.map((product) => (
                <div key={product.id} className="col">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.title}
                      
                      style={{maxWidth: '5em', minHeight: '10em', margin: 'auto', objectFit: 'contain'}}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.title}</h5>
                      <span className="card-text"><b>Price:</b> ${product.price}</span>
                      <span className="card-text"><b>Category:</b> {product.category}</span>
                      <span className="card-text">< b>Stock:</b> {product.stock} </span>
                      <div className=" d-flex justify-content-between mt-2">
                        <button
                          className="btn2 btnPrimary btn-sm"
                          onClick={() => setProductoEditar(product)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn2 btnSecondary btn-sm"
                          onClick={() => setProductoDelete(product)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-6 text-end mb-4 m-4">
              <nav>
                <ul className="pagination justify-content-end mb-0">
                  {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                    <li key={num} className={`page-item ${num === paginaActual ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setPaginaActual(num)}>
                        {num}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

          </div>

          {productoEditar && (
            <FormularioEditProducto
              producto={productoEditar}
              onClose={() => setProductoEditar(null)}
              onSave={handleGuardarCambios}
            />
          )}

          {productoDelete && (
            <FormularioDeleteProd
              producto={productoDelete}
              onClose={() => setProductoDelete(null)}
              onConfirmDelete={() => handleDelete(productoDelete.id)}
            />
          )}

          {open && (
            <FormularioAddProducto
              onAgregar={agregarProducto}
              onClose={() => setOpen(false)}
            />
          )}
        </>
      )}

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"
        crossOrigin="anonymous"
      ></script>

      <Footer />
    </>
  );
};

export default Admin;
