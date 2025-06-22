import React, { useState, useEffect } from 'react';

const FormularioAddProducto = ({ producto, onClose, onSave }) => {
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    price: '',
    image: '',
    stock: '',
    category: '',
    description: '',
  });

  useEffect(() => {
    if (producto) {
      setFormData({
        id: producto.id,
        title: producto.title,
        price: producto.price,
        image: producto.image,
        stock: producto.stock,
        category: producto.category,
        description: producto.description,
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!producto) return null;

  return (
    <div className="modal show fade d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content card shadow">
          <div className="modal-header">
            <h5 className="modal-title">Editar producto</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Categoria</label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                  <label className="form-label">Descripción:</label>
                  <textarea
                      name="description"
                      value={producto.description}
                      onChange={handleChange}
                      className="form-control"
                  />
              </div>
              <div className="mb-3">
                <label className="form-label">URL de imagen</label>
                <input
                  type="text"
                  className="form-control"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn2 btnSecondary" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn2 btnPrimary">Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioAddProducto;
