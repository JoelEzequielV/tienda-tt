import { createContext, useState, useEffect } from "react";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)
    const [isAuthenticated, setIsAuth] = useState(false)
        // toast
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState('success');

    useEffect(() => {
        // fetch('/data/data.json')
        
        fetch('https://fakestoreapi.com/products', {
          method: 'GET',

        })
          .then(respuesta => respuesta.json())
          .then(datos => {
            setTimeout(() => {
              setProductos(datos)
              setCargando(false)
            }, 2000)
          })
          .catch(error => {
            console.log('Error', error)
            setCargando(false)
            setError(true)
          })
      }, [])

    const handleAddToCart = (product, quantity) => {
        const productInCart = cart.find((item) => item.id === product.id);
        if (productInCart) {
          setCart(cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ));
        } else {
          setCart([...cart, { ...product, quantity: quantity}]);
        }
      
        // Mostrar notificación de éxito
        setToastMessage(`${product.title} añadido al carrito`);
        setToastType('success');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      };
      
    
      const handleDeleteFromCart = (product) => {
        let eliminado = false;
      
        setCart(prevCart => {
          const nuevoCarrito = prevCart.map(item => {
            if (item.id === product.id) {
              if (item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
              } else {
                eliminado = true;
                return null;
              }
            }
            return item;
          }).filter(item => item !== null);
      
          // Mostrar notificación con tipo adecuado
          setTimeout(() => {
            if (eliminado) {
              setToastMessage(`${product.title} fue eliminado del carrito`);
              setToastType('danger');
            } else {
              setToastMessage(`Se quitó una unidad de ${product.title}`);
              setToastType('warning');
            }
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
          }, 100);
      
          return nuevoCarrito;
        });
      };

    return (
        <CartContext.Provider 
        value={

            { cart, productos, cargando, error, toastMessage,showToast, toastType, handleAddToCart, handleDeleteFromCart, isAuthenticated,setIsAuth }
        }>
            {children}
        </CartContext.Provider>
    )
}