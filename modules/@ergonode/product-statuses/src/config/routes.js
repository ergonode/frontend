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
        name: 'product-statuses',
        path: '/product-statuses',
        component: Pages.ProductStatuses,
        redirect: {
            name: 'product-statuses-grid',
        },
        meta: {
            title: 'Product statuses',
            group: {
                title: 'Workflow',
                menuPosition: 7,
                icon: Icons.Flow,
            },
            isMenu: true,
            menuPosition: 1,
            privileges: {
                namespace: Privileges.WORKFLOW.namespace,
                read: Privileges.WORKFLOW.read,
            },
        },
        children: [
            {
                name: 'product-statuses-grid',
                path: 'grid',
                component: Tabs.ProductStatusGridTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: 'Workflow',
                            icon: Icons.Flow,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: 'product-status-id',
        path: '/product-statuses/status/:id',
        component: Pages.ProductStatusEdit,
        redirect: {
            name: 'product-status-id-general',
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: 'product-status-id-general',
                path: 'general',
                component: Tabs.ProductStatusGeneralTab,
                meta: {
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'Workflow',
                            icon: Icons.Flow,
                        },
                        {
                            title: 'Product statuses',
                            routeName: 'product-statuses-grid',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'product-status-id-general-translations',
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
                            routeName: 'product-statuses-grid',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
