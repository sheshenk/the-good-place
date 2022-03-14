import { IconCertificate } from '@tabler/icons';

const icons = { IconCertificate };

const certifications = {
    id: 'certifications',
    title: 'Certifications',
    type: 'group',
    children: [
        {
            id: 'certifications',
            title: 'Certifications',
            type: 'item',
            url: '/certifications',
            icon: icons.IconCertificate,
            breadcrumbs: false
        },
    ]
};

export default certifications;
