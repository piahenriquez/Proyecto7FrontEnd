import { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/User/UserContext";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";

export default function Profile() {
  const userCtx = useContext(UserContext);
  const { updateUser, currentUser } = userCtx;

  const [userForm, setUserForm] = useState({
    username: "",
    country: "",
    address: "",
    zipcode: "",
  });

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
    alert("Perfil actualizado correctamente");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mi Perfil
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Actualiza tu información personal
        </Typography>

        <form onSubmit={sendData}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Nombre de usuario"
              name="username"
              value={userForm.username}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Email"
              name="email"
              value={currentUser?.email || ""}
              disabled
              fullWidth
              helperText="El email no se puede modificar"
            />

            <TextField
              label="País"
              name="country"
              value={userForm.country}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Código postal"
              name="zipcode"
              type="number"
              value={userForm.zipcode}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Dirección"
              name="address"
              value={userForm.address}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />

            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ mt: 2 }}
            >
              Guardar cambios
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}