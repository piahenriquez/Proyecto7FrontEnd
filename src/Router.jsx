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
import UserState from "./contexts/User/UserState.jsx";
import AuthRoute from "./Routes/Auth";
import PrivateRoute from "./Routes/Private";
import Profile from "./components/Profile";


const Router = () => {
  return (
    <UserState>
      <ProductState>
        <CartState>
          <FavoritesState>
            <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="productos" element={<ProductList />} />
            <Route path="productos/:id" element={<ProductSingle />} />
            <Route path="iniciar-sesion" element={<AuthRoute component={Login} />} />
            <Route path="registro" element={<AuthRoute component={Register} />} />
            <Route path="carrito" element={<PrivateRoute component={Cart} />} />
            <Route path="favoritos" element={<PrivateRoute component={Favorites} />} />
            <Route path="perfil" element={<PrivateRoute component={Profile} />} />
            </Route>
        </Routes>
      </BrowserRouter>
      </FavoritesState>
      </CartState>
    </ProductState>
    </UserState>
  );
};

export default Router;