/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/segments',
    type: 'page',
    moduleRelations: [
        '@ergo/conditions',
    ],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Segments': '/',
        },
    },
    router: [
        {
            name: 'segments',
            path: '/segments',
            component: Pages.Segments,
            meta: {
                access: true,
                title: 'Segments',
                icon: 'Templates',
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
            name: 'segment-edit-id',
            path: '/segments/segment/edit/:id',
            component: Pages.SegmentEdit,
            meta: {
                isMenu: false,
                redirectTo: 'segment-edit-id-general',
            },
            children: [
                {
                    name: 'segment-edit-id-general',
                    path: 'general',
                    component: Tabs.SegmentBaseTab,
                    meta: {
                        title: 'General options',
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Product,
                            },
                            {
                                title: 'Segments',
                                routePath: '/segments',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'segment-edit-id-translations',
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
                                routePath: '/segments',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'segment-edit-id-designer',
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
                                routePath: '/segments',
                            },
                        ],
                        privileges: [],
                    },
                },
            ],
        },
    ],
    store: [
        {
            directory: 'segments',
            name: 'segments',
        },
    ],
};
