// assets
import { IconBook, IconUser } from '@tabler/icons';

// constant
const icons = {
    IconUser,
    IconBook
};

const projects = {
    id: 'projects',
    title: 'Projects',
    type: 'group',
    children: [
        {
            id: 'for-you',
            title: 'For You',
            type: 'item',
            url: '/for-you',
            icon: icons.IconUser,
            breadcrumbs: false
        },
        {
            id: 'stories',
            title: 'Stories',
            type: 'item',
            url: '/stories',
            icon: icons.IconBook,
            breadcrumbs: false
        },
    ]
};

export default projects;
