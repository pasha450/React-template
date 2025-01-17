import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import MainRoutes from './MainRoutes';
import ProtectedRoute from './ProtectedRoute';


// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <AuthLogin />
    },
    {
      path: '/login',
      element: 
     <ProtectedRoute>
       <AuthLogin />
     </ProtectedRoute>
    },
    {
      path: '/register',
      element: 
      <ProtectedRoute>
        <AuthRegister />
      </ProtectedRoute>
    }
  ]
};
// const routes =[MainRoutes,LoginRoutes]
export default LoginRoutes;
