import { 
  Container, 
  Typography, 
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CartContext from '../../contexts/Cart/CartContext';

const Cart = () => {
  const ctx = useContext(CartContext);
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal,
    clearCart 
  } = ctx;

  // Calcular subtotal
  const subtotal = getCartTotal();
  const shipping = 3990; // Envío fijo
  const discount = cartItems.length >= 2 ? 1000 : 0; // Descuento por 2+ productos
  const total = subtotal + shipping - discount;

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
           Mi Carrito de Compras
        </Typography>
        
        <Box sx={{ 
          backgroundColor: '#f9f9f9', 
          p: 6, 
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Tu carrito está vacío
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Agrega algunas macetas adorables a tu carrito
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
            Ver Productos
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
         Mi Carrito de Compras
      </Typography>
      
      <Grid container spacing={3}>
        {/*  Columna de productos en el carrito */}
        <Grid size={{ xs: 12, md: 8 }}>
          {cartItems.map((item) => (
            <Card key={item._id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 3 }}>
                    <Box
                      sx={{
                        width: '100%',
                        height: 80,
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 1
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 5 }}>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton 
                        size="small"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 2 }} sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" color="primary">
                      ${(item.price * item.quantity).toLocaleString('es-CL')}
                    </Typography>
                    <IconButton 
                      color="error" 
                      size="small"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Columna de resumen */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumen del Pedido
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal ({cartItems.length} producto{cartItems.length !== 1 ? 's' : ''})</Typography>
                <Typography>${subtotal.toLocaleString('es-CL')}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Envío</Typography>
                <Typography>${shipping.toLocaleString('es-CL')}</Typography>
              </Box>

              {discount > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Descuento</Typography>
                  <Typography color="success.main">-${discount.toLocaleString('es-CL')}</Typography>
                </Box>
              )}
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">
                  ${total.toLocaleString('es-CL')}
                </Typography>
              </Box>
              
              <Button 
                variant="contained" 
                fullWidth
                size="large"
                sx={{
                  backgroundColor: '#4CAF50',
                  '&:hover': {
                    backgroundColor: '#45a049'
                  }
                }}
              >
                Proceder al Pago
              </Button>
              
              <Button 
                component={Link}
                to="/productos"
                fullWidth
                sx={{ mt: 1 }}
              >
                Seguir Comprando
              </Button>

              <Button 
                onClick={clearCart}
                fullWidth
                sx={{ mt: 1 }}
                color="error"
              >
                Vaciar Carrito
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;