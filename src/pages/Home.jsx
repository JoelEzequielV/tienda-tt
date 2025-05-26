import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import ProductList from '../components/ProductList'
import loading from '../assets/loading.gif'
const Home = ({ cart ,productos, cargando, agregarCarrito, borrarProducto }) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart}/>
      <main className='container-fluid text-center'>
        <h1>Bienvenidos a mi Tienda</h1>
        <div className="alert alert-light">
          <p>Una web de hardware es una plataforma en línea dedicada a la venta, análisis o información de componentes físicos de computadoras, como procesadores, tarjetas gráficas, memorias RAM, discos duros, entre otros. </p>
        </div>
        {
          cargando ? <img src={loading} alt='loading' /> :

          <ProductList agregarCarrito={agregarCarrito} productos={productos}/>
        }

      </main>

      <Footer />

    </>
  )
}

export default Home
