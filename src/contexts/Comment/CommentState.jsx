import { useState, useContext, useCallback } from "react";
import CommentContext from "./CommentContext";
import UserContext from "../User/UserContext";
import axiosClient from "../../config/axios";

const CommentState = (props) => {
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(false);
  const { authState } = useContext(UserContext);

  // OBTENER COMENTARIOS DE UN PRODUCTO 
  const getProductComments = useCallback(async (productId) => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/comments/products/${productId}/comments`);
      
      setComments(prev => ({
        ...prev,
        [productId]: response.data.comments
      }));
      
      return response.data.comments;
    } catch (error) {
      console.error('Error obteniendo comentarios:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []); 

  // AGREGAR NUEVO COMENTARIO 
  const addComment = useCallback(async (productId, commentData) => {
    if (!authState) {
      alert('Debes iniciar sesión para comentar');
      return null;
    }

    try {
      const response = await axiosClient.post(
        `/comments/products/${productId}/comments`,
        commentData,
        { withCredentials: true }
      );

      const newComment = response.data.comment;
      setComments(prev => ({
        ...prev,
        [productId]: [newComment, ...(prev[productId] || [])]
      }));

      return newComment;
    } catch (error) {
      console.error('Error agregando comentario:', error);
      const message = error.response?.data?.message || 'Error al agregar comentario';
      alert(message);
      return null;
    }
  }, [authState]); 

  // ELIMINAR COMENTARIO 
  const deleteComment = useCallback(async (commentId, productId) => {
    try {
      await axiosClient.delete(`/comments/comments/${commentId}`, {
        withCredentials: true
      });

      setComments(prev => ({
        ...prev,
        [productId]: (prev[productId] || []).filter(comment => comment._id !== commentId)
      }));

      return true;
    } catch (error) {
      console.error('Error eliminando comentario:', error);
      const message = error.response?.data?.message || 'Error al eliminar comentario';
      alert(message);
      return false;
    }
  }, []); 

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        getProductComments,
        addComment,
        deleteComment
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentState;