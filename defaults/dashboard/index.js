/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const GRID_ITEMS = [
    {
        title: 'Categories',
        actionTitle: 'Create categories',
        icon: 'add_category.svg',
        action: '/categories',
        privileges: ['CATEGORY_READ'],
    },
    {
        title: 'Template designer',
        actionTitle: 'Create template',
        icon: 'add_template.svg',
        action: '/templates',
        privileges: ['TEMPLATE_DESIGNER_READ'],
    },
    {
        title: 'Product',
        actionTitle: 'Create product',
        icon: 'add_template.svg',
        action: '/products',
        privileges: ['PRODUCT_READ'],
    },
];
