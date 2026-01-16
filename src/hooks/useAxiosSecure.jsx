import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// Request interceptor
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//AUTO LOGOUT
axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired - logging out");

      localStorage.removeItem("access-token");

      // force redirect
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

const useAxiosSecure = () => axiosSecure;

export default useAxiosSecure;
