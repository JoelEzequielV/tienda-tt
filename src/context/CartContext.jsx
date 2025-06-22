import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //Estado del carrito
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  //Autenticación
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('user'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  //Toasts
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('success');

  //Persistir carrito
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  useEffect(() => {
    fetch('/data/data.json')
      .then(res => res.json())
      .then(datos => {
        setTimeout(() => {
          setProductos(datos);
          setCargando(false);
        }, 2000);
      })
      .catch(err => {
        console.log('Error', err);
        setError(true);
        setCargando(false);
      });
  }, []);

  //Añadir producto
  const handleAddToCart = (product, quantity = 1) => {
    const productInCart = cart.find(item => item.id === product.id);
    const productoCompleto = productos.find(p => p.id === product.id);
  
    if (!productoCompleto) return; 
  
    const stockDisponible = productoCompleto.stock;
    const cantidadActual = productInCart ? productInCart.quantity : 0;
  
    if (cantidadActual + quantity > stockDisponible) {
      setToastMessage(`Stock agotado para "${product.title}"`);
      setToastType('danger');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
  
    if (productInCart) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  
    setToastMessage(`${product.title} añadido al carrito`);
    setToastType('success');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  //Eliminar productos
  const handleDeleteFromCart = (product) => {
    let eliminado = false;

    const nuevoCarrito = cart.map(item => {
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

    setCart(nuevoCarrito);

    setTimeout(() => {
      setToastMessage(eliminado
        ? `${product.title} fue eliminado del carrito`
        : `Se quitó una unidad de ${product.title}`);
      setToastType(eliminado ? 'danger' : 'warning');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 100);
  };

  //Aumentar cantidad
  const increaseQty = (id) => {
    setCart(prevCart => prevCart.map(item => {
      const productoCompleto = productos.find(p => p.id === item.id);
      if (!productoCompleto) return item;
  
      if (item.id === id && item.quantity < productoCompleto.stock) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    }));
  };

  //Disminuir cantidad 
  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  //Vaciar carrito
  const clearCart = () => {
    setCart([]);
  };

  //Calcular total
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      isAuth, setIsAuth,
      user, setUser,
      userData, setUserData,
      cart, productos, cargando, error,
      toastMessage, showToast, toastType,
      handleAddToCart, handleDeleteFromCart,
      increaseQty, decreaseQty, clearCart, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
