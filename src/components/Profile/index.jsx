import { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/User/UserContext";
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Chip,
  Stack
} from "@mui/material";
import { 
  Person, 
  Email, 
  LocationOn, 
  Home, 
  LocalPostOffice,
  Save,
  Edit,
  CheckCircle,
  CalendarToday
} from "@mui/icons-material";

export default function Profile() {
  const userCtx = useContext(UserContext);
  const { updateUser, currentUser } = userCtx;

  const [userForm, setUserForm] = useState({
    username: "",
    country: "",
    address: "",
    zipcode: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setUserForm({
        username: currentUser.username || "",
        country: currentUser.country || "",
        address: currentUser.address || "",
        zipcode: currentUser.zipcode || "",
      });
    }
  }, [currentUser]);

  const handleChange = (event) => {
    setUserForm({
      ...userForm,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = async (event) => {
    event.preventDefault();
    await updateUser(userForm);
    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setSaveSuccess(false);
  };

  // Obtener año actual para "Miembro desde"
  const currentYear = new Date().getFullYear();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header del Perfil */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            mx: 'auto',
            mb: 2,
            backgroundColor: '#4CAF50',
            fontSize: '2.5rem',
            fontWeight: 'bold'
          }}
        >
          <Person sx={{ fontSize: 50 }} />
        </Avatar>
        
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
            mb: 1
          }}
        >
          Mi Perfil
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Gestiona tu información personal
        </Typography>

        <Stack direction="row" spacing={1} justifyContent="center">
          <Chip 
            icon={<Email />}
            label={currentUser?.email || "usuario@ejemplo.com"}
            variant="outlined"
            sx={{ 
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              borderColor: '#4CAF50',
              color: '#4CAF50'
            }}
          />
          <Chip 
            icon={<CalendarToday />}
            label={`Miembro desde ${currentYear}`}
            variant="outlined"
            sx={{ 
              backgroundColor: 'rgba(76, 175, 80, 0.05)',
              borderColor: 'rgba(76, 175, 80, 0.3)',
              color: 'text.secondary'
            }}
          />
        </Stack>
      </Box>

      <Grid container spacing={4}>
        {/* Información del Perfil */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 4, 
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #ffffff, #f8fff8)',
              border: '1px solid rgba(76, 175, 80, 0.1)'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                Información Personal
              </Typography>
              
              <Button
                startIcon={isEditing ? <Save /> : <Edit />}
                onClick={isEditing ? sendData : handleEditToggle}
                variant={isEditing ? "contained" : "outlined"}
                sx={{
                  borderRadius: '12px',
                  backgroundColor: isEditing ? '#4CAF50' : 'transparent',
                  borderColor: '#4CAF50',
                  color: isEditing ? 'white' : '#4CAF50',
                  '&:hover': {
                    backgroundColor: isEditing ? '#45a049' : 'rgba(76, 175, 80, 0.1)'
                  }
                }}
              >
                {isEditing ? 'Guardar' : 'Editar'}
              </Button>
            </Box>

            {saveSuccess && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1, 
                  mb: 3,
                  p: 2,
                  borderRadius: '12px',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  border: '1px solid rgba(76, 175, 80, 0.3)'
                }}
              >
                <CheckCircle sx={{ color: '#4CAF50' }} />
                <Typography variant="body2" color="#2e7d32" fontWeight="500">
                  Perfil actualizado correctamente
                </Typography>
              </Box>
            )}

            <form onSubmit={sendData}>
              <Grid container spacing={3}>
                {/* Nombre de usuario */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Nombre de usuario"
                    name="username"
                    value={userForm.username}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Person sx={{ color: 'text.secondary', mr: 1 }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: isEditing ? 'white' : 'rgba(0,0,0,0.02)'
                      }
                    }}
                  />
                </Grid>

                {/* Email  */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Email"
                    name="email"
                    value={currentUser?.email || ""}
                    disabled
                    fullWidth
                    InputProps={{
                      startAdornment: <Email sx={{ color: 'text.secondary', mr: 1 }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(0,0,0,0.02)'
                      }
                    }}
                    helperText="El email no se puede modificar"
                  />
                </Grid>

                {/* País */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="País"
                    name="country"
                    value={userForm.country}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: 'text.secondary', mr: 1 }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: isEditing ? 'white' : 'rgba(0,0,0,0.02)'
                      }
                    }}
                  />
                </Grid>

                {/* Código postal */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Código postal"
                    name="zipcode"
                    type="number"
                    value={userForm.zipcode}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <LocalPostOffice sx={{ color: 'text.secondary', mr: 1 }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: isEditing ? 'white' : 'rgba(0,0,0,0.02)'
                      }
                    }}
                  />
                </Grid>

                {/* Dirección */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Dirección"
                    name="address"
                    value={userForm.address}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Home sx={{ color: 'text.secondary', mr: 1, mt: 1, alignSelf: 'flex-start' }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: isEditing ? 'white' : 'rgba(0,0,0,0.02)'
                      }
                    }}
                  />
                </Grid>
              </Grid>

              {isEditing && (
                <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    size="large"
                    startIcon={<Save />}
                    sx={{
                      backgroundColor: '#4CAF50',
                      borderRadius: '12px',
                      px: 4,
                      py: 1.2,
                      fontWeight: '600',
                      '&:hover': {
                        backgroundColor: '#45a049',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Guardar Cambios
                  </Button>
                  
                  <Button 
                    variant="outlined" 
                    size="large"
                    onClick={handleEditToggle}
                    sx={{
                      borderRadius: '12px',
                      px: 4,
                      py: 1.2,
                      borderColor: '#2e7d32',
                      color: '#2e7d32',
                      '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.04)',
                        borderColor: '#1b5e20'
                      }
                    }}
                  >
                    Cancelar
                  </Button>
                </Box>
              )}
            </form>
          </Paper>
        </Grid>

        {/* Panel Lateral - Información Útil */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            {/* Tarjeta de Estado de Cuenta */}
            <Card 
              sx={{ 
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #4CAF50, #66bb6a)',
                color: 'white',
                boxShadow: '0 8px 30px rgba(76, 175, 80, 0.3)'
              }}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', opacity: 0.9 }}>
                  Mi Cuenta
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Activa
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Cuenta verificada
                </Typography>
              </CardContent>
            </Card>

            {/* Tarjeta de Información Útil */}
            <Paper 
              sx={{ 
                p: 3, 
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #f8fff8, #e8f5e9)',
                border: '1px solid rgba(76, 175, 80, 0.1)'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', color: '#2e7d32' }}>
                Información Útil
              </Typography>
              
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Box>
                  <Typography variant="body2" fontWeight="500" color="#2e7d32">
                    Seguridad de la cuenta
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tu información está protegida y encriptada
                  </Typography>
                </Box>
                
                <Divider />
                
                <Box>
                  <Typography variant="body2" fontWeight="500" color="#2e7d32">
                    Datos actualizados
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mantén tu información actualizada para mejores experiencias
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            {/* Tarjeta de Ayuda */}
            <Paper 
              sx={{ 
                p: 3, 
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #f8fff8, #e8f5e9)',
                border: '1px solid rgba(76, 175, 80, 0.1)'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', color: '#2e7d32' }}>
                ¿Necesitas ayuda?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Estamos aquí para ayudarte con cualquier pregunta sobre tu cuenta.
              </Typography>
              <Button 
                variant="outlined" 
                fullWidth
                sx={{
                  borderRadius: '12px',
                  borderColor: '#4CAF50',
                  color: '#4CAF50',
                  '&:hover': {
                    backgroundColor: 'rgba(76, 175, 80, 0.1)'
                  }
                }}
              >
                Contactar Soporte
              </Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}