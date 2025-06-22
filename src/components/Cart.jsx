import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Cart = ({ onClose }) => {
  const {
    cart,
    handleDeleteFromCart: borrarProducto,
    increaseQty,
    decreaseQty,
    clearCart,
    totalPrice
  } = useContext(CartContext);

  const handleFinalizarCompra = () => {
    if (cart.length === 0) {
      Swal.fire({
        title: "Vacio!",
        text: "El carrito está vacío.",
        icon: "error",
        customClass: {
          confirmButton: 'btn2 btnPrimary'
        }
      });
      
      return;
    }
    Swal.fire({
      title: "Hecho!",
      text: "Compra finalizada con éxito!",
      icon: "success",
      customClass: {
        confirmButton: 'btn2 btnPrimary'
      }
    });
    clearCart();
    onClose(); 
  };

  return (
    <div className="modal fade" id="cartModal" tabIndex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content card">
          <div className="modal-header">
            <h5 className="modal-title" id="cartModalLabel">Carrito de Compras</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
              onClick={onClose}
              style={{backgroundColor: '#fff'}}
            />
          </div>
          <div className="modal-body">
            {cart.length === 0 ? (
              <p className="">El carrito está vacío.</p>
            ) : (
              <>
                <ul className="list-group">
                  {cart.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div style={{ flex: 1 }}>
                        <strong>{item.title}</strong><br />
                        Precio: ${item.price}<br />
                        Cantidad:
                        <button className="btn btn-sm btnPrimary mx-1" onClick={() => decreaseQty(item.id)}>-</button>
                        {item.quantity}
                        <button
                          className="btn btn-sm btnPrimary mx-1"
                          onClick={() => increaseQty(item.id)}
                          disabled={item.quantity >= item.stock}
                        >
                          +
                        </button>
                      </div>
                      <button className="btn btn-sm btn-danger" onClick={() => borrarProducto(item)}>
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-end">
                  <h5>Total: ${totalPrice.toFixed(2)}</h5>
                </div>
              </>
            )}
          </div>
          <div className="modal-footer d-flex justify-content-between flex-wrap">
            <button className="btn2 btnSecondary" onClick={clearCart}>Vaciar carrito</button>
            <button className="btn2 btnPrimary" onClick={handleFinalizarCompra}>Finalizar compra</button>
            <button className="btn2 btnTr" data-bs-dismiss="modal" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
