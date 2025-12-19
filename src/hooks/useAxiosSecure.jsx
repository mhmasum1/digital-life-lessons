import axios from "axios";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

axiosSecure.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
            // IMPORTANT: backend reads req.headers.authorization
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const useAxiosSecure = () => axiosSecure;

export default useAxiosSecure;
