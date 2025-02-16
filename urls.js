import axios from "axios";
export const API_URL = 'https://backend-hailio.onrender.com/api/v1/';

// https://backend-hailio.onrender.com
// Create an Axios instance
export const API = axios.create({
  baseURL: API_URL, 
  withCredentials: true, // Ensures cookies (refreshToken) are sent with requests
});

// Request Interceptor: Attach the accessToken to every request
API.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken"); // Use sessionStorage for better security
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 errors and refresh the accessToken
API.interceptors.response.use(
  (response) => response, // Return successful response as is
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token and if retry is not yet attempted
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried

      try {
        // Call refresh token endpoint
        const refreshResponse = await axios.get(`${API_URL}auth/refresh_token`, {
          withCredentials: true,
        });

        // Extract new accessToken
        const { accessToken } = refreshResponse.data;

        // Store the new accessToken
        sessionStorage.setItem("accessToken", accessToken);

        // Retry the original request with new token
        return API({
          ...originalRequest,
          headers: { ...originalRequest.headers, Authorization: `Bearer ${accessToken}` },
        });

      } catch (refreshError) {
        console.error("Token refresh failed. Logging out...", refreshError);
        
        // Clear session and redirect
        sessionStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
