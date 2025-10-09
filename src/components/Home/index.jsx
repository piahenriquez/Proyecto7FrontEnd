import { useContext, useEffect } from "react";
import ProductContext from "../../contexts/Product/ProductContext";

const Home = () => {
    //obtener el estado global
    const ctx = useContext(ProductContext);

    // Extraer lo necesario del estado global
    const { products, getProducts } = ctx;

    //obtener los productos al cargar el componente
    useEffect(() => {
        getProducts();
    }, []); //array vacio


  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Cerámicas Felices
        </h1>

        {products.length === 0 ? (
            <p className="text-center text-gray-500">Cargando Productos...</p>
        ) : (

            //mostrar lista
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4 shadow-md"
                        >
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                          <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold text-green-600">
                ${product.price}
              </p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;