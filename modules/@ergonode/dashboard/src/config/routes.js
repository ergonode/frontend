/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
} from './imports';

export const ROUTE_NAME = {
    DASHBOARD: 'dashboard',
};

export default [
    {
        name: ROUTE_NAME.DASHBOARD,
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
