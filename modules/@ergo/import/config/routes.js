/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Icons } from './imports';
import Privileges from './privileges';

export default [
    {
        name: 'imports',
        path: '/imports',
        component: Pages.Import,
        meta: {
            access: true,
            title: 'Imports',
            group: {
                title: 'Sources',
                menuPosition: 4,
                icon: Icons.Export,
            },
            breadcrumbs: [
                {
                    title: 'Imports',
                    icon: Icons.Export,
                },
            ],
            isMenu: true,
            menuPosition: 1,
            privileges: {
                namespace: Privileges.IMPORT.namespace,
                read: Privileges.IMPORT.read,
            },
        },
    },
];
