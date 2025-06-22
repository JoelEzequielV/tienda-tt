import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { CartProvider } from './context/CartContext' 
import AdminProvider from "./context/AdminContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider >
      <AdminProvider>
        <App />
      </AdminProvider>
    </CartProvider>
  </StrictMode>,
)
