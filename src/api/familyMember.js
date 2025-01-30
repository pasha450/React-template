import axios from "axios";       
import { postRequest } from './fetcher';

//normal family.js file api  integrated here 

  export const registerFamilyMember = async (values, { setErrors }) => {
    try {
        console.log('Sending data:', values.familyMembers);
        
        const response = await postRequest('/register-family', { familyMembers: values.familyMembers });
        console.log('Success:', response.data);
        return response;
    } catch (error) {
        console.error('Error:', error); 
        if (error.response && error.response.data.errors) {
            setErrors(error.response.data.errors);
        }
        throw error;
    }
};
