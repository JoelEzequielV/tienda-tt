import React, { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [productoDelete, setProductoDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const api = 'https://685745ec21f5d3463e54dfbf.mockapi.io/products/products'

  useEffect(() => {
    fetch(api) 
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setProductos(data);
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
      });
      if (!respuesta.ok) throw new Error('Error al agregar producto');
      const data = await respuesta.json();
      Swal.fire({
        title: "Agregado!",
        text: "Producto agregado correctamente!",
        icon: "success",
        customClass: {
          confirmButton: 'btn2 btnPrimary'
        }
      });
      setProductos([...productos, data]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGuardarCambios = async (productoActualizado) => {
    try {
      const respuesta = await fetch(`${api}/${productoActualizado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado)
      });
      if (!respuesta.ok) throw new Error('Error al actualizar producto');
      const data = await respuesta.json();
      Swal.fire({
        title: "Se actualizó!",
        text: "El producto se actualizó correctamente!",
        icon: "success",
        customClass: {
          confirmButton: 'btn2 btnPrimary'
        }
      });
      setProductos(productos.map(p => p.id === data.id ? data : p));
      setProductoEditar(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (productoId) => {
    try {
      const respuesta = await fetch(`${api}/${productoId}`, {
        method: 'DELETE'
      });
      if (!respuesta.ok) throw new Error('Error al eliminar producto');
      await respuesta.json();
      Swal.fire({
        title: "Se elimino!",
        text: "El producto se elimino correctamente!",
        icon: "success",
        customClass: {
          confirmButton: 'btn2 btnPrimary'
        }
      });
      setProductos(productos.filter(p => p.id !== productoId));
      setProductoDelete(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <AdminContext.Provider value={{
      productos,
      loading,
      productoEditar,
      setProductoEditar,
      productoDelete,
      setProductoDelete,
      open,
      setOpen,
      agregarProducto,
      handleGuardarCambios,
      handleDelete
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
