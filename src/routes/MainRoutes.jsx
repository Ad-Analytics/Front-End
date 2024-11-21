import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import SupportPage from 'pages/support/SupportPage';  
import CampaignsPage from 'pages/campaigns/index';
import CampaignDetails from 'pages/campaign/CampaignDetails'; 
import NotificationsPage from 'pages/notifications/index';

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
    },
    {
      path: 'campaigns',
      element: <CampaignsPage />
    },
    {
      path: 'campaign/:id',
      element: <CampaignDetails />
    },
    {
      path: 'support',
      element: <SupportPage />
    },
    {
      path: 'notifications',
      element: <NotificationsPage />
    }
  ]
};

export default MainRoutes;
