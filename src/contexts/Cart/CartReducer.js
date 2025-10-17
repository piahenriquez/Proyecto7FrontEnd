const CartReducer = (state, action) => {
  switch (action.type) {
    case "AGREGAR_AL_CARRITO": {
      // Verificar si el producto ya está en el carrito
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      // Determinar cantidad a agregar 
      const qtyToAdd = action.payload.quantity ? action.payload.quantity : 1;

      if (existingItem) {
        // Si ya existe, aumentar la cantidad en la cantidad enviada
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + qtyToAdd }
              : item
          ),
        };
      } else {
        // Si no existe, agregar nuevo item respetando la quantity del payload si existe
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            { ...action.payload, quantity: qtyToAdd },
          ],
        };
      }
    }

    case "ELIMINAR_DEL_CARRITO":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };

    case "ACTUALIZAR_CANTIDAD": {
      const item = state.cartItems.find(
        (item) => item._id === action.payload.id
      );

      // Validar que la nueva cantidad no supere el stock
      if (action.payload.quantity > item.stock) {
        alert(`❌ No hay suficiente stock. Máximo disponible: ${item.stock}`);
        return state; 
      }

      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case "VACIAR_CARRITO":
      return {
        ...state,
        cartItems: [],
      };

    case "SET_LOADING":
      return {
        ...state,
        cartLoading: action.payload,
      };

    default:
      return state;
  }
};

export default CartReducer;
