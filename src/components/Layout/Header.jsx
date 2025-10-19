import * as React from "react";
import { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../contexts/Cart/CartContext";
import UserContext from "../../contexts/User/UserContext";
import logoImage from "../../assets/images/logo.png";

const Header = () => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserContext);

  const { getCartItemsCount } = cartCtx;
  const { authState, verifyUser, logoutUser } = userCtx;

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
    };
  }, [isMobileMenuOpen]);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logoutUser(navigate);
    handleMobileMenuClose();
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: '#f8fff8',
          borderRadius: '20px',
          boxShadow: '0 15px 40px rgba(76, 175, 80, 0.15)',
          marginTop: '12px',
          minWidth: '300px',
          border: '1px solid rgba(76, 175, 80, 0.1)',
          overflow: 'hidden',
          maxHeight: '85vh', 
          overflowY: 'auto', 
          '& .MuiList-root': {
            padding: '8px 0',
          },
          
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c8e6c9',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a5d6a7',
          }
        },
        
        zIndex: 9999,
      }}
      
      disableScrollLock={false}
    >
      {/* Encabezado con gradiente */}
      <MenuItem 
        sx={{ 
          background: 'linear-gradient(135deg, #66bb6a, #4caf50)',
          color: 'white',
          borderRadius: '0',
          '&:hover': { 
            background: 'linear-gradient(135deg, #66bb6a, #4caf50)',
            cursor: 'default'
          },
          fontWeight: 'bold',
          justifyContent: 'center',
          fontSize: '1.1rem',
          padding: '16px',
          borderBottom: '2px solid rgba(255,255,255,0.2)',
          position: 'sticky',
          top: 0,
          zIndex: 1
        }}
      >
        🌟 Cerámicas Felices
      </MenuItem>

      
      <MenuItem 
        component={Link} 
        to="/" 
        onClick={handleMobileMenuClose}
        sx={{
          padding: '14px 20px',
          borderBottom: '1px solid rgba(76, 175, 80, 0.1)',
          background: 'linear-gradient(135deg, #e8f5e9, #f1f8e9)',
          transition: 'all 0.3s ease',
          '&:hover': { 
            background: 'linear-gradient(135deg, #c8e6c9, #dcedc8)',
            transform: 'translateX(8px)'
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
          <Box sx={{ 
            width: 40, 
            height: 40, 
            background: 'linear-gradient(135deg, #81c784, #66bb6a)', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px'
          }}>
            <HomeIcon fontSize="small" />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: '600', color: '#2e7d32', fontSize: '1rem' }}>
              Inicio
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: '#4caf50', opacity: 0.8 }}>
              Página principal
            </Typography>
          </Box>
        </Box>
      </MenuItem>

      <MenuItem 
        component={Link} 
        to="/productos" 
        onClick={handleMobileMenuClose}
        sx={{
          padding: '14px 20px',
          borderBottom: '1px solid rgba(76, 175, 80, 0.1)',
          background: 'linear-gradient(135deg, #f1f8e9, #e8f5e9)',
          transition: 'all 0.3s ease',
          '&:hover': { 
            background: 'linear-gradient(135deg, #dcedc8, #c8e6c9)',
            transform: 'translateX(8px)'
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
          <Box sx={{ 
            width: 40, 
            height: 40, 
            background: 'linear-gradient(135deg, #66bb6a, #4caf50)', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px'
          }}>
            <StorefrontIcon fontSize="small" />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: '600', color: '#2e7d32', fontSize: '1rem' }}>
              Productos
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: '#4caf50', opacity: 0.8 }}>
              Nuestra colección
            </Typography>
          </Box>
        </Box>
      </MenuItem>

      {/* Sección de acciones */}
      <MenuItem 
        component={Link} 
        to="/favoritos" 
        onClick={handleMobileMenuClose}
        sx={{
          padding: '14px 20px',
          borderBottom: '1px solid rgba(76, 175, 80, 0.1)',
          background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
          transition: 'all 0.3s ease',
          '&:hover': { 
            background: 'linear-gradient(135deg, #c8e6c9, #a5d6a7)',
            transform: 'translateX(8px)'
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
          <Box sx={{ 
            width: 40, 
            height: 40, 
            background: 'linear-gradient(135deg, #4caf50, #43a047)', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px'
          }}>
            <FavoriteIcon fontSize="small" />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: '600', color: '#2e7d32', fontSize: '1rem' }}>
              Favoritos
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: '#4caf50', opacity: 0.8 }}>
              Tus productos favoritos
            </Typography>
          </Box>
        </Box>
      </MenuItem>

      <MenuItem 
        component={Link} 
        to="/carrito" 
        onClick={handleMobileMenuClose}
        sx={{
          padding: '14px 20px',
          borderBottom: '1px solid rgba(76, 175, 80, 0.15)',
          background: 'linear-gradient(135deg, #c8e6c9, #a5d6a7)',
          transition: 'all 0.3s ease',
          '&:hover': { 
            background: 'linear-gradient(135deg, #a5d6a7, #81c784)',
            transform: 'translateX(8px)'
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
          <Badge badgeContent={getCartItemsCount()} color="error">
            <Box sx={{ 
              width: 40, 
              height: 40, 
              background: 'linear-gradient(135deg, #43a047, #388e3c)', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px'
            }}>
              <ShoppingCartIcon fontSize="small" />
            </Box>
          </Badge>
          <Box>
            <Typography sx={{ fontWeight: '600', color: '#2e7d32', fontSize: '1rem' }}>
              Carrito
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: '#4caf50', opacity: 0.8 }}>
              {getCartItemsCount()} productos
            </Typography>
          </Box>
        </Box>
      </MenuItem>

      {/* Sección de usuario */}
      {authState ? (
        // Usuario logueado
        [
          <MenuItem 
            key="perfil"
            component={Link} 
            to="/perfil" 
            onClick={handleMobileMenuClose}
            sx={{
              padding: '14px 20px',
              borderBottom: '1px solid rgba(76, 175, 80, 0.1)',
              background: 'linear-gradient(135deg, #a5d6a7, #81c784)',
              transition: 'all 0.3s ease',
              '&:hover': { 
                background: 'linear-gradient(135deg, #81c784, #66bb6a)',
                transform: 'translateX(8px)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
              <Box sx={{ 
                width: 40, 
                height: 40, 
                background: 'linear-gradient(135deg, #388e3c, #2e7d32)', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px'
              }}>
                <PersonIcon fontSize="small" />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: '600', color: '#2e7d32', fontSize: '1rem' }}>
                  Mi Perfil
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', color: '#4caf50', opacity: 0.8 }}>
                  Gestiona tu cuenta
                </Typography>
              </Box>
            </Box>
          </MenuItem>,
          
          <MenuItem 
            key="logout"
            onClick={handleLogout}
            sx={{
              padding: '14px 20px',
              background: 'linear-gradient(135deg, #81c784, #66bb6a)',
              transition: 'all 0.3s ease',
              '&:hover': { 
                background: 'linear-gradient(135deg, #ef5350, #e57373)',
                transform: 'translateX(8px)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
              <Box sx={{ 
                width: 40, 
                height: 40, 
                background: 'linear-gradient(135deg, #e53935, #d32f2f)', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px'
              }}>
                <ExitToAppIcon fontSize="small" />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: '600', color: '#d32f2f', fontSize: '1rem' }}>
                  Cerrar Sesión
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', color: '#e57373', opacity: 0.8 }}>
                  Salir de tu cuenta
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        ]
      ) : (
        // Usuario NO logueado
        [
          <MenuItem 
            key="registro"
            component={Link} 
            to="/registro" 
            onClick={handleMobileMenuClose}
            sx={{
              padding: '14px 20px',
              borderBottom: '1px solid rgba(76, 175, 80, 0.1)',
              background: 'linear-gradient(135deg, #66bb6a, #4caf50)',
              transition: 'all 0.3s ease',
              '&:hover': { 
                background: 'linear-gradient(135deg, #4caf50, #43a047)',
                transform: 'translateX(8px)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
              <Box sx={{ 
                width: 40, 
                height: 40, 
                background: 'linear-gradient(135deg, #43a047, #388e3c)', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px'
              }}>
                <PersonAddIcon fontSize="small" />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: '600', color: '#2e7d32', fontSize: '1rem' }}>
                  Crear Cuenta
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', color: '#4caf50', opacity: 0.8 }}>
                  Únete a nosotros
                </Typography>
              </Box>
            </Box>
          </MenuItem>,
          
          <MenuItem 
            key="login"
            component={Link} 
            to="/iniciar-sesion" 
            onClick={handleMobileMenuClose}
            sx={{
              padding: '14px 20px',
              background: 'linear-gradient(135deg, #4caf50, #43a047)',
              transition: 'all 0.3s ease',
              '&:hover': { 
                background: 'linear-gradient(135deg, #43a047, #388e3c)',
                transform: 'translateX(8px)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
              <Box sx={{ 
                width: 40, 
                height: 40, 
                background: 'linear-gradient(135deg, #388e3c, #2e7d32)', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px'
              }}>
                <LoginIcon fontSize="small" />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: '600', color: '#2e7d32', fontSize: '1rem' }}>
                  Iniciar Sesión
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', color: '#4caf50', opacity: 0.8 }}>
                  Accede a tu cuenta
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        ]
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        className="appbar-clipped"
        sx={{
          backgroundColor: "var(--apple-header)",
          borderBottomLeftRadius: "0.75rem",
          borderBottomRightRadius: "0.75rem",
          position: "relative",
          overflow: "visible",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 64, md: 84 },
            px: { xs: 1, md: 4 },
            gap: 2,
          }}
        >
          {/* Menú hamburguesa */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleMobileMenuOpen}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={logoImage}
                className="header-logo-img"
                alt="Cerámicas Felices"
                style={{
                  width: "50px",
                  height: "80px",
                  borderRadius: "8px",
                  transition: "transform 0.2s ease",
                  objectFit: "contain",
                }}
              />
            </Link>
          </Box>

          {/* Navegación central */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 2,
              }}
            >
              <Button
                component={Link}
                to="/"
                sx={{
                  color: "white",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Inicio
              </Button>
              <Button
                component={Link}
                to="/productos"
                sx={{
                  color: "white",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Productos
              </Button>
              <Button
                component={Link}
                to="/favoritos"
                sx={{
                  color: "white",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Favoritos
              </Button>
            </Box>
          </Box>

          {/* Iconos de usuario  */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              size="large"
              color="inherit"
              component={Link}
              to="/favoritos"
            >
              <FavoriteIcon />
            </IconButton>

            <IconButton
              size="large"
              color="inherit"
              component={Link}
              to="/carrito"
            >
              <Badge badgeContent={getCartItemsCount()} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {authState ? (
              <>
                <IconButton
                  size="large"
                  color="inherit"
                  component={Link}
                  to="/perfil"
                >
                  <AccountCircle />
                </IconButton>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<Logout />}
                  sx={{
                    borderRadius: "20px",
                    padding: "8px 16px",
                  }}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/registro"
                  sx={{
                    borderRadius: "20px",
                    padding: "8px 16px",
                  }}
                >
                  Crear Cuenta
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/iniciar-sesion"
                  sx={{
                    borderRadius: "20px",
                    padding: "8px 16px",
                  }}
                >
                  Iniciar Sesión
                </Button>
              </>
            )}
          </Box>

          {/* Botón móvil */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
    </Box>
  );
};

export default Header;