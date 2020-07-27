/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from './imports';
import Privileges from './privileges';

export default [
    {
        name: 'media',
        path: '/media',
        component: Pages.Media,
        meta: {
            access: true,
            title: 'Media',
            group: {
                title: 'Resources',
                menuPosition: 6,
                icon: Icons.Media,
            },
            isMenu: true,
            menuPosition: 1,
            privileges: {
                namespace: Privileges.MULTIMEDIA.namespace,
                read: Privileges.MULTIMEDIA.read,
            },
            redirectTo: 'media-grid',
        },
        children: [
            {
                name: 'media-grid',
                path: 'grid',
                component: Tabs.MediaGridTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: 'Resources',
                            icon: Icons.Media,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
