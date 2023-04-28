import { IconUser, IconBook } from '@tabler/icons';

const icons = { IconUser, IconBook };

const manage = {
    id: 'manage',
    title: 'Manage',
    type: 'group',
    children: [
        {
            id: 'manageUser',
            title: 'User',
            type: 'item',
            url: '/manage/user',
            icon: icons.IconUser,
            breadcrumbs: true
        },
        {
            id: 'manageQuiz',
            title: 'Quiz',
            type: 'item',
            url: '/manage/quiz',
            icon: icons.IconBook,
            breadcrumbs: true
        }
    ]
};

export default manage;
