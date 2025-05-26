import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <p className="lead mb-4">Página no encontrada</p>
      <Link to='/' className="btn btn-primary">
        Volver al inicio
      </Link>
    </div>
  )
}

export default NotFound
