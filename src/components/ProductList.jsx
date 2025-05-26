import React from 'react'
import Productos from './Productos'

const ProductList = ({ productos, agregarCarrito }) => {
    return (
        <>
        
            <h2>Galeria de productos</h2>
           
            <div className="container mt-4">
                <div className="row">
                    
                {
                    productos.map(producto => (
                        <Productos key={producto.id} producto={producto} agregarCarrito={agregarCarrito}/>
                    ))
                }
                
                </div>
            </div>
        </>
    )
}

export default ProductList
