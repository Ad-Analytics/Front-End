import { lazy } from 'react';

import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import IntegrationPage from 'pages/integration/IntegrationPage';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const Chat = Loadable(lazy(() => import('pages/chat/chat')));
const CheckoutPage = Loadable(lazy(() => import('pages/payment/CheckoutPage')));

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'chat',
      element: <Chat />
    },
    {
      path: 'payment',
      element: <CheckoutPage />
    },
    {
      path: '/integration',
      element: <IntegrationPage />
    }
  ]
};

export default MainRoutes;
