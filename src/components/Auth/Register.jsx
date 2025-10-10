import { useContext, useState } from "react";
import UserContext from "../../contexts/User/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const ctx = useContext(UserContext);
  const navigate = useNavigate();
  const { registerUser } = ctx;
  
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      return setErrorMessage("Las contraseñas no coinciden");
    }
    const response = await registerUser(newUser);
    if (response) {
      navigate("/iniciar-sesion");
    } else {
      setErrorMessage("Hubo un error al registrarse");
    }
  };

  return (
    <>
      <section className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Crear cuenta</h2>
          <p className="auth-subtitle">
            ¿Ya tienes cuenta? &nbsp;
            <Link to="/iniciar-sesion" className="font-medium text-green-600 underline">
              Inicia sesión
            </Link>
          </p>

          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label htmlFor="username" className="form-label">
                Nombre de usuario
              </label>
              <input
                onChange={handleChange}
                name="username"
                type="text"
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                onChange={handleChange}
                name="password"
                type="password"
                required
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirma tu contraseña
              </label>
              <input
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                required
                className="form-input"
              />
            </div>

            <div className="py-4">
                <button type="submit" className="form-button">
                  Crear cuenta
                </button>
            </div>

            {errorMessage && <p className="form-error">{errorMessage}</p>}
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;