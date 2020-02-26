/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Icons } from './imports';

export default [
    {
        name: 'dashboard',
        path: '/dashboard',
        component: Pages.Dashboard,
        meta: {
            access: true,
            title: 'Dashboard',
            icon: Icons.Dashboard,
            isMenu: true,
            menuPosition: -1000,
        },
    },
];
