import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProductContext from "../../../contexts/Product/ProductContext";
import CartContext from "../../../contexts/Cart/CartContext";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoritesContext from "../../../contexts/Favorites/FavoritesContext";

const ProductSingle = () => {
  const { id } = useParams();
  const productCtx = useContext(ProductContext);
  const cartCtx = useContext(CartContext);
  const { products } = productCtx;
  const { addToCart } = cartCtx;
  const favoritesCtx = useContext(FavoritesContext);
  const { isFavorite, toggleFavorite } = favoritesCtx;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p._id === id);
      setProduct(foundProduct);
    }
  }, [products, id]);

  // FUNCIÓN PARA AGREGAR AL CARRITO
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (!product) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography align="center">Producto no encontrado</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              width: "100%",
              height: 400,
              backgroundImage: `url(${product.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 2,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            {product.name}
          </Typography>

          <Chip
            label={product.category}
            color="primary"
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price.toLocaleString("es-CL")}
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Stock disponible: {product.stock} unidades
            </Typography>
            {product.featured && (
              <Typography variant="body2" color="success.main">
                Producto destacado
              </Typography>
            )}
          </Box>

          {/*  BOTÓN */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{
                backgroundColor: "#4CAF50",
                "&:hover": {
                  backgroundColor: "#45a049",
                },
              }}
            >
              Agregar al Carrito
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<FavoriteIcon />}
              onClick={() => toggleFavorite(product)}
              color={isFavorite(product._id) ? "error" : "primary"}
            >
              {isFavorite(product._id)
                ? "Quitar de Favoritos"
                : "Agregar a Favoritos"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductSingle;
