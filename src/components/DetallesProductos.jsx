import React , {useState} from 'react'
import { useParams } from 'react-router-dom';


const DetallesProductos = ({ productos,agregarCarrito }) => {

  const [quantity, setCantidad] = useState(1);

  const increase = () => setCantidad(prev => (prev < producto.stock ? prev + 1 : prev));
  const decrease = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

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

  const producto = productos.find(producto => producto.id == id);

  if (producto) {
    return (
      <div className="container my-5">
        <div className="card shadow p-3">
          <div className="row g-4">
            <div className="col-md-6 text-center">
              <img
                src={producto.image}
                alt={producto.title}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <h2 className="mb-3">{producto.title}</h2>
              <p><strong>Precio:</strong> ${producto.price}</p>
              <p><strong>Descripción:</strong> {producto.description}</p>
              <p><strong>Stock:</strong> {producto.stock}</p>
              <p><strong>Categoría:</strong> {producto.category}</p>
              <div style={{display: 'flex', gap:'0.5em', margin: '0 0 9px 9px'}}>
                <button className='btn btnPrimary' onClick={decrease}>-</button>
                <span className="input-group-text">{quantity}</span>
                <button className='btn btnPrimary' onClick={increase}>+</button>
              </div>
              <button onClick={() => agregarCarrito(producto,quantity)} className="btn2 btnPrimary">Agregar al carrito</button>
              <a href="/" style={{ margin: '0 0.5em' }}><button className="btn2 btnSecondary">Volver atrás</button></a>
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
