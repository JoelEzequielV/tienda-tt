import React, { useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Cart = ({ cartItems = [], borrarProducto, onClose }) => {


  return (
    <div className="modal fade" id="cartModal" tabIndex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="cartModalLabel">Carrito de Compras</h5>
            <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Cerrar"
            onClick={onClose}
            />
          </div>
          <div className="modal-body">
            {cartItems.length === 0 ? (
              <p className="text-muted">El carrito está vacío.</p>
            ) : (
              <ul className="list-group">
                {cartItems.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{item.title}</strong> <br />
                      <span>Price: {item.price}</span> <br />
                            Cantidad: {item.quantity}
                    </div>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => borrarProducto(item)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="modal-footer">
            <button
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={onClose}
            >
            Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

