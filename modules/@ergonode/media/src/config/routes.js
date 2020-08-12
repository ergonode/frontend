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
    {
        name: 'media-id',
        path: '/media/resource/:id',
        component: Pages.ResourceEdit,
        meta: {
            isMenu: false,
            redirectTo: 'media-id-general',
        },
        children: [
            {
                name: 'media-id-general',
                path: 'general',
                component: Tabs.ResourceBaseTab,
                meta: {
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'Resources',
                            icon: Icons.Media,
                        },
                        {
                            title: 'Media',
                            routeName: 'media-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            // {
            //     name: 'import-id-settings',
            //     path: 'settings',
            //     component: Tabs.ImportProfileSettingsTab,
            //     meta: {
            //         title: 'Settings',
            //         breadcrumbs: [
            //             {
            //                 title: 'Resources',
            //                 icon: Icons.Media,
            //             },
            //             {
            //                 title: 'Import profiles',
            //                 routeName: 'import-grid',
            //             },
            //         ],
            //         privileges: [],
            //     },
            // },
            // {
            //     name: 'import-id-history',
            //     path: 'history',
            //     component: Tabs.ImportProfileHistoryTab,
            //     meta: {
            //         title: 'History',
            //         breadcrumbs: [
            //             {
            //                 title: 'Sources',
            //                 icon: Icons.Export,
            //             },
            //             {
            //                 title: 'Import profiles',
            //                 routeName: 'import-grid',
            //             },
            //         ],
            //         privileges: [],
            //     },
            // },
        ],
    },
];
