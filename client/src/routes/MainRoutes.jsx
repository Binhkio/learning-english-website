import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const Learning = Loadable(lazy(() => import('views/learning')));
const Manage = Loadable(lazy(() => import('views/manage')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Learning />
        },
        {
            path: '/manage/user',
            element: <Manage />
        }
    ]
};

export default MainRoutes;
