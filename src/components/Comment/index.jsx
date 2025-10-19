import { useState, useContext, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Divider,
  Rating,
  Avatar,
  Chip
} from "@mui/material";
import { Delete as DeleteIcon, Favorite, Star } from "@mui/icons-material";
import CommentContext from "../../contexts/Comment/CommentContext";
import UserContext from "../../contexts/User/UserContext";

const CommentSection = ({ productId }) => {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const { authState, currentUser } = useContext(UserContext);
  const { comments, loading, getProductComments, addComment, deleteComment } = useContext(CommentContext);

  const productComments = comments[productId] || [];

  // CARGAR COMENTARIOS con useCallback para evitar dependencia circular
  const loadComments = useCallback(() => {
    if (productId) {
      getProductComments(productId);
    }
  }, [productId, getProductComments]);

  useEffect(() => {
    loadComments();
  }, [loadComments]); 

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

  
  const getAvatarInitials = (userName) => {
    return userName ? userName.charAt(0).toUpperCase() : 'U';
  };

  
  const getAvatarColor = (userName) => {
    const colors = [
      '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336',
      '#00BCD4', '#8BC34A', '#FF5722', '#673AB7', '#E91E63'
    ];
    const index = userName ? userName.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  return (
    <Box sx={{ mt: 6 }}>
      {/* HEADER */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: '700',
            background: 'linear-gradient(45deg, #4CAF50, #45a049)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 2
          }}
        >
          💬 Opiniones de Clientes
        </Typography>
        
        <Divider sx={{ 
          width: '80px', 
          height: '4px', 
          backgroundColor: '#4CAF50', 
          mx: 'auto',
          borderRadius: '2px'
        }} />
      </Box>

      {/* ESTADÍSTICAS */}
      <Card sx={{ 
        mb: 4, 
        background: 'linear-gradient(135deg, #f8fff8, #f1f8e9)',
        border: '1px solid rgba(76, 175, 80, 0.1)',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(76, 175, 80, 0.1)'
      }}>
        <CardContent sx={{ textAlign: 'center', py: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#4CAF50', mb: 1 }}>
                {productComments.length > 0 
                  ? (productComments.reduce((acc, curr) => acc + curr.rating, 0) / productComments.length).toFixed(1)
                  : '0.0'
                }
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Star sx={{ color: '#FFD700', fontSize: '1.5rem' }} />
                <Rating 
                  value={productComments.length > 0 ? productComments.reduce((acc, curr) => acc + curr.rating, 0) / productComments.length : 0} 
                  readOnly 
                  precision={0.1}
                  sx={{ color: '#FFD700' }}
                />
              </Box>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: 1 
            }}>
              <Chip 
                label={`${productComments.length} ${productComments.length === 1 ? 'reseña' : 'reseñas'}`}
                variant="outlined"
                sx={{ 
                  borderColor: '#4CAF50',
                  color: '#4CAF50',
                  fontWeight: '600'
                }}
              />
              <Typography variant="body2" color="text.secondary">
                Basado en opiniones verificadas
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* FORMULARIO  */}
      {authState && (
        <Card sx={{ 
          mb: 4, 
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(76, 175, 80, 0.1)'
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar 
                sx={{ 
                  bgcolor: getAvatarColor(currentUser?.username),
                  width: 48,
                  height: 48
                }}
              >
                {getAvatarInitials(currentUser?.username)}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="600">
                  Hola, {currentUser?.username}!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Comparte tu experiencia con este producto
                </Typography>
              </Box>
            </Box>

            <form onSubmit={handleSubmitComment}>
              <Box sx={{ mb: 3 }}>
                <Typography component="legend" sx={{ mb: 1, fontWeight: '600' }}>
                  Tu calificación
                </Typography>
                <Rating
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue || 5);
                  }}
                  sx={{ 
                    fontSize: '2rem',
                    color: '#FFD700'
                  }}
                />
              </Box>
              
              <TextField
                multiline
                rows={4}
                fullWidth
                placeholder="¿Qué te pareció este producto? Cuéntanos sobre la calidad, diseño, y tu experiencia general..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                variant="outlined"
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#4CAF50',
                    },
                  }
                }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={!newComment.trim()}
                  sx={{
                    backgroundColor: '#4CAF50',
                    borderRadius: '12px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: '600',
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
                    '&:hover': { 
                      backgroundColor: '#45a049',
                      boxShadow: '0 6px 16px rgba(76, 175, 80, 0.4)'
                    },
                    '&:disabled': {
                      backgroundColor: '#cccccc'
                    }
                  }}
                >
                  Publicar Opinión
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      )}

      {!authState && (
        <Card sx={{ 
          mb: 4, 
          background: 'linear-gradient(135deg, #f5f5f5, #e8f5e8)',
          borderRadius: '16px',
          border: '1px dashed #4CAF50'
        }}>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Favorite sx={{ fontSize: '2rem', color: '#4CAF50', mb: 1 }} />
            <Typography variant="h6" color="text.primary" gutterBottom>
              Únete a la conversación
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Inicia sesión para compartir tu opinión y ayudar a otros compradores
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* LISTA DE COMENTARIOS  */}
      <Box>
        {loading && productComments.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Cargando comentarios...
            </Typography>
          </Box>
        )}

        {!loading && productComments.length === 0 && (
          <Card sx={{ 
            textAlign: 'center', 
            py: 6,
            background: 'linear-gradient(135deg, #fafafa, #f0f0f0)',
            borderRadius: '16px'
          }}>
            <CardContent>
              <Favorite sx={{ fontSize: '3rem', color: '#cccccc', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Aún no hay comentarios
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ¡Sé el primero en compartir tu experiencia con este producto!
              </Typography>
            </CardContent>
          </Card>
        )}

        {productComments.map((comment) => (
          <Card 
            key={comment._id} 
            sx={{ 
              mb: 2, 
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Avatar */}
                <Avatar 
                  sx={{ 
                    bgcolor: getAvatarColor(comment.userName),
                    width: 48,
                    height: 48
                  }}
                >
                  {getAvatarInitials(comment.userName)}
                </Avatar>

                {/* Contenido del comentario */}
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="600">
                        {comment.userName}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Rating 
                          value={comment.rating} 
                          size="small" 
                          readOnly 
                          sx={{ color: '#FFD700' }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                          {comment.rating}.0
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(comment.createdAt).toLocaleDateString('es-CL', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </Typography>
                      
                      {authState && currentUser && currentUser.username === comment.userName && (
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDeleteComment(comment._id)}
                          sx={{ 
                            ml: 1,
                            '&:hover': {
                              backgroundColor: 'rgba(244, 67, 54, 0.1)'
                            }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </Box>

                  {/* Texto del comentario */}
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      lineHeight: 1.6,
                      color: 'text.primary',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {comment.comment}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CommentSection;