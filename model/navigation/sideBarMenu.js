/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default [
    {
        title: null,
        menu: [
            {
                title: 'Dashboard',
                routing: '/dashboard',
                icon: 'home',
            },
        ],
    },
    {
        title: 'MANAGE',
        menu: [
            {
                title: 'Product catalog',
                routing: '/products',
                icon: 'paper',
            },
            {
                title: 'Product templates',
                routing: '/templates',
                icon: 'boxes',
            },
            {
                title: 'Categories',
                routing: '/categories',
                icon: 'folder',
            },
            {
                title: 'Category trees',
                routing: '/placeholder/category-trees',
                icon: 'tree',
            },
            {
                title: 'Attributes',
                routing: '/attributes',
                icon: 'puzzel',
            },
            {
                title: 'Medias',
                routing: '/placeholder/media',
                icon: 'img',
            },
            {
                title: 'Segments',
                routing: '/placeholder/segments',
                icon: 'boxes',
            },
        ],
    },
    {
        title: 'COLLECT & DISTRIBUTE',
        menu: [
            {
                title: 'Import',
                routing: '/import',
                icon: 'import',
            },
            {
                title: 'Export',
                routing: '/placeholder/export',
                icon: 'export',
            },
            {
                title: 'Channels',
                routing: '/placeholder/channels',
                icon: 'circles',
            },
        ],
    },
    {
        title: 'SYSTEM',
        menu: [
            {
                title: 'Users',
                routing: '/users',
                icon: 'user',
            },
            {
                title: 'Workflows',
                routing: '/placeholder/workflow',
                icon: 'workflow',
            },
            {
                title: 'Settings',
                routing: '/settings',
                icon: 'settings',
            },
        ],
    },
];
