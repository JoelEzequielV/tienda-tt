
import DetallesProductos from '../components/DetallesProductos'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'


const Detalles = ({ productos, cart, borrarProducto, agregarCarrito, cargando }) => {
    if (cargando || !productos || productos.length === 0) {
        return (
        <>
            <Header borrarProducto={borrarProducto} cartItems={cart} />
            <div className="text-center mt-5">
            <div className="spinner-border text-dark" role="status"></div>
            <p className="mt-2">Cargando detalles del producto...</p>
            </div>
            <Footer />
        </>
        );
    }
    
    return (
        <>
        <Header borrarProducto={borrarProducto} cartItems={cart} />
        <DetallesProductos productos={productos} agregarCarrito={agregarCarrito} />
        <Footer />
        </>
    );
    };
      

export default Detalles;
