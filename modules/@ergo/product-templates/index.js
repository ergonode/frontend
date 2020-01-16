/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { Pages, Tabs, Icons } from './config/imports';
import Privileges from './config/privileges';

export default {
    name: '@ergo/product-templates',
    type: 'page',
    moduleRelations: [
        // '@ergo/products',
    ],
    privileges: Privileges,
    nuxt: {
        aliases: {
            '@Templates': '/',
        },
    },
    router: [
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
            name: 'product-template-new',
            path: '/product-templates/template/new',
            component: Pages.ProductTemplateNew,
            children: [
                {
                    name: 'product-template-new-general',
                    path: 'general',
                    component: Tabs.TemplateDesignerBaseTab,
                    meta: {
                        title: 'General options',
                        breadcrumbs: [
                            {
                                title: 'Product design',
                                icon: Icons.Templates,
                            },
                            {
                                title: 'Product templates',
                                routePath: '/product-templates',
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
            name: 'product-template-edit-id',
            path: '/product-templates/template/edit/:id',
            component: Pages.ProductTemplateEdit,
            children: [
                {
                    name: 'product-template-edit-id-general',
                    path: 'general',
                    component: Tabs.TemplateDesignerBaseTab,
                    meta: {
                        title: 'General options',
                        breadcrumbs: [
                            {
                                title: 'Product design',
                                icon: Icons.Templates,
                            },
                            {
                                title: 'Product templates',
                                routePath: '/product-templates',
                            },
                        ],
                        privileges: [],
                    },
                },
                {
                    name: 'product-template-edit-id-template',
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
                                routePath: '/product-templates',
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
            directory: 'templateLists',
            name: 'templateLists',
        },
        {
            directory: 'templateDesigner',
            name: 'templateDesigner',
        },
    ],
};
