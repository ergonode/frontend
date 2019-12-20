/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/export',
    type: 'page',
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Export': '/modules/@ergo/export',
        },
    },
    router: [
        {
            name: 'exports',
            path: '/exports',
            component: Pages.Placeholder,
            meta: {
                access: true,
                title: 'Exports',
                group: {
                    title: 'Channels',
                    icon: Icons.Channels,
                },
                isMenu: true,
                // privileges: Privileges.EXPORT,
            },
        },
    ],
};
