import { lazy } from 'react';

import MainLayout from 'layout-routes/layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuditLog from 'pages/AuditLog';

const DashboardPage = Loadable(lazy(() => import('pages/dashboard')));
const Maps = Loadable(lazy(() => import('pages/maps/Maps')));

const Profile = Loadable(lazy(() => import('pages/profile/GeneralProfile')));
const Email = Loadable(lazy(() => import('pages/template/Email')));
const Sms = Loadable(lazy(() => import('pages/template/Sms')));
const AppUserAccountProfile1 = Loadable(lazy(() => import('pages/users/Profile1')));
const AppUserAccountProfile2 = Loadable(lazy(() => import('pages/users/Profile2')));

const MainRoutes = {
    path: '/',
    element: (
        <>
            <MainLayout />
        </>
    ),
    children: [
        {
            path: '/',
            element: <DashboardPage />
        },
        {
            path: '/dashboard',
            element: <DashboardPage />
        },

        {
            path: '/dashboard/maps',
            element: <Maps />
        },

        {
            path: '/pages/email',
            element: <Email />
        },
        {
            path: '/pages/sms',
            element: <Sms />
        },
        {
            path: '/pages/profile',
            element: <Profile />
        },
        {
            path: '/user/view-profile',
            element: <AppUserAccountProfile1 />
        },
        {
            path: '/user/edit-profile',
            element: <AppUserAccountProfile2 />
        },
        {
            path: '/pages/audit-log',
            element: <AuditLog />
        }
    ]
};

export default MainRoutes;
