import React, { useState, useEffect } from "react";
import FormularioAddProducto from "../components/FormularioAddProducto";
import FormularioEditProducto from '../components/FormularioEditProducto';
import FormularioDeleteProd from "../components/FormularioDeleteProd";
import Footer from '../components/estaticos/Footer';

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [productoDelete, setProductoDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setProductos(data);
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
      });
      if (!respuesta.ok) throw new Error('Error al agregar producto');
      const data = await respuesta.json();
      alert('Producto agregado correctamente');
      setProductos([...productos, data]); // agregarlo al estado
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGuardarCambios = async (productoActualizado) => {
    try {
      const respuesta = await fetch(`https://fakestoreapi.com/products/${productoActualizado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado)
      });
      if (!respuesta.ok) throw new Error('Error al actualizar producto');
      const data = await respuesta.json();
      alert('El producto se actualizó correctamente');
      setProductos(productos.map(p => p.id === data.id ? data : p));
      setProductoEditar(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (productoId) => {
    try {
      const respuesta = await fetch(`https://fakestoreapi.com/products/${productoId}`, {
        method: 'DELETE'
      });
      if (!respuesta.ok) throw new Error('Error al eliminar producto');
      await respuesta.json();
      alert('El producto se eliminó correctamente');
      setProductos(productos.filter(p => p.id !== productoId));
      setProductoDelete(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-white" role="status"></div>
          <p className="mt-2">Cargando...</p>
        </div>
      ) : (
        <>
          <nav className="d-flex justify-content-between align-items-center mb-4">
            <ul className="nav">
              <li className="nav-item">
                <button className="btn btn-outline-danger">
                  <a href="/login">
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </a>
                </button>
              </li>
              <li className="nav-item ms-3">
                <a href="/admin" className="nav-link text-white">Admin</a>
              </li>
            </ul>
            <button className="btn btn-success" onClick={() => setOpen(true)}>
              Agregar producto nuevo
            </button>
          </nav>

          <h1 className="mb-4 text-center">Panel Administrativo</h1>

          <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {productos.map((product) => (
                <div key={product.id} className="col">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">${product.price}</p>
                      <div className="mt-auto d-flex justify-content-between">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => setProductoEditar(product)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
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
