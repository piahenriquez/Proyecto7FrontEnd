import { createContext, useState, useEffect } from "react";
import FavoritesContext from "./FavoritesContext";

const FavoritesState = (props) => {
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos desde localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('ceramicasFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Guardar en localStorage 
  useEffect(() => {
    localStorage.setItem('ceramicasFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Agregar a favoritos
  const addToFavorites = (product) => {
    if (!favorites.find(item => item._id === product._id)) {
      setFavorites([...favorites, product]);
    }
  };

  // Eliminar de favoritos
  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter(item => item._id !== productId));
  };

  // Verificar si un producto es favorito
  const isFavorite = (productId) => {
    return favorites.some(item => item._id === productId);
  };

  // Toggle favorito
  const toggleFavorite = (product) => {
    if (isFavorite(product._id)) {
      removeFromFavorites(product._id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite
      }}
    >
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesState;