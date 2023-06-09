import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('views/authentication/Register')));


const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/auth/login',
            element: <AuthLogin />
        },
        {
            path: '/auth/register',
            element: <AuthRegister />
        }
    ]
};

export default AuthenticationRoutes;
