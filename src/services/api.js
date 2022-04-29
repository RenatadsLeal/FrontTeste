import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:8080/'
    baseURL: 'http://54.233.88.50:8080/'
});

export default api;