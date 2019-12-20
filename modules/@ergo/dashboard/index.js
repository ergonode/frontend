/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Icons } from './config/imports';

export default {
    name: '@ergo/dashboard',
    type: 'page',
    privileges: {},
    nuxt: {
        aliases: {
            '@Dashboard': '/modules/@ergo/dashboard',
        },
    },
    router: [
        {
            name: 'dashboard',
            path: '/dashboard',
            component: Pages.Dashboard,
            meta: {
                access: true,
                title: 'Dashboard',
                icon: Icons.Dashboard,
                isMenu: true,
            },
        },
    ],
};
