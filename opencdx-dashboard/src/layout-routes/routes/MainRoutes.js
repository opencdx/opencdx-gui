import { lazy } from 'react';

import MainLayout from 'layout-routes/layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuditLog from 'pages/pages/AuditLog';

const DashboardPage = Loadable(lazy(() => import('pages/dashboard')));
const Maps = Loadable(lazy(() => import('pages/maps/Maps')));

const EmailTemplate = Loadable(lazy(() => import('pages/pages/EmailTemplate')));
const SmsTemplate = Loadable(lazy(() => import('pages/pages/SmsTemplate')));
const AppUserAccountProfile1 = Loadable(lazy(() => import('pages/pages/ViewProfile')));
const AppUserAccountProfile2 = Loadable(lazy(() => import('pages/pages/EditProfile')));

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
            element: <EmailTemplate />
        },
        {
            path: '/pages/sms',
            element: <SmsTemplate />
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
