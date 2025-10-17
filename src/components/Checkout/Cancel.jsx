import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';

const Cancel = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <CancelIcon sx={{ fontSize: 80, color: '#f44336', mb: 3 }} />

      <Typography variant="h3" component="h1" gutterBottom color="error">
        Pago Cancelado
      </Typography>
      
      
      <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
        Tu proceso de pago fue cancelado.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        No se ha realizado ningún cargo. Puedes intentar nuevamente cuando estés listo.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          component={Link}
          to="/carrito"
          sx={{
            backgroundColor: '#4CAF50',
            '&:hover': { backgroundColor: '#45a049' }
          }}
        >
          Volver al Carrito
        </Button>

        <Button
          variant="outlined"
          component={Link}
          to="/productos"
        >
          Seguir Comprando
        </Button>
      </Box>
    </Container>
  );
};

export default Cancel;