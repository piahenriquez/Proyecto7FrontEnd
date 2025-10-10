import { useReducer, useEffect } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";

const CartState = (props) => {
  const initialState = {
    cartItems: []
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('ceramicasCart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      cartData.forEach(item => {
        dispatch({ type: "AGREGAR_AL_CARRITO", payload: item });
      });
    }
  }, []);

  // Guardar en localStorage cuando cambie el carrito
  useEffect(() => {
    localStorage.setItem('ceramicasCart', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  // Agregar producto al carrito
  const addToCart = (product) => {
  // Verificar si ya está en el carrito
  const existingItem = state.cartItems.find(item => item._id === product._id);
  
  // Calcular cantidad total que tendría en el carrito
  const currentQuantity = existingItem ? existingItem.quantity : 0;
  const newQuantity = currentQuantity + 1;
  
  // Validar stock
  if (newQuantity > product.stock) {
    alert(`❌ No hay suficiente stock. Solo quedan ${product.stock} unidades disponibles.`);
    return; // No agregar si supera el stock
  }
  
  dispatch({ type: "AGREGAR_AL_CARRITO", payload: product });
};

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    dispatch({ type: "ELIMINAR_DEL_CARRITO", payload: productId });
  };

  // Actualizar cantidad
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ 
        type: "ACTUALIZAR_CANTIDAD", 
        payload: { id: productId, quantity } 
      });
    }
  };

  // Vaciar carrito
  const clearCart = () => {
    dispatch({ type: "VACIAR_CARRITO" });
  };

  // Calcular total
  const getCartTotal = () => {
    return state.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  // Calcular cantidad total de items
  const getCartItemsCount = () => {
    return state.cartItems.reduce((count, item) => {
      return count + item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;