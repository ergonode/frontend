/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

const Pages = {
    Products: () => import('~/modules/products/pages/catalog/index').then((m) => m.default || m),
    ProductNew: () => import('~/modules/products/pages/catalog/_product/index').then((m) => m.default || m),
    ProductEdit: () => import('~/modules/products/pages/catalog/_product/_id').then((m) => m.default || m),
    Segments: () => import('~/modules/products/pages/segments/index').then((m) => m.default || m),
    SegmentNew: () => import('~/modules/products/pages/segments/_segment/index').then((m) => m.default || m),
    SegmentEdit: () => import('~/modules/products/pages/segments/_segment/_id').then((m) => m.default || m),
};

const Tabs = {
    ProductBaseTab: () => import('~/modules/products/pages/catalog/_product/_tabs/ProductBaseTab').then((m) => m.default || m),
    ProductTemplateTab: () => import('~/modules/products/pages/catalog/_product/_tabs/ProductTemplateTab').then((m) => m.default || m),
    ProductCommentsTab: () => import('~/modules/products/pages/catalog/_product/_tabs/ProductCommentsTab').then((m) => m.default || m),
    SegmentBaseTab: () => import('~/modules/products/pages/segments/_segment/_tabs/SegmentBaseTab').then((m) => m.default || m),
    SegmentTranslationsTab: () => import('~/modules/products/pages/segments/_segment/_tabs/SegmentTranslationsTab').then((m) => m.default || m),
    ConditionSetDesignTab: () => import('~/modules/products/pages/segments/_segment/_tabs/ConditionSetDesignTab').then((m) => m.default || m),
};

const GridTabs = {
    ProductGridTab: () => import('~/modules/products/pages/catalog/_tabs/ProductGridTab').then((m) => m.default || m),
    SegmentsGridTab: () => import('~/modules/products/pages/segments/_tabs/SegmentsGridTab').then((m) => m.default || m),
    ProductHistoryGridTab: () => import('~/modules/products/pages/catalog/_product/_tabs/ProductHistoryGridTab').then((m) => m.default || m),
};

export const routing = [
    {
        name: 'catalog',
        path: '/catalog',
        component: Pages.Products,
        meta: {
            access: true,
            title: 'Catalog',
            group: {
                title: 'Products',
                icon: 'Document',
            },
            isMenu: true,
            privileges: {
                namespace: 'PRODUCT',
                read: 'PRODUCT_READ',
            },
            redirectTo: 'products',
        },
        children: [
            {
                name: 'catalog-products',
                path: 'products',
                component: GridTabs.ProductGridTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: 'Document',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: 'product-new',
        path: '/catalog/product/new',
        component: Pages.ProductNew,
        children: [
            {
                name: 'product-new-general',
                path: 'general',
                component: Tabs.ProductBaseTab,
                meta: {
                    title: 'General options',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: 'Document',
                        },
                        {
                            title: 'Catalog',
                            routePath: '/catalog',
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
        name: 'product-edit-id',
        path: '/catalog/product/edit/:id',
        component: Pages.ProductEdit,
        children: [
            {
                name: 'product-edit-id-general',
                path: 'general',
                component: Tabs.ProductBaseTab,
                meta: {
                    title: 'General options',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: 'Document',
                        },
                        {
                            title: 'Catalog',
                            routePath: '/catalog',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'product-edit-id-template',
                path: 'template',
                component: Tabs.ProductTemplateTab,
                meta: {
                    title: 'Product template',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: 'Document',
                        },
                        {
                            title: 'Catalog',
                            routePath: '/catalog',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'product-edit-id-comments',
                path: 'comments',
                component: Tabs.ProductCommentsTab,
                meta: {
                    title: 'Comments',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: 'Document',
                        },
                        {
                            title: 'Catalog',
                            routePath: '/catalog',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'product-edit-id-history',
                path: 'history',
                component: GridTabs.ProductHistoryGridTab,
                meta: {
                    title: 'History',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: 'Document',
                        },
                        {
                            title: 'Catalog',
                            routePath: '/catalog',
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
        name: 'segments',
        path: '/segments',
        component: Pages.Segments,
        meta: {
            access: true,
            title: 'Segments',
            icon: 'Templates',
            group: {
                title: 'Products',
                icon: 'Document',
            },
            isMenu: true,
            privileges: {
                namespace: 'SEGMENT',
                read: 'SEGMENT_READ',
            },
            redirectTo: 'grid',
        },
        children: [
            {
                name: 'segments-grid',
                path: 'grid',
                component: GridTabs.SegmentsGridTab,
                meta: {
                    title: '',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: 'Document',
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
    {
        name: 'segment-new',
        path: '/segments/segment/new',
        component: Pages.SegmentNew,
        children: [
            {
                name: 'segment-new-general',
                path: 'general',
                component: Tabs.SegmentBaseTab,
                meta: {
                    title: 'General options',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: 'Document',
                        },
                        {
                            title: 'Segments',
                            routePath: '/segments',
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
        name: 'segment-edit-id',
        path: '/segments/segment/edit/:id',
        component: Pages.SegmentEdit,
        children: [
            {
                name: 'segment-edit-id-general',
                path: 'general',
                component: Tabs.SegmentBaseTab,
                meta: {
                    title: 'General options',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: 'Document',
                        },
                        {
                            title: 'Segments',
                            routePath: '/segments',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'segment-edit-id-translations',
                path: 'translations',
                component: Tabs.SegmentTranslationsTab,
                meta: {
                    title: 'Translations',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: 'Document',
                        },
                        {
                            title: 'Segments',
                            routePath: '/segments',
                        },
                    ],
                    privileges: [],
                },
            },
            {
                name: 'segment-edit-id-designer',
                path: 'designer',
                component: Tabs.ConditionSetDesignTab,
                meta: {
                    title: 'Condition set',
                    breadcrumbs: [
                        {
                            title: 'Products',
                            icon: 'Document',
                        },
                        {
                            title: 'Segments',
                            routePath: '/segments',
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
