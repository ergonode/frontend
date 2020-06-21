/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Icons, Pages, Tabs } from './imports';
import Privileges from './privileges';

export default [
    {
        name: 'segments',
        path: '/segments',
        component: Pages.Segments,
        meta: {
            access: true,
            title: 'Segments',
            group: {
                title: 'Products',
                menuPosition: 2,
                icon: Icons.Product,
            },
            isMenu: true,
            menuPosition: 2,
            privileges: {
                namespace: Privileges.SEGMENT.namespace,
                read: Privileges.SEGMENT.read,
            },
            redirectTo: 'segments-grid',
        },
        children: [
            {
                name: 'segments-grid',
                path: 'grid',
                component: Tabs.SegmentsGridTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: Icons.Product,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: 'segment-id',
        path: '/segments/segment/:id',
        component: Pages.SegmentEdit,
        meta: {
            isMenu: false,
            redirectTo: 'segment-id-general',
        },
        children: [
            {
                name: 'segment-id-general',
                path: 'general',
                component: Tabs.SegmentBaseTab,
                meta: {
                    title: 'General',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: Icons.Product,
                        },
                        {
                            title: 'Segments',
                            routeName: 'segments-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'segment-id-translations',
                path: 'translations',
                component: Tabs.SegmentTranslationsTab,
                meta: {
                    title: 'Translations',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: Icons.Product,
                        },
                        {
                            title: 'Segments',
                            routeName: 'segments-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'segment-id-designer',
                path: 'designer',
                component: Tabs.ConditionSetDesignTab,
                meta: {
                    title: 'Designer',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: Icons.Product,
                        },
                        {
                            title: 'Segments',
                            routeName: 'segments-grid',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
