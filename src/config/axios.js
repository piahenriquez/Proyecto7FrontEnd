import axios from 'axios';

//url del backend
const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3005/api';

const instance = axios.create({
    baseURL: backendURL,
    timeout: 10000,
});

export default instance;