import React, { useState } from 'react';

function FormularioProducto({ onAgregar, onClose }) {
    const [producto, setProducto] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        stock: '',
    });
    const [errores, setErrores] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const validarFormulario = () => {
        const nuevosErrores = {};
        if (!producto.title) {
            nuevosErrores.title = 'El nombre es obligatorio.';
        }
        if (!producto.price || producto.price <= 0) {
            nuevosErrores.price = 'El precio debe ser mayor a 0.';
        }
        if (!producto.description || producto.description.length < 10) {
            nuevosErrores.description = 'La descripción debe tener al menos 10 caracteres.';
        }
        if (!producto.category) {
            nuevosErrores.category = 'La categoria es obligatorio';
        }
        if (!producto.stock || producto.stock <= 0) {
            nuevosErrores.stock = 'El stock debe ser mayor a 0.';
        }
        if (!producto.image.trim()) {
            producto.image = '../src/img/default.webp';
        } 

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;
        onAgregar(producto);
        setProducto({ id: null, title: '', price: '', description: '', category: '' , image: '' , stock: '' });
        onClose(); 
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content card">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">Agregar Producto</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Nombre:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={producto.title}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                                {errores.title && <p className="text-danger mt-1">{errores.title}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Precio:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={producto.price}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                                {errores.price && <p className="text-danger mt-1">{errores.price}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Stock:</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={producto.stock}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                                {errores.stock && <p className="text-danger mt-1">{errores.stock}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Descripción:</label>
                                <textarea
                                    name="description"
                                    value={producto.description}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                                {errores.description && <p className="text-danger mt-1">{errores.description}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Categoria:</label>
                                <input
                                    type='text'
                                    name="category"
                                    value={producto.category}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                                {errores.category && <p className="text-danger mt-1">{errores.category}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Imagen (url):</label>
                                <input
                                    type='text'
                                    name="image"
                                    value={producto.image}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn2 btnSecondary" onClick={onClose}>Cancelar</button>
                            <button type="submit" className="btn2 btnPrimary">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormularioProducto;
