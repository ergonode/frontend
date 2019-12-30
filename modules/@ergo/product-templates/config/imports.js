/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    ProductTemplates: () => import('@Templates/pages/product-templates/index').then((m) => m.default || m),
    ProductTemplateNew: () => import('@Templates/pages/product-templates/_template/index').then((m) => m.default || m),
    ProductTemplateEdit: () => import('@Templates/pages/product-templates/_template/_id').then((m) => m.default || m),
};

export const Tabs = {
    TemplateDesignerBaseTab: () => import('@Templates/components/Tabs/TemplateDesignerBaseTab').then((m) => m.default || m),
    TemplateDesignerTab: () => import('@Templates/components/Tabs/TemplateDesignerTab').then((m) => m.default || m),
};

export const Icons = {
    Templates: () => import('@Core/components/Icons/Menu/IconTemplates'),
};
