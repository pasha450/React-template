import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Cookies from 'js-cookie';
import { useUser } from '../../../../../contexts/auth-reducer/userContext';
const useLogout = () => {
  const { logout } = useUser(); 
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      if (logout) logout(); // Call logout from context if defined
      // Cookies.remove('authToken');      // remove the token from cookies
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('savedPassword');
       
      // Show success message
      await Swal.fire('Logged out!', 'You have been logged out successfully.', 'success');
      // Redirect to the login page
      navigate('/login');
    }
  };

  return handleLogout; // Return the logout function
};

export default useLogout;
