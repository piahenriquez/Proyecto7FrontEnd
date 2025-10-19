import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Divider,
  Chip,
  Stack,
  Paper
} from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DiscountIcon from "@mui/icons-material/Discount";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CartContext from "../../contexts/Cart/CartContext";

const Cart = () => {
  const ctx = useContext(CartContext);
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    ctx;

  // Calcular subtotal
  const subtotal = getCartTotal();
  const shipping = 3990; // Envío fijo
  const discount = cartItems.length >= 2 ? 1000 : 0; // Descuento por 2+ productos
  const total = subtotal + shipping - discount;

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 500, mx: 'auto' }}>
          <ShoppingBagIcon 
            sx={{ 
              fontSize: 80, 
              color: '#4CAF50', 
              mb: 2,
              opacity: 0.7
            }} 
          />
          
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #4CAF50, #66bb6a)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Tu Carrito
          </Typography>
          
          <Typography 
            variant="h6" 
            color="text.secondary" 
            gutterBottom
            sx={{ mb: 2 }}
          >
            Tu carrito está esperando por tesoros cerámicos
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 4, opacity: 0.8 }}
          >
            Descubre nuestras macetas únicas y llena tu carrito de belleza artesanal
          </Typography>
          
          <Button 
            variant="contained" 
            component={Link}
            to="/productos"
            startIcon={<ArrowBackIcon />}
            sx={{
              backgroundColor: '#4CAF50',
              borderRadius: '12px',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: '600',
              '&:hover': {
                backgroundColor: '#45a049',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Explorar Productos
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #4CAF50, #66bb6a)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Tu Carrito de Compras
        </Typography>
        
        <Chip 
          icon={<ShoppingBagIcon />}
          label={`${cartItems.length} productos · $${subtotal.toLocaleString('es-CL')}`}
          variant="outlined"
          sx={{ 
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderColor: '#4CAF50',
            color: '#4CAF50',
            fontWeight: '600',
            fontSize: '1rem'
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {/* Columna de productos en el carrito  */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Typography variant="h5" sx={{ mb: 3, color: '#2e7d32', fontWeight: '600' }}>
            Tus Productos Seleccionados
          </Typography>
          
          <Stack spacing={2}>
            {cartItems.map((item) => (
              <Card 
                key={item._id} 
                sx={{ 
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #ffffff, #f8fff8)',
                  border: '1px solid rgba(76, 175, 80, 0.1)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(76, 175, 80, 0.12)',
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3} alignItems="center">
                    {/* Imagen del producto */}
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <Box
                        sx={{
                          width: "100%",
                          height: 100,
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: '12px',
                          border: '2px solid rgba(76, 175, 80, 0.1)'
                        }}
                      />
                    </Grid>
                    
                    {/* Información del producto */}
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', color: '#2e7d32' }}>
                        {item.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {item.description}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1, color: '#4CAF50', fontWeight: '600' }}>
                        ${item.price.toLocaleString("es-CL")} c/u
                      </Typography>
                    </Grid>
                    
                    {/* Contador de cantidad  */}
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <Paper 
                        elevation={0}
                        sx={{ 
                          display: "inline-flex", 
                          alignItems: "center", 
                          gap: 1,
                          p: 1,
                          borderRadius: '12px',
                          border: '1px solid rgba(76, 175, 80, 0.2)',
                          backgroundColor: 'rgba(76, 175, 80, 0.05)'
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          sx={{ 
                            color: '#4CAF50',
                            '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.1)' }
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ minWidth: 30, textAlign: 'center', fontWeight: '600' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          sx={{ 
                            color: '#4CAF50',
                            '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.1)' }
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Paper>
                    </Grid>
                    
                    {/* Precio total y acciones */}
                    <Grid size={{ xs: 12, sm: 2 }} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 'bold', 
                          mb: 1,
                          color: '#2e7d32'  
                        }}
                      >
                        ${(item.price * item.quantity).toLocaleString("es-CL")}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => removeFromCart(item._id)}
                        sx={{ 
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                          color: '#4CAF50',  // ← Cambiado de rojo a verde
                          '&:hover': { 
                            backgroundColor: 'rgba(76, 175, 80, 0.2)',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* Columna de resumen  */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card 
            sx={{ 
              position: "sticky", 
              top: 20,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #f8fff8, #e8f5e9)',
              border: '1px solid rgba(76, 175, 80, 0.1)',
              boxShadow: '0 8px 30px rgba(76, 175, 80, 0.15)'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#2e7d32', textAlign: 'center' }}>
                Resumen del Pedido
              </Typography>

              <Stack spacing={2} sx={{ my: 3 }}>
                {/* Subtotal */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                  <Typography variant="body1">
                    Subtotal ({cartItems.length} producto{cartItems.length !== 1 ? "s" : ""})
                  </Typography>
                  <Typography variant="body1" fontWeight="600" color="#2e7d32">
                    ${subtotal.toLocaleString("es-CL")}
                  </Typography>
                </Box>

                {/* Envío */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocalShippingIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                    <Typography variant="body1">Envío</Typography>
                  </Box>
                  <Typography variant="body1" fontWeight="600" color="#2e7d32">
                    ${shipping.toLocaleString("es-CL")}
                  </Typography>
                </Box>

                {/* Descuento */}
                {discount > 0 && (
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DiscountIcon sx={{ color: '#ff6b6b', fontSize: 20 }} />
                      <Typography variant="body1">Descuento</Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="600" color="#ff6b6b">
                      -${discount.toLocaleString("es-CL")}
                    </Typography>
                  </Box>
                )}
              </Stack>

              <Divider sx={{ my: 2, borderColor: 'rgba(76, 175, 80, 0.2)' }} />

              {/* Total */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight="bold" color="#2e7d32">
                  Total
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="#4CAF50">
                  ${total.toLocaleString("es-CL")}
                </Typography>
              </Box>

              {/* Botones de acción */}
              <Stack spacing={1.5}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<ShoppingCartCheckoutIcon />}
                  onClick={ctx.createCheckoutSession}
                  sx={{
                    backgroundColor: "#4CAF50",
                    borderRadius: '12px',
                    py: 1.5,
                    fontWeight: '600',
                    fontSize: '1rem',
                    textTransform: 'none',
                    "&:hover": {
                      backgroundColor: "#45a049",
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Proceder al Pago
                </Button>
                
                <Button 
                  component={Link} 
                  to="/productos" 
                  fullWidth 
                  startIcon={<ArrowBackIcon />}
                  sx={{ 
                    borderRadius: '12px',
                    py: 1.2,
                    color: '#4CAF50',
                    borderColor: '#4CAF50',
                    '&:hover': {
                      backgroundColor: 'rgba(76, 175, 80, 0.04)',
                      borderColor: '#45a049'
                    }
                  }}
                  variant="outlined"
                >
                  Seguir Comprando
                </Button>

                <Button
                  onClick={clearCart}
                  fullWidth
                  sx={{ 
                    borderRadius: '12px',
                    py: 1.2,
                    color: '#2e7d32',
                    borderColor: '#2e7d32',
                    '&:hover': {
                      backgroundColor: 'rgba(46, 125, 50, 0.04)',
                      borderColor: '#1b5e20'
                    }
                  }}
                  variant="outlined"
                >
                  Vaciar Carrito
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;