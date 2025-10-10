import { 
  Container, 
  Typography, 
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import FavoritesContext from '../../contexts/Favorites/FavoritesContext';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Favorites = () => {
  const favoritesCtx = useContext(FavoritesContext);
  const { favorites, removeFromFavorites } = favoritesCtx;

  if (favorites.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
           Mis Favoritos
        </Typography>
        
        <Box sx={{ 
          backgroundColor: '#f9f9f9', 
          p: 6, 
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Tu lista de favoritos está vacía
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Guarda tus productos favoritos para verlos después
          </Typography>
          
          <Button 
            variant="contained" 
            component={Link}
            to="/productos"
            sx={{
              backgroundColor: '#4CAF50',
              '&:hover': {
                backgroundColor: '#45a049'
              }
            }}
          >
            Explorar Productos
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
         Mis Favoritos ({favorites.length})
      </Typography>
      
      <Grid container spacing={3}>
        {favorites.map((product) => (
          <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ height: '100%', position: 'relative' }}>
              {/* Botón eliminar */}
              <IconButton 
                sx={{ 
                  position: 'absolute', 
                  top: 8, 
                  right: 8, 
                  backgroundColor: 'white',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
                onClick={() => removeFromFavorites(product._id)}
              >
                <DeleteIcon color="error" />
              </IconButton>

              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${product.price.toLocaleString('es-CL')}
                </Typography>
                
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  component={Link}
                  to={`/productos/${product._id}`}
                  sx={{
                    backgroundColor: '#4CAF50',
                    '&:hover': {
                      backgroundColor: '#45a049'
                    }
                  }}
                >
                  Ver Producto
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites;