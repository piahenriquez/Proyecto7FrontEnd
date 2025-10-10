import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Paper,
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario de registro enviado');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        {/* Título */}
        <Typography variant="h4" component="h1" gutterBottom>
          Crear Cuenta
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Únete a Cerámicas Felices
        </Typography>

        {/* Formulario */}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre de Usuario"
            name="username"
            autoComplete="username"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="new-password"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            id="confirmPassword"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2,
              backgroundColor: '#4CAF50',
              '&:hover': {
                backgroundColor: '#45a049'
              }
            }}
          >
            Registrarse
          </Button>

          {/* Enlace a Login */}
          <Box textAlign="center">
            <Typography variant="body2">
              ¿Ya tienes cuenta?{' '}
              <Link 
                component={RouterLink} 
                to="/iniciar-sesion" 
                underline="hover"
              >
                Inicia sesión aquí
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;