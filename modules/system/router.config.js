/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const Pages = {
    Settings: () => import('~/modules/system/pages/settings/index').then((m) => m.default || m),
};

export const routing = [
    {
        name: 'settings',
        path: '/settings',
        component: Pages.Settings,
        meta: {
            access: true,
            title: 'Settings',
            group: {
                title: 'System',
                icon: () => import('@Core/components/Icons/Menu/IconSettings'),
            },
            isMenu: true,
            privileges: {
                namespace: 'USER',
                read: 'USER_READ',
            },
        },
    },
];
