import React, { useState, useContext, useEffect } from 'react';
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import hardware from '../img/hard.avif'
const AcercaDe = ({cart,borrarProducto}) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart}/>
      <div className='container-fluid text-center'>
        <div class="logo" style={{fontSize: '2rem', backgroundColor: '#212529', marginTop: '0.2rem'}}><span class="highlight">e-TechX</span></div>
        <div className='alert alert-light borderEt'>
        <p>
        Somos una web especializada en hardware dedicada a brindar información clara, confiable y actualizada sobre los últimos componentes tecnológicos del mercado. Nuestro objetivo es ayudar a usuarios de todos los niveles a tomar decisiones informadas, ya sea para armar una PC desde cero o mejorar su equipo actual. Creemos en la tecnología como herramienta de crecimiento y por eso compartimos análisis, comparativas, guías y noticias del mundo del hardware.
        </p>
        <img src={hardware} alt="logo" style={{width: '15em'}} />
        </div>
      </div>
      <Footer />

    </>
  )
}

export default AcercaDe
