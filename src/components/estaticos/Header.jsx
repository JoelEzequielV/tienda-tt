import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../Cart';

const Header = ({ cartItems, borrarProducto }) => {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/">Mi Tienda</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/acercade">Sobre nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Galería de productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>

          <button
        className="btnCart"
        data-bs-toggle="modal"
        data-bs-target="#cartModal"
        onClick={() => setCartOpen(true)}
      >
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
        </div>
      </nav>

    <Cart borrarProducto={borrarProducto} cartItems={cartItems} isOpen={isCartOpen} onClose={() => setCartOpen(false)} />

    </header>
  );
};

export default Header;

