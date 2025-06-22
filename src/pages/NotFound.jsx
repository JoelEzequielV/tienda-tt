import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import hardware from '../img/hard.avif'

const NotFound = ({cart,borrarProducto}) => {
  return (
    <>
    <Header borrarProducto={borrarProducto} cartItems={cart}/>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <p className="lead mb-4">Página no encontrada</p>
        <Link to='/' className="btn2 btnPrimary">
          Volver al inicio
        </Link>
        <img src={hardware} alt="logo" style={{width: '15em'}} className='mt-2'/>
      </div>
    <Footer />
    </>
  )
}

export default NotFound
