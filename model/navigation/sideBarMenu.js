/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const unassignedToSectionItems = [
    {
        title: 'Dashboard',
        routing: '/dashboard',
        icon: 'Dashboard',
        privileges: [],
    },
];

const manageSectionItems = [
    {
        title: 'Products catalog',
        routing: '/products',
        icon: 'Document',
        privileges: ['PRODUCT_READ'],
    },
    {
        title: 'Product templates',
        routing: '/templates',
        icon: 'Templates',
        privileges: ['TEMPLATE_DESIGNER_READ'],
    },
    {
        title: 'Categories',
        routing: '/categories',
        icon: 'Category',
        privileges: ['CATEGORY_READ'],
    },
    {
        title: 'Category trees',
        routing: '/category-trees',
        icon: 'Tree',
        privileges: ['ATTRIBUTE_READ'],
    },
    {
        title: 'Attributes',
        routing: '/attributes',
        icon: 'Attributes',
        privileges: ['CATEGORY_TREE_READ'],
    },
    {
        title: 'Media',
        routing: '/placeholder/media',
        icon: 'Media',
        privileges: ['MULTIMEDIA_READ'],
    },
    {
        title: 'Segments',
        routing: '/placeholder/segments',
        icon: 'Templates',
        privileges: [],
    },
];

const collectAndDistributeSectionItems = [
    {
        title: 'Import',
        routing: '/import',
        icon: 'Import',
        privileges: ['IMPORT_READ'],
    },
    {
        title: 'Export',
        routing: '/placeholder/export',
        icon: 'Export',
        privileges: [],
    },
    {
        title: 'Channels',
        routing: '/placeholder/channels',
        icon: 'Channels',
        privileges: [],
    },
];

const systemSectionItems = [
    {
        title: 'Users',
        routing: '/users',
        icon: 'User',
        privileges: ['USER_READ'],
    },
    {
        title: 'Workflows',
        routing: '/placeholder/workflow',
        icon: 'Flow',
        privileges: [],
    },
    {
        title: 'Settings',
        routing: '/settings',
        icon: 'Settings',
        privileges: [],
    },
];

const sections = [
    {
        key: null,
        items: unassignedToSectionItems,
    },
    {
        key: 'MANAGE',
        items: manageSectionItems,
    },
    {
        key: 'COLLECT & DISTRIBUTE',
        items: collectAndDistributeSectionItems,
    },
    {
        key: 'SYSTEM',
        items: systemSectionItems,
    },
];

export function getValidatedMenuData(canIUse) {
    const menu = [];
    const { length: sectionsNumber } = sections;

    for (let i = 0; i < sectionsNumber; i += 1) {
        const { key } = sections[i];
        menu.push({
            title: key,
            section: [],
        });

        const { items } = sections[i];
        const { length: itemsNumber } = items;

        for (let j = 0; j < itemsNumber; j += 1) {
            const item = items[j];
            if (!item.privileges.length || item.privileges.every(privilege => canIUse(privilege))) {
                menu[i].section.push({
                    title: item.title,
                    routing: item.routing,
                    icon: item.icon,
                });
            }
        }
    }

    return menu;
}
