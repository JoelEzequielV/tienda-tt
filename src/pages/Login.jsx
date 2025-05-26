import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
 
const Login = ({borrarProducto,cart}) => {
  const { setIsAuth } = useContext(CartContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!email) validationErrors.email = 'Email es requerido';
    if (!password) validationErrors.password = 'Password es requerido';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch('data/users.json');
      const users = await res.json();

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setErrors({ email: 'Credenciales inválidas' });
      } else {
        if (foundUser.role === 'admin') {
          setIsAuth(true);
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setErrors({ email: 'Algo salió mal. Por favor, inténtalo de nuevo más tarde.' });
    }
  };

  return (
<>
  <Header borrarProducto={borrarProducto} cartItems={cart}/>
    <div className="container mt-5">
      <div className="text-center"> 
        <span><b>admin:</b> admin@mail.com <b>client:</b> client@mail.com</span><br />
        <span><b>Pass:</b> 1234</span><br />
      </div>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label htmlFor="formBasicEmail" className="form-label fw-bold">
            Email
          </label>
          <input
            id="formBasicEmail"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="formBasicPassword" className="form-label fw-bold">
            Contraseña
          </label>
          <input
            id="formBasicPassword"
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Ingresar
        </button><br /><br />
        <a href="/">Volver Atras</a>
      </form>
    </div>
  <Footer />
</>
  );
};

export default Login;
