import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ProductContext from "../../../contexts/Product/ProductContext";
import {
    Container,
    Grid,
    Typography,
    Box,
    Button,
    Chip,
    Divider,
}
from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProductSingle = () => {
    const { id } = useParams(); //para obtener el id del producto desde la URL
    const ctx = useContext(ProductContext);
    const { products } = ctx;

    const [product, setProduct] = useState(null);

    //buscar el producto por el id
    useEffect(() => {
        if (products.length > 0) {
            const foundProduct = products.find(p => p._id === id);
            setProduct(foundProduct);
        }
    }, [products, id]);

    if (!product) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Typography align="center" >Producto no encontrado</Typography>
                </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                    sx={{
                        width: '100%',
                        height: 400,
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2,
                    }}
                    >
                        <Typography color="text.secondary">
                            Imagen de {product.name}
                        </Typography>
                    </Box>
                    </Grid>

                    {/*columna de informacion*/}
                    <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {product.name}
                    </Typography>

                    <Chip
                    label={product.category}
                    color="primary"
                    variant="outlined"
                    sx={{ mb: 2 }}
                    />
                    <Typography variant="h5" color="primary" gutterBottom>
                        ${product.price}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Informacion del producto */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Stock disponible: {product.stock} unidades
                            </Typography>
                            {product.feactured && (
                            <Typography variant="body2" color="success.main" >
                                Producto Destacado
                            </Typography>
                            )}
                    </Box>

                    {/* Botones de accion */}
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Button
                        variant="contained"
                        size="large"
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                            backgroundColor: '#4CAF50',
                            '&:hover': {
                            backgroundColor: '#45a049',
                            }
                        }}
                        >
                        Agregar al Carrito
                        </Button>

                        <Button
                        variant="outlined"
                        size="large"
                        startIcon={<FavoriteIcon />}
                        >
                            Favorito
                        </Button>
                        </Box>
                        </Grid>
                        </Grid>
                        </Container>
    );
};

export default ProductSingle;