import { lazy } from 'react';

import GuestGuard from 'layout-routes/routes/route-guard/GuestGuard';
import MinimalLayout from 'layout-routes/layout/MinimalLayout';
import NavMotion from 'layout-routes/layout/NavMotion';
import Loadable from 'ui-component/Loadable';

const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/',
            element: <AuthLogin />
        },
        {
            path: '/login',
            element: <AuthLogin />
        },
        {
            path: '/register',
            element: <AuthRegister />
        }
    ]
};

export default LoginRoutes;
