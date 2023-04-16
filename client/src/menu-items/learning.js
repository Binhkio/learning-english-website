// assets
import { IconBackpack } from '@tabler/icons';

// constant
const icons = { IconBackpack };

const learning = {
    id: 'learning',
    title: 'Learning',
    type: 'group',
    children: [
        {
            id: 'learning',
            title: 'Learning',
            type: 'item',
            url: '/',
            icon: icons.IconBackpack,
            breadcrumbs: true
        }
    ]
};

export default learning;
