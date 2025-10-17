import { useReducer, useEffect, useContext, useCallback, useRef } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import UserContext from "../User/UserContext";
import axiosClient from "../../config/axios";

const CartState = (props) => {
  const initialState = {
    cartItems: [],
    cartLoading: false
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);
  const { authState } = useContext(UserContext);

  
  const cartEndpointRef = useRef(undefined);
  const cartEndpointTriedRef = useRef(false);

  // CARGAR CARRITO DESDE BACKEND CUANDO EL USUARIO SE LOGUEA 
  const getCartFromBackend = useCallback(async () => {
    if (!authState) return;

    if (cartEndpointTriedRef.current && cartEndpointRef.current === null) {
      console.warn('No hay endpoint de carrito disponible en backend, cargando desde localStorage.');
      const savedCart = localStorage.getItem('ceramicasCart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        // LIMPIAR antes de agregar
        dispatch({ type: "VACIAR_CARRITO" });
        cartData.forEach(item => {
          dispatch({ type: "AGREGAR_AL_CARRITO", payload: item });
        });
      }
      return;
    }

    try {
      dispatch({ type: "SET_LOADING", payload: true });

      // Si no hemos detectado un endpoint aún, probar candidatos
      if (!cartEndpointTriedRef.current) {
        cartEndpointTriedRef.current = true;
        const candidates = ['/cart/get-cart', '/carts/get-cart', '/cart', '/carts'];
        let found = null;
        
        for (const ep of candidates) {
          try {
            const response = await axiosClient.get(ep, { withCredentials: true }); // ← CAMBIÉ probe por response
            if (response && response.status >= 200 && response.status < 300) {
              found = ep;
              cartEndpointRef.current = found;
              
              // LIMPIAR carrito actual antes de cargar
              dispatch({ type: "VACIAR_CARRITO" });
              
              if (response.data.cart && response.data.cart.products) {
                response.data.cart.products.forEach(item => {
                  const productData = {
                    _id: item.product?._id || item.product,
                    name: item.name || item.product?.name,
                    price: item.price || item.product?.price,
                    image: item.img || item.image || item.product?.image,
                    quantity: item.quantity || 1,
                    stock: item.product?.stock || 10
                  };
                  dispatch({ type: "AGREGAR_AL_CARRITO", payload: productData });
                });
              }
              break;
            }
          } catch {
            // ignorar errores de probe
          }
        }
        
        if (!found) {
          cartEndpointRef.current = null;
          console.warn('No se encontró un endpoint de carrito en backend.');
          const savedCart = localStorage.getItem('ceramicasCart');
          if (savedCart) {
            const cartData = JSON.parse(savedCart);
            dispatch({ type: "VACIAR_CARRITO" });
            cartData.forEach(item => {
              dispatch({ type: "AGREGAR_AL_CARRITO", payload: item });
            });
          }
        }
      } else {
        
        if (cartEndpointRef.current) {
          const response = await axiosClient.get(cartEndpointRef.current, { withCredentials: true });
          
          // LIMPIAR carrito actual antes de cargar
          dispatch({ type: "VACIAR_CARRITO" });
          
          if (response.data.cart && response.data.cart.products) {
            response.data.cart.products.forEach(item => {
              const productData = {
                _id: item.product?._id || item.product,
                name: item.name || item.product?.name,
                price: item.price || item.product?.price,
                image: item.img || item.image || item.product?.image,
                quantity: item.quantity || 1,
                stock: item.product?.stock || 10
              };
              dispatch({ type: "AGREGAR_AL_CARRITO", payload: productData });
            });
          }
        }
      }
    } catch (error) {
      console.error('Error cargando carrito:', error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [authState, dispatch]);

  // DEBE CARGAR AL INICIAR LA APLICACIÓN TAMBIÉN
  useEffect(() => {
    console.log('🔄 CartState: authState cambió a:', authState);
    
    if (authState) {
      console.log('🔄 Cargando carrito desde backend...');
      getCartFromBackend();
    } else {
      console.log('🔄 Cargando carrito desde localStorage...');
      // Si no está logueado, usar localStorage temporalmente
      const savedCart = localStorage.getItem('ceramicasCart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        console.log('📦 Productos en localStorage:', cartData);
        
        dispatch({ type: "VACIAR_CARRITO" });
        cartData.forEach(item => {
          dispatch({ type: "AGREGAR_AL_CARRITO", payload: item });
        });
      } else {
        console.log('🔄 No hay carrito en localStorage, limpiando estado');
        // Si no hay carrito guardado, asegurar que esté vacío
        dispatch({ type: "VACIAR_CARRITO" });
      }
    }
  }, [authState, getCartFromBackend]);

  // Cargar carrito al hacer el componente 
  useEffect(() => {
    console.log('🚀 CartState montado, authState:', authState);
    // Este effect se ejecuta una vez al montar el componente
    const initializeCart = async () => {
      if (authState) {
        await getCartFromBackend();
      }
    };
    initializeCart();
  }, []); 

  // AGREGAR PRODUCTO AL CARRITO 
  const addToCart = async (product) => {
    console.log('➕ Agregando producto al carrito:', product.name);
    
    // Validar stock localmente primero
    const existingItem = state.cartItems.find(item => item._id === product._id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const newQuantity = currentQuantity + 1;

    // VALIDACIÓN ESTRICTA DE STOCK
    if (newQuantity > product.stock) {
      alert(`❌ No hay suficiente stock. Solo quedan ${product.stock} unidades disponibles.`);
      return;
    }

    // Si el usuario está logueado, guardar en backend
    if (authState) {
      try {
        console.log('📡 Enviando producto al backend...');
        await axiosClient.post('/cart/add', {
          productId: product._id,
          quantity: 1
        }, {
          withCredentials: true
        });
        
        // Actualizar estado local
        dispatch({ type: "AGREGAR_AL_CARRITO", payload: product });
        console.log('✅ Producto agregado al carrito (backend)');
        
      } catch (error) {
        console.error('Error agregando al carrito (backend):', error);
        if (error.response && error.response.status >= 500) {
          // Fallback: agregar localmente
          dispatch({ type: "AGREGAR_AL_CARRITO", payload: product });
          alert('El producto se añadió localmente al carrito (backend no disponible).');
          return;
        }
        const msg = error.response?.data?.message || 'Error al agregar producto al carrito';
        alert(msg);
        return;
      }
    } else {
      // Usuario no logueado - usar localStorage
      dispatch({ type: "AGREGAR_AL_CARRITO", payload: product });
      console.log('✅ Producto agregado al carrito (local)');
    }
  };

  // ELIMINAR PRODUCTO DEL CARRITO
  const removeFromCart = async (productId) => {
    console.log('🗑️ Eliminando producto del carrito:', productId);
    
    if (authState) {
      try {
        await axiosClient.delete('/cart/remove', {
          data: { productId },
          withCredentials: true
        });
      } catch (error) {
        console.error('Error eliminando del carrito:', error);
      }
    }
    dispatch({ type: "ELIMINAR_DEL_CARRITO", payload: productId });
  };

  // ACTUALIZAR CANTIDAD 
  const updateQuantity = async (productId, quantity) => {
    console.log('🔢 Actualizando cantidad:', productId, 'a', quantity);
    
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    // Validar stock antes de actualizar
    const item = state.cartItems.find(item => item._id === productId);
    if (item && quantity > item.stock) {
      alert(`❌ No hay suficiente stock. Máximo disponible: ${item.stock}`);
      return;
    }

    // Si el usuario está logueado, actualizar en backend
    if (authState) {
      try {
        await axiosClient.put('/cart/edit-cart', {
          products: state.cartItems.map(item =>
            item._id === productId
              ? { ...item, quantity }
              : item
          )
        }, {
          withCredentials: true
        });
      } catch (error) {
        console.error('Error actualizando cantidad:', error);
        return;
      }
    }

    dispatch({
      type: "ACTUALIZAR_CANTIDAD",
      payload: { id: productId, quantity }
    });
  };

  // VACIAR CARRITO
  const clearCart = async () => {
    console.log('🧹 Vaciando carrito completo');
    
    if (authState) {
      try {
        await axiosClient.put('/cart/edit-cart', {
          products: []
        }, {
          withCredentials: true
        });
      } catch (error) {
        console.error('Error vaciando carrito:', error);
      }
    }
    dispatch({ type: "VACIAR_CARRITO" });
  };

  // CREAR CHECKOUT CON STRIPE
  const createCheckoutSession = async () => {
    if (!authState) {
      alert('Debes iniciar sesión para proceder al pago');
      return;
    }

    try {
      if (!state.cartItems || state.cartItems.length === 0) {
        alert('Tu carrito está vacío');
        return;
      }

      console.log('💳 Iniciando checkout con productos:', state.cartItems);

      const response = await axiosClient.post('/cart/create-checkout-session', {}, {
        withCredentials: true
      });
      
      window.location.href = response.data.session_url;

    } catch (error) {
      console.error('Error creando checkout:', error, error.response?.data);
      const backendMsg = error.response?.data?.message || error.message;
      alert(backendMsg || 'Error al procesar el pago');
    }
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

  // Guardar en localStorage cuando cambie el carrito (solo para usuarios no logueados)
  useEffect(() => {
    if (!authState) {
      localStorage.setItem('ceramicasCart', JSON.stringify(state.cartItems));
      console.log('💾 Guardando carrito en localStorage:', state.cartItems);
    }
  }, [state.cartItems, authState]);

  // DEBUG: Mostrar cambios en el carrito
  useEffect(() => {
    console.log('🛒 Estado actual del carrito:', state.cartItems);
  }, [state.cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        cartLoading: state.cartLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        createCheckoutSession
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;