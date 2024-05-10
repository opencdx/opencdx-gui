import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
// import AuthGuard from 'utils/route-guard/AuthGuard';
import MinimalLayout from 'layout-routes/layout/MinimalLayout';

// login routing
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const FormBuilder = Loadable(lazy(() => import('../../formBuilder')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <AuthLogin />
        },
        {
            path: '/register',
            element: <AuthRegister />
        }
        ,
        {
            path: '/form-builder',
            element: <FormBuilder />
        }
    ]
};

export default AuthenticationRoutes;
