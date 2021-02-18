/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import PRIVILEGES from '@Core/config/privileges';

export default [
    {
        title: 'My account',
        menu: [
            {
                title: 'My profile',
                routing: '/profile/activity-log-grid',
                icon: () => import('@Core/components/Icons/Menu/IconUser'),
            },
            {
                title: 'Settings',
                routing: '/settings',
                icon: () => import('@Core/components/Icons/Menu/IconSettings'),
                privileges: [
                    PRIVILEGES.SETTINGS.read,
                ],
            },
        ],
    },
];
