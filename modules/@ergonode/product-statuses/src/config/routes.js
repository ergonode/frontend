/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@Statuses/config/imports';
import Privileges from '@Statuses/config/privileges';

export const ROUTE_NAME = {
    PRODUCT_STATUSES: 'product-statuses',
    PRODUCT_STATUSES_GRID: 'product-statuses-grid',
    PRODUCT_STATUS_EDIT: 'product-status-id',
    PRODUCT_STATUS_EDIT_GENERAL: 'product-status-id-general',
    PRODUCT_STATUS_EDIT_TRANSLATIONS: 'product-status-id-translation',
};

export default [
    {
        name: ROUTE_NAME.PRODUCT_STATUSES,
        path: '/product-statuses',
        component: Pages.ProductStatuses,
        redirect: {
            name: ROUTE_NAME.PRODUCT_STATUSES_GRID,
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
                name: ROUTE_NAME.PRODUCT_STATUSES_GRID,
                path: 'grid',
                component: Tabs.ProductStatusTab,
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
        name: ROUTE_NAME.PRODUCT_STATUS_EDIT,
        path: '/product-statuses/status/:id',
        component: Pages.ProductStatusEdit,
        redirect: {
            name: ROUTE_NAME.PRODUCT_STATUS_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.PRODUCT_STATUS_EDIT_GENERAL,
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
                            routeName: ROUTE_NAME.PRODUCT_STATUSES_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.PRODUCT_STATUS_EDIT_TRANSLATIONS,
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
                            routeName: ROUTE_NAME.PRODUCT_STATUSES_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
