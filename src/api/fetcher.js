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
export const postRequest = async (endpoint, data, token = null) => {
  try {
    const headers={};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['Content-Type'] = 'multipart/form-data';
    }

    console.log(headers,'headers')
    const response = await apiClient.post(endpoint, data , {headers});
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default apiClient;
