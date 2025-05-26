import { useState, useEffect, useContext } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AcercaDe from './pages/AcercaDe'
import Contacto from './pages/Contacto'
import GaleriaDeProductos from './pages/GaleriaDeProductos'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
import Detalles from './pages/Detalles'
import Login from './pages/Login'
import ToastNotification from './components/ToastNotification' 
import RutaProtegida from './auth/RutasProtegidas'
import { CartContext } from './context/CartContext'

function App() {
  const { cart, productos, cargando, error, borrarProducto, toastMessage, showToast, toastType, handleAddToCart, handleDeleteFromCart, isAuthenticated  } = useContext(CartContext)

  return (
    <Router>

      <Routes>

        <Route path='/' element={<Home borrarProducto={handleDeleteFromCart} agregarCarrito={handleAddToCart} cart={cart} productos={productos} cargando={cargando} />} />

        <Route path='/acercade' element={<AcercaDe borrarProducto={handleDeleteFromCart} cart={cart} />} />

        <Route path='/productos' element={<GaleriaDeProductos borrarProducto={handleDeleteFromCart} agregarCarrito={handleAddToCart} cart={cart} productos={productos} cargando={cargando} />} />

        <Route path='/productos/:id' element={<Detalles productos={productos} cart={cart} agregarCarrito={handleAddToCart} borrarProducto={handleDeleteFromCart}/>} />
        
        <Route path='/contacto' element={<Contacto borrarProducto={handleDeleteFromCart} cart={cart} />} />
        
        <Route path='/admin' element={<RutaProtegida isAuthenticated={isAuthenticated}> <Admin /> </RutaProtegida>} />

        <Route path='/login' element={<Login />} />

        <Route path='*' element={<NotFound />} />

      </Routes>

      <ToastNotification show={showToast} message={toastMessage} type={toastType} />

    </Router>
  )
}

export default App
