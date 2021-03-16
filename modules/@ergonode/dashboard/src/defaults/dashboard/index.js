/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import CATEGORIES_PRIVILEGES from '@Categories/config/privileges';
import PRODUCTS_PRIVILEGES from '@Products/config/privileges';
import TEMPLATE_PRIVILEGES from '@Templates/config/privileges';

export const GRID_ITEMS = [
    {
        title: 'Categories',
        actionTitle: 'Create categories',
        icon: 'add_category.svg',
        action: '/categories',
        privileges: [
            CATEGORIES_PRIVILEGES.CATEGORY.read,
        ],
    },
    {
        title: 'Template designer',
        actionTitle: 'Create template',
        icon: 'add_template.svg',
        action: '/product-templates',
        privileges: [
            TEMPLATE_PRIVILEGES.TEMPLATE_DESIGNER.read,
        ],
    },
    {
        title: 'Product',
        actionTitle: 'Create product',
        icon: 'add_template.svg',
        action: '/catalog',
        privileges: [
            PRODUCTS_PRIVILEGES.PRODUCT.read,
        ],
    },
];
