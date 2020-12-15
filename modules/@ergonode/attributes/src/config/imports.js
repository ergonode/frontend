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

export const Components = {
    AttributeFormParamsSelect: () => import('@Attributes/extends/components/Forms/AttributeFormParamsSelect').then(m => m.default || m),
    AttributeFormParamsToggle: () => import('@Attributes/extends/components/Forms/AttributeFormParamsToggle').then(m => m.default || m),
    AttributeFormOptions: () => import('@Attributes/extends/components/Forms/AttributeFormOptions').then(m => m.default || m),
    AttributeTranslationFormPlaceholder: () => import('@Attributes/extends/components/Forms/AttributeTranslationFormPlaceholder').then(m => m.default || m),
    AttributeTranslationFormOptions: () => import('@Attributes/extends/components/Forms/AttributeTranslationFormOptions').then(m => m.default || m),
    ProductTemplateFormPresentation: () => import('@Attributes/extends/components/Forms/ProductTemplateFormPresentation').then(m => m.default || m),
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

export const Store = {
    Attribute: () => import('@Attributes/extends/store/attribute').then(m => m.default || m),
    Template: () => import('@Attributes/extends/store/productTemplate').then(m => m.default || m),
};
