/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Attributes: () => import('@Attributes/pages/attributes/index').then(m => m.default || m),
    AttributeEdit: () => import('@Attributes/pages/attributes/_attribute/_id').then(m => m.default || m),
    AttributeGroups: () => import('@Attributes/pages/attribute-groups/index').then(m => m.default || m),
    AttributeGroupEdit: () => import('@Attributes/pages/attribute-groups/_group/_id').then(m => m.default || m),
};

export const Tabs = {
    AttributeGridTab: () => import('@Attributes/components/Tabs/AttributeGridTab').then(m => m.default || m),
    AttributeGeneralTab: () => import('@Attributes/components/Tabs/AttributeGeneralTab').then(m => m.default || m),
    AttributeTranslationsTab: () => import('@Attributes/components/Tabs/AttributeTranslationsTab').then(m => m.default || m),
    AttributeGroupGridTab: () => import('@Attributes/components/Tabs/AttributeGroupGridTab').then(m => m.default || m),
    AttributeGroupGeneralTab: () => import('@Attributes/components/Tabs/AttributeGroupGeneralTab').then(m => m.default || m),
    AttributeGroupTranslationsTab: () => import('@Attributes/components/Tabs/AttributeGroupTranslationsTab').then(m => m.default || m),
};

export const Icons = {
    Templates: () => import('@Core/components/Icons/Menu/IconTemplates'),
};
