import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/User/UserContext";

export default function PrivateRoute({ component }) {
  const userCtx = useContext(UserContext);
  const { authState, verifyUser } = userCtx;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      await verifyUser();
      setLoading(false);
    };
    verifyToken();
  }, [verifyUser, authState]);

  if (loading) return <div>Cargando...</div>;

  return <>{authState ? React.createElement(component) : <Navigate replace to="/iniciar-sesion" />}</>;
}