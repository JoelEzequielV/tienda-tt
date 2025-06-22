import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartContext } from './context/CartContext';
import { RutaAdmin, RutaCliente, RutaProtegida } from './auth/RutasProtegidas';
import ToastNotification from './components/ToastNotification';


import Home from './pages/Home';
import AcercaDe from './pages/AcercaDe';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';
import Detalles from './pages/Detalles';
import Admin from './pages/Admin';
import Login from './pages/Login';



function App() {
  const { cart, productos, cargando, error, borrarProducto, toastMessage, showToast, toastType, handleAddToCart, handleDeleteFromCart, isAuth } = useContext(CartContext)

  return (
    <Router>

      <Routes>

        <Route path='/' element={<Home borrarProducto={handleDeleteFromCart} agregarCarrito={handleAddToCart} cart={cart} productos={productos} cargando={cargando} />} />

        <Route path='/acercade' element={<AcercaDe borrarProducto={handleDeleteFromCart} cart={cart} />} />

        <Route path='/productos/:id' element={<Detalles productos={productos} cart={cart} agregarCarrito={handleAddToCart} borrarProducto={handleDeleteFromCart}/>} />
        
        <Route path='/contacto' element={<Contacto borrarProducto={handleDeleteFromCart} cart={cart} />} />
        
        <Route path='/admin' element={<RutaAdmin> <Admin /> </RutaAdmin>} />

        <Route path='/login' element={<RutaProtegida> <Login /> </RutaProtegida>} />

        <Route path="/" element={<RutaCliente> <Home /> </RutaCliente> } />

        <Route path='*' element={<NotFound />} />

      </Routes>

      <ToastNotification show={showToast} message={toastMessage} type={toastType} />

    </Router>
  )
}

export default App
