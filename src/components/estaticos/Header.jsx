import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Cart from '../Cart';
import { CartContext } from '/src/context/CartContext';

const Header = () => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [isCartOpen, setCartOpen] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);

  const user = JSON.parse(localStorage.getItem('user'));
  const nombre = user?.email;
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  useEffect(() => {
    const handleResize = () => {
      const esEscritorio = window.innerWidth >= 992;
      setIsDesktop(esEscritorio);
      if (esEscritorio) setMenuAbierto(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <NavLink className="navbar-brand" to="/" onClick={() => setMenuAbierto(false)}>
          <div className="logo">
            Tienda <span className="highlight">e-TechX</span>
          </div>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-collapse ${menuAbierto || isDesktop ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuAbierto(false)}
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/acercade"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuAbierto(false)}
              >
                Sobre nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contacto"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuAbierto(false)}
              >
                Contacto
              </NavLink>
            </li>
          </ul>

          <button
            className="btn position-relative me-3 mt-3"
            onClick={() => setCartOpen(true)}
            data-bs-toggle="modal"
            data-bs-target="#cartModal"
          >
            <i className="fa-solid fa-cart-shopping" style={{ color: '#ff3c78' }}></i>
            {totalItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalItems}
              </span>
            )}
          </button>

          <Cart onClose={() => setCartOpen(false)} />
        </div>
      </nav>

      <div className="bg-dark px-4 text-center text-white">
        <ul className="ulNav">
          <li className="nav-item">
            {user ? (
              user.role === 'admin' ? (
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/admin"
                  onClick={() => setMenuAbierto(false)}
                >
                  Panel Admin / <span style={{ color: '#ff3c78' }}>{role}</span>
                </NavLink>
              ) : (
                <span className="me-2">
                  Hola, <span style={{ color: '#006aff' }}>{nombre}</span> /{' '}
                  <span style={{ color: '#ff3c78' }}>{role}</span>
                </span>
              )
            ) : (
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                to="/login"
                onClick={() => setMenuAbierto(false)}
              >
                Login 🔒
              </NavLink>
            )}
          </li>

          {user && (
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </li>
          )}
        </ul>
      </div>

    </header>
  );
};

export default Header;


