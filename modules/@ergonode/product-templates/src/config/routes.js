/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    Icons,
    Pages,
    Tabs,
} from '@Templates/config/imports';
import Privileges from '@Templates/config/privileges';

export const GROUP = {
    id: 'product-design',
    title: '@Templates._.routes.group',
};
export const ROUTE_NAME = {
    PRODUCT_TEMPLATES: 'product-templates',
    PRODUCT_TEMPLATE_EDIT: 'product-template-id',
    PRODUCT_TEMPLATE_EDIT_GENERAL: 'product-template-id-general',
    PRODUCT_TEMPLATE_EDIT_TRANSLATIONS: 'product-template-id-translations',
    PRODUCT_TEMPLATE_EDIT_DESIGNER: 'product-template-id-designer',
};

export default [
    {
        name: ROUTE_NAME.PRODUCT_TEMPLATES,
        path: '/product-templates',
        component: Pages.ProductTemplates,
        meta: {
            access: true,
            title: '@Templates._.routes.title',
            group: {
                id: GROUP.id,
                title: GROUP.title,
                menuPosition: 3,
                icon: Icons.Templates,
            },
            breadcrumbs: [
                {
                    title: GROUP.title,
                    icon: Icons.Templates,
                },
            ],
            isMenu: true,
            menuPosition: 3,
            privileges: {
                namespace: Privileges.TEMPLATE_DESIGNER.namespace,
                read: Privileges.TEMPLATE_DESIGNER.read,
            },
        },
    },
    {
        name: ROUTE_NAME.PRODUCT_TEMPLATE_EDIT,
        path: '/product-templates/template/:id',
        component: Pages.ProductTemplateEdit,
        redirect: {
            name: ROUTE_NAME.PRODUCT_TEMPLATE_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.PRODUCT_TEMPLATE_EDIT_GENERAL,
                path: 'general',
                component: Tabs.ProductTemplateGeneralTab,
                meta: {
                    title: '@Templates._.routes.editOption',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Templates,
                        },
                        {
                            title: '@Templates._.routes.title',
                            routeName: ROUTE_NAME.PRODUCT_TEMPLATES,
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: ROUTE_NAME.PRODUCT_TEMPLATE_EDIT_DESIGNER,
                path: 'template',
                component: Tabs.TemplateDesignerTab,
                meta: {
                    title: '@Templates._.routes.editDesigner',
                    breadcrumbs: [
                        {
                            title: GROUP.title,
                            icon: Icons.Templates,
                        },
                        {
                            title: '@Templates._.routes.title',
                            routeName: ROUTE_NAME.PRODUCT_TEMPLATES,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
