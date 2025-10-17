
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useContext, useEffect } from 'react';
import CartContext from '../../contexts/Cart/CartContext';

const Success = () => {
  const cartCtx = useContext(CartContext);
  const { clearCart } = cartCtx;

  // VACIAR CARRITO AL CARGAR LA PÁGINA DE ÉXITO
  useEffect(() => {
    console.log('✅ Pago exitoso - vaciando carrito');
    clearCart();
  }, [clearCart]);

  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <CheckCircleIcon sx={{ fontSize: 80, color: '#4CAF50', mb: 3 }} />

      <Typography variant="h3" component="h1" gutterBottom color="primary">
        ¡Pago Exitoso!
      </Typography>

      
      <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
        Gracias por tu compra en Cerámicas Felices
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Tu pedido está siendo procesado y recibirás un correo de confirmación en breve.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          component={Link}
          to="/products"
          sx={{
            backgroundColor: '#4CAF50',
            '&:hover': { backgroundColor: '#45a049' }
          }}
        >
          Seguir Comprando
        </Button>

        <Button
          variant="outlined"
          component={Link}
          to="/"
        >
          Volver al Inicio
        </Button>
      </Box>
    </Container>
  );
};

export default Success;