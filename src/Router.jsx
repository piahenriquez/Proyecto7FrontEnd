import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductState from "./contexts/Product/ProductState";
import Home from "./components/Home";
import Layout from "./components/Layout";
import ProductList from "./components/Product/List";
import ProductSingle from "./components/Product/Single";
import Login from "./components/Auth/Login";

const Router = () => {
  return (
    <ProductState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="productos" element={<ProductList />} />
            <Route path="productos/:id" element={<ProductSingle />} />
            <Route path="Iniciar-Sesion" element={<Login />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </ProductState>
  );
};

export default Router;