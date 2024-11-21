import { lazy } from 'react';
import Loadable from '../components/Loadable';
import Dashboard from '../layout/Dashboard';

const EditProfile = Loadable(lazy(() => import('../pages/profile/EditProfile')));
const ViewProfile = Loadable(lazy(() => import('../pages/profile/ViewProfile')));
const SocialProfile = Loadable(lazy(() => import('../pages/profile/SocialProfile')));
const Billing = Loadable(lazy(() => import('../pages/profile/Billing')));
const Logout = Loadable(lazy(() => import('../pages/profile/Logout')));

const ProfileRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: 'perfil/editar',
      element: <EditProfile />
    },
    {
      path: 'perfil/ver',
      element: <ViewProfile />
    },
    {
      path: 'perfil/social',
      element: <SocialProfile />
    },
    {
      path: 'perfil/cobranca',
      element: <Billing />
    },
    {
      path: 'sair',
      element: <Logout />
    }
  ]
};

export default ProfileRoutes; 