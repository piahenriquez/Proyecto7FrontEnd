import { useReducer } from "react";
import ProductContext from "./ProductContext";
import ProductReducer from "./ProductReducer";
import axiosInstance from "../../config/axios";

const ProductState = (props) => {
    const initialState = {
        products: [],
    };

    const [globalState, dispatch] = useReducer(ProductReducer, initialState);

    //obtener los productos del backend
    const getProducts = async () => {
        try {
      const response = await axiosInstance.get('/products');
      console.log('Colección de productos:', response);
      dispatch({
        type: 'OBTENER_PRODUCTOS',
        payload: response.data.data,
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
    };
    return (
        <ProductContext.Provider
      value={{
        products: globalState.products,
        getProducts
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
