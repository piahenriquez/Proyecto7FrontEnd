import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductState from "./contexts/Product/ProductState";
import Home from "./components/Home";

const Router = () => {
  return (
    <ProductState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ProductState>
  );
};

export default Router;