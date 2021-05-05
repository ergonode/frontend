/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    StatusTransitions: () => import('@Workflow/pages/workflow/index').then(m => m.default || m),
};

export const Tabs = {
    WorkflowDesignerTab: () => import('@Workflow/components/Tabs/WorkflowDesignerTab').then(m => m.default || m),
    ProductStatusGeneralTab: () => import('@Workflow/components/Tabs/ProductStatusGeneralTab').then(m => m.default || m),
    ProductStatusTranslationsTab: () => import('@Workflow/components/Tabs/ProductStatusTranslationsTab').then(m => m.default || m),
};

export const Icons = {
    Flow: () => import('@Core/components/Icons/Menu/IconFlow').then(m => m.default || m),
};
