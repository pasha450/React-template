
import { postRequest } from './fetcher';
import { useUser } from "src/contexts/auth-reducer/userContext"; 

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

export const fetchUserProfile = async (userId , token ) => {
  try {
    // const { user } = useUser();
    const response = await postRequest('/edit-profile', { id: userId} , token);
    if (response && response.data) {   
      return response.data;
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};












// for update the userprofile 
export const updateUserProfile = async (userData) => {
  console.log(userData, "userData to update");
  const formData = new FormData();
  formData.append('firstname', userData.firstname);
  formData.append('lastname', userData.lastname);
  formData.append('email', userData.email);
  try {
    const response = await postRequest('/update-profile', formData);
    return response;
  } catch (error) {
    throw error;
  }
};