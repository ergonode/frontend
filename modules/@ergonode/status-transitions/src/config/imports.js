/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    StatusTransitions: () => import('@Transitions/pages/status-transitions/index').then(m => m.default || m),
    StatusTransitionEdit: () => import('@Transitions/pages/status-transitions/_transition/_id').then(m => m.default || m),
};

export const Tabs = {
    TransitionsGridTab: () => import('@Transitions/components/Tabs/TransitionsGridTab').then(m => m.default || m),
    StatusTransitionGeneralTab: () => import('@Transitions/components/Tabs/TransitionGeneralTab').then(m => m.default || m),
    ConditionDesignerTab: () => import('@Transitions/components/Tabs/ConditionDesignerTab').then(m => m.default || m),
};

export const Icons = {
    Flow: () => import('@Core/components/Icons/Menu/IconFlow'),
};
