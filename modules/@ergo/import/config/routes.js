/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Icons } from './imports';

export default [
    {
        name: 'imports',
        path: '/imports',
        component: Pages.Placeholder,
        meta: {
            access: true,
            title: 'Imports',
            group: {
                title: 'Sources',
                menuPosition: 4,
                icon: Icons.Export,
            },
            isMenu: true,
            menuPosition: 1,
        },
    },
];
