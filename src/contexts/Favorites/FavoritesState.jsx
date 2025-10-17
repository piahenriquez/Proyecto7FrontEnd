import { useState, useEffect, useContext, useCallback } from "react";
import FavoritesContext from "./FavoritesContext";
import UserContext from "../User/UserContext";
import axiosClient from "../../config/axios";

const FavoritesState = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [favoritesStatus, setFavoritesStatus] = useState({}); 
  const { authState } = useContext(UserContext);

  // CARGAR FAVORITOS DESDE BACKEND
  const getFavoritesFromBackend = useCallback(async () => {
    if (!authState) return;

    try {
      const response = await axiosClient.get('/favorites', { 
        withCredentials: true 
      });
      
      if (response.data.favorites) {
        setFavorites(response.data.favorites);
        
        // Inicializar el estado de favoritos para cada producto
        const status = {};
        response.data.favorites.forEach(product => {
          status[product._id] = true;
        });
        setFavoritesStatus(status);
      }
    } catch (error) {
      console.error('Error cargando favoritos:', error);
      // Fallback a localStorage si hay error
      const savedFavorites = localStorage.getItem('ceramicasFavorites');
      if (savedFavorites) {
        const favoritesData = JSON.parse(savedFavorites);
        setFavorites(favoritesData);
        
        const status = {};
        favoritesData.forEach(product => {
          status[product._id] = true;
        });
        setFavoritesStatus(status);
      }
    }
  }, [authState]);

  // CARGAR FAVORITOS AL INICIAR
  useEffect(() => {
    if (authState) {
      getFavoritesFromBackend();
    } else {
      // Usuario no logueado 
      const savedFavorites = localStorage.getItem('ceramicasFavorites');
      if (savedFavorites) {
        const favoritesData = JSON.parse(savedFavorites);
        setFavorites(favoritesData);
        
        const status = {};
        favoritesData.forEach(product => {
          status[product._id] = true;
        });
        setFavoritesStatus(status);
      } else {
        setFavorites([]);
        setFavoritesStatus({});
      }
    }
  }, [authState, getFavoritesFromBackend]);

  // VERIFICAR SI ES FAVORITO 
  const isFavorite = useCallback((productId) => {
    if (!productId) return false;
    
    const foundInArray = favorites.some(f => f && f._id === productId);
    if (foundInArray) return true;
    
    return !!favoritesStatus[productId];
  }, [favorites, favoritesStatus]);

  // AGREGAR A FAVORITOS 
  const addToFavorites = async (product) => {
    
    setFavoritesStatus(prev => ({ ...prev, [product._id]: true }));
    
    if (authState) {
      try {
        const response = await axiosClient.post('/favorites/add', {
          productId: product._id
        }, {
          withCredentials: true
        });
        
        setFavorites(response.data.favorites);
      } catch (error) {
        console.error('Error agregando a favoritos:', error);
        
        setFavoritesStatus(prev => ({ ...prev, [product._id]: false }));
        
        if (!favorites.find(item => item._id === product._id)) {
          const newFavorites = [...favorites, product];
          setFavorites(newFavorites);
        }
      }
    } else {
      
      if (!favorites.find(item => item._id === product._id)) {
        const newFavorites = [...favorites, product];
        setFavorites(newFavorites);
      }
    }
  };

  // ELIMINAR DE FAVORITOS
  const removeFromFavorites = async (productId) => {
   
    setFavoritesStatus(prev => ({ ...prev, [productId]: false }));
    
    if (authState) {
      try {
        const response = await axiosClient.delete('/favorites/remove', {
          data: { productId },
          withCredentials: true
        });
        
        setFavorites(response.data.favorites);
      } catch (error) {
        console.error('Error eliminando de favoritos:', error);
        // Revertir en caso de error
        setFavoritesStatus(prev => ({ ...prev, [productId]: true }));
        // Fallback local
        const newFavorites = favorites.filter(item => item._id !== productId);
        setFavorites(newFavorites);
      }
    } else {
      
      const newFavorites = favorites.filter(item => item._id !== productId);
      setFavorites(newFavorites);
    }
  };

  // TOGGLE FAVORITO 
  const toggleFavorite = async (product) => {
    const currentlyFavorite = isFavorite(product._id);
    
    if (currentlyFavorite) {
      await removeFromFavorites(product._id);
    } else {
      await addToFavorites(product);
    }
  };

  // GUARDAR EN LOCALSTORAGE (solo para usuarios no logueados)
  useEffect(() => {
    if (!authState) {
      localStorage.setItem('ceramicasFavorites', JSON.stringify(favorites));
    }
  }, [favorites, authState]);

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