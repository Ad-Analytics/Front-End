import { createBrowserRouter } from 'react-router-dom';

import HomeRoutes from './HomeRoutes';
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import ProfileRoutes from './ProfileRoutes';

const router = createBrowserRouter([HomeRoutes, MainRoutes, LoginRoutes, ProfileRoutes]);

export default router;
