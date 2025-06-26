import React , {useState} from 'react'

const Productos = ({producto,agregarCarrito}) => {

  const [quantity, setCantidad] = useState(1);

  const increase = () => setCantidad(prev => (prev < producto.stock ? prev + 1 : prev));
  const decrease = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));
  
  return (
  <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
    <div className='card'>
      <a href={"/productos/"+producto.id}>
      <div>
        <img className="card-img-top" src={producto.image} alt={producto.title} style={{maxWidth: '8em', minHeight: '10em', margin: '0.5em', objectFit: 'contain'}} />
      </div>
      </a>
      <div className="card-body">
          <h6 className="card-title txtLimit">{producto.title}</h6>
          <span className="card-text text-danger">Precio: ${producto.price}</span>
          <p className="card-text"><b>Stock:</b> {producto.stock}</p>
      

        <div className="card-footer" style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', gap:'0.5em'}}>
          <div style={{display: 'flex', gap:'0.5em'}}>
            <button className='btn btnPrimary' onClick={decrease}>-</button>
            <span className="input-group-text">{quantity}</span>
            <button className='btn btnPrimary' onClick={increase}>+</button>
          </div>
          <button onClick={()=> agregarCarrito(producto,quantity)} className="btn2 btnPrimary">Agregar al carrito</button>
          
        </div>

      </div>
    </div>
  </div>
  )
}

export default Productos
