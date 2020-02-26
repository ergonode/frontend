/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Icons } from './imports';
// import Privileges from './privileges';

export default [
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
];
