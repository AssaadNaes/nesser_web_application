import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Define endpoints that don’t need the Authorization header
const noAuthPatterns = [/^\/login$/, /^\/register$/, /^\/products(\/.*)?$/];

// Intercept all the requests and attach authorization header to them
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const requiresAuth = !noAuthPatterns.some((pattern) => pattern.test(config.url));
    
    if (token && requiresAuth) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
