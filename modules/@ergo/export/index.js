/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/export',
    type: 'page',
    moduleRelations: [],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Export': '/',
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
                    menuPosition: 5,
                    icon: Icons.Channels,
                },
                isMenu: true,
                menuPosition: 1,
                // privileges: {
                //     namespace: Privileges.EXPORT.namespace,
                //     read: Privileges.EXPORT.read,
                // },
            },
        },
    ],
};
