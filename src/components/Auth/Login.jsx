import { useContext, useState } from "react";
import UserContext from "../../contexts/User/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const ctx = useContext(UserContext);
  const navigate = useNavigate();
  const { loginUser } = ctx;

  const [logUser, setLogUser] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setLogUser({
      ...logUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(logUser);
    if (response) {
      setErrorMessage(response);
    } else {
      navigate('/'); // Redirige al home después del login
    }
  };

  return (
    <>
      <section className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Iniciar sesión</h2>
          <p className="auth-subtitle">
            ¿Aún sin cuenta? &nbsp;
            <Link to="/registro" className="font-medium text-green-600 underline">
              Regístrate
            </Link>
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div>
              <label htmlFor="email" className="form-label">
                Correo electrónico
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
                className="form-input"
                required
              />
            </div>

            <div>
              <button type="submit" className="form-button">
                Acceder a tu cuenta
              </button>
            </div>

            {errorMessage && <p className="form-error">{errorMessage}</p>}
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;