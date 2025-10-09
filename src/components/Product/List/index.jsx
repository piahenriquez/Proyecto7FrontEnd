import { useContext, useEffect } from "react";
import ProductContext from "../../../contexts/Product/ProductContext";
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Button 
} from '@mui/material';
import { Link } from "react-router-dom";

const ProductList = () => {
  const ctx = useContext(ProductContext);
  const { products, getProducts } = ctx;

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#4CAF50', mb: 4 }}
      >
         Todos Nuestros Productos
      </Typography>
      
      {products.length === 0 ? (
        <Typography align="center" color="text.secondary">
          Cargando productos...
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      ${product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Stock: {product.stock}
                    </Typography>
                    <Button 
                      variant="contained" 
                      fullWidth
                      component={Link}
                      to={`/productos/${product._id}`}
                      sx={{ 
                        backgroundColor: '#4CAF50',
                        '&:hover': {
                          backgroundColor: '#45a049'
                        }
                      }}
                    >
                      Ver Detalles
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductList;