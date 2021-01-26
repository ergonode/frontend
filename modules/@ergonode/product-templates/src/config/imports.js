/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    ProductTemplates: () => import('@Templates/pages/product-templates/index').then(m => m.default || m),
    ProductTemplateEdit: () => import('@Templates/pages/product-templates/_template/_id').then(m => m.default || m),
};

export const Tabs = {
    ProductTemplateGeneralTab: () => import('@Templates/components/Tabs/ProductTemplateGeneralTab').then(m => m.default || m),
    TemplateDesignerTab: () => import('@Templates/components/Tabs/TemplateDesignerTab').then(m => m.default || m),
};

export const Icons = {
    Templates: () => import('@Core/components/Icons/Menu/IconTemplates'),
};

export const Components = {
    ProductFormTemplate: () => import('@Templates/extends/components/Forms/ProductFormTemplate'),
};

export const Store = {
    Product: () => import('@Templates/extends/store/product').then(m => m.default || m),
};
