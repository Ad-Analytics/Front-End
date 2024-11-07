import { lazy } from 'react';
import HomeLayout from 'layout/HomeLayout';
import Loadable from 'components/Loadable';

const HomePage = Loadable(lazy(() => import('pages/home')));

const HomeRoutes = {
  path: '/',
  element: <HomeLayout />,
  children: [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: 'home',
      element: <HomePage />
    }
  ]
};

export default HomeRoutes;
