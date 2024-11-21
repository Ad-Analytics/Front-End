import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import HomeLayout from 'layout/HomeLayout';

const HomePage = Loadable(lazy(() => import('pages/home')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const Chat = Loadable(lazy(() => import('pages/chat/chat')));
const CheckoutPage = Loadable(lazy(() => import('pages/payment/CheckoutPage')));
const IntegrationGuide = Loadable(lazy(() => import('pages/integration/components/IntegrationPage')));

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
      path: 'integration',
      element: <IntegrationGuide />
    },
    {
      path: 'payment',
      element: <CheckoutPage />
    }
  ]
};

export default MainRoutes;
