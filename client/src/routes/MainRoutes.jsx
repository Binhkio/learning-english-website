import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const Learning = Loadable(lazy(() => import('views/learning')));
const Manage = Loadable(lazy(() => import('views/manage')));
const QuizManage = Loadable(lazy(() => import('views/quiz-manage')));
const EditUser = Loadable(lazy(() => import('views/user-edit')));

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
        },
        {
            path: '/manage/quiz',
            element: <QuizManage />
        },
        {
            path: '/user/edit',
            element: <EditUser />
        }
    ]
};

export default MainRoutes;
