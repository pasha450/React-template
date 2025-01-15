import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// project import
import router from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import {UserProvider} from 'contexts/auth-reducer/userContext'


export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
      <UserProvider>
        <RouterProvider router={router} />
        <ToastContainer />
        </UserProvider>
      </ScrollTop>
    </ThemeCustomization>
  );
}
