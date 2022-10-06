import { IconCertificate, IconPencil } from '@tabler/icons';

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
        {
            id: 'applycert',
            title: 'Apply for Certification',
            type: 'item',
            url: '/certifications/apply',
            icon: IconPencil,
            breadcrumbs: false
        }
    ]
};

export default certifications;
