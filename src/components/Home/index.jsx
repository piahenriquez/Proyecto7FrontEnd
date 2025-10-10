import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid,
  Card, 
  CardContent
} from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box>
      {/*  HERO SECTION */}
      <Box sx={{ 
        backgroundColor: '#FFFFFF', 
        py: { xs: 8, md: 12 } 
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            
            {/* COLUMNA IZQUIERDA - TEXTO */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography 
                variant="h6" 
                component="p" 
                sx={{ 
                  color: '#4CAF50',
                  fontWeight: 'bold',
                  mb: 1
                }}
              >
                Tienda Cerámicas
              </Typography>
              
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  color: '#333',
                  fontSize: { xs: '2.5rem', md: '3rem' }
                }}
              >
                Cerámicas Felices
              </Typography>
              
              <Typography 
                variant="h6" 
                component="p" 
                sx={{ 
                  mb: 4,
                  color: 'text.secondary'
                }}
              >
                Descubre las macetas más adorables para tu hogar
              </Typography>
              
              <Button 
                variant="contained"
                component={Link}
                to="/productos"
                sx={{ 
                  backgroundColor: '#4CAF50',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: '#45a049'
                  }
                }}
              >
                Ver Productos
              </Button>
            </Grid>

            {/*  COLUMNA DERECHA - IMAGEN */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box
                sx={{
                  width: '100%',
                  height: { xs: 300, md: 500 },
                  backgroundImage: 'url(https://i.pinimg.com/1200x/a4/bf/78/a4bf781489fac0c63c7f5210276b1a3e.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 2
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/*  SECCIÓN DE PRODUCTOS DESTACADOS */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          sx={{ 
            fontWeight: 'bold',
            mb: 6,
            color: '#333'
          }}
        >
          Productos Destacados
        </Typography>
        
        <Grid container spacing={4}>
          {/* Producto destacado 1 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ 
              height: '100%', 
              boxShadow: 2,
              '&:hover': {
                boxShadow: 6
              }
            }}>
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  backgroundImage: 'url(https://i.pinimg.com/1200x/29/08/de/2908de0a437f2205f2f263196aa9e079.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Maceta Palitos de la Suerte
                </Typography>
                <Typography variant="body1" color="primary" fontWeight="bold">
                  $22.990
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Producto destacado 2 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ 
              height: '100%', 
              boxShadow: 2,
              '&:hover': {
                boxShadow: 6
              }
            }}>
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  backgroundImage: 'url(https://i.pinimg.com/736x/db/05/36/db05367fa9cf94dca9f5fe790ee76956.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Maceta Noche Estrellada
                </Typography>
                <Typography variant="body1" color="primary" fontWeight="bold">
                  $18.990
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Producto destacado 3 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ 
              height: '100%', 
              boxShadow: 2,
              '&:hover': {
                boxShadow: 6
              }
            }}>
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  backgroundImage: 'url(https://i.pinimg.com/736x/41/40/b1/4140b120ab587fa396558bd7fa067e58.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Maceta Cerdito Feliz
                </Typography>
                <Typography variant="body1" color="primary" fontWeight="bold">
                  $17.990
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Producto destacado 4 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ 
              height: '100%', 
              boxShadow: 2,
              '&:hover': {
                boxShadow: 6
              }
            }}>
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  backgroundImage: 'url(https://i.pinimg.com/1200x/a4/bf/78/a4bf781489fac0c63c7f5210276b1a3e.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Maceta Alienígena
                </Typography>
                <Typography variant="body1" color="primary" fontWeight="bold">
                  $15.990
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button 
            variant="contained"
            component={Link}
            to="/productos"
            sx={{ 
              backgroundColor: '#4CAF50',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: '#45a049'
              }
            }}
          >
            Ver Todos los Productos
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;