import React, { useState, useEffect } from 'react';

const FormularioDeleteProd = ({ producto, onClose, onConfirmDelete }) => {
  const [formData, setFormData] = useState({ id: '', title: '' });

  useEffect(() => {
    if (producto) {
      setFormData({ id: producto.id, title: producto.title });
    }
  }, [producto]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmDelete(); 
  };

  if (!producto) return null;

  return (
    <div className="modal show fade d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content shadow">
          <div className="modal-header">
            <h5 className="modal-title">Eliminar producto</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <p>¿Seguro que deseas eliminar el producto <strong>{formData.title}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-danger">
                Eliminar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioDeleteProd;
