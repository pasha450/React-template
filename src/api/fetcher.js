import axios from 'axios';

// Create an axios instance
const baseURL = import.meta.env.VITE_APP_API_URL;
const apiClient = axios.create({
  baseURL: baseURL, 
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json', 
  },
});

// Helper function for POST requests
export const postRequest = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default apiClient;
