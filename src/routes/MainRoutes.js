import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const ForYouPage = Loadable(lazy(() => import('views/projects/ForYou')));
const StoriesPage = Loadable(lazy(() => import('views/projects/Stories')));

// sample page routing
const CertificationsPage = Loadable(lazy(() => import('views/certifications')));
const CertApplicationPage = Loadable(lazy(() => import('views/certifications/application')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/for-you',
            element: <ForYouPage />
        },
        {
            path: '/stories',
            element: <StoriesPage />
        },
        {
            path: '/certifications',
            element: <CertificationsPage />
        },
        {
            path: '/certifications/apply',
            element: <CertApplicationPage />
        }
    ]
};

export default MainRoutes;
