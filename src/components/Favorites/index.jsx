import { 
  Container, 
  Typography, 
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import FavoritesContext from '../../contexts/Favorites/FavoritesContext';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Favorites = () => {
  const favoritesCtx = useContext(FavoritesContext);
  const { favorites, removeFromFavorites } = favoritesCtx;

  if (favorites.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 500, mx: 'auto' }}>
          <FavoriteIcon 
            sx={{ 
              fontSize: 80, 
              color: '#ff6b6b', 
              mb: 2,
              opacity: 0.7
            }} 
          />
          
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Tus Favoritos
          </Typography>
          
          <Typography 
            variant="h6" 
            color="text.secondary" 
            gutterBottom
            sx={{ mb: 2 }}
          >
            Tu galería de favoritos está esperando
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 4, opacity: 0.8 }}
          >
            Guarda aquellos productos que te roban el corazón para encontrarlos fácilmente después
          </Typography>
          
          <Button 
            variant="contained" 
            component={Link}
            to="/productos"
            startIcon={<ArrowBackIcon />}
            sx={{
              backgroundColor: '#4CAF50',
              borderRadius: '12px',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: '600',
              '&:hover': {
                backgroundColor: '#45a049',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Explorar Productos
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1
          }}
        >
          Tus Favoritos
        </Typography>
        
        <Chip 
          icon={<FavoriteIcon />}
          label={`${favorites.length} productos guardados`}
          variant="outlined"
          sx={{ 
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
            borderColor: '#ff6b6b',
            color: '#ff6b6b',
            fontWeight: '600'
          }}
        />
      </Box>
      
      {/* Grid de Productos Favoritos */}
      <Grid container spacing={3}>
        {favorites.map((product) => (
          <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card 
              sx={{ 
                height: '100%', 
                position: 'relative',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                border: '1px solid rgba(76, 175, 80, 0.1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                overflow: 'visible',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 40px rgba(76, 175, 80, 0.15)',
                }
              }}
            >
              {/* Botón eliminar  */}
              <IconButton 
                sx={{ 
                  position: 'absolute', 
                  top: -12, 
                  right: -12, 
                  backgroundColor: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  border: '2px solid #ff6b6b',
                  width: 40,
                  height: 40,
                  '&:hover': { 
                    backgroundColor: '#ffebee',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s ease',
                  zIndex: 10
                }}
                onClick={() => removeFromFavorites(product._id)}
              >
                <DeleteIcon sx={{ color: '#ff6b6b', fontSize: 20 }} />
              </IconButton>

              {/* Imagen del producto  */}
              <Box
                sx={{
                  width: '100%',
                  height: 180, 
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                  borderBottom: '2px solid rgba(76, 175, 80, 0.1)'
                }}
              />
              
              {/* Contenido de la tarjeta */}
              <CardContent sx={{ p: 3 }}>
                {/* Nombre del producto */}
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontWeight: '600',
                    color: '#2e7d32',
                    fontSize: '1rem',
                    lineHeight: 1.4,
                    mb: 1,
                    minHeight: '2.8rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {product.name}
                </Typography>
                
                {/* Descripción  */}
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  paragraph
                  sx={{
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    opacity: 0.8,
                    mb: 2,
                    minHeight: '3.2rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {product.description}
                </Typography>
                
                {/* Precio y acciones */}
                <Box sx={{ mt: 'auto' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: '#4CAF50',
                        fontSize: '1.3rem'
                      }}
                    >
                      ${product.price.toLocaleString('es-CL')}
                    </Typography>
                    
                    <Chip 
                      label="En stock" 
                      size="small"
                      sx={{ 
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        color: '#4CAF50',
                        fontWeight: '500'
                      }}
                    />
                  </Stack>
                  
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCartIcon />}
                    component={Link}
                    to={`/productos/${product._id}`}
                    sx={{
                      backgroundColor: '#4CAF50',
                      borderRadius: '12px',
                      py: 1.2,
                      fontWeight: '600',
                      textTransform: 'none',
                      fontSize: '0.9rem',
                      '&:hover': {
                        backgroundColor: '#45a049',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Ver Detalles
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Botón para seguir explorando */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button 
          variant="outlined"
          component={Link}
          to="/productos"
          startIcon={<ArrowBackIcon />}
          sx={{
            borderColor: '#4CAF50',
            color: '#4CAF50',
            borderRadius: '12px',
            px: 4,
            py: 1.5,
            fontWeight: '600',
            '&:hover': {
              borderColor: '#45a049',
              backgroundColor: 'rgba(76, 175, 80, 0.04)',
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Seguir Explorando
        </Button>
      </Box>
    </Container>
  );
};

export default Favorites;