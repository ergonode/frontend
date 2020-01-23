/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    StatusTransitions: () => import('@Transitions/pages/status-transitions/index').then((m) => m.default || m),
    StatusTransitionNew: () => import('@Transitions/pages/status-transitions/_transition/index').then((m) => m.default || m),
    StatusTransitionEdit: () => import('@Transitions/pages/status-transitions/_transition/_id').then((m) => m.default || m),
};

export const Tabs = {
    TransitionsGridTab: () => import('@Transitions/components/Tabs/TransitionsGridTab').then((m) => m.default || m),
    StatusTransitionBaseTab: () => import('@Transitions/components/Tabs/TransitionBaseTab').then((m) => m.default || m),
    ConditionSetDesignTab: () => import('@Transitions/components/Tabs/ConditionSetDesignTab').then((m) => m.default || m),
};

export const Icons = {
    Flow: () => import('@Core/components/Icons/Menu/IconFlow'),
};
