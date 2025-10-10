import React, { useContext, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import UserContext from '../contexts/User/UserContext';

export default function AuthRoute({ component }) {
    const ctx = useContext(UserContext);
    const { authState, verifyUser } = ctx;

    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

    return <>{ authState ? <Navigate replace to='/' /> : React.createElement(component) }</>;
}