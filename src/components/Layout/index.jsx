import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import fondoImage from '../../assets/images/fondo.png';

const Layout = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        
        backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(255, 245, 245, 0.25) 0%,
            rgba(255, 228, 225, 0.35) 30%,
            rgba(255, 200, 200, 0.4) 60%,
            rgba(255, 182, 193, 0.3) 100%
          ),
          url(${fondoImage})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Header />
      </Box>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          py: 3,
          position: 'relative',
        }}
      >
        <Outlet />
      </Box>

      <Box sx={{ position: 'relative' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout; 