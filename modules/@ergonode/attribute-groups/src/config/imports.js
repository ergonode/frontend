/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    AttributeGroups: () => import('@AttributeGroups/pages/attribute-groups/index').then(m => m.default || m),
    AttributeGroupEdit: () => import('@AttributeGroups/pages/attribute-groups/_group/_id').then(m => m.default || m),
};

export const Tabs = {
    AttributeGroupsTab: () => import('@AttributeGroups/components/Tabs/AttributeGroupsTab').then(m => m.default || m),
    AttributeGroupGeneralTab: () => import('@AttributeGroups/components/Tabs/AttributeGroupGeneralTab').then(m => m.default || m),
    AttributeGroupTranslationsTab: () => import('@AttributeGroups/components/Tabs/AttributeGroupTranslationsTab').then(m => m.default || m),
};

export const Icons = {
    Templates: () => import('@Core/components/Icons/Menu/IconTemplates').then(m => m.default || m),
};

// Extends

export const Components = {
    AttributeFormGroups: () => import('@AttributeGroups/extends/attribute/components/Forms/AttributeFormGroups').then(m => m.default || m),
};

export const Store = {
    Attribute: () => import('@AttributeGroups/extends/attribute/store').then(m => m.default || m),
};
