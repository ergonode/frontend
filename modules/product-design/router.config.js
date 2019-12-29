/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

const Pages = {
    Attributes: () => import('~/modules/product-design/pages/attributes/index').then((m) => m.default || m),
    AttributeNew: () => import('~/modules/product-design/pages/attributes/_attribute/index').then((m) => m.default || m),
    AttributeEdit: () => import('~/modules/product-design/pages/attributes/_attribute/_id').then((m) => m.default || m),
    AttributeGroups: () => import('~/modules/product-design/pages/attribute-groups/index').then((m) => m.default || m),
    AttributeGroupNew: () => import('~/modules/product-design/pages/attribute-groups/_group/index').then((m) => m.default || m),
    AttributeGroupEdit: () => import('~/modules/product-design/pages/attribute-groups/_group/_id').then((m) => m.default || m),
    ProductTemplates: () => import('~/modules/product-design/pages/product-templates/index').then((m) => m.default || m),
    ProductTemplateNew: () => import('~/modules/product-design/pages/product-templates/_template/index').then((m) => m.default || m),
    ProductTemplateEdit: () => import('~/modules/product-design/pages/product-templates/_template/_id').then((m) => m.default || m),
};

const Tabs = {
    AttributeBaseTab: () => import('~/modules/product-design/pages/attributes/_attribute/_tabs/AttributeBaseTab').then((m) => m.default || m),
    AttributeTranslationsTab: () => import('~/modules/product-design/pages/attributes/_attribute/_tabs/AttributeTranslationsTab').then((m) => m.default || m),
    AttributeGroupBaseTab: () => import('~/modules/product-design/pages/attribute-groups/_group/_tabs/AttributeGroupBaseTab').then((m) => m.default || m),
    AttributeGroupTranslationsTab: () => import('~/modules/product-design/pages/attribute-groups/_group/_tabs/AttributeGroupTranslationsTab').then((m) => m.default || m),
    TemplateDesignerBaseTab: () => import('~/modules/product-design/pages/product-templates/_template/_tabs/TemplateDesignerBaseTab').then((m) => m.default || m),
    TemplateDesignerTab: () => import('~/modules/product-design/pages/product-templates/_template/_tabs/TemplateDesignerTab').then((m) => m.default || m),
};

export const routing = [
    {
        name: 'attributes',
        path: '/attributes',
        component: Pages.Attributes,
        meta: {
            access: true,
            title: 'Attributes',
            group: {
                title: 'Product design',
                icon: () => import('@Core/components/Icons/Menu/IconTemplates'),
            },
            isMenu: true,
            privileges: {
                namespace: 'ATTRIBUTE',
                read: 'ATTRIBUTE_READ',
            },
        },
    },
    {
        name: 'attribute-new',
        path: '/attributes/attribute/new',
        component: Pages.AttributeNew,
        children: [
            {
                name: 'attribute-new-general',
                path: 'general',
                component: Tabs.AttributeBaseTab,
                meta: {
                    title: 'General options',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: () => import('@Core/components/Icons/Menu/IconTemplates'),
                        },
                        {
                            title: 'Attributes',
                            routePath: '/attributes',
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
        name: 'attribute-edit-id',
        path: '/attributes/attribute/edit/:id',
        component: Pages.AttributeEdit,
        children: [
            {
                name: 'attribute-edit-id-general',
                path: 'general',
                component: Tabs.AttributeBaseTab,
                meta: {
                    title: 'General options',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: () => import('@Core/components/Icons/Menu/IconTemplates'),
                        },
                        {
                            title: 'Attributes',
                            routePath: '/attributes',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'attribute-edit-id-translations',
                path: 'translations',
                component: Tabs.AttributeTranslationsTab,
                meta: {
                    title: 'Translations',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: () => import('@Core/components/Icons/Menu/IconTemplates'),
                        },
                        {
                            title: 'Attributes',
                            routePath: '/attributes',
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
        name: 'attribute-groups',
        path: '/attribute-groups',
        component: Pages.AttributeGroups,
        meta: {
            access: true,
            title: 'Attribute groups',
            group: {
                title: 'Product design',
                icon: () => import('@Core/components/Icons/Menu/IconTemplates'),
            },
            isMenu: true,
            privileges: {
                namespace: 'ATTRIBUTE',
                read: 'ATTRIBUTE_READ',
            },
        },
    },
    {
        name: 'attribute-group-new',
        path: '/attribute-groups/group/new',
        component: Pages.AttributeGroupNew,
        children: [
            {
                name: 'attribute-group-new-general',
                path: 'general',
                component: Tabs.AttributeGroupBaseTab,
                meta: {
                    title: 'General options',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: () => import('@Core/components/Icons/Menu/IconTemplates'),
                        },
                        {
                            title: 'Attribute groups',
                            routePath: '/attribute-groups',
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
        name: 'attribute-group-edit-id',
        path: '/attribute-groups/group/edit/:id',
        component: Pages.AttributeGroupEdit,
        children: [
            {
                name: 'attribute-group-edit-id-general',
                path: 'general',
                component: Tabs.AttributeGroupBaseTab,
                meta: {
                    title: 'General options',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: () => import('@Core/components/Icons/Menu/IconTemplates'),
                        },
                        {
                            title: 'Attribute groups',
                            routePath: '/attribute-groups',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'attribute-group-edit-id-translations',
                path: 'translations',
                component: Tabs.AttributeGroupTranslationsTab,
                meta: {
                    title: 'Translations',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: () => import('@Core/components/Icons/Menu/IconTemplates'),
                        },
                        {
                            title: 'Attribute groups',
                            routePath: '/attribute-groups',
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
        name: 'product-templates',
        path: '/product-templates',
        component: Pages.ProductTemplates,
        meta: {
            access: true,
            title: 'Product templates',
            group: {
                title: 'Product design',
                icon: () => import('@Core/components/Icons/Menu/IconTemplates'),
            },
            isMenu: true,
            privileges: {
                namespace: 'TEMPLATE_DESIGNER',
                read: 'TEMPLATE_DESIGNER_READ',
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
                            icon: () => import('@Core/components/Icons/Menu/IconTemplates'),
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
                            icon: () => import('@Core/components/Icons/Menu/IconTemplates'),
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
                            icon: () => import('@Core/components/Icons/Menu/IconTemplates'),
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
];
