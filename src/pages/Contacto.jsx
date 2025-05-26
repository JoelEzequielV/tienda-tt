import React, { useState } from 'react';
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'


const Contacto = ({cart, borrarProducto}) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // hacer fetch/axios para enviar los datos
    console.log('Formulario enviado:', formData);
    setEnviado(true);
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
  <>
    <Header borrarProducto={borrarProducto} cartItems={cart}/>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg border-0 rounded-4" style={{background: 'lightgray'}}>
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
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mensaje" className="form-label">Mensaje</label>
                    <textarea
                      className="form-control"
                      id="mensaje"
                      name="mensaje"
                      rows="5"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-dark btn-lg rounded-3">
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

