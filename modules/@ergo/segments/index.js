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
                    icon: Icons.Document,
                },
                isMenu: true,
                privileges: {
                    namespace: Privileges.SEGMENT.namespace,
                    read: Privileges.SEGMENT.read,
                },
            },
        },
        {
            name: 'segment-new',
            path: '/segments/segment/new',
            component: Pages.SegmentNew,
            children: [
                {
                    name: 'segment-new-general',
                    path: 'general',
                    component: Tabs.SegmentBaseTab,
                    meta: {
                        title: 'General options',
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Document,
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
            meta: {
                isMenu: false,
                redirectTo: 'general',
            },
        },
        {
            name: 'segment-edit-id',
            path: '/segments/segment/edit/:id',
            component: Pages.SegmentEdit,
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
                                icon: Icons.Document,
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
                                icon: Icons.Document,
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
                                icon: Icons.Document,
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
            meta: {
                isMenu: false,
                redirectTo: 'general',
            },
        },
    ],
    store: [
        {
            directory: 'segments',
            name: 'segments',
        },
    ],
};
