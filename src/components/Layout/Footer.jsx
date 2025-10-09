import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#f5f5f5', 
        py: 3, 
        mt: 'auto' 
      }}
    >
      <Container maxWidth="xl">
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
        >
          © {new Date().getFullYear()} Cerámicas Felices - Tienda de cerámicas artesanales
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;