import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import marcoProducto from "../../assets/images/marco-producto.png";

const Home = () => {
  return (
    <Box>
      {/* HERO SECTION */}
      <Box
        sx={{
          backgroundColor: "transparent",
          py: { xs: 6, md: 10 },
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            {/* COLUMNA IZQUIERDA  */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography
                variant="h6"
                component="p"
                sx={{
                  color: "var(--header-text)",
                  fontWeight: "700",
                  mb: 2,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  opacity: 0.8,
                }}
              >
                Tienda Cerámicas
              </Typography>

              {/* TÍTULO ANIMADO */}
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  color: "#333",
                  fontSize: { xs: "2.8rem", md: "4rem" },
                  lineHeight: 1.1,

                  "@keyframes pulse-text": {
                    "0%": {
                      transform: "scale(1)",
                      textShadow: "0 0 5px rgba(76, 175, 80, 0.4)",
                    },
                    "50%": {
                      transform: "scale(1.01)",
                      textShadow: "0 0 15px rgba(76, 175, 80, 0.8)",
                    },
                    "100%": {
                      transform: "scale(1)",
                      textShadow: "0 0 5px rgba(76, 175, 80, 0.4)",
                    },
                  },

                  animation: "pulse-text 4s infinite ease-in-out",
                }}
              >
                Cerámicas Felices
              </Typography>

              <Typography
                variant="h6"
                component="p"
                sx={{
                  mb: 4,
                  color: "text.secondary",
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  lineHeight: 1.6,
                }}
              >
                Descubre las macetas más adorables para llenar tu hogar de
                alegría y color
              </Typography>

              <Button
                variant="contained"
                component={Link}
                to="/productos"
                sx={{
                  backgroundColor: "#4CAF50",
                  px: 5,
                  py: 1.8,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: "50px",
                  boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
                  "&:hover": {
                    backgroundColor: "#45a049",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Explorar Productos
              </Button>
            </Grid>

            {/* COLUMNA DERECHA  */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                sx={{
                  width: "100%",
                  height: { xs: 350, md: 650 }, 
                  backgroundImage:
                    "url(https://i.pinimg.com/1200x/a4/bf/78/a4bf781489fac0c63c7f5210276b1a3e.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "20px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  position: "relative",
                  overflow: "hidden",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* SECCIÓN DE PRODUCTOS DESTACADOS */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 6,
            color: "#333",
          }}
        >
          Productos Destacados
        </Typography>

        <Grid container spacing={6}>
          {/* Producto destacado 1  */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                height: "100%",
                boxShadow: 2,
                background: "linear-gradient(135deg, #f8fff8, #f1f8e9)",
                border: "none",
                borderRadius: "70px",
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-8px)",
                },
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "visible",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Marco decorativo  */}
              <Box
                sx={{
                  position: "absolute",
                  top: -70,
                  left: -70,
                  right: -65,
                  bottom: -90,
                  backgroundImage: `url(${marcoProducto})`,
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />

              {/* Imagen del producto  */}
              <Box
                sx={{
                  width: "calc(100% - 24px)",
                  height: 180,
                  backgroundImage:
                    "url(https://i.pinimg.com/1200x/29/08/de/2908de0a437f2205f2f263196aa9e079.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  zIndex: 1,
                  margin: "12px auto 8px",
                  borderRadius: "8px",
                  border: "2px solid rgba(76, 175, 80, 0.1)",
                }}
              />

              {/* CardContent  */}
              <CardContent
                sx={{
                  position: "relative",
                  zIndex: 1,
                  padding: "12px 8px 16px 8px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    textAlign: "center",
                    mb: 1,
                  }}
                >
                  Maceta Palitos de la Suerte
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  fontWeight="bold"
                  sx={{
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  $22.990
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Producto destacado 2  */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                height: "100%",
                boxShadow: 2,
                background: "linear-gradient(135deg, #f8fff8, #f1f8e9)",
                border: "none",
                borderRadius: "70px",
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-8px)",
                },
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "visible",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -70,
                  left: -70,
                  right: -65,
                  bottom: -90,
                  backgroundImage: `url(${marcoProducto})`,
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />

              <Box
                sx={{
                  width: "calc(100% - 24px)",
                  height: 180,
                  backgroundImage:
                    "url(https://i.pinimg.com/736x/db/05/36/db05367fa9cf94dca9f5fe790ee76956.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  zIndex: 1,
                  margin: "12px auto 8px",
                  borderRadius: "8px",
                  border: "2px solid rgba(76, 175, 80, 0.1)",
                }}
              />
              <CardContent
                sx={{
                  position: "relative",
                  zIndex: 1,
                  padding: "12px 8px 16px 8px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    textAlign: "center",
                    mb: 1,
                  }}
                >
                  Maceta Noche Estrellada
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  fontWeight="bold"
                  sx={{
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  $18.990
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Producto destacado 3 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                height: "100%",
                boxShadow: 2,
                background: "linear-gradient(135deg, #f8fff8, #f1f8e9)",
                border: "none",
                borderRadius: "70px",
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-8px)",
                },
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "visible",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -70,
                  left: -70,
                  right: -65,
                  bottom: -90,
                  backgroundImage: `url(${marcoProducto})`,
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />

              <Box
                sx={{
                  width: "calc(100% - 24px)",
                  height: 180,
                  backgroundImage:
                    "url(https://i.pinimg.com/736x/41/40/b1/4140b120ab587fa396558bd7fa067e58.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  zIndex: 1,
                  margin: "12px auto 8px",
                  borderRadius: "8px",
                  border: "2px solid rgba(76, 175, 80, 0.1)",
                }}
              />
              <CardContent
                sx={{
                  position: "relative",
                  zIndex: 1,
                  padding: "12px 8px 16px 8px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    textAlign: "center",
                    mb: 1,
                  }}
                >
                  Maceta Cerdito Feliz
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  fontWeight="bold"
                  sx={{
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  $17.990
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Producto destacado 4 */}
          <Grid size={{ xs: 10, sm: 2, md: 3 }}>
            <Card
              sx={{
                height: "100%",
                boxShadow: 2,
                background: "linear-gradient(135deg, #f8fff8, #f1f8e9)",
                border: "none",
                borderRadius: "70px",
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-8px)",
                },
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "visible",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -70,
                  left: -70,
                  right: -65,
                  bottom: -90,
                  backgroundImage: `url(${marcoProducto})`,
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />

              <Box
                sx={{
                  width: "calc(100% - 24px)",
                  height: 180,
                  backgroundImage:
                    "url(https://i.pinimg.com/1200x/a4/bf/78/a4bf781489fac0c63c7f5210276b1a3e.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  zIndex: 1,
                  margin: "12px auto 8px",
                  borderRadius: "8px",
                  border: "2px solid rgba(76, 175, 80, 0.1)",
                }}
              />
              <CardContent
                sx={{
                  position: "relative",
                  zIndex: 1,
                  padding: "12px 8px 16px 8px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    textAlign: "center",
                    mb: 1,
                  }}
                >
                  Maceta Alienígena
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  fontWeight="bold"
                  sx={{
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  $15.990
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="contained"
            component={Link}
            to="/productos"
            sx={{
              backgroundColor: "#4CAF50",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              "&:hover": {
                backgroundColor: "#45a049",
              },
            }}
          >
            Ver Todos los Productos
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
