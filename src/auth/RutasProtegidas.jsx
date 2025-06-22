import React from 'react';
import { Navigate } from 'react-router-dom';


export function RutaProtegida({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) return <Navigate to="/" replace />;
  return children;
}

export function RutaAdmin({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'admin') return <Navigate to="/login" replace />;
  return children;
}

export function RutaCliente({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'cliente') return <Navigate to="/login" replace />;
  return children;
}

export default RutaProtegida;