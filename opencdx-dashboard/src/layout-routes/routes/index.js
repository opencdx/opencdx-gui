import { createBrowserRouter } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

const router = createBrowserRouter([LoginRoutes, AuthenticationRoutes, MainRoutes], { basename: process.env.REACT_APP_BASE_NAME });
export default router;
