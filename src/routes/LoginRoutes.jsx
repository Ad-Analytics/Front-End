import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

// render
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('../pages/authentication/register')));
const EmailConfirmation = Loadable(lazy(() => import('../pages/authentication/EmailConfirmation')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLogin />
    },
    {
      path: 'register',
      element: <AuthRegister />
    },
    {
      path: 'email-confirmation',
      element: <EmailConfirmation />
    }
  ]
};

export default LoginRoutes;
