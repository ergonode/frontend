/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/product-statuses',
    type: 'page',
    moduleRelations: [],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Statuses': '/',
        },
    },
    router: [
        {
            name: 'product-statuses',
            path: '/product-statuses',
            component: Pages.ProductStatuses,
            meta: {
                title: 'Product statuses',
                group: {
                    title: 'Workflow',
                    icon: Icons.Flow,
                },
                isMenu: true,
                privileges: {
                    namespace: Privileges.WORKFLOW.namespace,
                    read: Privileges.WORKFLOW.read,
                },
            },
        },
        {
            name: 'product-status-new',
            path: '/product-statuses/status/new',
            component: Pages.ProductStatusNew,
            children: [
                {
                    name: 'product-status-new-general',
                    path: 'general',
                    component: Tabs.ProductStatusBaseTab,
                    meta: {
                        title: 'General options',
                        breadcrumbs: [
                            {
                                title: 'Workflow',
                                icon: Icons.Flow,
                            },
                            {
                                title: 'Product statuses',
                                routePath: '/product-statuses',
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
            name: 'product-status-edit-id',
            path: '/product-statuses/status/edit/:id',
            component: Pages.ProductStatusEdit,
            children: [
                {
                    name: 'product-status-edit-id-general',
                    path: 'general',
                    component: Tabs.ProductStatusBaseTab,
                    meta: {
                        title: 'General options',
                        breadcrumbs: [
                            {
                                title: 'Workflow',
                                icon: Icons.Flow,
                            },
                            {
                                title: 'Product statuses',
                                routePath: '/product-statuses',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'product-status-edit-id-general-translations',
                    path: 'translations',
                    component: Tabs.ProductStatusTranslationsTab,
                    meta: {
                        title: 'Translations',
                        breadcrumbs: [
                            {
                                title: 'Workflow',
                                icon: Icons.Flow,
                            },
                            {
                                title: 'Product statuses',
                                routePath: '/product-statuses',
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
            directory: 'productStatus',
            name: 'productStatus',
        },
    ],
};
