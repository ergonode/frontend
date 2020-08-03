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
    AttributeBaseTab: () => import('@Attributes/components/Tabs/AttributeBaseTab').then(m => m.default || m),
    AttributeTranslationsTab: () => import('@Attributes/components/Tabs/AttributeTranslationsTab').then(m => m.default || m),
    AttributeGroupGridTab: () => import('@Attributes/components/Tabs/AttributeGroupGridTab').then(m => m.default || m),
    AttributeGroupBaseTab: () => import('@Attributes/components/Tabs/AttributeGroupBaseTab').then(m => m.default || m),
    AttributeGroupTranslationsTab: () => import('@Attributes/components/Tabs/AttributeGroupTranslationsTab').then(m => m.default || m),
};

export const Components = {
    AttributeFormParamsSelect: () => import('@Attributes/extends/components/Forms/AttributeFormParamsSelect').then(m => m.default || m),
    AttributeFormParamsToggle: () => import('@Attributes/extends/components/Forms/AttributeFormParamsToggle').then(m => m.default || m),
};

export const Icons = {
    Templates: () => import('@Core/components/Icons/Menu/IconTemplates').then(m => m.default || m),
    IconTextArea: () => import('@Core/components/Icons/Attributes/IconTextArea').then(m => m.default || m),
    IconText: () => import('@Core/components/Icons/Attributes/IconText').then(m => m.default || m),
    IconDate: () => import('@Core/components/Icons/Attributes/IconDate').then(m => m.default || m),
    IconImage: () => import('@Core/components/Icons/Attributes/IconImage').then(m => m.default || m),
    IconMultiSelect: () => import('@Core/components/Icons/Attributes/IconMultiSelect').then(m => m.default || m),
    IconSelect: () => import('@Core/components/Icons/Attributes/IconSelect').then(m => m.default || m),
    IconNumeric: () => import('@Core/components/Icons/Attributes/IconNumeric').then(m => m.default || m),
    IconPrice: () => import('@Core/components/Icons/Attributes/IconPrice').then(m => m.default || m),
    IconUnit: () => import('@Core/components/Icons/Attributes/IconMultiSelect').then(m => m.default || m),
};
