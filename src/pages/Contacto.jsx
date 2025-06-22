import React, { useState } from 'react';
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'


const Contacto = ({cart, borrarProducto}) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { nombre, email, mensaje } = formData;
  
    let validationErrors = {};
    if (!nombre.trim()) validationErrors.nombre = 'Nombre es requerido';
    if (!email.trim()) validationErrors.email = 'Email es requerido';
    if (!mensaje.trim()) validationErrors.mensaje = 'Mensaje es requerido';
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    console.log('Formulario enviado:', formData);
    setEnviado(true);
    setErrors({});
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
  <>
    <Header borrarProducto={borrarProducto} cartItems={cart}/>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg border-1 rounded-4" style={{background: 'rgb(54 2 116 / 25%)'}}>
              <div className="card-body p-5">
                <h2 className="text-center mb-4">Contáctanos</h2>
                {enviado && (
                  <div className="alert alert-success text-center">
                    ¡Tu mensaje ha sido enviado con éxito!
                  </div>
                )}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                      type="text"
                      className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mensaje" className="form-label">Mensaje</label>
                    <textarea
                      className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`}
                      id="mensaje"
                      name="mensaje"
                      rows="5"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                    ></textarea>
                    {errors.mensaje && <div className="invalid-feedback">{errors.mensaje}</div>}
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn2 btnPrimary">
                      Enviar mensaje
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Footer />
  </>
  );
};

export default Contacto;

