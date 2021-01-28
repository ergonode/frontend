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
    AttributesTab: () => import('@Attributes/components/Tabs/AttributesTab').then(m => m.default || m),
    AttributeGeneralTab: () => import('@Attributes/components/Tabs/AttributeGeneralTab').then(m => m.default || m),
    AttributeTranslationsTab: () => import('@Attributes/components/Tabs/AttributeTranslationsTab').then(m => m.default || m),
    AttributeGroupsTab: () => import('@Attributes/components/Tabs/AttributeGroupsTab').then(m => m.default || m),
    AttributeGroupGeneralTab: () => import('@Attributes/components/Tabs/AttributeGroupGeneralTab').then(m => m.default || m),
    AttributeGroupTranslationsTab: () => import('@Attributes/components/Tabs/AttributeGroupTranslationsTab').then(m => m.default || m),
};

export const Icons = {
    Templates: () => import('@Core/components/Icons/Menu/IconTemplates').then(m => m.default || m),
    IconTextArea: () => import('@Attributes/components/Icons/IconTextArea').then(m => m.default || m),
    IconText: () => import('@Attributes/components/Icons/IconText').then(m => m.default || m),
    IconDate: () => import('@Attributes/components/Icons/IconDate').then(m => m.default || m),
    IconImage: () => import('@Attributes/components/Icons/IconImage').then(m => m.default || m),
    IconMultiSelect: () => import('@Attributes/components/Icons/IconMultiSelect').then(m => m.default || m),
    IconSelect: () => import('@Attributes/components/Icons/IconSelect').then(m => m.default || m),
    IconNumeric: () => import('@Attributes/components/Icons/IconNumeric').then(m => m.default || m),
    IconPrice: () => import('@Attributes/components/Icons/IconPrice').then(m => m.default || m),
    IconUnit: () => import('@Attributes/components/Icons/IconMultiSelect').then(m => m.default || m),
};

// Extends

export const Components = {
    FormParamsSelect: () => import('@Attributes/extends/attribute/components/Forms/FormParamsSelect').then(m => m.default || m),
    FormParamsToggle: () => import('@Attributes/extends/attribute/components/Forms/FormParamsToggle').then(m => m.default || m),
    FormOptions: () => import('@Attributes/extends/attribute/components/Forms/FormOptions').then(m => m.default || m),
    TranslationFormPlaceholder: () => import('@Attributes/extends/attribute/components/Forms/TranslationFormPlaceholder').then(m => m.default || m),
    TranslationFormOptions: () => import('@Attributes/extends/attribute/components/Forms/TranslationFormOptions').then(m => m.default || m),
    FormPresentation: () => import('@Attributes/extends/productTemplate/components/Forms/FormPresentation').then(m => m.default || m),
};

export const Store = {
    Attribute: () => import('@Attributes/extends/attribute/store').then(m => m.default || m),
    Template: () => import('@Attributes/extends/productTemplate/store').then(m => m.default || m),
};
