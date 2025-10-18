import * as React from "react";
import { useContext, useEffect } from "react"; 
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../contexts/Cart/CartContext";
import UserContext from "../../contexts/User/UserContext";

const Header = () => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserContext);
  
  const { getCartItemsCount } = cartCtx;
  const { authState, verifyUser, logoutUser } = userCtx;

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Verificar autenticación al cargar
  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

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

  // Menú móvil
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
    >
      {/* Navegación principal */}
      <MenuItem component={Link} to="/" onClick={handleMobileMenuClose}>
        <p>Inicio</p>
      </MenuItem>
      <MenuItem component={Link} to="/productos" onClick={handleMobileMenuClose}>
        <p>Productos</p>
      </MenuItem>

      <MenuItem component={Link} to="/favoritos" onClick={handleMobileMenuClose}>
        <IconButton size="large" color="inherit">
          <FavoriteIcon />
        </IconButton>
        <p>Favoritos</p>
      </MenuItem>

      <MenuItem component={Link} to="/carrito" onClick={handleMobileMenuClose}>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={getCartItemsCount()} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Carrito</p>
      </MenuItem>

      
      {authState ? (
        // USUARIO LOGEADO
        [
          <MenuItem key="perfil" component={Link} to="/perfil" onClick={handleMobileMenuClose}>
            <IconButton size="large" color="inherit">
              <AccountCircle />
            </IconButton>
            <p>Mi Perfil</p>
          </MenuItem>,
          <MenuItem key="logout" onClick={handleLogout}>
            <IconButton size="large" color="inherit">
              <Logout />
            </IconButton>
            <p>Cerrar Sesión</p>
          </MenuItem>,
        ]
      ) : (
        // USUARIO NO LOGEADO
        [
          <MenuItem key="registro" component={Link} to="/registro" onClick={handleMobileMenuClose}>
            <p>Crear Cuenta</p>
          </MenuItem>,
          <MenuItem key="iniciar" component={Link} to="/iniciar-sesion" onClick={handleMobileMenuClose}>
            <p>Iniciar Sesión</p>
          </MenuItem>,
        ]
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#4bc34fff" }}>
        <Toolbar>
          {/* Menú hamburguesa (móvil) */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo/Nombre de la tienda */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: "none", sm: "block" },
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
            }}
          >
            Cerámicas Felices
          </Typography>

          {/* Navegación principal (escritorio) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, ml: 3 }}>
            <Button color="inherit" component={Link} to="/" sx={{ mx: 1 }}>
              Inicio
            </Button>
            <Button color="inherit" component={Link} to="/productos" sx={{ mx: 1 }}>
              Productos
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Iconos de la barra (escritorio) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            <IconButton size="large" color="inherit" component={Link} to="/favoritos">
              <FavoriteIcon />
            </IconButton>

            <IconButton size="large" color="inherit" component={Link} to="/carrito">
              <Badge badgeContent={getCartItemsCount()} color="error"> 
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Botones de Login/Register - Cambian según autenticación */}
            {authState ? (
              // USUARIO LOGEADO
              <>
                <IconButton size="large" color="inherit" component={Link} to="/perfil">
                  <AccountCircle />
                </IconButton>
                <Button 
                  color="inherit" 
                  onClick={handleLogout}
                  sx={{ mx: 1 }}
                  startIcon={<Logout />}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              // USUARIO NO LOGEADO
              <>
                <Button color="inherit" component={Link} to="/registro" sx={{ mx: 1 }}>
                  Crear Cuenta
                </Button>
                <Button color="inherit" component={Link} to="/iniciar-sesion" sx={{ mx: 1 }}>
                  Iniciar Sesión
                </Button>
              </>
            )}
          </Box>

          {/* Menú móvil (icono de tres puntos) */}
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

      {/* Renderizar menú móvil */}
      {renderMobileMenu}
    </Box>
  );
};

export default Header;