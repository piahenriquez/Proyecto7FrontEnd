import { useReducer, useCallback, useMemo } from "react";
import UserReducer from "./UserReducer";
import UserContext from './UserContext';
import axiosClient from '../../config/axios';

const UserState = (props) => {
    const initialState = {
        currentUser: {
            username: '',
            email: '',
            country: '',
            address: '',
            zipcode: 0
        },
        authState: false,
        globalLoading: false
    };

    const [globalState, dispatch] = useReducer(UserReducer, initialState);

    const registerUser = useCallback(async (form) => {
        try {
            const response = await axiosClient.post('/users/register', form);
            console.log(response);

            dispatch({
                type: 'REGISTRO_EXITOSO',
                payload: response.data
            })

            return true;
        } catch (error) {
            console.error('Error en registro:', error);
            return false;
        }
    }, []);

    const loginUser = useCallback(async (form) => {
        try {
            const response = await axiosClient.post('/users/login', form, {
                withCredentials: true
            })
            console.log(response);
            dispatch({
                type: 'LOGIN_EXITOSO'
            })
            return;
        } catch (error) {
            console.error('Error en login:', error);
            return error.response?.data?.message || 'Error en login';
        }
    }, []);

   
const verifyUser = useCallback(async () => {
    if (globalState.globalLoading) return;

    try {
        dispatch({ type: 'SET_LOADING', payload: true });

        const response = await axiosClient.get('/users/verify-user', {
            withCredentials: true
        });

        const userData = response.data.usuario;
        dispatch({
            type: 'GET_USER_DATA',
            payload: userData
        });

    } catch (error) {
        console.error('Error verificando usuario:', error);
    } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
    }
}, [globalState.globalLoading]);

            const updateUser = useCallback(async (form) => {
        try {
            const response = await axiosClient.put('/users/update-user', form, {
                withCredentials: true
            });
    
            console.log("Usuario actualizado:", response.data);
    
            // Actualizar el usuario en el estado global
            dispatch({
                type: 'GET_USER_DATA',
                payload: { 
                    ...globalState.currentUser, 
                    ...form 
                }
            });
    
            return response.data;
        } catch (error) {
            console.error('Error actualizando usuario:', error);
            throw error;
        }
    }, [globalState.currentUser]);

    const logoutUser = useCallback(async (navigate) => {
        try {
            await axiosClient.post('/users/logout', {}, {
                withCredentials: true
            })
            dispatch({
                type: 'LOGOUT_EXITOSO',
                payload: 'Sesion cerrada correctamente'
            })
            navigate('/iniciar-sesion');
        } catch (error) {
            console.error('Error al cerrar la sesion', error);
        }
    }, []);

    const providerValue = useMemo(() => ({
        currentUser: globalState.currentUser,
        authState: globalState.authState,
        globalLoading: globalState.globalLoading,
        registerUser,
        loginUser,
        verifyUser,
        updateUser,
        logoutUser
    }), [
        globalState.currentUser,
        globalState.authState,
        globalState.globalLoading,
        registerUser,
        loginUser,
        verifyUser,
        updateUser,
        logoutUser
    ]);

    return (
        <UserContext.Provider value={providerValue}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;