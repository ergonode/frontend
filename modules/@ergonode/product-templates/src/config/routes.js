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
            title: 'Product templates',
            group: {
                title: 'Product design',
                menuPosition: 3,
                icon: Icons.Templates,
            },
            breadcrumbs: [
                {
                    title: 'Product design',
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
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: Icons.Templates,
                        },
                        {
                            title: 'Product templates',
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
                    title: 'Designer',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: Icons.Templates,
                        },
                        {
                            title: 'Product templates',
                            routeName: ROUTE_NAME.PRODUCT_TEMPLATES,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
