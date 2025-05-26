import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import loading from '../assets/loading.gif'
const AcercaDe = ({cart,borrarProducto}) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart}/>
      <div className='container-fluid text-center'>
        <h1>Acerca De</h1>
        <p>
        Somos una web especializada en hardware dedicada a brindar información clara, confiable y actualizada sobre los últimos componentes tecnológicos del mercado. Nuestro objetivo es ayudar a usuarios de todos los niveles a tomar decisiones informadas, ya sea para armar una PC desde cero o mejorar su equipo actual. Creemos en la tecnología como herramienta de crecimiento y por eso compartimos análisis, comparativas, guías y noticias del mundo del hardware.
        </p>
        <img src={loading} alt="logo" />
      </div>
      <Footer />

    </>
  )
}

export default AcercaDe
