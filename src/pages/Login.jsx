import React, { useState, useContext } from 'react';
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});



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
        const userData = {
          email: foundUser.email,
          role: foundUser.role
        };
        localStorage.setItem('user', JSON.stringify(userData));
      

        if (foundUser.role === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/login';
        }        
      }
      
    } catch (err) {
      console.error('Error fetching users:', err);
      setErrors({ email: 'Algo salió mal. Por favor, inténtalo de nuevo más tarde.' });
    }
  };

  return (
<>
  <Header />
    <div className="container mt-3">
      <div className="text-center"> 
        <span><b>admin:</b> admin@mail.com <br />
        <b>client:</b> client@mail.com</span><br />
        <span><b>password:</b> 1234</span><br />
      </div>
      <hr />
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

        <button type="submit" className="btn2 btnPrimary w-100">
          Ingresar
        </button><br /><br />
        <a href="/" style={{ color: '#ff3c78' }}>Volver Atras</a>
      </form>
    </div>
  <Footer />
</>
  );
};

export default Login;
