import axios from 'axios';


export const googleLoginHandler = async (credentialResponse) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/google', {
      token: credentialResponse.credential,
    });
    console.log('Backend Response:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Google login error:', error);
    throw error; 
  }
};


