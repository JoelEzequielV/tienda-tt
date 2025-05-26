import React from 'react';
import { useParams } from 'react-router-dom';


const DetallesProductos = ({ productos,agregarCarrito }) => {
  const { id } = useParams();

  if (!productos || productos.length === 0) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning text-center">
          Cargando producto...
        </div>
      </div>
    );
  }

  const product = productos.find(producto => producto.id == id);
  const stock = 10;
  const quantity = 1;
  if (product) {
    return (
      <div className="container my-5">
        <div className="card shadow p-3">
          <div className="row g-4">
            <div className="col-md-6 text-center">
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <h2 className="mb-3">{product.title}</h2>
              <p><strong>Precio:</strong> ${product.price}</p>
              <p><strong>Descripción:</strong> {product.description}</p>
              <p><strong>Stock:</strong> {stock}</p>
              <p><strong>Categoría:</strong> {product.category}</p>
              <button onClick={() => agregarCarrito(product,quantity)} className="btn btn-dark">Agregar al carrito</button>
              <a href="/" style={{ margin: '0 0.5em' }}><button className="btn btn-secondary">Volver atrás</button></a>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container my-5">
        <div className="alert alert-danger text-center" role="alert">
          Producto no encontrado
          <a href="/"><button className='btn btn-secondary' type="button"> Volver </button> </a>
        </div>
      </div>
    );
  }
};


export default DetallesProductos;
