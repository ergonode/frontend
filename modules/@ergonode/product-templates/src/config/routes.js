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
        name: 'product-templates',
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
        name: 'product-template-id',
        path: '/product-templates/template/:id',
        component: Pages.ProductTemplateEdit,
        redirect: {
            name: 'product-template-id-general',
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: 'product-template-id-general',
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
                            routeName: 'product-templates',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'product-template-id-template',
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
                            routeName: 'product-templates',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
