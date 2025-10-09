import { Container, Typography} from '@mui/material';

const Login = () => {
    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Iniciar Sesión
            </Typography>
            <Typography variant='body1' align='center' color='text.secondary'>
                pagina de login 
            </Typography>
        </Container>
    );
};

export default Login;