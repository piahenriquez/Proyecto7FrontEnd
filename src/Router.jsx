import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductState from "./contexts/Product/ProductState";
import Home from "./components/Home";
import Layout from "./components/Layout";
import ProductList from "./components/Product/List";
import ProductSingle from "./components/Product/Single";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Cart from "./components/Cart";
import CartState from "./contexts/Cart/CartState";
import FavoritesState from "./contexts/Favorites/FavoritesState";
import Favorites from "./components/Favorites";


const Router = () => {
  return (
    <ProductState>
      <CartState>
        <FavoritesState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="productos" element={<ProductList />} />
            <Route path="productos/:id" element={<ProductSingle />} />
            <Route path="Iniciar-Sesion" element={<Login />} />
            <Route path="Registro" element={<Register />} />
            <Route path="Carrito" element={<Cart />} />
            <Route path="Favoritos" element={<Favorites />} />
            </Route>
        </Routes>
      </BrowserRouter>
      </FavoritesState>
      </CartState>
    </ProductState>
  );
};

export default Router;