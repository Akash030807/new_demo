import axios from 'axios';

const API = axios.create({
    baseURL: 'https://new-demo-whau.onrender.com/api'
});

// Automatically attach the token to all requests
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;