/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const Pages = {
    ProductStatuses: () => import('~/modules/workflow/pages/product-statuses/index').then((m) => m.default || m),
    ProductStatusNew: () => import('~/modules/workflow/pages/product-statuses/_status/index').then((m) => m.default || m),
    ProductStatusEdit: () => import('~/modules/workflow/pages/product-statuses/_status/_id').then((m) => m.default || m),
};

const Tabs = {
    ProductStatusBaseTab: () => import('~/modules/workflow/pages/product-statuses/_status/_tabs/ProductStatusBaseTab').then((m) => m.default || m),
    ProductStatusTranslationsTab: () => import('~/modules/workflow/pages/product-statuses/_status/_tabs/ProductStatusTranslationsTab').then((m) => m.default || m),
};

export const routing = [
    {
        name: 'product-statuses',
        path: '/product-statuses',
        component: Pages.ProductStatuses,
        meta: {
            title: 'Product statuses',
            group: {
                title: 'Workflow',
                icon: () => import('@Core/components/Icons/Menu/IconFlow'),
            },
            isMenu: true,
            privileges: {
                namespace: 'WORKFLOW',
                read: 'WORKFLOW_READ',
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
                            icon: () => import('@Core/components/Icons/Menu/IconFlow'),
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
                            icon: () => import('@Core/components/Icons/Menu/IconFlow'),
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
                            icon: () => import('@Core/components/Icons/Menu/IconFlow'),
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
];
