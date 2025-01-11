
import { postRequest } from './fetcher';

export const registerUser = async (userData) => {
  console.log(userData,"userData")
  const formData = new FormData();
  formData.append('firstname', userData.firstname);
  formData.append('lastname', userData.lastname);
  formData.append('email', userData.email);
  formData.append('password', userData.password);
  try {
    const response = await postRequest('/register', formData);
    return response;
  } catch (error) {
    throw error;
  }
};

// for user login
export const loginUser = async (credentials) => {
  console.log(credentials, "login credentials");
  const formData = new FormData();
  formData.append('email', credentials.email);
  formData.append('password', credentials.password);
  try {
    const response = await postRequest('/login', formData); 
    return response;
  } catch (error) {
    throw error;
  }
};
