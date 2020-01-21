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
    Categories: () => import('~/modules/product-design/pages/categories/index').then((m) => m.default || m),
    CategoryNew: () => import('~/modules/product-design/pages/categories/_category/index').then((m) => m.default || m),
    CategoryEdit: () => import('~/modules/product-design/pages/categories/_category/_id').then((m) => m.default || m),
    CategoryTrees: () => import('~/modules/product-design/pages/category-trees/index').then((m) => m.default || m),
    CategoryTreesNew: () => import('~/modules/product-design/pages/category-trees/_tree/index').then((m) => m.default || m),
    CategoryTreesEdit: () => import('~/modules/product-design/pages/category-trees/_tree/_id').then((m) => m.default || m),
    ProductTemplates: () => import('~/modules/product-design/pages/product-templates/index').then((m) => m.default || m),
    ProductTemplateNew: () => import('~/modules/product-design/pages/product-templates/_template/index').then((m) => m.default || m),
    ProductTemplateEdit: () => import('~/modules/product-design/pages/product-templates/_template/_id').then((m) => m.default || m),
};

const Tabs = {
    AttributeBaseTab: () => import('~/modules/product-design/pages/attributes/_attribute/_tabs/AttributeBaseTab').then((m) => m.default || m),
    AttributeTranslationsTab: () => import('~/modules/product-design/pages/attributes/_attribute/_tabs/AttributeTranslationsTab').then((m) => m.default || m),
    AttributeGroupBaseTab: () => import('~/modules/product-design/pages/attribute-groups/_group/_tabs/AttributeGroupBaseTab').then((m) => m.default || m),
    AttributeGroupTranslationsTab: () => import('~/modules/product-design/pages/attribute-groups/_group/_tabs/AttributeGroupTranslationsTab').then((m) => m.default || m),
    CategoryBaseTab: () => import('~/modules/product-design/pages/categories/_category/_tabs/CategoryBaseTab').then((m) => m.default || m),
    CategoryTranslationsTab: () => import('~/modules/product-design/pages/categories/_category/_tabs/CategoryTranslationsTab').then((m) => m.default || m),
    CategoryTreeBaseTab: () => import('~/modules/product-design/pages/category-trees/_tree/_tabs/CategoryTreeBaseTab').then((m) => m.default || m),
    CategoryTreeTranslationsTab: () => import('~/modules/product-design/pages/category-trees/_tree/_tabs/CategoryTreeTranslationsTab').then((m) => m.default || m),
    CategoryTreeDesignTab: () => import('~/modules/product-design/pages/category-trees/_tree/_tabs/CategoryTreeDesignTab').then((m) => m.default || m),
    TemplateDesignerBaseTab: () => import('~/modules/product-design/pages/product-templates/_template/_tabs/TemplateDesignerBaseTab').then((m) => m.default || m),
    TemplateDesignerTab: () => import('~/modules/product-design/pages/product-templates/_template/_tabs/TemplateDesignerTab').then((m) => m.default || m),
};

const GridTabs = {
    AttributeGroupGridTab: () => import('~/modules/product-design/pages/attribute-groups/_tabs/AttributeGroupGridTab').then((m) => m.default || m),
    AttributeGridTab: () => import('~/modules/product-design/pages/attributes/_tabs/AttributeGridTab').then((m) => m.default || m),
    CategoryGridTab: () => import('~/modules/product-design/pages/categories/_tabs/CategoryGridTab').then((m) => m.default || m),
    CategoryTreesGridTab: () => import('~/modules/product-design/pages/category-trees/_tabs/CategoryTreesGridTab').then((m) => m.default || m),
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
                icon: 'Templates',
            },
            breadcrumbs: [],
            isMenu: true,
            privileges: {
                namespace: 'ATTRIBUTE',
                read: 'ATTRIBUTE_READ',
            },
            redirectTo: 'grid',
        },
        children: [
            {
                name: 'attributes-grid',
                path: 'grid',
                component: GridTabs.AttributeGridTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: 'Templates',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
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
                            icon: 'Templates',
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
                            icon: 'Templates',
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
                            icon: 'Templates',
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
                icon: 'Templates',
            },
            breadcrumbs: [],
            isMenu: true,
            privileges: {
                namespace: 'ATTRIBUTE',
                read: 'ATTRIBUTE_READ',
            },
            redirectTo: 'grid',
        },
        children: [
            {
                name: 'attribute-groups-grid',
                path: 'grid',
                component: GridTabs.AttributeGroupGridTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: 'Templates',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
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
                            icon: 'Templates',
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
                            icon: 'Templates',
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
                            icon: 'Templates',
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
        name: 'categories',
        path: '/categories',
        component: Pages.Categories,
        meta: {
            access: true,
            title: 'Categories',
            group: {
                title: 'Product design',
                icon: 'Templates',
            },
            breadcrumbs: [],
            isMenu: true,
            privileges: {
                namespace: 'TEMPLATE_DESIGNER',
                read: 'TEMPLATE_DESIGNER_READ',
            },
            redirectTo: 'grid',
        },
        children: [
            {
                name: 'categories-grid',
                path: 'grid',
                component: GridTabs.CategoryGridTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: 'Templates',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: 'category-new',
        path: '/categories/category/new',
        component: Pages.CategoryNew,
        children: [
            {
                name: 'category-new-general',
                path: 'general',
                component: Tabs.CategoryBaseTab,
                meta: {
                    title: 'General options',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: 'Templates',
                        },
                        {
                            title: 'Categories',
                            routePath: '/categories',
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
        name: 'category-edit-id',
        path: '/categories/category/edit/:id',
        component: Pages.CategoryEdit,
        children: [
            {
                name: 'category-edit-id-general',
                path: 'general',
                component: Tabs.CategoryBaseTab,
                meta: {
                    title: 'General options',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: 'Templates',
                        },
                        {
                            title: 'Categories',
                            routePath: '/categories',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'category-edit-id-translations',
                path: 'translations',
                component: Tabs.CategoryTranslationsTab,
                meta: {
                    title: 'Translations',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: 'Templates',
                        },
                        {
                            title: 'Categories',
                            routePath: '/categories',
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
        name: 'category-trees',
        path: '/category-trees',
        component: Pages.CategoryTrees,
        meta: {
            access: true,
            title: 'Category trees',
            group: {
                title: 'Product design',
                icon: 'Templates',
            },
            breadcrumbs: [],
            isMenu: true,
            privileges: {
                namespace: 'CATEGORY_TREE',
                read: 'CATEGORY_TREE_READ',
            },
            redirectTo: 'grid',
        },
        children: [
            {
                name: 'category-trees-grid',
                path: 'grid',
                component: GridTabs.CategoryTreesGridTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: 'Templates',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: 'category-tree-new',
        path: '/category-trees/tree/new',
        component: Pages.CategoryTreesNew,
        children: [
            {
                name: 'category-tree-new-general',
                path: 'general',
                component: Tabs.CategoryTreeBaseTab,
                meta: {
                    title: 'General options',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: 'Templates',
                        },
                        {
                            title: 'Category trees',
                            routePath: '/category-trees',
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
        name: 'category-tree-edit-id',
        path: '/category-trees/tree/edit/:id',
        component: Pages.CategoryTreesEdit,
        children: [
            {
                name: 'category-tree-edit-id-general',
                path: 'general',
                component: Tabs.CategoryTreeBaseTab,
                meta: {
                    title: 'General options',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: 'Templates',
                        },
                        {
                            title: 'Category trees',
                            routePath: '/category-trees',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'category-tree-edit-id-translations',
                path: 'translations',
                component: Tabs.CategoryTreeTranslationsTab,
                meta: {
                    title: 'Translations',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: 'Templates',
                        },
                        {
                            title: 'Category trees',
                            routePath: '/category-trees',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'category-tree-edit-id-designer',
                path: 'designer',
                component: Tabs.CategoryTreeDesignTab,
                meta: {
                    title: 'Tree designer',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: 'Templates',
                        },
                        {
                            title: 'Category trees',
                            routePath: '/category-trees',
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
                icon: 'Templates',
            },
            breadcrumbs: [
                {
                    title: 'Product design',
                    icon: 'Templates',
                },
            ],
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
                            icon: 'Templates',
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
                            icon: 'Templates',
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
                    title: 'Template designer',
                    breadcrumbs: [
                        {
                            title: 'Product design',
                            icon: 'Templates',
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
