import { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Divider,
  Rating
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import CommentContext from "../../contexts/Comment/CommentContext";
import UserContext from "../../contexts/User/UserContext";

const CommentSection = ({ productId }) => {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const { authState, currentUser } = useContext(UserContext);
  const { comments, loading, getProductComments, addComment, deleteComment } = useContext(CommentContext);

  const productComments = comments[productId] || [];

  // CARGAR COMENTARIOS 
  useEffect(() => {
    if (productId) {
      getProductComments(productId);
    }
  }, [productId]); 

  // MANEJAR ENVÍO DE COMENTARIO
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      alert("Por favor escribe un comentario");
      return;
    }

    const commentData = {
      comment: newComment,
      rating: rating
    };

    const result = await addComment(productId, commentData);
    
    if (result) {
      setNewComment("");
      setRating(5);
    }
  };

  // MANEJAR ELIMINACIÓN DE COMENTARIO
  const handleDeleteComment = async (commentId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este comentario?")) {
      await deleteComment(commentId, productId);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ 
        borderBottom: '2px solid #4CAF50', 
        pb: 1,
        fontWeight: 'bold'
      }}>
        💬 Opiniones de Clientes
      </Typography>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" color="primary">
            {productComments.length > 0 
              ? (productComments.reduce((acc, curr) => acc + curr.rating, 0) / productComments.length).toFixed(1)
              : '0.0'
            }
          </Typography>
          <Rating 
            value={productComments.length > 0 ? productComments.reduce((acc, curr) => acc + curr.rating, 0) / productComments.length : 0} 
            readOnly 
            precision={0.1}
          />
          <Typography variant="body2" color="text.secondary">
            ({productComments.length} {productComments.length === 1 ? 'reseña' : 'reseñas'})
          </Typography>
        </Box>
      </Box>

      {/* FORMULARIO PARA NUEVO COMENTARIO */}
      {authState && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Deja tu opinión
            </Typography>
            <form onSubmit={handleSubmitComment}>
              <Box sx={{ mb: 2 }}>
                <Typography component="legend">Calificación</Typography>
                <Rating
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue || 5);
                  }}
                />
              </Box>
              <TextField
                multiline
                rows={3}
                fullWidth
                placeholder="¿Qué te pareció este producto? Comparte tu experiencia..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                disabled={!newComment.trim()}
                sx={{
                  backgroundColor: '#4CAF50',
                  '&:hover': { backgroundColor: '#45a049' }
                }}
              >
                Enviar Comentario
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {!authState && (
        <Box sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            💡 Inicia sesión para dejar tu comentario
          </Typography>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      {/* LISTA DE COMENTARIOS */}
      <Box>
        {loading && productComments.length === 0 && (
          <Typography>Cargando comentarios...</Typography>
        )}

        {!loading && productComments.length === 0 && (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            Aún no hay comentarios para este producto. ¡Sé el primero en opinar!
          </Typography>
        )}

        {productComments.map((comment) => (
          <Card key={comment._id} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {comment.userName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating value={comment.rating} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(comment.createdAt).toLocaleDateString('es-CL')}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1">
                    {comment.comment}
                  </Typography>
                </Box>

                {authState && currentUser && currentUser.username === comment.userName && (
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleDeleteComment(comment._id)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CommentSection;