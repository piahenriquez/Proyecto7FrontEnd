import { Container, Typography,
    TextField, 
    Button,
    Box,
    Paper,
    Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Formulario enviado");
    };
    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper
            elevation={3}
            sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Iniciar Sesión
            </Typography>

            <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
                Ingresa a tu cuenta de Ceramicas Felices 
            </Typography>

            {/* Formulario de inicio de sesión */}
            <Box component = "form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                />

                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: '#4CAF50',
                    '&:hover': { backgroundColor: '#45A049' },
                
            }}
                >
                Iniciar Sesión
                </Button>
                {/* Enlace para registrarse */}
                <Box textAlign="center">
                    <Typography variant='body2'>
                        ¿No tienes una cuenta?{' '}
                        <Link component={RouterLink} to="/registro" underline='hover'
                        >

                            Regístrate aquí
                        </Link>
                    </Typography>
                </Box>
            </Box>
            </Paper>
        </Container>
    );
};

export default Login;