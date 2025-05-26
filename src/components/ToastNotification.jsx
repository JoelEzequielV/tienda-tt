// ToastNotification.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ToastNotification = ({ show, message, type = 'success' }) => {
  if (!show) return null;

  // Clases Bootstrap según el tipo
  const toastClass = {
    success: 'bg-success text-white',
    danger: 'bg-danger text-white',
    warning: 'bg-warning text-dark',
    info: 'bg-info text-dark'
  }[type] || 'bg-secondary text-white';

  return (
    <div
      className={`toast show position-fixed bottom-0 end-0 m-4 ${toastClass}`}
      role="alert"
      style={{ zIndex: 9999, minWidth: '250px' }}
    >
      <div className="toast-body">
        {message}
      </div>
    </div>
  );
};

export default ToastNotification;

