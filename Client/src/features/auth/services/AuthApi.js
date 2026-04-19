import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
});

export const registerUser = async ({name, email, password}) => {
    try {
        const response = await api.post('/auth/register', { name, email, password });
        return response.data;
       
    } catch (error) {
        console.log("register failed",error);
        throw error;
    }
};

export const loginUser = async ({email, password}) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        console.log("login failed",error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await api.get('/auth/logout');
        return response.data;
        
    } catch (error) {
        console.log("logout failed",error);
        throw error;
    }
};

export const getUserProfile = async () => {
    try {
        const response = await api.get('/auth/getuser');
        return response.data;
        
    } catch (error) {
        console.log("user fetch fail",error);
        throw error;
    }
};