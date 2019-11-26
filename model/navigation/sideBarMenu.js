/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const getUnassignedToSectionItems = () => [
    {
        title: 'Dashboard',
        routing: '/dashboard',
        icon: 'Dashboard',
        privileges: [],
    },
];

const getManageSectionItems = () => [
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
        routing: '/segments',
        icon: 'Templates',
        privileges: ['SEGMENT_READ'],
    },
];

const getCollectAndDistributeSectionItems = () => [
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

const getSystemSectionItems = () => [
    {
        title: 'Users',
        routing: '/users',
        icon: 'User',
        privileges: ['USER_READ'],
    },
    {
        title: 'Workflow',
        routing: '/workflow',
        icon: 'Flow',
        privileges: ['WORKFLOW_READ'],
    },
    {
        title: 'Settings',
        routing: '/settings',
        icon: 'Settings',
        privileges: [],
    },
];

const getSections = () => [
    {
        key: null,
        items: getUnassignedToSectionItems(),
    },
    {
        key: 'MANAGE',
        items: getManageSectionItems(),
    },
    {
        key: 'COLLECT & DISTRIBUTE',
        items: getCollectAndDistributeSectionItems(),
    },
    {
        key: 'SYSTEM',
        items: getSystemSectionItems(),
    },
];

const getExtendSections = (modulesMenu) => {
    const menuSections = getSections();

    for (let i = 0; i < modulesMenu.length; i += 1) {
        const index = menuSections.findIndex((e) => e.key === modulesMenu[i].key);

        if (index >= 0) {
            menuSections[index].items.push(...modulesMenu[i].items);
        } else {
            menuSections.push(modulesMenu[i]);
        }
    }
    return menuSections;
};

export const getValidatedMenuData = (hasAccess, modulesMenu) => {
    const menu = [];
    const extendedSections = getExtendSections(modulesMenu);
    const { length: sectionsNumber } = extendedSections;

    for (let i = 0; i < sectionsNumber; i += 1) {
        const { key, items } = extendedSections[i];
        const filteredItems = items.filter((e) => !e.privileges
                || !e.privileges.length
                || hasAccess(e.privileges));

        menu.push({
            key,
            items: filteredItems,
        });
    }
    return menu;
};
