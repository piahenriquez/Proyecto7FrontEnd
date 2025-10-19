import { useContext, useEffect, useState } from "react";
import ProductContext from "../../../contexts/Product/ProductContext";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Chip,
  Paper,
  Stack,
  Slider,
  InputAdornment,
  IconButton,
  Collapse
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  FilterList,
  Sort,
  Search,
  ExpandLess,
  ExpandMore
} from "@mui/icons-material";

const ProductList = () => {
  const ctx = useContext(ProductContext);
  const { products, getProducts } = ctx;

  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Filtrar y ordenar productos
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  // Calcular precios máximos y mínimos para el slider
  const minPrice = products.length > 0 ? Math.min(...products.map(p => p.price)) : 0;
  const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 100000;

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("name");
    setPriceRange([minPrice, maxPrice]);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{ 
          fontWeight: "bold", 
          background: 'linear-gradient(45deg, #2e7d32, #4caf50)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2
        }}
      >
        Nuestra Colección
      </Typography>
      
      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Descubre piezas únicas hechas con amor
      </Typography>

      {/* Filtros y Búsqueda */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 3, 
          mb: 4, 
          background: 'linear-gradient(135deg, #f8fff8, #f1f8e9)',
          border: '1px solid rgba(76, 175, 80, 0.1)',
          borderRadius: '16px'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterList sx={{ mr: 1, color: '#4CAF50' }} />
          <Typography variant="h6" sx={{ color: '#2e7d32' }}>
            Filtros 
          </Typography>
          <IconButton 
            onClick={() => setFiltersOpen(!filtersOpen)}
            sx={{ ml: 'auto', color: '#4CAF50' }}
          >
            {filtersOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Collapse in={filtersOpen}>
          <Grid container spacing={3}>
            {/* Búsqueda */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'white'
                  }
                }}
              />
            </Grid>

            
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                select
                label="Ordenar por"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Sort color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'white'
                  }
                }}
              >
                <MenuItem value="name">Nombre A-Z</MenuItem>
                <MenuItem value="price-low">Precio: Menor a Mayor</MenuItem>
                <MenuItem value="price-high">Precio: Mayor a Menor</MenuItem>
              </TextField>
            </Grid>

            {/* Botón limpiar */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={clearFilters}
                sx={{
                  height: '56px',
                  borderRadius: '12px',
                  borderColor: '#4CAF50',
                  color: '#4CAF50',
                  '&:hover': {
                    borderColor: '#45a049',
                    backgroundColor: 'rgba(76, 175, 80, 0.04)'
                  }
                }}
              >
                Limpiar Filtros
              </Button>
            </Grid>

            {/* Rango de precios */}
            <Grid size={{ xs: 12 }}>
              <Typography gutterBottom sx={{ color: '#2e7d32', fontWeight: '500' }}>
                Rango de Precio: ${priceRange[0]} - ${priceRange[1]}
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={minPrice}
                max={maxPrice}
                sx={{
                  color: '#4CAF50',
                  '& .MuiSlider-valueLabel': {
                    backgroundColor: '#4CAF50',
                    borderRadius: '8px'
                  }
                }}
              />
            </Grid>
          </Grid>
        </Collapse>

       
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {searchTerm && (
            <Chip 
              label={`Busqueda: "${searchTerm}"`} 
              onDelete={() => setSearchTerm("")}
              color="primary"
              variant="outlined"
            />
          )}
          {priceRange[0] > minPrice || priceRange[1] < maxPrice ? (
            <Chip 
              label={`Precio: $${priceRange[0]} - $${priceRange[1]}`} 
              onDelete={() => setPriceRange([minPrice, maxPrice])}
              color="primary"
              variant="outlined"
            />
          ) : null}
        </Stack>
      </Paper>

      {/* Contador de resultados */}
      <Typography 
        variant="body1" 
        color="text.secondary" 
        sx={{ mb: 3 }}
      >
        Mostrando {filteredProducts.length} de {products.length} productos
      </Typography>

      {/* Grid de Productos */}
      {filteredProducts.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No se encontraron productos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Intenta ajustar los filtros de búsqueda
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  borderRadius: '16px',
                  border: '1px solid rgba(76, 175, 80, 0.1)',
                  background: 'linear-gradient(135deg, #ffffff, #f8fff8)',
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: '0 12px 40px rgba(76, 175, 80, 0.15)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  {/* Imagen */}
                  <Box
                    sx={{
                      width: "100%",
                      height: 200,
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: '12px',
                      mb: 2,
                      border: '2px solid rgba(76, 175, 80, 0.1)'
                    }}
                  />

                  {/* Información del producto */}
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    gutterBottom
                    sx={{ 
                      fontWeight: '600',
                      color: '#2e7d32',
                      fontSize: '1.1rem'
                    }}
                  >
                    {product.name}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {product.description}
                  </Typography>
                  
                  <Box sx={{ mt: "auto" }}>
                    <Typography 
                      variant="h5" 
                      color="primary" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 'bold',
                        color: '#4CAF50'
                      }}
                    >
                      ${product.price.toLocaleString()}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      sx={{ 
                        fontSize: '0.9rem',
                        color: product.stock > 0 ? '#66bb6a' : '#f44336'
                      }}
                    >
                      {product.stock > 0 ? `✓ En stock (${product.stock})` : '✗ Agotado'}
                    </Typography>
                    
                    <Button
                      variant="contained"
                      fullWidth
                      component={Link}
                      to={`/productos/${product._id}`}
                      disabled={product.stock === 0}
                      sx={{
                        backgroundColor: "#4CAF50",
                        borderRadius: '12px',
                        py: 1.5,
                        fontWeight: '600',
                        textTransform: 'none',
                        fontSize: '1rem',
                        "&:hover": {
                          backgroundColor: "#45a049",
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.2s ease',
                        '&.Mui-disabled': {
                          backgroundColor: '#e0e0e0'
                        }
                      }}
                    >
                      {product.stock > 0 ? 'Ver Detalles' : 'Agotado'}
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