import * as React from "react";
import { useContext } from "react"; 
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import CartContext from "../../contexts/Cart/CartContext";

// Estilos del buscador
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const cartCtx = useContext(CartContext);
  const { getCartItemsCount } = cartCtx;

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
      <MenuItem
        component={Link}
        to="/productos"
        onClick={handleMobileMenuClose}
      >
        <p>Productos</p>
      </MenuItem>

      <MenuItem
        component={Link}
        to="/favoritos"
        onClick={handleMobileMenuClose}
      >
        <IconButton size="large" color="inherit">
          <FavoriteIcon />
        </IconButton>
        <p>Favoritos</p>
      </MenuItem>

      <MenuItem component={Link} to="/carrito" onClick={handleMobileMenuClose}>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={2} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Carrito</p>
      </MenuItem>

      {/* Opciones de autenticación */}
      <MenuItem component={Link} to="/registro" onClick={handleMobileMenuClose}>
        <p>Crear Cuenta</p>
      </MenuItem>
      <MenuItem
        component={Link}
        to="/iniciar-sesion"
        onClick={handleMobileMenuClose}
      >
        <p>Iniciar Sesión</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#4CAF50" }}>
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
            <Button
              color="inherit"
              component={Link}
              to="/productos"
              sx={{ mx: 1 }}
            >
              Productos
            </Button>
          </Box>

          {/* Buscador */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar productos…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          {/* Iconos de la barra (escritorio) */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
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

            {/* Botones de Login/Register */}
            <Button
              color="inherit"
              component={Link}
              to="/registro"
              sx={{ mx: 1 }}
            >
              Crear Cuenta
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/iniciar-sesion"
              sx={{ mx: 1 }}
            >
              Iniciar Sesión
            </Button>
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
