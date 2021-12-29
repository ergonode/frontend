/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@Statuses/config/imports';
import Privileges from '@Statuses/config/privileges';

export const GROUP = {
    id: 'workflow',
    title: '@Statuses._.routes.group',
};
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
            title: '@Statuses._.routes.title',
            group: {
                id: GROUP.id,
                title: GROUP.title,
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
                            title: GROUP.title,
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
                    title: '@Statuses._.routes.editOption',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Flow,
                        },
                        {
                            title: '@Statuses._.routes.title',
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
                    title: '@Statuses._.routes.editTranslations',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Flow,
                        },
                        {
                            title: '@Statuses._.routes.title',
                            routeName: ROUTE_NAME.PRODUCT_STATUSES_GRID,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
