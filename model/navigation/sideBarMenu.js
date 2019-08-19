/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const unassignedToSectionItems = [
    {
        title: 'Dashboard',
        routing: '/dashboard',
        icon: 'Dashboard',
        privilege: null,
    },
];

const manageSectionItems = [
    {
        title: 'Products catalog',
        routing: '/products',
        icon: 'Document',
        privilege: 'PRODUCT_READ',
    },
    {
        title: 'Product templates',
        routing: '/templates',
        icon: 'Templates',
        privilege: 'TEMPLATE_DESIGNER_READ',
    },
    {
        title: 'Categories',
        routing: '/categories',
        icon: 'Category',
        privilege: 'CATEGORY_READ',
    },
    {
        title: 'Category trees',
        routing: '/category-trees',
        icon: 'Tree',
        privilege: 'CATEGORY_TREE_READ',
    },
    {
        title: 'Attributes',
        routing: '/attributes',
        icon: 'Attributes',
        privilege: 'ATTRIBUTE_READ',
    },
    {
        title: 'Media',
        routing: '/placeholder/media',
        icon: 'Media',
        privilege: 'MULTIMEDIA_READ',
    },
    {
        title: 'Segments',
        routing: '/placeholder/segments',
        icon: 'Templates',
        privilege: null,
    },
];

const collectAndDistributeSectionItems = [
    {
        title: 'Import',
        routing: '/import',
        icon: 'Import',
        privilege: 'IMPORT_READ',
    },
    {
        title: 'Export',
        routing: '/placeholder/export',
        icon: 'Export',
        privilege: null,
    },
    {
        title: 'Channels',
        routing: '/placeholder/channels',
        icon: 'Channels',
        privilege: null,
    },
];

const systemSectionItems = [
    {
        title: 'Users',
        routing: '/users',
        icon: 'User',
        privilege: null,
    },
    {
        title: 'Workflows',
        routing: '/placeholder/workflow',
        icon: 'Flow',
        privilege: null,
    },
    {
        title: 'Settings',
        routing: '/settings',
        icon: 'Settings',
        privilege: null,
    },
];

const sections = [
    {
        items: unassignedToSectionItems,
    },
    {
        items: manageSectionItems,
    },
    {
        items: collectAndDistributeSectionItems,
    },
    {
        items: systemSectionItems,
    },
];

export function getValidatedMenuData(canIUse) {
    const menu = [];
    const sectionKeys = [null, 'MANAGE', 'COLLECT & DISTRIBUTE', 'SYSTEM'];
    const { length: sectionsNumber } = sectionKeys;

    for (let i = 0; i < sectionsNumber; i += 1) {
        const sectionKey = sectionKeys[i];
        menu.push({
            title: sectionKey,
            section: [],
        });

        const { length: itemsNumber } = sections[i].items;

        for (let j = 0; j < itemsNumber; j += 1) {
            const item = sections[i].items[j];
            if (item.privilege === null || canIUse(item.privilege)) {
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
