import { createBrowserRouter } from 'react-router-dom';

import HomeRoutes from './HomeRoutes';
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

const router = createBrowserRouter([HomeRoutes, MainRoutes, LoginRoutes]);

export default router;
