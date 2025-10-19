import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, Email } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import logoImage from '../../assets/images/logo.png';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 50%, #66bb6a 100%)',
        py: 4,
        mt: 'auto',
        borderTop: '3px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          
          {/* Logo a la izquierda */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={logoImage} 
                alt="Cerámicas Felices" 
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '8px',
                  marginRight: '12px'
                }}
              />
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}
              >
                Cerámicas Felices
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                mt: 1,
                fontSize: '0.9rem'
              }}
            >
              Creando sonrisas en cerámica
            </Typography>
          </Grid>

          {/* Mensaje central  */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography 
              variant="h5" 
              align="center"
              sx={{ 
                fontWeight: 'bold',
                mb: 1,
                background: 'linear-gradient(45deg, #ffffff, #e8f5e9)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent', 
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
               Artesanías con Amor
            </Typography>
            <Typography 
              variant="body1" 
              align="center"
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.1rem'
              }}
            >
              Hecho a mano con pasión • 2025
            </Typography>
          </Grid>

          {/* Redes sociales a la derecha */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <IconButton 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Email />
              </IconButton>
            </Box>
            <Typography 
              variant="body2" 
              align="center"
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                mt: 1,
                fontSize: '0.8rem'
              }}
            >
              Síguenos en redes
            </Typography>
          </Grid>

        </Grid>

        {/* Línea separadora y copyright */}
        <Box 
          sx={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            mt: 3,
            pt: 2
          }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                © {new Date().getFullYear()} Cerámicas Felices. Todos los derechos reservados.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, gap: 3 }}>
                <Link 
                  component={RouterLink} 
                  to="/terminos" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    '&:hover': {
                      color: 'white'
                    }
                  }}
                >
                  Términos
                </Link>
                <Link 
                  component={RouterLink} 
                  to="/privacidad" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    '&:hover': {
                      color: 'white'
                    }
                  }}
                >
                  Privacidad
                </Link>
                <Link 
                  component={RouterLink} 
                  to="/contacto" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    '&:hover': {
                      color: 'white'
                    }
                  }}
                >
                  Contacto
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;